import { Container } from '@/components/layout';
import { ArrowRightIcon, GitHubIcon, SparklesIcon } from '@/components/ui/icons';
import { profile } from '@/data/portafolio';
import { getProjects } from '../services/projects.service';
import { ProjectCard } from './ProjectCard';

const githubUrl = profile.socials.find((s) => s.label === 'GitHub')?.url;

export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="proyectos" className="relative py-24 sm:py-32 border-t border-border">
      <Container>
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-accent">
            <SparklesIcon className="size-3.5" />
            <span>Casos de Estudio &amp; Código</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Proyectos Destacados
          </h2>

          <p className="mt-3 text-base text-muted sm:text-lg">
            Una selección de sistemas web, aplicaciones y desarrollos en donde aplico
            arquitecturas limpias y tecnologías modernas.
          </p>
        </div>

        {/* Cuadrícula de proyectos */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Llamado a la acción secundario a GitHub */}
        {githubUrl && (
          <div className="mt-12 text-center">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-accent/40 hover:bg-white/[0.05] hover:text-accent"
            >
              <GitHubIcon className="size-4" />
              <span>Ver más repositorios en GitHub</span>
              <ArrowRightIcon className="size-3.5" />
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
