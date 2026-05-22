import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // ✅ add cookies automatically
  const clonedReq = req.clone({
    withCredentials: true
  });

  return next(clonedReq).pipe(
    catchError((error) => {

      // if (error.status === 401) {
      //   router.navigate(['/login']);
      // }

      return throwError(() => error);
    })
  );
};