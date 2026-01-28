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


  {
    path: 'pollutions',
    loadComponent: () =>
      import('./pages/pollution-list/pollution-list.component')
        .then(m => m.PollutionListComponent)
  },

  {
    path: 'pollutions/new',
    loadComponent: () =>
      import('./pages/pollution-form/pollution-form.component')
        .then(m => m.PollutionFormComponent)
  },

  {
    path: 'pollutions/:id',
    loadComponent: () =>
      import('./pages/pollution-detail/pollution-detail.component')
        .then(m => m.PollutionDetailComponent)
  },

   { 
    path: 'favorites', 
    loadComponent: () =>
      import('./pages/favorites-list/favorites-list.component')
        .then(m => m.FavoritesListComponent)
  },

  {
    path: '',
    redirectTo: '/pollutions',
    pathMatch: 'full'
  },


  {
    path: '**',
    redirectTo: '/pollutions'
  }
];
