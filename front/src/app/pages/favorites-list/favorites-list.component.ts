import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Observable } from 'rxjs';
import { Pollution } from '../../models/pollution.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-list',
  imports: [CommonModule],
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

  favorites$!: Observable<Pollution[]>;

  constructor(public favoriteService: FavoriteService) {}
  ngOnInit(): void {
    this.favorites$ = this.favoriteService.favorites$;
  }
}