import { ExternalLinkIcon, FolderIcon, GitHubIcon } from '@/components/ui/icons';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="floating-glass group relative flex flex-col justify-between rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.85)]">
      <div>
        {/* Cabecera de la tarjeta: Icono de carpeta y Badge de destacado */}
        <div className="flex items-center justify-between">
          <div className="grid size-11 place-items-center rounded-xl border border-border/80 bg-white/[0.03] text-accent transition-colors group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:shadow-[0_0_16px_rgba(45,212,191,0.25)]">
            <FolderIcon className="size-5" />
          </div>

          {project.featured && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span>Destacado</span>
            </div>
          )}
        </div>

        {/* Título del Proyecto */}
        <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>

        {/* Descripción */}
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
          {project.description}
        </p>

        {/* Tags de tecnologías utilizadas */}
        <div className="mt-5 flex flex-wrap gap-1.5">
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

      {/* Parte inferior de la tarjeta: Botón intuitivo para ver en GitHub */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2.5">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver código fuente de ${project.title} en GitHub`}
              className="group/btn flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_20px_rgba(45,212,191,0.25)]"
            >
              <GitHubIcon className="size-4 transition-transform group-hover/btn:scale-110" />
              <span>Ver en GitHub</span>
              <ExternalLinkIcon className="size-3.5 text-muted transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-accent" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver demo en vivo de ${project.title}`}
              className="group/demo inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
              title="Ver demostración en vivo"
            >
              <ExternalLinkIcon className="size-3.5 text-accent" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
