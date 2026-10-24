'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { Container } from '@/components/layout';
import { SparklesIcon } from '@/components/ui/icons';

interface PingItem {
  id: string;
  emoji: string;
  label: string;
  tag: string;
  color: string;
  timestamp: string;
  angle: number; // Ángulo polar en el radar (0 a 2*PI)
  distance: number; // Distancia radial normalizada (0.2 a 0.85)
  intensity: number; // Brillo tras ser barrido por el radar (0 a 1)
}

const DEFAULT_PINGS: PingItem[] = [
  { id: '1', emoji: '⚡', label: 'Energía', tag: 'Full Stack Dev', color: '#22d3ee', timestamp: 'Hace 3 min', angle: 0.8, distance: 0.45, intensity: 0.9 },
  { id: '2', emoji: '🚀', label: 'Despegue', tag: 'Tech Recruiter', color: '#38bdf8', timestamp: 'Hace 8 min', angle: 2.4, distance: 0.65, intensity: 0.7 },
  { id: '3', emoji: '💡', label: 'Innovación', tag: 'Software Architect', color: '#fbbf24', timestamp: 'Hace 14 min', angle: 4.1, distance: 0.35, intensity: 0.8 },
  { id: '4', emoji: '💻', label: 'Clean Code', tag: 'Medellín, CO', color: '#34d399', timestamp: 'Hace 22 min', angle: 5.2, distance: 0.72, intensity: 0.6 },
  { id: '5', emoji: '🔥', label: 'Senior Dev', tag: 'Remote Visitor', color: '#f43f5e', timestamp: 'Hace 35 min', angle: 1.6, distance: 0.55, intensity: 0.7 },
  { id: '6', emoji: '☕', label: 'Café & Code', tag: 'Backend Engineer', color: '#c084fc', timestamp: 'Hace 48 min', angle: 3.5, distance: 0.78, intensity: 0.5 },
];

const EMOJI_OPTIONS = [
  { emoji: '⚡', label: 'Energía', color: '#22d3ee' },
  { emoji: '🚀', label: 'Despegue', color: '#38bdf8' },
  { emoji: '💡', label: 'Gran Idea', color: '#fbbf24' },
  { emoji: '💻', label: 'Clean Code', color: '#34d399' },
  { emoji: '🔥', label: 'Top Tier', color: '#f43f5e' },
  { emoji: '☕', label: 'Dev Coffee', color: '#c084fc' },
];

// Gestión segura de sincronización con almacenamiento sin mismatch de hidratación
function subscribeToPings(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('radar:ping-added', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('radar:ping-added', callback);
  };
}

function getStoredTotalPings(): number {
  if (typeof window === 'undefined') return 148;
  try {
    const saved = localStorage.getItem('portfolio_radar_pings_count');
    return saved ? parseInt(saved, 10) : 148;
  } catch {
    return 148;
  }
}

function getServerTotalPings(): number {
  return 148;
}

