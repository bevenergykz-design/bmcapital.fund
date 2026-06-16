export const BuildingsSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.6" stroke="currentColor" strokeWidth="1.5">
      <rect x="50" y="200" width="80" height="400" />
      <rect x="150" y="150" width="100" height="450" />
      <rect x="270" y="250" width="90" height="350" />
      <rect x="380" y="180" width="110" height="420" />
      <rect x="510" y="220" width="85" height="380" />
      <rect x="615" y="170" width="95" height="430" />
      {Array.from({ length: 20 }).map((_, i) => (
        <g key={i}>
          <rect x={60 + (i % 5) * 15} y={220 + Math.floor(i / 5) * 25} width="10" height="15" opacity="0.3" />
          <rect x={160 + (i % 5) * 18} y={170 + Math.floor(i / 5) * 30} width="12" height="18" opacity="0.3" />
        </g>
      ))}
    </g>
  </svg>
);

export const PeopleSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5" stroke="currentColor" strokeWidth="2">
      <ellipse cx="200" cy="200" rx="40" ry="50" />
      <line x1="200" y1="250" x2="200" y2="380" />
      <line x1="200" y1="280" x2="150" y2="340" />
      <line x1="200" y1="280" x2="250" y2="340" />
      <line x1="200" y1="380" x2="170" y2="450" />
      <line x1="200" y1="380" x2="230" y2="450" />

      <ellipse cx="450" cy="220" rx="35" ry="45" />
      <line x1="450" y1="265" x2="450" y2="380" />
      <line x1="450" y1="295" x2="410" y2="350" />
      <line x1="450" y1="295" x2="490" y2="350" />
      <line x1="450" y1="380" x2="425" y2="450" />
      <line x1="450" y1="380" x2="475" y2="450" />

      <ellipse cx="620" cy="210" rx="38" ry="48" />
      <line x1="620" y1="258" x2="620" y2="375" />
      <line x1="620" y1="288" x2="580" y2="345" />
      <line x1="620" y1="288" x2="660" y2="345" />
      <line x1="620" y1="375" x2="595" y2="450" />
      <line x1="620" y1="375" x2="645" y2="450" />
    </g>
  </svg>
);

export const GlassSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.4" stroke="currentColor" strokeWidth="1">
      <rect x="100" y="100" width="200" height="400" />
      <rect x="320" y="100" width="180" height="400" />
      <rect x="520" y="100" width="180" height="400" />
      <line x1="100" y1="200" x2="300" y2="200" opacity="0.3" />
      <line x1="100" y1="300" x2="300" y2="300" opacity="0.3" />
      <line x1="100" y1="400" x2="300" y2="400" opacity="0.3" />
      <line x1="200" y1="100" x2="200" y2="500" opacity="0.3" />
      <line x1="320" y1="200" x2="500" y2="200" opacity="0.3" />
      <line x1="320" y1="350" x2="500" y2="350" opacity="0.3" />
      <line x1="410" y1="100" x2="410" y2="500" opacity="0.3" />
      <line x1="520" y1="250" x2="700" y2="250" opacity="0.3" />
      <line x1="520" y1="400" x2="700" y2="400" opacity="0.3" />
      <line x1="610" y1="100" x2="610" y2="500" opacity="0.3" />
    </g>
  </svg>
);

export const SilhouettesSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.35" fill="currentColor">
      <circle cx="150" cy="180" r="45" opacity="0.2" />
      <path d="M105 225 L195 225 L195 400 L105 400 Z" opacity="0.15" />
      <circle cx="400" cy="200" r="50" opacity="0.2" />
      <path d="M350 250 L450 250 L450 420 L350 420 Z" opacity="0.15" />
      <circle cx="650" cy="190" r="48" opacity="0.2" />
      <path d="M602 238 L698 238 L698 410 L602 410 Z" opacity="0.15" />
    </g>
  </svg>
);

export const CitySVG = () => (
  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5" stroke="currentColor" strokeWidth="1.5">
      <rect x="30" y="300" width="70" height="300" />
      <rect x="120" y="250" width="90" height="350" />
      <rect x="230" y="200" width="80" height="400" />
      <rect x="330" y="280" width="100" height="320" />
      <rect x="450" y="220" width="75" height="380" />
      <rect x="545" y="260" width="95" height="340" />
      <rect x="660" y="240" width="110" height="360" />
      <polygon points="65,300 30,300 30,270 65,240 100,270 100,300" opacity="0.4" />
      <polygon points="275,200 230,200 230,165 275,130 310,165 310,200" opacity="0.4" />
      <polygon points="715,240 660,240 660,200 715,160 770,200 770,240" opacity="0.4" />
    </g>
  </svg>
);

export const GridSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.3" stroke="currentColor" strokeWidth="0.5">
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`h-${i}`} x1="0" y1={i * 30} x2="800" y2={i * 30} />
      ))}
      {Array.from({ length: 27 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="600" />
      ))}
      <path d="M100,100 L300,150 L500,120 L700,180" strokeWidth="2" opacity="0.6" />
      <path d="M150,400 L350,350 L550,380 L750,330" strokeWidth="2" opacity="0.6" />
      <circle cx="300" cy="150" r="5" fill="currentColor" />
      <circle cx="500" cy="120" r="5" fill="currentColor" />
      <circle cx="350" cy="350" r="5" fill="currentColor" />
      <circle cx="550" cy="380" r="5" fill="currentColor" />
    </g>
  </svg>
);

export const BlueprintSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.4" stroke="currentColor" strokeWidth="1">
      <rect x="150" y="150" width="500" height="300" />
      <line x1="150" y1="300" x2="650" y2="300" strokeDasharray="5,5" />
      <line x1="400" y1="150" x2="400" y2="450" strokeDasharray="5,5" />
      <rect x="200" y="200" width="150" height="80" opacity="0.5" />
      <rect x="450" y="200" width="150" height="80" opacity="0.5" />
      <rect x="200" y="350" width="150" height="80" opacity="0.5" />
      <rect x="450" y="350" width="150" height="80" opacity="0.5" />
      <line x1="100" y1="150" x2="150" y2="150" strokeWidth="2" />
      <line x1="100" y1="450" x2="150" y2="450" strokeWidth="2" />
      <line x1="100" y1="150" x2="100" y2="170" strokeWidth="2" />
      <line x1="100" y1="430" x2="100" y2="450" strokeWidth="2" />
      <text x="105" y="310" fontSize="14" opacity="0.6">300px</text>
    </g>
  </svg>
);

export const SkylineSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5" stroke="currentColor" strokeWidth="1.5" fill="none">
      <rect x="50" y="350" width="60" height="250" />
      <rect x="130" y="300" width="80" height="300" />
      <rect x="230" y="280" width="70" height="320" />
      <rect x="320" y="320" width="90" height="280" />
      <rect x="430" y="270" width="75" height="330" />
      <rect x="525" y="310" width="85" height="290" />
      <rect x="630" y="290" width="95" height="310" />
      <polygon points="80,350 50,350 50,330 80,310 110,330 110,350" />
      <polygon points="265,280 230,280 230,250 265,220 300,250 300,280" />
      <polygon points="677,290 630,290 630,255 677,220 725,255 725,290" />
      <line x1="0" y1="600" x2="800" y2="600" strokeWidth="3" />
    </g>
  </svg>
);
