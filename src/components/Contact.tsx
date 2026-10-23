'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import {
  CheckIcon,
  ClockIcon,
  CopyIcon,
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
  SparklesIcon,
} from '@/components/ui/icons';
import { profile } from '@/data/portafolio';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = async () => {
    if (!profile.email) return;
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback en caso de que el navegador bloquee el portapapeles
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.email) return;

    // Genera el enlace mailto pre-rellenado con la información del formulario
    const mailtoSubject = encodeURIComponent(
      formData.subject || `Contacto de ${formData.name} desde el Portafolio`
    );
    const mailtoBody = encodeURIComponent(
      `Hola Juan Felipe,\n\nMi nombre es: ${formData.name}\nMi correo es: ${formData.email}\n\nMensaje:\n${formData.message}`
    );

    window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setFormSubmitted(true);
  };

  const socialIcons: Record<string, typeof GitHubIcon> = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
    Instagram: InstagramIcon,
    Discord: DiscordIcon,
  };

  return (
    <section id="contacto" className="relative py-24 sm:py-32 border-t border-border overflow-hidden">
      {/* Luz ambiental sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 bottom-0 -z-10 translate-y-1/3 opacity-30 blur-3xl"
      >
        <div className="h-[320px] w-[500px] rounded-full bg-gradient-to-br from-accent/20 to-transparent" />
      </div>

      <Container>
        {/* Encabezado de la sección */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-accent">
            <SparklesIcon className="size-3.5" />
            <span>{"// Conectemos"}</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ponte en Contacto
          </h2>

          <p className="mt-3 text-base text-muted sm:text-lg">
            ¿Tienes un proyecto en mente, una vacante o simplemente quieres conectar?
            Estaré encantado de conversar contigo.
          </p>
        </div>

        {/* Cuadrícula de 2 columnas: Datos directos y Formulario */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Columna Izquierda: Tarjetas de información directa */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Tarjeta de Correo Principal con Copia Rápida */}
            <div className="floating-glass rounded-2xl border border-white/10 p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Correo Electrónico Directo
              </span>
              <p className="mt-2 text-lg font-semibold text-foreground break-all sm:text-xl">
                {profile.email}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  id="btn-copy-email"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition-all hover:bg-white hover:shadow-[0_0_20px_-4px_var(--accent)]"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="size-4 text-emerald-600" />
                      <span>¡Copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="size-4" />
                      <span>Copiar correo</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${profile.email}`}
                  id="btn-send-mail"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.02] px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
                >
                  <MailIcon className="size-4 text-accent" />
                  <span>Abrir cliente</span>
                </a>
              </div>
            </div>

            {/* Tarjeta de Ubicación y Disponibilidad */}
            <div className="floating-glass space-y-4 rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-border/70 bg-white/[0.02] text-accent">
                  <MapPinIcon className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-mono text-muted uppercase">Ubicación</p>
                  <p className="text-sm font-medium text-foreground">{profile.location || 'Medellín, Colombia'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                <span className="grid size-9 place-items-center rounded-lg border border-border/70 bg-white/[0.02] text-accent">
                  <ClockIcon className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-mono text-muted uppercase">Zona Horaria</p>
                  <p className="text-sm font-medium text-foreground">GMT-5 (Colombia) · Respuesta rápida</p>
                </div>
              </div>
            </div>

            {/* Redes Sociales Profesionales */}
            <div className="floating-glass rounded-2xl border border-white/10 p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Redes Profesionales
              </span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {profile.socials.map((social) => {
                  const Icon = socialIcons[social.label] || MailIcon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-white/[0.02] px-3 py-2 text-xs font-medium text-muted transition-all hover:border-accent/50 hover:text-foreground"
                    >
                      <Icon className="size-4 text-accent" />
                      <span>{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Mensaje */}
          <div className="lg:col-span-7">
            <div className="floating-glass h-full rounded-2xl border border-white/10 p-6 sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Envíame un mensaje
              </h3>
              <p className="mt-1 text-sm text-muted">
                Completa los datos y se abrirá tu aplicación de correo para enviar tu solicitud al instante.
              </p>

              {formSubmitted ? (
                <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckIcon className="size-6" />
                  </span>
                  <h4 className="mt-3 text-lg font-semibold text-foreground">
                    ¡Mensaje preparado!
                  </h4>
                  <p className="mt-2 text-sm text-muted">
                    Se ha abierto tu cliente de correo para enviar la comunicación a{' '}
                    <strong className="text-foreground">{profile.email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-5 text-xs font-mono text-accent hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block font-mono text-xs text-muted mb-1.5">
                        Tu Nombre *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Ej: Laura Gómez"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-border/80 bg-white/[0.02] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block font-mono text-xs text-muted mb-1.5">
                        Tu Correo Electrónico *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="laura@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-border/80 bg-white/[0.02] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block font-mono text-xs text-muted mb-1.5">
                      Asunto *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      placeholder="Propuesta de proyecto / Oportunidad laboral"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-border/80 bg-white/[0.02] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-xs text-muted mb-1.5">
                      Mensaje *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      placeholder="Cuéntame sobre tu proyecto, objetivos o la vacante disponible..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-border/80 bg-white/[0.02] px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-white hover:shadow-[0_0_24px_-6px_var(--accent)]"
                  >
                    <span>Enviar Mensaje</span>
                    <SendIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
