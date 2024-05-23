import { Component, inject } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service'
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  form: FormGroup;
  constructor(private auth: AngularFireAuth, private fb: FormBuilder, private api: ApiService, private router: Router, private utils: UtilsService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  login() {
    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password).then((res) => {
      var fd = new FormData();
      fd.append('email', this.form.value.email)
      this.api.login(fd).pipe(take(1)).subscribe((result: any) => {
        if (result.user[0].Affilate) {
          this.router.navigate(['dashboard']);
        } else {
          this.utils.swalErrorPopup("Do not have sufficient rights to login.")
        }
      })
    }).catch((err) => {
      let message;
      switch (err.code) {
        case "auth/email-already-in-use": {
          message = "Email is already in use by another user."
          break
        }
        case "auth/weak-password": {
          message = "Password must be atleast 6 digits long."
          break
        }
        default: {
          message = `Something went wrong ${err.code}.`
          break
        }
      }
      this.utils.swalErrorPopup(message)
    })
  }

}
