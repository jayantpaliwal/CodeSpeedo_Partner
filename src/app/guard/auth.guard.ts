import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  var auth = inject(AngularFireAuth);
  return new Promise((resolve, reject) => {
    return auth.authState.pipe(take(1)).subscribe((user) => {
      if (user) {
        resolve(true);
      } else {
        reject(false);
      }
    })

  })
};
