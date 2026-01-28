import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthState } from '../store/auth/auth.state';
import { Logout } from '../store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  isAuth$: Observable<boolean>;
  profile$: Observable<any>;

  constructor(private store: Store, private router: Router) {

    this.isAuth$ = this.store.select(AuthState.isAuthenticated);
    this.profile$ = this.store.select(AuthState.profile);
  } 

  logout(): void {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }
}
