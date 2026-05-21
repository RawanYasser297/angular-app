import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Auth } from '../services/auth';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.getToken()) {
    return of(router.createUrlTree(['/login']));
  }

  return auth.getMe().pipe(
    map((response) => {
      if (response.data?.role === 'admin') {
        return true;
      }

      return router.createUrlTree(['/home']);
    }),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};
