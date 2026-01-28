import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Pollution } from '../models/pollution.model';

@Injectable({
  providedIn: 'root'
})
export class PollutionMockService {
  private mockPollutions: Pollution[] = [
    {
      id: 1,
      titre: 'Déchets plastiques sur la plage',
      type: 'Plastique',
      description: 'Grande quantité de déchets plastiques observés sur la plage',
      dateObservation: '2024-12-01',
      lieu: 'Plage de Strasbourg',
      latitude: 48.5734,
      longitude: 7.7521,
      photoUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500',
      auteur: 'Marie Dupont'
    },
    {
      id: 2,
      titre: 'Pollution chimique rivière',
      type: 'Chimique',
      description: 'Déversement suspect dans la rivière, eau avec couleur anormale',
      dateObservation: '2024-11-28',
      lieu: 'Rivière Ill, Strasbourg',
      latitude: 48.5839,
      longitude: 7.7455,
      auteur: 'Jean Martin'
    },
    {
      id: 3,
      titre: 'Dépôt sauvage en forêt',
      type: 'Dépôt sauvage',
      description: 'Plusieurs sacs poubelles et encombrants abandonnés',
      dateObservation: '2024-11-25',
      lieu: 'Forêt de la Robertsau',
      latitude: 48.6047,
      longitude: 7.7869,
      photoUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500',
      auteur: 'Sophie Lambert'
    }
  ];

  private nextId = 4;

  getAllPollutions(): Observable<Pollution[]> {
    return of(this.mockPollutions).pipe(delay(500)); // Simule un délai réseau
  }

  getPollutionById(id: number): Observable<Pollution> {
    const pollution = this.mockPollutions.find(p => p.id === id);
    return of(pollution!).pipe(delay(300));
  }

  createPollution(pollution: Pollution): Observable<Pollution> {
    const newPollution = { ...pollution, id: this.nextId++ };
    this.mockPollutions.push(newPollution);
    return of(newPollution).pipe(delay(500));
  }

  updatePollution(id: number, pollution: Partial<Pollution>): Observable<Pollution> {
    const index = this.mockPollutions.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPollutions[index] = { ...this.mockPollutions[index], ...pollution };
      return of(this.mockPollutions[index]).pipe(delay(500));
    }
    return of(pollution as Pollution);
  }

  deletePollution(id: number): Observable<void> {
    this.mockPollutions = this.mockPollutions.filter(p => p.id !== id);
    return of(void 0).pipe(delay(500));
  }

  searchPollutions(filters: any): Observable<Pollution[]> {
    let filtered = this.mockPollutions;
    
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    if (filters.titre) {
      filtered = filtered.filter(p => 
        p.titre.toLowerCase().includes(filters.titre.toLowerCase())
      );
    }
    if (filters.lieu) {
      filtered = filtered.filter(p => 
        p.lieu.toLowerCase().includes(filters.lieu.toLowerCase())
      );
    }
    
    return of(filtered).pipe(delay(500));
  }
}