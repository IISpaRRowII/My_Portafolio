import type { Project } from '../features/projects';

export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  location?: string;
  email?: string;
  avatarUrl?: string;
  socials: SocialLink[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const profile: Profile = {
  name: 'Juan Felipe Vargas Giraldo',
  role: 'Ingeniero Informatico | Desarrollador Full Stack',
  bio: 'Ingeniero Informatico con experiencia en el desarrollo de software, aplicaciones móviles y sistemas web.',
  location: 'MEDELLIN, COLOMBIA',
  email: 'pip3.solutions@gmail.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/IISpaRRowII' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/juan-felipe-vargas-giraldo-7a538130b?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { label: 'Instagram', url: 'https://www.instagram.com/juan._.vg_?cplk=YnB2enU5Yms5Z3Bj' },
    { label: 'Discord', url: 'https://discord.com/users/712347395563847681' },
  ],
};

export const skills: SkillGroup[] = [
  { category: 'Frontend', items: ['TypeScript', 'React', 'HTML', 'CSS', 'JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Java', 'Solidity', 'SQL'] },
  { category: 'Bases de Datos', items: ['MySQL', 'Oracle'] },
  { category: 'Herramientas', items: ['Git', 'GitHub'] },
  { category: 'Metodologías', items: ['Agile', 'Scrum'] },
  { category: 'Idiomas', items: ['Español', 'Inglés'] },
];

export const projects: Project[] = [
  {
    id: 'portafolio',
    title: 'Portafolio Web Profesional',
    description: 'Portafolio moderno desarrollado con Next.js 16 (App Router), TypeScript, Tailwind CSS v4 y arquitectura modular escalable.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    repoUrl: 'https://github.com/IISpaRRowII/My_Portafolio',
    featured: true,
    createdAt: '2026-10-23',
  },
  {
    id: 'web3-smart-contracts',
    title: 'Plataforma Web3 & Smart Contracts',
    description: 'Desarrollo de contratos inteligentes en Solidity y frontend reactivo para interacción de transacciones seguras en blockchain.',
    tags: ['Solidity', 'Web3', 'TypeScript', 'Node.js'],
    repoUrl: 'https://github.com/IISpaRRowII',
    featured: true,
    createdAt: '2026-08-15',
  },
  {
    id: 'sistema-gestion-api',
    title: 'Sistema de Gestión & API RESTful',
    description: 'Servicios de backend escalables con arquitectura limpia, autenticación y persistencia en bases de datos relacionales SQL.',
    tags: ['Node.js', 'SQL', 'MySQL', 'Python', 'API REST'],
    repoUrl: 'https://github.com/IISpaRRowII',
    featured: false,
    createdAt: '2026-05-10',
  },
];
