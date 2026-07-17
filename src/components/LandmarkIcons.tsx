import type { LandmarkIcon } from "../lib/route-map-data";

// 扁平風 landmark icon，全部以原點為中心繪製，直接放在路線節點座標上。
// 一律自繪，不重製參考圖的任何素材、浮水印或品牌。

const HALO = { stroke: "#fffdf7", strokeWidth: 1.3, strokeLinejoin: "round" as const };

function Trailhead() {
  return (
    <g {...HALO}>
      <path d="M0 10 C -7 2 -10 -2 -10 -7 A 10 10 0 1 1 10 -7 C 10 -2 7 2 0 10 Z" fill="#d94a3d" />
      <circle cy={-7} r={3.8} fill="#fffdf7" stroke="none" />
    </g>
  );
}

function Junction() {
  return (
    <g {...HALO}>
      <rect x={-1.6} y={-13} width={3.2} height={23} rx={1.2} fill="#7b6a4f" />
      <path d="M1.6 -12 L13 -12 L16.5 -8.5 L13 -5 L1.6 -5 Z" fill="#249b58" />
      <path d="M-1.6 -3 L-13 -3 L-16.5 0.5 L-13 4 L-1.6 4 Z" fill="#1687d5" />
    </g>
  );
}

function Hut() {
  return (
    <g {...HALO}>
      <path d="M-11 1 L0 -10 L11 1 Z" fill="#a86a33" />
      <rect x={-8} y={0} width={16} height={10} rx={1.5} fill="#d08c46" />
      <rect x={-2.5} y={3.5} width={5} height={6.5} rx={0.8} fill="#75461d" />
    </g>
  );
}

function Lodge() {
  return (
    <g {...HALO}>
      <path d="M-14 1 L0 -12 L14 1 Z" fill="#a86a33" />
      <rect x={-10.5} y={0} width={21} height={12} rx={1.6} fill="#d08c46" />
      <rect x={-3} y={4} width={6} height={8} rx={0.8} fill="#75461d" />
      <rect x={-8} y={3} width={4} height={4} rx={0.6} fill="#f6e3c2" />
      <rect x={4} y={3} width={4} height={4} rx={0.6} fill="#f6e3c2" />
    </g>
  );
}

function Cliff() {
  return (
    <g {...HALO}>
      <path d="M-12 9 L-3 -8 L4 3 L9 -4 L13 9 Z" fill="#8b7d92" />
      <circle cx={-1} cy={6} r={2.1} fill="#5f5468" stroke="none" />
      <circle cx={5} cy={8.5} r={1.5} fill="#5f5468" stroke="none" />
      <circle cx={-6} cy={9} r={1.2} fill="#5f5468" stroke="none" />
    </g>
  );
}

function Milestone() {
  return (
    <g {...HALO}>
      <rect x={-1.8} y={-4} width={3.6} height={13} rx={1} fill="#2f3a34" />
      <rect x={-5.5} y={-10} width={11} height={7} rx={1.6} fill="#2f3a34" />
    </g>
  );
}

function Kiln() {
  return (
    <g {...HALO}>
      <path d="M-10 8 A 10 9.5 0 0 1 10 8 Z" fill="#6b5545" />
      <rect x={4.5} y={-10} width={3.4} height={6} rx={1} fill="#6b5545" />
      <rect x={-3} y={2} width={6} height={6} rx={1} fill="#33281f" stroke="none" />
    </g>
  );
}

function Lake() {
  return (
    <g {...HALO}>
      <ellipse rx={12} ry={7.5} fill="#5cc4f2" />
      <path d="M-5 -1 q 2.5 -2 5 0 t 5 0" fill="none" stroke="#fffdf7" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M-6 3 q 2.5 -2 5 0 t 5 0" fill="none" stroke="#fffdf7" strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

function Peak() {
  return (
    <g {...HALO}>
      <path d="M-14 9 L-5 -7 L0 0.5 L5 -9 L14 9 Z" fill="#b3241f" />
      <path d="M-5 -7 L-1.6 -1.3 L-8.4 -1.3 Z" fill="#fffdf7" stroke="none" />
      <path d="M5 -9 L8.6 -2.5 L1.4 -2.5 Z" fill="#fffdf7" stroke="none" />
    </g>
  );
}

function Monument() {
  return (
    <g {...HALO}>
      <rect x={-3.4} y={-12} width={6.8} height={20} fill="#a8a017" />
      <rect x={-2.2} y={-15} width={4.4} height={3.4} rx={1} fill="#a8a017" />
      <rect x={-6} y={7} width={12} height={4.5} rx={1.2} fill="#8a8312" />
    </g>
  );
}

const ICONS: Record<LandmarkIcon, () => React.ReactElement> = {
  trailhead: Trailhead,
  junction: Junction,
  hut: Hut,
  lodge: Lodge,
  cliff: Cliff,
  milestone: Milestone,
  kiln: Kiln,
  lake: Lake,
  peak: Peak,
  monument: Monument,
};

export function Landmark({ kind }: { kind: LandmarkIcon }) {
  const Icon = ICONS[kind];
  return <Icon />;
}