export function VisitorRadar() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Contador de pings seguro para SSR / React 19
  const totalPings = useSyncExternalStore(subscribeToPings, getStoredTotalPings, getServerTotalPings);

  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);
  const [visitorTag, setVisitorTag] = useState('');
  const [recentPings, setRecentPings] = useState<PingItem[]>(DEFAULT_PINGS);
  const [sentFeedback, setSentFeedback] = useState(false);

  // Referencias mutables para el loop a 60 FPS
  const pingsRef = useRef<PingItem[]>([...DEFAULT_PINGS]);
  const shockwavesRef = useRef<{ radius: number; maxRadius: number; color: string; alpha: number }[]>([]);

  // Disparar un nuevo Ping al radar
  const handleSendPing = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const tagText = visitorTag.trim() || 'Visitante';
    const newAngle = Math.random() * Math.PI * 2;
    const newDistance = 0.25 + Math.random() * 0.55;

    const newPing: PingItem = {
      id: `ping_${Date.now()}`,
      emoji: selectedEmoji.emoji,
      label: selectedEmoji.label,
      tag: tagText.length > 20 ? tagText.substring(0, 20) : tagText,
      color: selectedEmoji.color,
      timestamp: 'Ahora mismo',
      angle: newAngle,
      distance: newDistance,
      intensity: 1.0,
    };

    // Añadir al radar y a la lista visual
    pingsRef.current.unshift(newPing);
    if (pingsRef.current.length > 18) {
      pingsRef.current.pop();
    }

    setRecentPings([...pingsRef.current.slice(0, 5)]);

    // Emitir onda de choque expansiva en el radar
    shockwavesRef.current.push({
      radius: 5,
      maxRadius: 180,
      color: selectedEmoji.color,
      alpha: 1.0,
    });

    // Actualizar localStorage y disparar evento sincronizado
    try {
      const currentCount = getStoredTotalPings();
      const updated = currentCount + 1;
      localStorage.setItem('portfolio_radar_pings_count', updated.toString());
      window.dispatchEvent(new Event('radar:ping-added'));
    } catch {
      // Ignorar restricciones
    }

    setSentFeedback(true);
    setVisitorTag('');
    setTimeout(() => setSentFeedback(false), 2400);
  }, [selectedEmoji, visitorTag]);

  // Loop de renderizado del Radar Sonar en Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let scannerAngle = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxRadarRadius = Math.min(width, height) * 0.44;

      // 1. Dibujar círculos concéntricos de rango
      const rings = [0.25, 0.5, 0.75, 1.0];
      for (let i = 0; i < rings.length; i++) {
        const r = maxRadarRadius * rings[i];
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = i === rings.length - 1 ? 'rgba(34, 211, 238, 0.35)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = i === rings.length - 1 ? 1.5 : 0.8;
        ctx.stroke();

        // Etiquetas de distancia de radar
        if (i < rings.length - 1) {
          ctx.font = '500 9px var(--font-geist-mono), monospace';
          ctx.fillStyle = 'rgba(161, 161, 170, 0.4)';
          ctx.fillText(`${Math.round(rings[i] * 100)}%`, centerX + r + 4, centerY - 4);
        }
      }

      // 2. Líneas radiales de coordenadas (0°, 90°, 180°, 270°)
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadarRadius, centerY);
      ctx.lineTo(centerX + maxRadarRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadarRadius);
      ctx.lineTo(centerX, centerY + maxRadarRadius);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 3. Rotar y dibujar el haz de escáner del radar
      scannerAngle = (scannerAngle + 0.024) % (Math.PI * 2);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadarRadius, scannerAngle - 0.45, scannerAngle);
      ctx.closePath();

      // Gradiente cónico de persistencia tras el haz
      const scanGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadarRadius);
      scanGrad.addColorStop(0, 'rgba(45, 212, 191, 0.25)');
      scanGrad.addColorStop(1, 'rgba(45, 212, 191, 0.0)');
      ctx.fillStyle = scanGrad;
      ctx.fill();

      // Línea principal brillante del haz
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(scannerAngle) * maxRadarRadius,
        centerY + Math.sin(scannerAngle) * maxRadarRadius
      );
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // 4. Ondas de choque expansivas por nuevos pings
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 2.5;
        sw.alpha = 1 - sw.radius / sw.maxRadius;

        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha * 0.7;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // 5. Dibujar los Pings activos en el radar
      const pings = pingsRef.current;
      for (let i = 0; i < pings.length; i++) {
        const ping = pings[i];
        const r = ping.distance * maxRadarRadius;
        const px = centerX + Math.cos(ping.angle) * r;
        const py = centerY + Math.sin(ping.angle) * r;

        // Comprobar si el haz del radar acaba de barrer el ping
        let diff = (scannerAngle - ping.angle) % (Math.PI * 2);
        if (diff < 0) diff += Math.PI * 2;
        if (diff < 0.12) {
          ping.intensity = 1.0;
        } else {
          ping.intensity = Math.max(0.25, ping.intensity - 0.008);
        }

        // Halo de resplandor del ping
        ctx.beginPath();
        ctx.arc(px, py, 6 + ping.intensity * 6, 0, Math.PI * 2);
        ctx.fillStyle = ping.color;
        ctx.globalAlpha = ping.intensity * 0.45;
        ctx.fill();

        // Núcleo del punto de radar
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = Math.min(1.0, ping.intensity + 0.3);
        ctx.fill();

        // Emoji flotante miniatura sobre el blip
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(ping.emoji, px, py - 6);
        ctx.globalAlpha = 1.0;
      }

      // 6. Núcleo central del radar
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#22d3ee';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    handleResize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section id="radar" className="relative py-24 sm:py-32 border-t border-border overflow-hidden">
      {/* Luz ambiental sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-25 blur-3xl"
      >
        <div className="h-[420px] w-[650px] rounded-full bg-gradient-to-tr from-accent/20 via-cyan-500/10 to-emerald-500/10" />
      </div>

      <Container>
        {/* Encabezado */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-accent">
            <SparklesIcon className="size-3.5" />
            <span>{"// Conexión Global en Vivo"}</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Radar de Visitantes &amp; Muro de Pings
          </h2>

          <p className="mt-3 text-base text-muted sm:text-lg">
            Deja tu huella digital en tiempo real. Envía un pulso de energía para conectar con otros desarrolladores y reclutadores que han explorado este portafolio.
          </p>
        </div>

        {/* Cuadrícula de 2 columnas: Radar Sonar a la izquierda, Consola de interacción a la derecha */}
        <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Columna Izquierda: Radar Sonar Interactivo */}
          <div className="lg:col-span-7">
            <div className="floating-glass relative rounded-3xl border border-white/10 p-4 sm:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)]">
              {/* Barra de estado superior del radar */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-muted">
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span className="text-foreground/90 font-semibold">RADAR-LIVE</span>
                  <span className="text-muted/60">· 360° Sweep</span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-accent">
                  <span>{totalPings}</span>
                  <span className="text-muted/70">pings registrados</span>
                </div>
              </div>

              {/* Contenedor del Canvas Radar */}
              <div ref={containerRef} className="relative mt-4 aspect-square w-full max-h-[420px] mx-auto overflow-hidden rounded-2xl bg-black/40 border border-white/5">
                <canvas ref={canvasRef} className="block size-full" />
              </div>
            </div>
          </div>

          {/* Columna Derecha: Consola para Enviar Ping */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span>Enviar un Pulso de Energía</span>
                <span className="text-accent">⚡</span>
              </h3>

              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                Elige tu token y tu rol o ciudad para posicionar tu punto luminoso en el radar en vivo.
              </p>

              {/* Selector de Emojis / Tokens de Energía */}
              <div className="mt-4">
                <label className="block font-mono text-[11px] text-muted/70 uppercase tracking-wider mb-2">
                  Selecciona tu Token
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {EMOJI_OPTIONS.map((item) => {
                    const isSelected = selectedEmoji.label === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setSelectedEmoji(item)}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all ${
                          isSelected
                            ? 'border-accent bg-accent/10 shadow-[0_0_16px_rgba(45,212,191,0.25)] text-foreground'
                            : 'border-white/10 bg-white/[0.02] text-muted hover:border-white/20 hover:text-foreground'
                        }`}
                      >
                        <span className="text-lg">{item.emoji}</span>
                        <span className="text-xs font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Formulario con campo de rol o ciudad */}
              <form onSubmit={handleSendPing} className="mt-5 space-y-3">
                <div>
                  <label htmlFor="radar-tag" className="block font-mono text-[11px] text-muted/70 uppercase tracking-wider mb-1.5">
                    Tu Rol o Ciudad (opcional)
                  </label>
                  <input
                    id="radar-tag"
                    type="text"
                    value={visitorTag}
                    onChange={(e) => setVisitorTag(e.target.value)}
                    placeholder="Ej: Frontend Dev, Reclutador, Medellín..."
                    maxLength={24}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-xs text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full rounded-xl py-3 font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 ${
                    sentFeedback
                      ? 'bg-emerald-500 text-black shadow-[0_0_24px_rgba(52,211,153,0.5)]'
                      : 'bg-accent text-black hover:bg-accent/90 hover:shadow-[0_0_24px_rgba(45,212,191,0.4)]'
                  }`}
                >
                  {sentFeedback ? (
                    <>
                      <span>¡Pulso emitido al radar!</span>
                      <span>✨</span>
                    </>
                  ) : (
                    <>
                      <span>{selectedEmoji.emoji}</span>
                      <span>Emitir Ping al Radar ({selectedEmoji.label})</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Actividad reciente en vivo */}
            <div className="rounded-2xl border border-white/5 bg-black/30 p-4">
              <span className="block font-mono text-[11px] uppercase tracking-wider text-muted/70 mb-2">
                Últimas conexiones en el radar
              </span>
              <div className="space-y-2">
                {recentPings.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-white/[0.03] last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.emoji}</span>
                      <span className="font-medium text-foreground/90">{item.tag}</span>
                      <span className="text-[10px] text-muted/60">({item.label})</span>
                    </div>
                    <span className="font-mono text-[10px] text-accent/80">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
