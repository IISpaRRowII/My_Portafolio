/**
 * Interfaces y tipos de datos del dominio Auth
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: string;
}

export interface AuthSession {
  user: User | null;
  token?: string;
  isAuthenticated: boolean;
}
