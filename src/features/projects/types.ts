/**
 * Interfaces y tipos de datos del dominio Projects
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  createdAt: string;
}
