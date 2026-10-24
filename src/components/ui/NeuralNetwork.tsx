'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';

// ============================================================================
// Tipos y Modelos para el Cerebro 3D y Conexión de Ideas
// ============================================================================

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface BrainNode extends Point3D {
  baseRadius: number;
  color: string;
  glowColor: string;
  isHub: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  isIdea?: boolean;
  ideaId?: string;
  // Propiedades proyectadas a 2D en cada frame
  projX: number;
  projY: number;
  projScale: number;
  projAlpha: number;
}

interface IdeaDefinition {
  id: string;
  title: string;
  pos: Point3D;
  color: string;
  glowColor: string;
  connectsTo: string[];
}

interface SynapticThought {
  fromNodeIdx: number;
  toNodeIdx: number;
  progress: number;
  speed: number;
  color: string;
}

export interface NeuralNetworkProps {
  className?: string;
  variant?: 'hero' | 'global';
  interactive?: boolean;
}

// ============================================================================
// Ideas Estratégicas Base
// ============================================================================
const DEFAULT_BRAIN_IDEAS: IdeaDefinition[] = [
  {
    id: 'arquitectura',
    title: 'Clean Architecture',
    pos: { x: 0.0, y: -0.68, z: 0.1 },
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.85)',
    connectsTo: ['backend', 'frontend', 'cloud'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    pos: { x: -0.48, y: -0.15, z: 0.32 },
    color: '#22d3ee',
    glowColor: 'rgba(34, 211, 238, 0.85)',
    connectsTo: ['database', 'ai', 'arquitectura'],
  },
  {
    id: 'frontend',
    title: 'Frontend & UI/UX',
    pos: { x: 0.48, y: -0.15, z: 0.32 },
    color: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.85)',
    connectsTo: ['mobile', 'creativity', 'arquitectura'],
  },
  {
    id: 'database',
    title: 'Bases de Datos',
    pos: { x: -0.58, y: 0.22, z: -0.15 },
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.85)',
    connectsTo: ['backend', 'cloud'],
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    pos: { x: 0.58, y: 0.22, z: -0.15 },
    color: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.85)',
    connectsTo: ['frontend', 'cloud'],
  },
  {
    id: 'ai',
    title: 'IA & Algoritmos',
    pos: { x: -0.32, y: -0.45, z: 0.46 },
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.85)',
    connectsTo: ['creativity', 'backend'],
  },
  {
    id: 'creativity',
    title: 'Innovación & Diseño',
    pos: { x: 0.32, y: -0.45, z: 0.46 },
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.85)',
    connectsTo: ['ai', 'frontend'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    pos: { x: 0.0, y: 0.52, z: -0.32 },
    color: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.85)',
    connectsTo: ['arquitectura', 'database', 'mobile'],
  },
];

const IDEA_PALETTE = [
  { color: '#22d3ee', glow: 'rgba(34, 211, 238, 0.85)' },
  { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.85)' },
  { color: '#34d399', glow: 'rgba(52, 211, 153, 0.85)' },
  { color: '#f472b6', glow: 'rgba(244, 114, 182, 0.85)' },
  { color: '#c084fc', glow: 'rgba(192, 132, 252, 0.85)' },
  { color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.85)' },
  { color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.85)' },
];

const QUICK_SUGGESTIONS = ['GraphQL', 'Docker', 'Microservicios', 'WebSockets', 'Next.js 16'];

// Generar posición 3D armónica en la corteza cerebral para una nueva idea
function getNewIdeaPosition(seed: number): Point3D {
  const side = seed % 2 === 0 ? 1 : -1;
  const theta = 0.3 * Math.PI + (((seed * 73) % 100) / 100) * 0.45 * Math.PI;
  const phiBase = (((seed * 37) % 100) / 100) * 0.7 * Math.PI;
  const phi = side === -1 ? 0.65 * Math.PI + phiBase : -0.35 * Math.PI + phiBase;

  const rx = 0.44;
  const ry = 0.54;
  const rz = 0.64;
  const foldWarp = 1 + 0.08 * Math.sin(5 * theta) * Math.cos(6 * phi);

  return {
    x: side * (0.16 + Math.sin(theta) * Math.sin(phi) * rx * foldWarp),
    y: -0.08 + Math.cos(theta) * ry * foldWarp,
    z: Math.sin(theta) * Math.cos(phi) * rz * foldWarp,
  };
}

