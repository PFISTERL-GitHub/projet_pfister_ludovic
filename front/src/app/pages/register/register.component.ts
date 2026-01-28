import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register(): void {
    this.auth.register(this.form).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l’inscription';
      }
    });
  }
}
