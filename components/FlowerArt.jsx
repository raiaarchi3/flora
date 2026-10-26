// Draws a flower with SVG so the project has no image dependencies.
// Swap this for <Image src="/flowers/dahlia.png" /> if you have your own cut-out photos.
export default function FlowerArt({ flower, crop = false, className = "" }) {
  const { bloom, stem, id } = flower;
  const cx = 300;
  const cy = 280;
  const layers = [];

  for (let l = 0; l < bloom.layers; l++) {
    const t = l / Math.max(bloom.layers - 1, 1);
    const r = bloom.radius * (1 - t * 0.78);
    const w = bloom.width * (1 - t * 0.35);
    const color = bloom.colors[Math.min(Math.floor(t * bloom.colors.length), bloom.colors.length - 1)];
    const offset = (l % 2) * (180 / bloom.petals) + bloom.rotate * l;
    const tipY = -r;
    const petal = `M0 0 C ${-w} ${-r * 0.35}, ${-w * bloom.tip} ${tipY * 0.95}, 0 ${tipY} C ${w * bloom.tip} ${tipY * 0.95}, ${w} ${-r * 0.35}, 0 0Z`;
    layers.push(
      <g key={l} transform={`translate(${cx} ${cy}) rotate(${offset})`}>
        {Array.from({ length: bloom.petals }).map((_, i) => (
          <path
            key={i}
            d={petal}
            fill={color}
            stroke="rgba(0,0,0,.28)"
            strokeWidth="1"
            transform={`rotate(${(360 / bloom.petals) * i})`}
            opacity={0.96}
          />
        ))}
      </g>
    );
  }

  const viewBox = crop ? "125 105 350 350" : "0 0 600 640";

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={`${flower.name} flower`} preserveAspectRatio={crop ? "xMidYMid meet" : "xMidYMid slice"}>
      <defs>
        <linearGradient id={`stem-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stem} />
          <stop offset="1" stopColor={stem} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`disc-${id}`}>
          <stop offset="0" stopColor={bloom.center} />
          <stop offset="1" stopColor="#000" stopOpacity=".55" />
        </radialGradient>
      </defs>
      {!crop && <rect x="293" y={cy} width="14" height="360" fill={`url(#stem-${id})`} />}
      {layers}
      <circle cx={cx} cy={cy} r={bloom.disc ?? 26} fill={`url(#disc-${id})`} />
      {bloom.disc &&
        Array.from({ length: 40 }).map((_, i) => {
          const a = i * 2.4;
          const d = Math.sqrt(i / 40) * (bloom.disc - 6);
          return <circle key={i} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d} r="2" fill="rgba(255,255,255,.18)" />;
        })}
    </svg>
  );
}