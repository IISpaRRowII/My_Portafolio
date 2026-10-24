import Link from 'next/link';
import { Container } from '@/components/layout';
import { ArrowRightIcon, MailIcon } from '@/components/ui/icons';
import { NeuralNetwork } from '@/components/ui/NeuralNetwork';
import { profile } from '@/data/portafolio';

export function Hero() {
  // Extraemos las tecnologías principales para los chips del Hero
  const topSkills = [
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'Solidity',
    'SQL',
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32 min-h-[580px] flex items-center">
      {/* Red neuronal interactiva 3D en forma de cerebro conectando ideas */}
      <NeuralNetwork variant="hero" />

      {/* Luz ambiental sutil de fondo (glow gradient) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/4 opacity-40 blur-3xl"
      >
        <div className="h-[420px] w-[680px] rounded-full bg-gradient-to-tr from-accent/20 via-accent/10 to-transparent" />
      </div>

      <Container className="relative z-10 w-full">
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

          {/* Columna Derecha: Escenario completamente despejado y limpio para el Cerebro 3D */}
          <div className="hidden lg:col-span-5 lg:block pointer-events-none" />
        </div>
      </Container>
    </section>
  );
}
