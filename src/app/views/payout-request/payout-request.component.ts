import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-payout-request',
  standalone: true,
  imports: [ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, CommonModule],
  templateUrl: './payout-request.component.html',
  styleUrl: './payout-request.component.scss'
})
export class PayoutRequestComponent {
  balance: number = 0;
  form: FormGroup;
  constructor(private router: Router, private api: ApiService, private fb: FormBuilder, private utils: UtilsService) {
    this.getBalance();
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.max(this.balance)]]
    })
  }

  getBalance() {
    this.api.getPartnerAccountBalance(new FormData()).pipe(take(1)).subscribe((res: any) => {
      this.balance = parseFloat(res.balance[0].Balance.toFixed(2));
      this.form.controls["amount"].setValidators([Validators.max(this.balance), Validators.required]);
      this.form.controls["amount"].updateValueAndValidity();
    })
  }

  withdraw() {
    if (this.form.valid) {
      var fd = new FormData()
      fd.append("amount", this.form.value.amount);
      this.api.createPayoutRequest(fd).pipe(take(1)).subscribe((res) => {
        this.utils.swalSuccessPopup("Payout request is successfully created.")
        this.balance = this.balance - this.form.value.amount;
      })
    }
  }
}
