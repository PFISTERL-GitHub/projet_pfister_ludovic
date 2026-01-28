import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pollution } from '../../models/pollution.model';
//import { PollutionService } from '../../services/pollution.service';
import { PollutionMockService as PollutionService } from '../../services/pollution-mock.service';

@Component({
  selector: 'app-pollution-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pollution-detail.component.html',
  styleUrls: ['./pollution-detail.component.css']
})
export class PollutionDetailComponent implements OnInit {
  pollution: Pollution | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollutionService: PollutionService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPollution(+id); // Convertir en nombre
    }
  }

  /**
   * Charger les détails d'une pollution
   */
  loadPollution(id: number): void {
    this.loading = true;
    this.error = null;

    this.pollutionService.getPollutionById(id).subscribe({
      next: (data) => {
        this.pollution = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Pollution introuvable';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  /**
   * Supprimer la pollution et retourner à la liste
   */
  deletePollution(): void {
    if (!this.pollution?.id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette pollution ?')) {
      this.pollutionService.deletePollution(this.pollution.id).subscribe({
        next: () => {
          this.router.navigate(['/pollutions']);
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
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  /**
   * Ouvrir dans Google Maps
   */
  openInMaps(): void {
    if (this.pollution) {
      const url = `https://www.google.com/maps?q=${this.pollution.latitude},${this.pollution.longitude}`;
      window.open(url, '_blank');
    }
  }
}