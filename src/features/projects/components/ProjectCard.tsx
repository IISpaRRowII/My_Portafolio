import { ExternalLinkIcon, FolderIcon, GitHubIcon } from '@/components/ui/icons';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="floating-glass group relative flex flex-col justify-between rounded-2xl border border-white/10 p-6">
      <div>
        {/* Cabecera de la tarjeta: Icono de carpeta y enlaces de acción */}
        <div className="flex items-center justify-between">
          <div className="grid size-10 place-items-center rounded-xl border border-border/80 bg-white/[0.03] text-accent transition-colors group-hover:border-accent/50 group-hover:bg-accent/10">
            <FolderIcon className="size-5" />
          </div>

          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver código fuente de ${project.title} en GitHub`}
                title="Ver código fuente"
                className="grid size-9 place-items-center rounded-full border border-border/80 bg-white/[0.02] text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <GitHubIcon className="size-4" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver demo en vivo de ${project.title}`}
                title="Ver demo en vivo"
                className="grid size-9 place-items-center rounded-full border border-border/80 bg-white/[0.02] text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <ExternalLinkIcon className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* Badge de destacado */}
        {project.featured && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            <span>Destacado</span>
          </div>
        )}

        {/* Título del Proyecto */}
        <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>

        {/* Descripción */}
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </div>

      {/* Tags de tecnologías utilizadas */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/60 bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-zinc-300 transition-colors group-hover:border-accent/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
