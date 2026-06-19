"use client";

import { useEffect, useRef } from "react";

interface Pt {
  x: number;
  y: number;
}

const LAYERS: { pts: Pt[]; op: number }[] = [
  {
    pts: [
      { x: 0, y: 0.6 },
      { x: 0.05, y: 0.56 },
      { x: 0.1, y: 0.48 }, // small left outer peak
      { x: 0.14, y: 0.52 },
      { x: 0.18, y: 0.44 }, // ← main left peak
      { x: 0.23, y: 0.5 },
      { x: 0.28, y: 0.53 },
      { x: 0.33, y: 0.5 }, // small mid-left bump
      { x: 0.38, y: 0.54 },
      { x: 0.43, y: 0.52 },
      { x: 0.47, y: 0.54 },
      { x: 0.5, y: 0.55 },
    ],
    op: 0.88,
  },

  {
    pts: [
      { x: 0, y: 0.66 },
      { x: 0.06, y: 0.61 },
      { x: 0.12, y: 0.55 },
      { x: 0.17, y: 0.58 },
      { x: 0.22, y: 0.52 }, // ← background main peak
      { x: 0.28, y: 0.57 },
      { x: 0.35, y: 0.59 },
      { x: 0.4, y: 0.56 },
      { x: 0.46, y: 0.59 },
      { x: 0.5, y: 0.6 },
    ],
    op: 0.4,
  },
];

function linearY(pts: Pt[], tx: number): number {
  const mirrored = tx <= 0.5 ? tx : 1 - tx;
  if (mirrored <= pts[0].x) return pts[0].y;
  const last = pts[pts.length - 1];
  if (mirrored >= last.x) return last.y;
  for (let i = 1; i < pts.length; i++) {
    if (mirrored <= pts[i].x) {
      const p1 = pts[i - 1],
        p2 = pts[i];
      const t = (mirrored - p1.x) / (p2.x - p1.x);
      return p1.y + (p2.y - p1.y) * t;
    }
  }
  return last.y;
}

function drawSquareDot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  opacity: number,
) {
  const r = size * 0.3,
    half = size / 2,
    x = cx - half,
    y = cy - half;
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + size - r, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + r);
  ctx.lineTo(x + size, y + size - r);
  ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
  ctx.lineTo(x + r, y + size);
  ctx.quadraticCurveTo(x, y + size, x, y + size - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

export default function HeroDotMountain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const render = () => {
      const W = container.clientWidth;
      const H = container.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const SPACING = Math.max(6, Math.round((8 * W) / 1459));
      const DOT_SIZE = Math.max(4, Math.round(SPACING * 0.78));
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      for (const layer of LAYERS) {
        ctx.fillStyle = "rgba(179, 172, 167, 1)"; // warm sandy tone
        const FADE = 0.2;

        for (let c = 0; c <= cols; c++) {
          const px = c * SPACING;
          const nx = px / W;
          const skyY = linearY(layer.pts, nx) * H;

          for (let r = 0; r <= rows; r++) {
            const py = r * SPACING;
            if (py < skyY) continue;
            const depth = (py - skyY) / (H * FADE);
            if (depth >= 1) continue;
            const edgeSoften = Math.min(1, (py - skyY) / (SPACING * 3));
            const fadeOut = Math.pow(1 - depth, 2.8);
            const opacity = Math.min(layer.op, layer.op * edgeSoften * fadeOut);
            if (opacity < 0.01) continue;
            drawSquareDot(ctx, px, py, DOT_SIZE, opacity);
          }
        }
      }
    };

    render();
    let timeoutId: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(render, 150);
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
