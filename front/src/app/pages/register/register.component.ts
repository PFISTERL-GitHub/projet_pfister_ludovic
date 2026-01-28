import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

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

  register(): void {
    this.auth.register(this.form).subscribe({
      next: () => {
        this.successMessage = "Inscription réussie 🎉";

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);
      },
      error: () => {
        this.errorMessage = "Erreur lors de l'inscription ❌";
      }
    });
  }
}
