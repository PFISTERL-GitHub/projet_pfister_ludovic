import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form = {
    email: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.auth.login(this.form).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);

        this.successMessage = "Connexion réussie ✅";

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: () => {
        this.errorMessage = "Email ou mot de passe incorrect ❌";
      }
    });
  }
}
