import Link from 'next/link';
import { Container } from '@/components/layout';
import { ArrowRightIcon, MailIcon, TerminalIcon } from '@/components/ui/icons';
import { profile } from '@/data/portafolio';

export function Hero() {
  // Extraemos las tecnologías principales para los chips del Hero
  const topSkills = [
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Solidity',
    'SQL',
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* Luz ambiental sutil de fondo (glow gradient) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/4 opacity-40 blur-3xl"
      >
        <div className="h-[380px] w-[620px] rounded-full bg-gradient-to-tr from-accent/20 via-accent/10 to-transparent" />
      </div>

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Columna Izquierda: Información principal y llamados a la acción */}
          <div className="lg:col-span-7">
            {/* Badge de disponibilidad flotante */}
            <div className="animate-float inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Disponible para nuevos proyectos</span>
            </div>

            {/* Rol profesional */}
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent sm:text-sm">
              {profile.role}
            </p>

            {/* Nombre principal */}
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Hola, soy{' '}
              <span className="text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.15)]">
                {profile.name}
              </span>
            </h1>

            {/* Biografía / Propuesta de valor */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.bio}
            </p>

            {/* Botones de Acción (CTAs) */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                id="hero-cta-projects"
                href="#proyectos"
                className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all hover:bg-white hover:shadow-[0_0_28px_-6px_var(--accent)]"
              >
                <span>Ver Proyectos</span>
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                id="hero-cta-contact"
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.02] px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
              >
                <MailIcon className="size-4 text-accent" />
                <span>Contactar</span>
              </Link>
            </div>

            {/* Stack destacado rápido */}
            <div className="mt-10 pt-6 border-t border-border/60">
              <p className="text-xs font-mono uppercase tracking-wider text-muted/70">
                Stack destacado
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {topSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border/80 bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-foreground/90 transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta interactiva estilo Terminal / Inspector de Código flotante */}
          <div className="lg:col-span-5 animate-float-slow">
            <div className="floating-glass relative rounded-2xl border border-white/10 p-5">
              {/* Barra superior de la ventana */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
                  <TerminalIcon className="size-3.5 text-accent" />
                  <span>developer.ts</span>
                </div>
                <span className="w-10" />
              </div>

              {/* Contenido en código simulado */}
              <div className="mt-4 font-mono text-xs leading-relaxed text-zinc-300">
                <p>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">engineer</span> = {'{'}
                </p>
                <p className="pl-4">
                  <span className="text-muted">name:</span>{' '}
                  <span className="text-emerald-300">&apos;Juan Felipe Vargas&apos;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-muted">title:</span>{' '}
                  <span className="text-emerald-300">&apos;Ingeniero Informático&apos;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-muted">location:</span>{' '}
                  <span className="text-emerald-300">&apos;Medellín, Colombia&apos;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-muted">focus:</span> [
                </p>
                <p className="pl-8 text-emerald-300">
                  &apos;Web Full Stack&apos;, &apos;Mobile Apps&apos;, &apos;Clean Architecture&apos;
                </p>
                <p className="pl-4">],</p>
                <p className="pl-4">
                  <span className="text-muted">openToWork:</span>{' '}
                  <span className="text-accent font-semibold">true</span>
                </p>
                <p>{'}'};</p>

                <div className="mt-4 rounded-lg border border-border/50 bg-black/40 p-3 text-[11px]">
                  <p className="text-accent">
                    <span className="text-muted">&gt;</span> engineer.buildSolution()
                  </p>
                  <p className="text-muted/80 mt-1">
                    ✓ Software escalable, interfaces modernas y código limpio listo para producción.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
