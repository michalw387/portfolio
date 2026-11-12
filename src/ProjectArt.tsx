import type { Project } from './content'

// Generowane podglądy projektów (SVG) — do czasu dodania prawdziwych zrzutów ekranu.
// Aby użyć zrzutu: podmień <ProjectArt> na <img> w komponencie ProjectCard.

const hues: Record<Project['art'], [number, number]> = {
  eeg: [190, 265],
  summon: [150, 190],
  home: [35, 330],
  face: [265, 320],
  queens: [200, 150],
  mlp: [320, 265],
}

function Eeg({ g }: { g: string }) {
  const rows = [0, 1, 2, 3, 4]
  return (
    <>
      {rows.map((r) => {
        const pts = Array.from({ length: 81 }, (_, i) => {
          const x = i * 5
          const y =
            40 + r * 30 + Math.sin(i * 0.35 + r * 2) * 7 + Math.sin(i * 1.3 + r) * 4 * (i > 30 && i < 55 ? 2.4 : 1)
          return `${x},${y.toFixed(1)}`
        }).join(' ')
        return <polyline key={r} points={pts} fill="none" stroke={g} strokeWidth="1.6" opacity={0.9 - r * 0.12} />
      })}
    </>
  )
}

function Summon({ g }: { g: string }) {
  const pins = [
    [150, 80],
    [230, 60],
    [260, 130],
    [175, 150],
    [120, 120],
  ]
  return (
    <>
      {[30, 60, 90].map((r) => (
        <circle key={r} cx="200" cy="105" r={r} fill="none" stroke={g} strokeWidth="1" opacity="0.45" />
      ))}
      <path d="M200 105 L270 48" stroke={g} strokeWidth="1.5" />
      <path d="M200 97 l7 14 h-14z" fill="#fff" opacity="0.9" />
      {pins.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill={g} />
          <circle cx={x} cy={y} r="10" fill="none" stroke={g} opacity="0.5" />
        </g>
      ))}
      {['F', 'G', 'H'].map((k, i) => (
        <g key={k} transform={`translate(${20 + i * 34} 168)`}>
          <rect width="28" height="24" rx="5" fill="rgb(255 255 255 / 0.06)" stroke="rgb(255 255 255 / 0.25)" />
          <text x="14" y="17" textAnchor="middle" fontSize="12" fill="#fff" fontFamily="monospace">
            {k}
          </text>
        </g>
      ))}
    </>
  )
}

function Home({ g }: { g: string }) {
  const bars = [52, 71, 38, 87, 64, 45, 93, 58]
  return (
    <>
      {bars.map((v, i) => (
        <rect
          key={i}
          x={40 + i * 28}
          y={170 - v * 1.2}
          width="16"
          height={v * 1.2}
          rx="4"
          fill={g}
          opacity={v > 80 ? 1 : 0.35}
        />
      ))}
      <g transform="translate(290 50)">
        <circle cx="40" cy="40" r="34" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke={g}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="213.6"
          strokeDashoffset="15"
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="47" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="monospace">
          93
        </text>
      </g>
    </>
  )
}

function Face({ g }: { g: string }) {
  const dots: [number, number][] = []
  for (let i = 0; i < 17; i++) {
    const a = Math.PI * (i / 16)
    dots.push([200 - Math.cos(a) * 62, 95 + Math.sin(a) * 78])
  }
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) dots.push([200 + side * (18 + i * 9), 62 - Math.sin((i / 4) * Math.PI) * 6])
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      dots.push([200 + side * 32 + Math.cos(a) * 11, 82 + Math.sin(a) * 5])
    }
  }
  for (let i = 0; i < 4; i++) dots.push([200, 84 + i * 9])
  for (let i = 0; i < 5; i++) dots.push([184 + i * 8, 122 - Math.sin((i / 4) * Math.PI) * 3])
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    dots.push([200 + Math.cos(a) * 24, 146 + Math.sin(a) * 8])
  }
  return (
    <>
      <rect x="120" y="14" width="160" height="176" rx="10" fill="none" stroke={g} strokeDasharray="6 6" opacity="0.6" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill={g} />
      ))}
    </>
  )
}

function Queens({ g }: { g: string }) {
  // izometryczna kostka 4×4×4 z „hetmanami"
  const iso = (x: number, y: number, z: number): [number, number] => [200 + (x - y) * 22, 150 + (x + y) * 11 - z * 26]
  const lines: [number, number, number, number][] = []
  for (let z = 0; z <= 4; z++)
    for (let i = 0; i <= 4; i++) {
      lines.push([...iso(i, 0, z), ...iso(i, 4, z)], [...iso(0, i, z), ...iso(4, i, z)])
    }
  const queens = [
    [0.5, 1.5, 0.5],
    [2.5, 0.5, 1.5],
    [3.5, 2.5, 2.5],
    [1.5, 3.5, 3.5],
  ]
  return (
    <>
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={g} strokeWidth="0.8" opacity="0.35" />
      ))}
      {queens.map(([x, y, z], i) => {
        const [cx, cy] = iso(x, y, z)
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="12" fill={g} opacity="0.25" />
            <circle cx={cx} cy={cy} r="6" fill="#fff" />
          </g>
        )
      })}
    </>
  )
}

function Mlp({ g }: { g: string }) {
  const layers = [4, 6, 6, 3]
  const pos = layers.map((n, l) => Array.from({ length: n }, (_, i) => [80 + l * 80, 105 + (i - (n - 1) / 2) * 28]))
  return (
    <>
      {pos.slice(0, -1).flatMap((layer, l) =>
        layer.flatMap(([x1, y1], i) =>
          pos[l + 1].map(([x2, y2], j) => (
            <line
              key={`${l}-${i}-${j}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={g}
              strokeWidth="0.8"
              opacity={(i * 7 + j * 3 + l) % 5 === 0 ? 0.9 : 0.18}
            />
          )),
        ),
      )}
      {pos.flat().map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6.5" fill="#0b0d14" stroke={g} strokeWidth="2" />
      ))}
      <text x="352" y="118" fontSize="38" fontWeight="700" fill={g} fontFamily="monospace">
        7
      </text>
    </>
  )
}

const arts = { eeg: Eeg, summon: Summon, home: Home, face: Face, queens: Queens, mlp: Mlp }

export default function ProjectArt({ art }: { art: Project['art'] }) {
  const [h1, h2] = hues[art]
  const Art = arts[art]
  return (
    <svg
      viewBox="0 0 400 210"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
      style={{
        background: `radial-gradient(circle at 30% 20%, hsl(${h1} 80% 50% / 0.22), transparent 60%), radial-gradient(circle at 80% 90%, hsl(${h2} 80% 55% / 0.22), transparent 60%), #0b0d14`,
      }}
    >
      <defs>
        <linearGradient id={`g-${art}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="210">
          <stop offset="0" stopColor={`hsl(${h1} 90% 65%)`} />
          <stop offset="1" stopColor={`hsl(${h2} 90% 68%)`} />
        </linearGradient>
      </defs>
      <Art g={`url(#g-${art})`} />
    </svg>
  )
}