// Generar la nube de puntos 3D base
function generateBrainPoints(initialIdeas: IdeaDefinition[]): BrainNode[] {
  const nodes: BrainNode[] = [];

  // 1. Nodos de ideas maestros
  initialIdeas.forEach((idea) => {
    nodes.push({
      x: idea.pos.x,
      y: idea.pos.y,
      z: idea.pos.z,
      baseRadius: 4.8,
      color: idea.color,
      glowColor: idea.glowColor,
      isHub: true,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.04,
      isIdea: true,
      ideaId: idea.id,
      projX: 0,
      projY: 0,
      projScale: 1,
      projAlpha: 1,
    });
  });

  // 2. Corteza cerebral
  const cortexCount = 95;
  for (let i = 0; i < cortexCount; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const theta = 0.25 * Math.PI + Math.random() * 0.65 * Math.PI;
    const phiRange = 0.85 * Math.PI;
    const phi = side === -1
      ? 0.55 * Math.PI + Math.random() * phiRange
      : -0.45 * Math.PI + Math.random() * phiRange;

    const rx = 0.44;
    const ry = 0.54;
    const rz = 0.64;

    const foldWarp =
      1 +
      0.08 * Math.sin(5 * theta) * Math.cos(6 * phi) +
      0.05 * Math.cos(9 * theta);

    const xBase = side * (0.16 + Math.sin(theta) * Math.sin(phi) * rx * foldWarp);
    const yBase = -0.08 + Math.cos(theta) * ry * foldWarp;
    const zBase = Math.sin(theta) * Math.cos(phi) * rz * foldWarp;

    const depth = Math.random() < 0.22 ? 0.75 + Math.random() * 0.18 : 0.95 + Math.random() * 0.08;
    const isHub = Math.random() < 0.10;

    nodes.push({
      x: xBase * depth,
      y: yBase * depth,
      z: zBase * depth,
      baseRadius: isHub ? 2.8 : Math.random() * 1.3 + 1.3,
      color: side === -1 ? '#22d3ee' : '#34d399',
      glowColor: side === -1 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(52, 211, 153, 0.4)',
      isHub,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.02,
      projX: 0,
      projY: 0,
      projScale: 1,
      projAlpha: 1,
    });
  }

  // 3. Cuerpo calloso (puente sináptico central)
  const callosumCount = 18;
  for (let i = 0; i < callosumCount; i++) {
    const t = (i / callosumCount) * 2 - 1;
    nodes.push({
      x: t * 0.18,
      y: -0.05 + Math.sin((i / callosumCount) * Math.PI) * -0.12 + (Math.random() - 0.5) * 0.06,
      z: (Math.random() - 0.5) * 0.35,
      baseRadius: 2.2,
      color: '#c084fc',
      glowColor: 'rgba(192, 132, 252, 0.5)',
      isHub: i % 4 === 0,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.03,
      projX: 0,
      projY: 0,
      projScale: 1,
      projAlpha: 1,
    });
  }

  // 4. Cerebelo
  const cerebellumCount = 16;
  for (let i = 0; i < cerebellumCount; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    nodes.push({
      x: side * (0.2 + Math.random() * 0.18),
      y: 0.38 + Math.random() * 0.20,
      z: -0.32 - Math.random() * 0.22,
      baseRadius: Math.random() * 1.4 + 1.4,
      color: '#2dd4bf',
      glowColor: 'rgba(45, 212, 191, 0.45)',
      isHub: false,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.025,
      projX: 0,
      projY: 0,
      projScale: 1,
      projAlpha: 1,
    });
  }

  // 5. Tallo cerebral
  const stemCount = 8;
  for (let i = 0; i < stemCount; i++) {
    nodes.push({
      x: (Math.random() - 0.5) * 0.10,
      y: 0.45 + (i / stemCount) * 0.32,
      z: -0.12 + (Math.random() - 0.5) * 0.08,
      baseRadius: 1.8,
      color: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      isHub: false,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02,
      projX: 0,
      projY: 0,
      projScale: 1,
      projAlpha: 1,
    });
  }

  return nodes;
}

