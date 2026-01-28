import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthState } from '../store/auth/auth.state';

export const authGuard: CanActivateFn = () => {

  const store = inject(Store);
  const router = inject(Router);

  const isAuth = store.selectSnapshot(AuthState.isAuthenticated);

  if (isAuth) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

