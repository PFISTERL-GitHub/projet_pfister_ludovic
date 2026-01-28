import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  /* Dashboard protégé */
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  /* Login */
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  /* Register */
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component')
        .then(m => m.RegisterComponent)
  },

  /* Redirection par défaut */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  /* Route inconnue */
  {
    path: '**',
    redirectTo: 'login'
  }
];
