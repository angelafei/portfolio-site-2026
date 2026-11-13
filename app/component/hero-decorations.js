'use client';

const SHAPES = [{
  type: "ring",
  x: 27,
  y: 38,
  size: 44,
  color: "#7ec8e3",
  delay: 0
}, {
  type: "ring",
  x: 58,
  y: 28,
  size: 34,
  color: "#7ec8e3",
  delay: 0.4
}, {
  type: "ring",
  x: 73,
  y: 62,
  size: 52,
  color: "#f9e784",
  delay: 0.2
}, {
  type: "ring",
  x: 36,
  y: 65,
  size: 28,
  color: "#f9e784",
  delay: 0.6
}, {
  type: "ring",
  x: 82,
  y: 42,
  size: 22,
  color: "#7ec8e3",
  delay: 0.8
}, {
  type: "dot",
  x: 42,
  y: 30,
  size: 9,
  color: "#7ec8e3",
  delay: 0.3
}, {
  type: "dot",
  x: 65,
  y: 70,
  size: 12,
  color: "#f9e784",
  delay: 0.5
}, {
  type: "dot",
  x: 55,
  y: 45,
  size: 7,
  color: "#f9e784",
  delay: 0.1
}, {
  type: "dot",
  x: 80,
  y: 30,
  size: 9,
  color: "#f9e784",
  delay: 0.7
}, {
  type: "dot",
  x: 22,
  y: 58,
  size: 7,
  color: "#7ec8e3",
  delay: 0.9
}, {
  type: "star",
  x: 46,
  y: 22,
  size: 13,
  color: "#f9e784",
  delay: 0.2
}, {
  type: "star",
  x: 76,
  y: 55,
  size: 9,
  color: "#f9e784",
  delay: 0.6
}, {
  type: "triangle",
  x: 30,
  y: 70,
  size: 13,
  color: "#f9e784",
  delay: 0.4
}, {
  type: "triangle",
  x: 62,
  y: 55,
  size: 9,
  color: "#7ec8e3",
  delay: 0.8
}, {
  type: "triangle",
  x: 85,
  y: 68,
  size: 11,
  color: "#7ec8e3",
  delay: 0.3
}, {
  type: "diamond",
  x: 25,
  y: 42,
  size: 11,
  color: "#7ec8e3",
  delay: 0.5
}, {
  type: "diamond",
  x: 68,
  y: 35,
  size: 9,
  color: "#f9e784",
  delay: 0.1
}];

// ── BLOB CONFIGS ─────────────────────────────────────────────────────────────
// id 0 = giant hero blob (top-left), id 1 = mid (top-right),
// id 2 = small accent (bottom-left), id 3 = medium (bottom-right)
// Each blob gets its own named keyframe (blob0–blob3) so they morph
// independently. borderRadius values are kept in 44–62% range — no corner
// dips below ~42%, which is what eliminates the pointy/jagged look.
const BLOBS = [{
  id: 0,
  anchorX: -12,
  anchorY: -14,
  vwSize: 52,
  anim: "blob0",
  dur: 9,
  delay: 0,
  opacity: 0.88
}, {
  id: 1,
  anchorX: 74,
  anchorY: -8,
  vwSize: 30,
  anim: "blob1",
  dur: 11,
  delay: 0.5,
  opacity: 0.78
}, {
  id: 2,
  anchorX: 2,
  anchorY: 68,
  vwSize: 20,
  anim: "blob2",
  dur: 10,
  delay: 1.5,
  opacity: 0.72
}, {
  id: 3,
  anchorX: 66,
  anchorY: 58,
  vwSize: 32,
  anim: "blob3",
  dur: 12,
  delay: 0.8,
  opacity: 0.80
}];

// Parallax strength per blob
const PARALLAX = [0.016, 0.026, 0.022, 0.014];

// ── FloatingShape ───────────────────────────────────────────────────────────
function FloatingShape({
  shape
}) {
  const floatIdx = Math.floor(shape.delay * 10) % 3;
  const base = {
    position: "absolute",
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    opacity: 0.75,
    transform: "translateY(0px)",
    transition: `opacity 0.8s ease ${shape.delay}s, transform 0.8s ease ${shape.delay}s`,
    animation: `float${floatIdx} ${3.5 + shape.delay}s ease-in-out infinite`
  };
  if (shape.type === "ring") return <div style={{
    ...base,
    width: shape.size,
    height: shape.size,
    border: `${Math.max(2, shape.size * 0.16)}px solid ${shape.color}`
  }} className="rounded-full" />;
  if (shape.type === "dot") return <div style={{
    ...base,
    width: shape.size,
    height: shape.size,
    background: shape.color
  }} className="rounded-full" />;
  if (shape.type === "star") return <div style={{
    ...base,
    fontSize: shape.size + 3,
    color: shape.color
  }} className="leading-none">✦</div>;
  if (shape.type === "triangle") return <div style={{
    ...base,
    borderLeft: `${shape.size * 0.6}px solid transparent`,
    borderRight: `${shape.size * 0.6}px solid transparent`,
    borderBottom: `${shape.size}px solid ${shape.color}`
  }} className="w-[0] h-[0]" />;
  if (shape.type === "diamond") return <div style={{
    ...base,
    width: shape.size,
    height: shape.size,
    background: shape.color
  }} className="[transform:rotate(45deg)]" />;
  return null;
}

// ── InteractiveBlob ─────────────────────────────────────────────────────────
// Renders ONE yellow blob. Position is driven by props so the parent can
// update all blobs from a single mousemove handler.
function InteractiveBlob({
  blob,
  offsetX,
  offsetY,
  hovered,
  onEnter,
  onLeave
}) {
  const scale = hovered ? 1.06 : 1;
  const brightness = hovered ? 1.08 : 1;
  return <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{
    // Convert anchorX/Y (% of viewport width) to actual pixels via vw units
    left: `calc(${blob.anchorX}vw + ${offsetX}px)`,
    top: `calc(${blob.anchorY}vh + ${offsetY}px)`,
    width: `${blob.vwSize}vw`,
    height: `${blob.vwSize}vw`,
    // starting shape — keyframe takes over immediately
    opacity: blob.opacity,
    animation: `${blob.anim} ${blob.dur}s ease-in-out ${blob.delay}s infinite`,
    transform: `scale(${scale})`,
    filter: `brightness(${brightness})`,
    zIndex: hovered ? 2 : 1
  }} className="absolute max-w-[min(60vw,_600px)] [max-height:min(60vw,_600px)] [min-width:120px] [min-height:120px] bg-butter rounded-full [transition:transform_0.55s_cubic-bezier(0.34,1.56,0.64,1),_filter_0.4s_ease,_background_0.4s_ease] cursor-pointer will-change-transform" />;
}

export default function HeroDecorations({ mousePos, hoveredBlob, onHover }) {
 return <>{/* Interactive yellow blobs */}
        {BLOBS.map(blob => {
      const strength = PARALLAX[blob.id];
      return <InteractiveBlob key={blob.id} blob={blob} offsetX={mousePos.x * strength} offsetY={mousePos.y * strength} hovered={hoveredBlob === blob.id} onEnter={() => onHover(blob.id)} onLeave={() => onHover(null)} />;
    })}

        {/* Floating geometric shapes */}
        {SHAPES.map((s, i) => <FloatingShape key={i} shape={s} />)}

        </>;
}
