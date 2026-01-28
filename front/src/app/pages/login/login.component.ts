import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { Login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form = { email: '', password: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private store: Store, private router: Router) {}

  login(): void {
    this.store.dispatch(new Login(this.form)).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = "Connexion impossible ❌";
      }
    });
  }
}
