import { Component, OnInit} from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from './services/favorite.service';
import { Observable } from 'rxjs';
import { Pollution } from './models/pollution.model';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `<router-outlet></router-outlet>`,
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone : true
})
export class App implements OnInit {
  title = 'Pollution Tracker';

  favorites$!: Observable<Pollution[]>;

  constructor(
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.favorites$ = this.favoriteService.favorites$;
  }
}



