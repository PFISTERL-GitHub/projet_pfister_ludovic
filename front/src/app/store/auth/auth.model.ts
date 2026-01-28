export interface UserProfile {
  id: number;
  email: string;
}

export interface AuthStateModel {
  token: string | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
}