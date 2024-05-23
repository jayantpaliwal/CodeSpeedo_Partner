import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { from, take } from 'rxjs';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/services/utils.service';
import { Clipboard } from '@angular/cdk/clipboard'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  form: FormGroup;
  user: any
  constructor(private fb: FormBuilder, private api: ApiService, private utils: UtilsService, private clipBoard: Clipboard) {
    this.form = this.fb.group({
      paypal_id: [],
      paypal_email: [],
      paypal_phone: [],
    });
    this.getData()
  }
  getData() {
    this.api.getAccountDetails(new FormData()).pipe(take(1)).subscribe((res: any) => {
      this.user = res.user[0];
      this.user?.Paypal_Id ? this.form.controls["paypal_id"].setValue(this.user?.Paypal_Id) : '';
      this.user?.Paypal_Email ? this.form.controls["paypal_email"].setValue(this.user?.Paypal_Email) : '';
      this.user?.Paypal_Phone ? this.form.controls["paypal_phone"].setValue(this.user?.Paypal_Phone) : '';
      this.user?.IsVerified ? this.form.disable() : '';
    })
  }

  update() {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "Please confirm that the details you entered are absolutely correct",
      footer: "<span STYLE='font-size: 12px;'>NOTE : ABOVE DETAILS WILL BE USED FOR PAYMENT AND TRANSACTION, INCORRECT DETAILS MAY LEADS TO WRONG PAYMENTS .</span>",
      confirmButtonText: 'OK',

    }).then((res) => {
      if (res.isConfirmed) {
        const data = new FormData();
        data.append("paypal_id", this.form.value.paypal_id)
        data.append("paypal_email", this.form.value.paypal_email)
        data.append("paypal_phone", this.form.value.paypal_phone)
        this.api.updateAccountDetails(data).pipe(take(1)).subscribe((re: any) => {
          this.utils.swalSuccessPopup(JSON.parse(re).message)
        })
      }
    })
  }

  copy() {
    this.clipBoard.copy(`https://app.codespeedo.com/editor/#/signup-auth?r=${this.user?.Ref_Code}`);
    this.utils.Swaltoast("Copied successfully.")
  }
}
