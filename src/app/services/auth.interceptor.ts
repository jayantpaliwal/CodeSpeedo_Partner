import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, switchMap, take, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  var auth = inject(AngularFireAuth)

  return auth.idToken.pipe(switchMap((idToken) => {
    const clonedRequest: any = request.clone();
    try {
      clonedRequest.body.append('token', `${idToken}`);
    } catch {
      return next(request);
    }
    // clonedRequest.headers.append("Authorization", `Bearer ${idToken}`)
    return next(clonedRequest).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          // Handle HTTP errors
          if (err.status === 401) {
            // Specific handling for unauthorized errors         
            console.error('Unauthorized request:', err);
            auth.authState.pipe(take(1)).subscribe((tokk) => {
              clonedRequest.body.append('token', `${tokk}`);
              return next(clonedRequest);
            })
            // You might trigger a re-authentication flow or redirect the user here
          } else {
            // Handle other HTTP error codes
            console.error('HTTP error:', err);
          }
        } else {
          // Handle non-HTTP errors
          console.error('An error occurred:', err);
        }

        // Re-throw the error to propagate it further
        return throwError(() => err);
      })
    );
  }))
};