function subscribeToStorage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('brain:ideas-updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('brain:ideas-updated', callback);
  };
}

function getStoredCustomIdeasCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const saved = localStorage.getItem('portfolio_brain_user_ideas');
    if (saved) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.length : 0;
    }
  } catch {
    // Ignorar restricciones de storage
  }
  return 0;
}

function getServerCustomIdeasCount(): number {
  return 0;
}

export function NeuralNetwork({
  className = '',
  variant = 'hero',
  interactive = true,
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ideas actuales sincronizadas de forma segura sin mismatch de hidratación SSR
  const userIdeasCount = useSyncExternalStore(
    subscribeToStorage,
    getStoredCustomIdeasCount,
    getServerCustomIdeasCount
  );
  const [inputValue, setInputValue] = useState('');
  const [justConnected, setJustConnected] = useState(false);

  // Referencias a los datos de simulación en vivo
  const ideasListRef = useRef<IdeaDefinition[]>([...DEFAULT_BRAIN_IDEAS]);
  const brainNodesRef = useRef<BrainNode[]>([]);
  const connectionsRef = useRef<[number, number, number][]>([]);
  const thoughtsRef = useRef<SynapticThought[]>([]);
  const activeIdeaRef = useRef<string | null>(null);

  const mouseStateRef = useRef({
    x: -9999,
    y: -9999,
    active: false,
    rotX: 0.08,
    rotY: -0.25,
    targetRotX: 0.08,
    targetRotY: -0.25,
  });

  // Función para inyectar una nueva idea al cerebro 3D
  const addIdeaToBrain = useCallback((title: string) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    // Evitar duplicados exactos
    if (ideasListRef.current.some((i) => i.title.toLowerCase() === cleanTitle.toLowerCase())) {
      const existing = ideasListRef.current.find((i) => i.title.toLowerCase() === cleanTitle.toLowerCase());
      if (existing) {
        activeIdeaRef.current = existing.id;
      }
      return;
    }

    const currentIdeasCount = ideasListRef.current.length;
    const palette = IDEA_PALETTE[currentIdeasCount % IDEA_PALETTE.length];
    const newPos = getNewIdeaPosition(currentIdeasCount + 5);

    const newIdea: IdeaDefinition = {
      id: `idea_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: cleanTitle.length > 22 ? cleanTitle.substring(0, 22) : cleanTitle,
      pos: newPos,
      color: palette.color,
      glowColor: palette.glow,
      connectsTo: [],
    };

    ideasListRef.current.push(newIdea);

    const nodes = brainNodesRef.current;
    const connections = connectionsRef.current;
    const thoughts = thoughtsRef.current;

    // Crear el nuevo nodo en el cerebro
    const newNode: BrainNode = {
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      baseRadius: 5.2,
      color: palette.color,
      glowColor: palette.glow,
      isHub: true,
      pulsePhase: 0,
      pulseSpeed: 0.05,
      isIdea: true,
      ideaId: newIdea.id,
      projX: 0,
      projY: 0,
      projScale: 1,
      projAlpha: 1,
    };

    nodes.push(newNode);
    const newNodeIdx = nodes.length - 1;

    // Enlazar con los 3 nodos más cercanos en el espacio 3D
    const distances: { idx: number; dist: number }[] = [];
    for (let i = 0; i < newNodeIdx; i++) {
      const dx = nodes[i].x - newNode.x;
      const dy = nodes[i].y - newNode.y;
      const dz = nodes[i].z - newNode.z;
      distances.push({ idx: i, dist: Math.sqrt(dx * dx + dy * dy + dz * dz) });
    }
    distances.sort((a, b) => a.dist - b.dist);

    const nearest = distances.slice(0, 3);
    nearest.forEach(({ idx, dist }) => {
      connections.push([newNodeIdx, idx, dist]);

      // Enviar de inmediato ráfagas de impulsos hacia la nueva idea
      for (let p = 0; p < 2; p++) {
        thoughts.push({
          fromNodeIdx: idx,
          toNodeIdx: newNodeIdx,
          progress: p * 0.4,
          speed: 0.026,
          color: palette.color,
        });
      }
    });

    // Destacar la nueva idea
    activeIdeaRef.current = newIdea.id;
    setJustConnected(true);
    setTimeout(() => setJustConnected(false), 2000);

    // Guardar en localStorage
    try {
      const customOnes = ideasListRef.current.filter(
        (i) => !DEFAULT_BRAIN_IDEAS.some((di) => di.id === i.id)
      );
      localStorage.setItem('portfolio_brain_user_ideas', JSON.stringify(customOnes));
      window.dispatchEvent(new Event('brain:ideas-updated'));
    } catch {
      // Ignorar restricciones de storage si las hay
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    if (clientX >= -80 && clientX <= rect.width + 80 && clientY >= -80 && clientY <= rect.height + 80) {
      mouseStateRef.current.x = clientX;
      mouseStateRef.current.y = clientY;
      mouseStateRef.current.active = true;

      const normX = (clientX / rect.width) * 2 - 1;
      const normY = (clientY / rect.height) * 2 - 1;
      mouseStateRef.current.targetRotY = normX * 0.65;
      mouseStateRef.current.targetRotX = -normY * 0.45 + 0.08;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseStateRef.current.active = false;
    mouseStateRef.current.targetRotX = 0.08;
  }, []);

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

    const isHero = variant === 'hero';

    // Sincronizar ideas guardadas en localStorage al inicializar en el cliente
    if (isHero) {
      try {
        const saved = localStorage.getItem('portfolio_brain_user_ideas');
        if (saved) {
          const parsed: IdeaDefinition[] = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            parsed.forEach((customIdea) => {
              if (!ideasListRef.current.some((i) => i.title.toLowerCase() === customIdea.title.toLowerCase())) {
                ideasListRef.current.push(customIdea);
              }
            });
          }
        }
      } catch {
        // Ignorar
      }
    }

    // Inicializar nodos anatómicos del cerebro (incluye ideas base + añadidas)
    brainNodesRef.current = isHero ? generateBrainPoints(ideasListRef.current) : [];
    const brainNodes = brainNodesRef.current;
    const thoughts = thoughtsRef.current;

    // Precalcular conexiones 3D anatómicas iniciales
    connectionsRef.current = [];
    const connections = connectionsRef.current;

    if (isHero) {
      const maxConnDist = 0.35;
      for (let i = 0; i < brainNodes.length; i++) {
        for (let j = i + 1; j < brainNodes.length; j++) {
          const dx = brainNodes[i].x - brainNodes[j].x;
          const dy = brainNodes[i].y - brainNodes[j].y;
          const dz = brainNodes[i].z - brainNodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxConnDist) {
            connections.push([i, j, dist]);
          }
        }
      }

      // Enlaces explícitos entre ideas
      ideasListRef.current.forEach((idea, ideaIdx) => {
        idea.connectsTo.forEach((targetId) => {
          const targetIdx = ideasListRef.current.findIndex((bi) => bi.id === targetId);
          if (targetIdx !== -1 && targetIdx > ideaIdx) {
            connections.push([ideaIdx, targetIdx, 0.5]);
          }
        });
      });
    }

    // Partículas globales para el resto de la página
    const globalParticles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    if (!isHero) {
      const count = 38;
      for (let i = 0; i < count; i++) {
        globalParticles.push({
          x: Math.random() * 1000,
          y: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.4 + 1.0,
          color: i % 2 === 0 ? 'rgba(34, 211, 238, 0.35)' : 'rgba(52, 211, 153, 0.35)',
        });
      }
    }

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

    const triggerThought = () => {
      const currentConns = connectionsRef.current;
      const currentNodes = brainNodesRef.current;
      if (currentConns.length === 0 || thoughts.length > 22) return;

      const conn = currentConns[Math.floor(Math.random() * currentConns.length)];
      if (!conn) return;

      const [from, to] = Math.random() < 0.5 ? [conn[0], conn[1]] : [conn[1], conn[0]];
      if (!currentNodes[from]) return;

      thoughts.push({
        fromNodeIdx: from,
        toNodeIdx: to,
        progress: 0,
        speed: Math.random() * 0.022 + 0.016,
        color: currentNodes[from].color,
      });
    };

    let lastThoughtTime = 0;
    let autoRotY = -0.25;

    // Render loop ultra-fluido a 60 FPS
    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // MODO GLOBAL
      if (!isHero) {
        ctx.lineWidth = 0.8;
        for (let i = 0; i < globalParticles.length; i++) {
          const p = globalParticles[i];
          p.x = (p.x + p.vx + width) % width;
          p.y = (p.y + p.vy + height) % height;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          for (let j = i + 1; j < globalParticles.length; j++) {
            const p2 = globalParticles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 110) * 0.16})`;
              ctx.stroke();
            }
          }
        }
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // MODO HERO: CEREBRO DIGITAL 3D
      if (currentTime - lastThoughtTime > 220) {
        triggerThought();
        if (Math.random() < 0.35) triggerThought();
        lastThoughtTime = currentTime;
      }

      autoRotY += 0.0035;
      const targetRotY = mouseStateRef.current.active
        ? autoRotY + mouseStateRef.current.targetRotY
        : autoRotY;
      const targetRotX = mouseStateRef.current.targetRotX;

      mouseStateRef.current.rotY += (targetRotY - mouseStateRef.current.rotY) * 0.045;
      mouseStateRef.current.rotX += (targetRotX - mouseStateRef.current.rotX) * 0.045;

      const cosY = Math.cos(mouseStateRef.current.rotY);
      const sinY = Math.sin(mouseStateRef.current.rotY);
      const cosX = Math.cos(mouseStateRef.current.rotX);
      const sinX = Math.sin(mouseStateRef.current.rotX);

      const isDesktop = width >= 1024;
      const brainCenterX = isDesktop ? width * 0.72 : width * 0.5;
      const brainCenterY = isDesktop ? height * 0.48 : height * 0.42;
      const brainRadius = Math.min(width * 0.32, height * 0.48, 360);
      const fov = 850;

      const currentNodes = brainNodesRef.current;
      const currentConns = connectionsRef.current;
      let hoveredIdea: string | null = null;

      // 1. Proyección 3D
      for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];

        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        const scale = fov / (fov + z2 * brainRadius);
        node.projX = brainCenterX + x1 * brainRadius * scale;
        node.projY = brainCenterY + y2 * brainRadius * scale;
        node.projScale = scale;

        const depthFactor = (z2 + 1) * 0.5;
        node.projAlpha = Math.max(0.22, Math.min(1.0, depthFactor * 0.85 + 0.2));
        node.pulsePhase += node.pulseSpeed;

        if (node.isIdea && mouseStateRef.current.active) {
          const mdx = mouseStateRef.current.x - node.projX;
          const mdy = mouseStateRef.current.y - node.projY;
          if (mdx * mdx + mdy * mdy < 1200) {
            hoveredIdea = node.ideaId || null;
          }
        }
      }

      if (hoveredIdea) {
        activeIdeaRef.current = hoveredIdea;
      }
      const activeIdea = activeIdeaRef.current;

      // 2. Trazado de sinapsis
      for (let c = 0; c < currentConns.length; c++) {
        const [idxA, idxB] = currentConns[c];
        const nA = currentNodes[idxA];
        const nB = currentNodes[idxB];
        if (!nA || !nB) continue;

        const avgAlpha = (nA.projAlpha + nB.projAlpha) * 0.5;
        const isIdeaLink = nA.isIdea && nB.isIdea;

        ctx.beginPath();
        ctx.moveTo(nA.projX, nA.projY);
        ctx.lineTo(nB.projX, nB.projY);

        if (isIdeaLink) {
          const isHighlighted = activeIdea && (nA.ideaId === activeIdea || nB.ideaId === activeIdea);
          ctx.strokeStyle = isHighlighted
            ? 'rgba(56, 189, 248, 0.95)'
            : `rgba(45, 212, 191, ${avgAlpha * 0.70})`;
          ctx.lineWidth = isHighlighted ? 2.2 : 1.3;
        } else {
          ctx.strokeStyle = `rgba(34, 211, 238, ${avgAlpha * 0.30})`;
          ctx.lineWidth = 0.85;
        }
        ctx.stroke();
      }

      // 3. Impulsos de pensamiento
      for (let i = thoughts.length - 1; i >= 0; i--) {
        const t = thoughts[i];
        const nFrom = currentNodes[t.fromNodeIdx];
        const nTo = currentNodes[t.toNodeIdx];

        if (!nFrom || !nTo) {
          thoughts.splice(i, 1);
          continue;
        }

        t.progress += t.speed;

        if (t.progress >= 1) {
          thoughts.splice(i, 1);
          continue;
        }

        const currX = nFrom.projX + (nTo.projX - nFrom.projX) * t.progress;
        const currY = nFrom.projY + (nTo.projY - nFrom.projY) * t.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 2.5 * nFrom.projScale, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // 4. Neuronas y núcleos
      for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];
        const r = node.baseRadius * node.projScale;

        if (node.isHub) {
          const pulseR = r * (1.6 + Math.sin(node.pulsePhase) * 0.3);

          ctx.beginPath();
          ctx.arc(node.projX, node.projY, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = node.glowColor;
          ctx.globalAlpha = node.projAlpha * 0.45;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.projX, node.projY, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.globalAlpha = node.projAlpha * 0.6;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.projX, node.projY, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.projAlpha;
        ctx.fill();

        if (node.isIdea) {
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, r * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // 5. Etiquetas de todas las ideas conectadas
      ctx.font = '600 11px var(--font-geist-sans), sans-serif';
      ctx.textBaseline = 'middle';

      const allIdeas = ideasListRef.current;
      for (let i = 0; i < allIdeas.length; i++) {
        const idea = allIdeas[i];
        const node = currentNodes[i];
        if (!node) continue;

        if (node.projAlpha > 0.42) {
          const isHovered = activeIdea === idea.id;
          const badgeScale = isHovered ? 1.05 : 1.0;
          const textWidth = ctx.measureText(idea.title).width;
          const badgeHeight = 20 * badgeScale;
          const badgeWidth = textWidth + 24;

          const badgeX = node.projX + 9;
          const badgeY = node.projY - badgeHeight * 0.5;

          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 5);
          ctx.fillStyle = isHovered ? 'rgba(15, 23, 42, 0.94)' : 'rgba(9, 9, 11, 0.82)';
          ctx.fill();

          ctx.strokeStyle = isHovered ? idea.color : `rgba(255, 255, 255, ${0.12 * node.projAlpha})`;
          ctx.lineWidth = isHovered ? 1.4 : 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(badgeX + 8, badgeY + badgeHeight * 0.5, 3, 0, Math.PI * 2);
          ctx.fillStyle = idea.color;
          ctx.fill();

          ctx.fillStyle = isHovered ? '#ffffff' : `rgba(240, 240, 245, ${node.projAlpha})`;
          ctx.fillText(idea.title, badgeX + 16, badgeY + badgeHeight * 0.5);
        }
      }

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

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave);

      const handleTouch = (e: TouchEvent) => {
        if (!e.touches[0] || !container) return;
        const rect = container.getBoundingClientRect();
        const clientX = e.touches[0].clientX - rect.left;
        const clientY = e.touches[0].clientY - rect.top;
        mouseStateRef.current.x = clientX;
        mouseStateRef.current.y = clientY;
        mouseStateRef.current.active = true;

        const normX = (clientX / rect.width) * 2 - 1;
        const normY = (clientY / rect.height) * 2 - 1;
        mouseStateRef.current.targetRotY = normX * 0.65;
        mouseStateRef.current.targetRotX = -normY * 0.45 + 0.08;
      };

      container.addEventListener('touchstart', handleTouch, { passive: true });
      container.addEventListener('touchmove', handleTouch, { passive: true });

      return () => {
        cancelAnimationFrame(animationFrameId);
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('touchstart', handleTouch);
        container.removeEventListener('touchmove', handleTouch);
      };
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [variant, interactive, handleMouseMove, handleMouseLeave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addIdeaToBrain(inputValue);
      setInputValue('');
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('portfolio_brain_user_ideas');
      ideasListRef.current = [...DEFAULT_BRAIN_IDEAS];
      brainNodesRef.current = generateBrainPoints(DEFAULT_BRAIN_IDEAS);
      window.dispatchEvent(new Event('brain:ideas-updated'));
    } catch {
      // Ignorar fallos
    }
  };

  const isHero = variant === 'hero';

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${
        isHero
          ? 'absolute inset-0 overflow-hidden select-none'
          : 'fixed inset-0 overflow-hidden select-none -z-10'
      } ${className}`}
      style={
        isHero
          ? {
              maskImage: 'radial-gradient(ellipse 95% 90% at 55% 45%, black 75%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 55% 45%, black 75%, transparent 100%)',
            }
          : undefined
      }
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block size-full" />

      {/* Consola interactiva para que los usuarios añadan ideas directamente al cerebro */}
      {isHero && (
        <div className="pointer-events-auto absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-30 w-[calc(100%-2rem)] max-w-[340px] sm:max-w-[360px]">
          <div
            className={`flex flex-col gap-2 rounded-2xl border bg-black/75 p-3 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.7)] transition-all ${
              justConnected
                ? 'border-accent shadow-[0_0_24px_rgba(45,212,191,0.4)]'
                : 'border-white/10 hover:border-accent/40'
            }`}
          >
            <div className="flex items-center justify-between gap-2 px-0.5">
              <span className="font-mono text-[11px] font-semibold text-accent flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent animate-pulse inline-block" />
                Conectar idea al cerebro
              </span>

              {userIdeasCount > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent">
                    +{userIdeasCount} {userIdeasCount === 1 ? 'añadida' : 'añadidas'}
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-mono text-[10px] text-muted hover:text-red-400 transition-colors"
                    title="Restablecer a ideas base"
                  >
                    (reiniciar)
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe una tecnología o concepto..."
                maxLength={22}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="shrink-0 rounded-xl bg-accent px-3 py-1.5 font-mono text-xs font-semibold text-black transition-all hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(45,212,191,0.4)]"
              >
                + Conectar
              </button>
            </form>

            {/* Sugerencias de ideas con 1 clic */}
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              <span className="font-mono text-[10px] text-muted/60 mr-0.5">Sugerencias:</span>
              {QUICK_SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => addIdeaToBrain(sug)}
                  className="rounded-md border border-white/5 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-muted/80 hover:border-accent/40 hover:text-accent transition-colors"
                >
                  +{sug}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
