import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Pollution, POLLUTION_TYPES } from '../../models/pollution.model';
import { PollutionRecapComponent } from '../pollution-recap/pollution-recap.component';

@Component({
  selector: 'app-pollution-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PollutionRecapComponent],
  templateUrl: './pollution-form.component.html',
  styleUrls: ['./pollution-form.component.css']
})
export class PollutionFormComponent {
  pollutionForm: FormGroup;
  
  // Liste des types de pollution pour le select
  pollutionTypes = POLLUTION_TYPES;
  
  // Contrôle de l'affichage
  showForm = true;
  
  // Données validées à passer au récapitulatif
  submittedData: Pollution | null = null;

  @Output() pollutionAdded = new EventEmitter<Pollution>();

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire avec validation
    this.pollutionForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateObservation: ['', Validators.required],
      lieu: ['', [Validators.required, Validators.minLength(3)]],
      latitude: ['', [Validators.required, Validators.pattern(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]+)?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]+)?$/)]],
      photoUrl: [''] // Optionnel
    });
  }
  
  onSubmit(): void {
    if (this.pollutionForm.valid) {
      // Récupération des données du formulaire
      this.submittedData = {
        ...this.pollutionForm.value,
        // Conversion des coordonnées en nombres
        latitude: parseFloat(this.pollutionForm.value.latitude),
        longitude: parseFloat(this.pollutionForm.value.longitude)
      };
      
      // Masquage du formulaire
      this.showForm = false;
    } else {
      // Marquer tous les champs comme "touched" pour afficher les erreurs
      Object.keys(this.pollutionForm.controls).forEach(key => {
        this.pollutionForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.pollutionForm.reset();
    this.submittedData = null;
    this.showForm = true;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.pollutionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
    
  getErrorMessage(fieldName: string): string {
    const field = this.pollutionForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Ce champ est requis';
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} caractères`;
    }
    
    if (field?.hasError('pattern')) {
      if (fieldName === 'latitude' || fieldName === 'longitude') {
        return 'Coordonnée invalide (entre -180 et 180)';
      }
    }
    
    return '';
  }
}