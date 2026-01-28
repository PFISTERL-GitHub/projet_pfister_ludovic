import { Component, OnInit} from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from './services/favorite.service';
import { Observable } from 'rxjs';
import { Pollution } from './models/pollution.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
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



