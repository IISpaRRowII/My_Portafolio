import type { ComponentType, SVGProps } from 'react';
import { Container } from '@/components/layout';
import {
  CodeIcon,
  DatabaseIcon,
  GlobeIcon,
  LayersIcon,
  ServerIcon,
  SparklesIcon,
  WrenchIcon,
} from '@/components/ui/icons';
import { skills } from '@/data/portafolio';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const categoryIcons: Record<string, IconComponent> = {
  Frontend: CodeIcon,
  Backend: ServerIcon,
  'Bases de Datos': DatabaseIcon,
  Herramientas: WrenchIcon,
  Metodologías: LayersIcon,
  Idiomas: GlobeIcon,
};

export function Skills() {
  return (
    <section id="habilidades" className="relative py-24 sm:py-32 border-t border-border">
      <Container>
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-accent">
            <SparklesIcon className="size-3.5" />
            <span>Stack &amp; Competencias</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Habilidades Técnicas
          </h2>

          <p className="mt-3 text-base text-muted sm:text-lg">
            Tecnologías, arquitecturas y herramientas con las que diseño y construyo
            aplicaciones de alto impacto y código mantenible.
          </p>
        </div>

        {/* Cuadrícula de categorías */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const Icon = categoryIcons[group.category] || CodeIcon;

            return (
              <div
                key={group.category}
                className="floating-glass group relative rounded-2xl border border-white/10 p-6"
              >
                {/* Cabecera de la tarjeta */}
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-border/80 bg-white/[0.03] text-accent transition-colors group-hover:border-accent/50 group-hover:bg-accent/10">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-semibold text-foreground text-base tracking-tight">
                      {group.category}
                    </h3>
                  </div>

                  <span className="font-mono text-xs text-muted/60">
                    {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Lista de tags/chips de habilidades */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border/70 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-zinc-300 transition-all duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
