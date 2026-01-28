import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h2>Dashboard</h2>

    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {

  constructor(private store: Store, private router: Router) {}

  logout(): void {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }
}