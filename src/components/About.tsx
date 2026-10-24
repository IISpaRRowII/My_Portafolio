'use client';

import { useState } from 'react';
import { Container } from '@/components/layout';
import { TerminalIcon, CopyIcon, CheckIcon, MapPinIcon, SparklesIcon } from '@/components/ui/icons';
import { profile } from '@/data/portafolio';

export function About() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `const engineer = {
  name: 'Juan Felipe Vargas Giraldo',
  title: 'Ingeniero Informático',
  location: 'Medellín, Colombia',
  role: 'Desarrollador Full Stack',
  skills: [
    'Web Full Stack (Next.js, React, Node.js)',
    'Mobile Apps (React Native)',
    'Bases de Datos (SQL, MySQL, Oracle)',
    'Smart Contracts (Solidity, Web3)',
    'Clean Architecture & Scalable Systems'
  ],
  openToWork: true,
  buildSolution: () => 'Software escalable listo para producción'
};`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback si no hay permisos
    }
  };

  return (
    <section id="sobre-mi" className="relative py-24 sm:py-32 border-t border-border overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/2 -z-10 -translate-y-1/2 opacity-25 blur-3xl"
      >
        <div className="h-[360px] w-[560px] rounded-full bg-gradient-to-tr from-accent/25 via-emerald-500/15 to-transparent" />
      </div>

      <Container>
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-accent">
            <SparklesIcon className="size-3.5" />
            <span>{"// Acerca de mí"}</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perfil de Ingeniería & Desarrollo
          </h2>

          <p className="mt-3 text-base text-muted sm:text-lg">
            Apasionado por construir sistemas robustos, arquitecturas limpias y experiencias de usuario de alto impacto.
          </p>
        </div>

        {/* Cuadrícula de 2 columnas: Narrativa a la izquierda, Terminal a la derecha */}
        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Columna Izquierda: Información personal y profesional */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                Soy <strong className="text-foreground font-semibold">Juan Felipe Vargas Giraldo</strong>, Ingeniero Informático con sede en Medellín, Colombia. Mi enfoque combina rigor de ingeniería de software con diseño de interfaces intuitivas y modernas.
              </p>
              <p>
                Cuento con experiencia en el desarrollo de software de punta a punta: desde el diseño arquitectónico de microservicios y APIs RESTful seguras hasta interfaces web interactivas y aplicaciones móviles reactivas.
              </p>
              <p>
                Creo firmemente en los principios de <span className="text-accent font-medium">Clean Code</span>, pruebas de integración y patrones de diseño escalables que permitan al software evolucionar con solidez en entornos de producción.
              </p>
            </div>

            {/* Badges de atributos clave */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-foreground/90 backdrop-blur-sm">
                <MapPinIcon className="size-4 text-accent shrink-0" />
                <span>{profile.location || 'Medellín, Colombia'}</span>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-foreground/90 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>Disponible para proyectos & vacantes</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Terminal developer.ts trasladada con botón para copiar */}
          <div className="lg:col-span-6 animate-float-slow">
            <div className="floating-glass relative rounded-2xl border border-white/10 p-5 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85)]">
              {/* Barra superior de la ventana de código */}
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

                {/* Botón para copiar el código */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                  title="Copiar definición de perfil"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="size-3 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="size-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Contenido en código simulado enriquecido */}
              <div className="mt-4 font-mono text-xs leading-relaxed text-zinc-300 overflow-x-auto">
                <p>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">engineer</span> = {'{'}
                </p>
                <p className="pl-4">
                  <span className="text-muted">name:</span>{' '}
                  <span className="text-emerald-300">&apos;Juan Felipe Vargas Giraldo&apos;</span>,
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
                  <span className="text-muted">role:</span>{' '}
                  <span className="text-emerald-300">&apos;Full Stack & Mobile Engineer&apos;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-muted">focus:</span> [
                </p>
                <p className="pl-8 text-emerald-300">
                  &apos;Web Full Stack&apos;, &apos;Mobile Apps&apos;, &apos;Clean Architecture&apos;, &apos;Web3&apos;
                </p>
                <p className="pl-4">],</p>
                <p className="pl-4">
                  <span className="text-muted">openToWork:</span>{' '}
                  <span className="text-accent font-semibold">true</span>
                </p>
                <p>{'}'};</p>

                {/* Salida simulada de consola */}
                <div className="mt-4 rounded-lg border border-border/50 bg-black/50 p-3 text-[11px]">
                  <p className="text-accent flex items-center gap-1.5">
                    <span className="text-muted">&gt;</span> engineer.buildSolution()
                  </p>
                  <p className="text-muted/90 mt-1 pl-3 border-l-2 border-accent/40">
                    ✓ Soluciones de software escalables, arquitectura modular y código limpio listo para producción.
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
