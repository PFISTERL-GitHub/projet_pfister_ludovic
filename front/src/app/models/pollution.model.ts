export type PollutionType = 'Plastique' | 'Chimique' | 'Dépôt sauvage' | 'Eau' | 'Air' | 'Autre';

export interface Pollution {
  id: number; // généré par le backend
  titre: string;
  type: PollutionType;
  description: string;
  dateObservation: string; //(YYYY-MM-DD)
  lieu: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
  auteur?: string; // Nom de l'utilisateur qui a créé la pollution
  createdAt?: string; // Date de création
  updatedAt?: string; // Date de dernière modification
}

// Liste des types de pollution pour les select/dropdown
export const POLLUTION_TYPES: PollutionType[] = [
  'Plastique',
  'Chimique',
  'Dépôt sauvage',
  'Eau',
  'Air',
  'Autre'
];