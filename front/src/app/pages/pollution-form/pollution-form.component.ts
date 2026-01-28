import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Pollution, POLLUTION_TYPES } from '../../models/pollution.model';
import { PollutionRecapComponent } from '../pollution-recap/pollution-recap.component';
import { PollutionService } from '../../services/pollution.service';

@Component({
  selector: 'app-pollution-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PollutionRecapComponent],
  templateUrl: './pollution-form.component.html',
  styleUrls: ['./pollution-form.component.css']
})
export class PollutionFormComponent {
  pollutionForm: FormGroup;
  pollutionTypes = POLLUTION_TYPES;
  showForm = true; 
  submittedData: Pollution | null = null;
  message = '';
  loading = false;

  @Output() pollutionAdded = new EventEmitter<Pollution>();

  constructor(private fb: FormBuilder, private pollutionService: PollutionService) {
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
    if (!this.pollutionForm.valid) {
      Object.keys(this.pollutionForm.controls).forEach(key => {
        this.pollutionForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.message = '';

    const payload = {
      titre: this.pollutionForm.value.titre,

      type_pollution: this.pollutionForm.value.type,

      description: this.pollutionForm.value.description,

      date_observation: this.pollutionForm.value.dateObservation,

      lieu: this.pollutionForm.value.lieu,

      latitude: parseFloat(this.pollutionForm.value.latitude),

      longitude: parseFloat(this.pollutionForm.value.longitude),

      photo_url: this.pollutionForm.value.photoUrl
    };

    this.pollutionService.createPollutions(payload).subscribe({
      next: (createdPollution) => {
        this.loading = false;

        this.submittedData = createdPollution;

        this.message = 'Pollution enregistrée avec succès ✅';

        // Masquer le formulaire
        this.showForm = false;

        // Émettre l’événement vers le parent
        this.pollutionAdded.emit(createdPollution);
      },

      error: (err) => {
        this.loading = false;

        if (err.status === 401) {
          this.message = 'Vous devez être connecté pour ajouter une pollution ❌';
        } else {
          this.message = 'Erreur lors de l’enregistrement ❌';
        }
      }
    });
  }

  resetForm(): void {
    this.pollutionForm.reset();
    this.submittedData = null;
    this.showForm = true;
    this.message = '';
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