import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Auth } from '../services/auth';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return auth.getMe().pipe(
    map((response) => {
      // ✅ لو user موجود و admin
      if (response.data?.role === 'admin') {
        return true;
      }

      // ❌ مش admin
      return router.createUrlTree(['/home']);
    }),
    catchError(() => {
      // ❌ مش logged in أصلاً (401)
      return of(router.createUrlTree(['/login']));
    })
  );
};
