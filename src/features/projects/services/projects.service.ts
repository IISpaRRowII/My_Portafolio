import { projects } from '@/data/portafolio';
import type { Project } from '../types';

/**
 * Servicio para consultar y gestionar la entidad Proyectos.
 * Actualmente lee los datos estáticos de `@/data/portafolio`
 * y está preparado para conectarse a una API, Supabase o base de datos.
 */
export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects.filter((project) => project.featured);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return projects.find((project) => project.id === id);
}
