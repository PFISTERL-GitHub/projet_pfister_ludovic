import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h2>Dashboard</h2>
    <p>Zone privée accessible uniquement connecté.</p>
  `
})
export class DashboardComponent {}