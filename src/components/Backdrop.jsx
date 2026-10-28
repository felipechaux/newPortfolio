import dmShot from '../assets/dadomatch-store/shot5.webp';
import gsShot from '../assets/galaxysnap-screenshots/shot1.webp';

/* ─── Dot grid + soft glows (pure CSS, no image weight) ──────── */
export const GridGlow = ({ className = '' }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <div className="dot-grid absolute inset-0" />
    <div className="absolute -top-32 left-[10%] h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[140px]" />
    <div className="absolute bottom-[-120px] right-[5%] h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-[140px]" />
  </div>
);

/* ─── Neural network motif (nods to the AI work) ─────────────── */
const LAYERS = [
  { x: 40, n: 4 },
  { x: 190, n: 6 },
  { x: 340, n: 6 },
  { x: 490, n: 3 },
];
const H = 420;
const nodes = LAYERS.map(({ x, n }) =>
  Array.from({ length: n }, (_, i) => ({ x, y: ((i + 1) * H) / (n + 1) }))
);
const edges = nodes.slice(0, -1).flatMap((layer, l) =>
  layer.flatMap((a) => nodes[l + 1].map((b) => ({ a, b })))
);

export const NeuralNet = ({ className = '' }) => (
  <svg
    viewBox={`0 0 530 ${H}`}
    aria-hidden="true"
    className={`pointer-events-none ${className}`}>
    <defs>
      <linearGradient id="nn-edge" x1="0" x2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    {edges.map(({ a, b }, i) => (
      <line
        key={i}
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke="url(#nn-edge)"
        strokeWidth="1"
        strokeOpacity="0.18"
      />
    ))}
    {nodes.flat().map((p, i) => (
      <circle
        key={i}
        cx={p.x}
        cy={p.y}
        r={i % 5 === 0 ? 5 : 3.5}
        fill={i % 5 === 0 ? '#a78bfa' : '#1e1b4b'}
        stroke="#a78bfa"
        strokeOpacity="0.6"
        className={i % 5 === 0 ? 'motion-safe:animate-pulse' : ''}
      />
    ))}
  </svg>
);

/* ─── Hero: own apps as tilted devices (desktop only) ────────── */
export const HeroShowcase = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[4%] hidden xl:flex items-center pt-16">
    <div className="relative h-[520px] w-[400px]">
      <NeuralNet className="absolute -left-24 top-1/2 w-[520px] -translate-y-1/2 opacity-70" />
      <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[100px]" />
      <img
        src={gsShot}
        alt=""
        className="absolute left-0 top-10 w-[210px] -rotate-6 rounded-[26px] opacity-80 shadow-2xl ring-1 ring-white/10"
      />
      <img
        src={dmShot}
        alt=""
        className="absolute right-0 top-0 w-[220px] rotate-[5deg] rounded-[26px] shadow-[0_30px_80px_-20px_rgba(124,58,237,0.6)] ring-1 ring-white/15"
      />
    </div>
  </div>
);
