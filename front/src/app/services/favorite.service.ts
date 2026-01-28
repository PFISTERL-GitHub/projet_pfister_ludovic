import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pollution } from '../models/pollution.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: Pollution[] = [];

  private favoritesSubject = new BehaviorSubject<Pollution[]>(this.favorites);
  favorites$ = this.favoritesSubject.asObservable();

  /** Ajouter un favori */
  addToFavorites(pollution: Pollution): void {
    if (!this.isFavorite(pollution.id)) {
      this.favorites.push(pollution);
      this.favoritesSubject.next(this.favorites);
    }
  }

  /** Retirer un favori */
  removeFromFavorites(id: number): void {
    this.favorites = this.favorites.filter(p => p.id !== id);
    this.favoritesSubject.next(this.favorites);
  }

  /** Vérifier si une pollution est en favori */
  isFavorite(id: number): boolean {
    return this.favorites.some(p => p.id === id);
  }

  /** Récupérer tous les favoris */
  getFavorites(): Pollution[] {
    return this.favorites;
  }
}