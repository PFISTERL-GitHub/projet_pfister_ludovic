import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pollution } from '../../models/pollution.model';

@Component({
  selector: 'app-pollution-recap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pollution-recap.component.html',
  styleUrls: ['./pollution-recap.component.css']
})
export class PollutionRecapComponent {
  /* Données de la pollution à afficher, Reçues du composant parent via @Input()*/
  @Input() pollution!: Pollution;

  /* Événement émis pour retourner au formulaire, Permet au parent de réafficher le formulaire*/
  @Output() reset = new EventEmitter<void>();

  /*Formatage de la date au format français*/
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  /*Émet l'événement pour retourner au formulaire*/
  onReset(): void {
    this.reset.emit();
  }
}