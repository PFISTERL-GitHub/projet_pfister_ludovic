import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pollution, POLLUTION_TYPES } from '../../models/pollution.model';
//import { PollutionService } from '../../services/pollution.service';
import { PollutionMockService as PollutionService } from '../../services/pollution-mock.service';
import { FavoriteService } from '../../services/favorite.service';


@Component({
  selector: 'app-pollution-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pollution-list.component.html',
  styleUrls: ['./pollution-list.component.css']
})
export class PollutionListComponent implements OnInit {
  pollutions: Pollution[] = [];
  filteredPollutions: Pollution[] = [];
  loading = false;
  error: string | null = null;

  // Filtres
  filterType = '';
  filterTitre = '';
  filterLieu = '';
  pollutionTypes = ['', ...POLLUTION_TYPES]; // Ajoute une option vide

  constructor(private pollutionService: PollutionService, public favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadPollutions();
  }

  /**
   * Charger toutes les pollutions
   */
  loadPollutions(): void {
    this.loading = true;
    this.error = null;

    this.pollutionService.getAllPollutions().subscribe({
      next: (data) => {
        this.pollutions = data;
        this.filteredPollutions = data;
        this.loading = false;
      },
      error: (err) => {
        // this.error = 'Erreur lors du chargement des pollutions';
        // this.loading = false;
        // console.error('Erreur:', err);
        // Ne pas afficher d'erreur si c'est juste que le backend n'est pas lancé
        this.pollutions = [];
        this.filteredPollutions = [];
        this.loading = false;
        console.warn('Backend non disponible:', err);
      }
    });
  }

  /**
   * Appliquer les filtres côté client
   */
  applyFilters(): void {
    this.filteredPollutions = this.pollutions.filter(pollution => {
      const matchType = !this.filterType || pollution.type === this.filterType;
      const matchTitre = !this.filterTitre || 
        pollution.titre.toLowerCase().includes(this.filterTitre.toLowerCase());
      const matchLieu = !this.filterLieu || 
        pollution.lieu.toLowerCase().includes(this.filterLieu.toLowerCase());

      return matchType && matchTitre && matchLieu;
    });
  }

  /**
   * Réinitialiser les filtres
   */
  resetFilters(): void {
    this.filterType = '';
    this.filterTitre = '';
    this.filterLieu = '';
    this.filteredPollutions = this.pollutions;
  }

  /**
   * Supprimer une pollution
   */
  deletePollution(id: number | undefined): void {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette pollution ?')) {
      this.pollutionService.deletePollution(id).subscribe({
        next: () => {
          // Retirer de la liste locale
          this.pollutions = this.pollutions.filter(p => p.id !== id);
          this.applyFilters(); // Réappliquer les filtres
        },
        error: (err) => {
          alert('Erreur lors de la suppression');
          console.error('Erreur:', err);
        }
      });
    }
  }

  /**
   * Formater la date
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  toggleFavorite(pollution: Pollution): void {
    if (this.favoriteService.isFavorite(pollution.id)) {
      this.favoriteService.removeFromFavorites(pollution.id);
    } else {
      this.favoriteService.addToFavorites(pollution);
    }
  }
}