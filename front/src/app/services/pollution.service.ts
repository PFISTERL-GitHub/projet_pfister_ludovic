import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pollution } from '../models/pollution.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private apiUrl = `${environment.apiUrl}/pollutions`;

  constructor(private http: HttpClient) {}

  /* Récupérer toutes les pollutions
  GET /api/pollutions */
  getAllPollutions(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(this.apiUrl);
  }

  /* Récupérer une pollution par son ID
  GET /api/pollutions/:id */
  getPollutionById(id: number): Observable<Pollution> {
    return this.http.get<Pollution>(`${this.apiUrl}/${id}`);
  }

  /* Créer une nouvelle pollution
  POST /api/pollutions */
  createPollution(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(this.apiUrl, pollution);
  }

  createPollutions(data: any) {
  return this.http.post<Pollution>(this.apiUrl, data);
}

  /* Modifier une pollution existante
  PUT /api/pollutions/:id */
  updatePollution(id: number, pollution: Partial<Pollution>): Observable<Pollution> {
    return this.http.put<Pollution>(`${this.apiUrl}/${id}`, pollution);
  }

  /* Supprimer une pollution
  DELETE /api/pollutions/:id */
  deletePollution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /* Rechercher/filtrer des pollutions
  GET /api/pollutions?type=...&titre=...&lieu=... */
  searchPollutions(filters: {
    type?: string;
    titre?: string;
    lieu?: string;
  }): Observable<Pollution[]> {
    let params = new HttpParams();
    
    if (filters.type) {
      params = params.set('type', filters.type);
    }
    if (filters.titre) {
      params = params.set('titre', filters.titre);
    }
    if (filters.lieu) {
      params = params.set('lieu', filters.lieu);
    }

    return this.http.get<Pollution[]>(this.apiUrl, { params });
  }
}