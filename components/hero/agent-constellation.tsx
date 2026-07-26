"use client";

import { useEffect, useRef } from "react";

const STAR_PALETTE: { color: string; weight: number }[] = [
  { color: "#CAD8FF", weight: 0.14 }, // blue-white
  { color: "#E8ECF5", weight: 0.4 }, // white
  { color: "#FFF4E0", weight: 0.26 }, // warm white
  { color: "#FFD6AA", weight: 0.14 }, // pale gold
  { color: "#FFB48C", weight: 0.06 }, // amber
];

const HUB_LINE_RGB = "175, 192, 255"; // #AFC0FF
const BG_TOP = "#03050A";
const BG_BOTTOM = "#080B14";

const CURSOR_RADIUS = 140;
const CURSOR_GLOW_RADIUS = 300;
const PARALLAX_STRENGTH = 22;
const METEOR_MIN_INTERVAL = 5000;
const METEOR_MAX_INTERVAL = 10000;

interface Star {
  bx: number;
  by: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  depth: number;
  brightnessBase: number;
  glow: boolean;
  brightest: boolean;
  hub: boolean;
  phase1: number;
  phase2: number;
  freq1: number;
  freq2: number;
  nextDip: number;
  dipUntil: number;
  dipStrength: number;
  hubNextActivate: number;
  hubActiveStart: number | null;
  hubActiveDuration: number;
}

interface HubEdge {
  a: number;
  b: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  duration: number;
  length: number;
}

interface SceneAssets {
  stars: Star[];
  hubEdges: HubEdge[];
  milkyWay: HTMLCanvasElement | null;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickColor(rand: () => number): string {
  const roll = rand();
  let acc = 0;
  for (const entry of STAR_PALETTE) {
    acc += entry.weight;
    if (roll <= acc) return entry.color;
  }
  return STAR_PALETTE[STAR_PALETTE.length - 1].color;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function buildStars(width: number, height: number): Star[] {
  const rand = mulberry32(Math.floor(width * 31 + height * 17) || 1);
  const area = width * height;
  const count = Math.max(220, Math.min(480, Math.round(area / 2600)));
  const stars: Star[] = [];
  const now = performance.now();

  for (let i = 0; i < count; i++) {
    // skewed distribution: mostly small/dim, a rare few large/bright
    const sizeRoll = Math.pow(rand(), 3.2);
    const radius = 0.5 + sizeRoll * 2.1;
    const brightnessBase = Math.min(1, 0.35 + sizeRoll * 0.65 + rand() * 0.1);
    const depth = 0.2 + rand() * 0.8;

    stars.push({
      bx: rand() * width,
      by: rand() * height,
      x: 0,
      y: 0,
      radius,
      color: pickColor(rand),
      depth,
      brightnessBase,
      glow: false,
      brightest: false,
      hub: false,
      phase1: rand() * Math.PI * 2,
      phase2: rand() * Math.PI * 2,
      freq1: 0.6 + rand() * 0.6,
      freq2: 1.3 + rand() * 0.9,
      nextDip: now + rand() * 6000 + 2000,
      dipUntil: 0,
      dipStrength: 0.4 + rand() * 0.4,
      hubNextActivate: now + rand() * 6000 + 1500,
      hubActiveStart: null,
      hubActiveDuration: 1100 + rand() * 500,
    });
  }

  const ranked = [...stars].sort(
    (a, b) => b.radius * b.brightnessBase - a.radius * a.brightnessBase
  );
  const glowCount = Math.round(count * 0.1);
  const brightestCount = Math.max(2, Math.round(count * 0.012));
  const hubCount = Math.max(5, Math.round(count * 0.05));

  ranked.forEach((star, idx) => {
    if (idx < glowCount) star.glow = true;
    if (idx < brightestCount) star.brightest = true;
    if (idx < hubCount) star.hub = true;
  });

  return stars;
}

function buildHubEdges(stars: Star[]): HubEdge[] {
  const hubIndices = stars
    .map((star, i) => (star.hub ? i : -1))
    .filter((i) => i >= 0);
  const edges: HubEdge[] = [];
  const seen = new Set<string>();
  const rand = mulberry32(hubIndices.length * 7919 + 3);

  hubIndices.forEach((i) => {
    const distances = hubIndices
      .filter((j) => j !== i)
      .map((j) => {
        const dx = stars[i].bx - stars[j].bx;
        const dy = stars[i].by - stars[j].by;
        return { j, dist: Math.sqrt(dx * dx + dy * dy) };
      })
      .sort((a, b) => a.dist - b.dist);

    const neighborCount = rand() < 0.5 ? 1 : 2;
    distances.slice(0, neighborCount).forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ a: i, b: j });
      }
    });
  });

  return edges;
}

function buildMilkyWay(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.globalCompositeOperation = "lighter";
  const angle = -0.34;
  const cx = width * 0.62;
  const cy = height * 0.38;
  const length = Math.max(width, height) * 1.3;
  const steps = 14;

  for (let s = 0; s < steps; s++) {
    const t = s / (steps - 1) - 0.5;
    const px = cx + Math.cos(angle) * length * t;
    const py = cy + Math.sin(angle) * length * t;
    const radius = Math.max(width, height) * (0.22 + Math.abs(t) * 0.05);
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, radius);
    gradient.addColorStop(0, "rgba(175, 192, 255, 0.05)");
    gradient.addColorStop(0.5, "rgba(160, 175, 220, 0.025)");
    gradient.addColorStop(1, "rgba(160, 175, 220, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

function drawDiffractionSpike(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number
) {
  const armLength = radius * 7 + 6;
  ctx.save();
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(x - armLength, y);
  ctx.lineTo(x + armLength, y);
  ctx.moveTo(x, y - armLength);
  ctx.lineTo(x, y + armLength);
  ctx.stroke();
  ctx.restore();
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  outerRadius: number,
  color: string
) {
  const innerRadius = outerRadius * 0.35;
  const points = 4;
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const a = (Math.PI / points) * i - Math.PI / 2;
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawVignette(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = ctx.createRadialGradient(
    width * 0.4,
    height * 0.42,
    Math.min(width, height) * 0.1,
    width * 0.4,
    height * 0.42,
    Math.max(width, height) * 0.85
  );
  vignette.addColorStop(0, "rgba(3, 5, 10, 0.12)");
  vignette.addColorStop(0.6, "rgba(3, 5, 10, 0.28)");
  vignette.addColorStop(1, "rgba(3, 5, 10, 0.72)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

function drawStaticFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  assets: SceneAssets
) {
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, BG_TOP);
  bgGradient.addColorStop(1, BG_BOTTOM);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  if (assets.milkyWay) {
    ctx.drawImage(assets.milkyWay, 0, 0, width, height);
  }

  ctx.lineWidth = 0.6;
  for (const edge of assets.hubEdges) {
    const a = assets.stars[edge.a];
    const b = assets.stars[edge.b];
    ctx.strokeStyle = `rgba(${HUB_LINE_RGB}, 0.08)`;
    ctx.beginPath();
    ctx.moveTo(a.bx, a.by);
    ctx.lineTo(b.bx, b.by);
    ctx.stroke();
  }

  for (const star of assets.stars) {
    const [r, g, b] = hexToRgb(star.color);
    const alpha = star.brightnessBase;
    if (star.glow) {
      const glowRadius = star.radius * 5.5;
      const glowGradient = ctx.createRadialGradient(
        star.bx,
        star.by,
        0,
        star.bx,
        star.by,
        glowRadius
      );
      glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`);
      glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(star.bx, star.by, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.arc(star.bx, star.by, star.radius, 0, Math.PI * 2);
    ctx.fill();
    if (star.brightest) {
      drawDiffractionSpike(ctx, star.bx, star.by, star.radius, alpha * 0.25);
    }
  }

  drawVignette(ctx, width, height);
}

export function AgentConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    const containerNode = containerRef.current;
    if (!canvasNode || !containerNode) return;

    const canvasContext = canvasNode.getContext("2d");
    if (!canvasContext) return;

    // Re-bind to fresh, non-nullable consts: TypeScript's control-flow
    // narrowing above does not persist into the nested function
    // declarations below (resize/frame/handlePointerMove), so closures
    // must capture these already-narrowed bindings instead.
    const canvasEl = canvasNode;
    const context = canvasContext;
    const container = containerNode;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let assets: SceneAssets = { stars: [], hubEdges: [], milkyWay: null };
    let meteors: Meteor[] = [];
    let nextMeteorAt = performance.now() + 2000 + Math.random() * 3000;

    let mouseX = -9999;
    let mouseY = -9999;
    let mousePresent = false;
    let parallaxX = 0;
    let parallaxY = 0;

    function resize() {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const stars = buildStars(width, height);
      assets = {
        stars,
        hubEdges: buildHubEdges(stars),
        milkyWay: buildMilkyWay(width, height),
      };
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = canvasEl.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      mousePresent =
        mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    }

    function handlePointerLeave() {
      mousePresent = false;
    }

    resize();

    if (prefersReducedMotion) {
      drawStaticFrame(context, width, height, assets);
      const resizeObserver = new ResizeObserver(() => {
        resize();
        drawStaticFrame(context, width, height, assets);
      });
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    let rafId = 0;

    function frame(now: number) {
      rafId = requestAnimationFrame(frame);

      const bgGradient = context.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, BG_TOP);
      bgGradient.addColorStop(1, BG_BOTTOM);
      context.fillStyle = bgGradient;
      context.fillRect(0, 0, width, height);

      if (assets.milkyWay) {
        context.drawImage(assets.milkyWay, 0, 0, width, height);
      }

      const offsetTargetX = mousePresent ? -((mouseX - width / 2) / (width / 2)) : 0;
      const offsetTargetY = mousePresent ? -((mouseY - height / 2) / (height / 2)) : 0;
      parallaxX += (offsetTargetX - parallaxX) * 0.04;
      parallaxY += (offsetTargetY - parallaxY) * 0.04;

      if (mousePresent) {
        const glow = context.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          CURSOR_GLOW_RADIUS
        );
        glow.addColorStop(0, `rgba(${HUB_LINE_RGB}, 0.07)`);
        glow.addColorStop(1, `rgba(${HUB_LINE_RGB}, 0)`);
        context.save();
        context.globalCompositeOperation = "lighter";
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
        context.restore();
      }

      const { stars, hubEdges } = assets;

      for (const star of stars) {
        star.x = star.bx + parallaxX * PARALLAX_STRENGTH * star.depth;
        star.y = star.by + parallaxY * PARALLAX_STRENGTH * star.depth;
      }

      context.lineWidth = 0.6;
      for (const edge of hubEdges) {
        const a = stars[edge.a];
        const b = stars[edge.b];
        const active = a.hubActiveStart !== null || b.hubActiveStart !== null;
        context.strokeStyle = `rgba(${HUB_LINE_RGB}, ${active ? 0.32 : 0.07})`;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      for (const star of stars) {
        let brightness =
          star.brightnessBase *
          (0.82 + 0.18 * Math.sin(now * 0.001 * star.freq1 + star.phase1)) *
          (0.92 + 0.08 * Math.sin(now * 0.001 * star.freq2 + star.phase2));

        if (now >= star.nextDip && star.dipUntil === 0) {
          star.dipUntil = now + 120 + Math.random() * 160;
        }
        if (star.dipUntil > 0) {
          if (now < star.dipUntil) {
            const dipProgress = 1 - (star.dipUntil - now) / 250;
            brightness *= 1 - star.dipStrength * Math.sin(dipProgress * Math.PI);
          } else {
            star.dipUntil = 0;
            star.nextDip = now + 3000 + Math.random() * 6000;
          }
        }

        let cursorFactor = 0;
        if (mousePresent) {
          const dx = star.x - mouseX;
          const dy = star.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          cursorFactor = smoothstep(CURSOR_RADIUS, 0, dist);
        }

        const finalBrightness = Math.min(1, brightness + cursorFactor * 0.8);
        const finalRadius = star.radius * (1 + cursorFactor * 0.5);
        const alpha = Math.max(0.05, finalBrightness);
        const [r, g, b] = hexToRgb(star.color);

        if (star.glow) {
          const glowRadius = finalRadius * 5.5;
          const glowGradient = context.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            glowRadius
          );
          glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.35})`);
          glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          context.fillStyle = glowGradient;
          context.beginPath();
          context.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
          context.fill();
        }

        context.beginPath();
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        context.arc(star.x, star.y, finalRadius, 0, Math.PI * 2);
        context.fill();

        if (star.brightest) {
          drawDiffractionSpike(context, star.x, star.y, finalRadius, alpha * 0.25);
        }

        if (star.hub) {
          if (now >= star.hubNextActivate && star.hubActiveStart === null) {
            star.hubActiveStart = now;
          }
          if (star.hubActiveStart !== null) {
            const p = (now - star.hubActiveStart) / star.hubActiveDuration;
            if (p >= 1) {
              star.hubActiveStart = null;
              star.hubNextActivate = now + 4000 + Math.random() * 5000;
            } else {
              const intensity = Math.sin(p * Math.PI);
              const bloomRadius = 6 + p * 34;
              const bloom = context.createRadialGradient(
                star.x,
                star.y,
                0,
                star.x,
                star.y,
                bloomRadius
              );
              bloom.addColorStop(0, `rgba(${HUB_LINE_RGB}, ${0.32 * intensity})`);
              bloom.addColorStop(1, `rgba(${HUB_LINE_RGB}, 0)`);
              context.fillStyle = bloom;
              context.beginPath();
              context.arc(star.x, star.y, bloomRadius, 0, Math.PI * 2);
              context.fill();
            }
          }
        }
      }

      if (mousePresent) {
        let nearestIdx = -1;
        let nearestDist = Infinity;
        for (let i = 0; i < stars.length; i++) {
          const dx = stars[i].x - mouseX;
          const dy = stars[i].y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestIdx = i;
          }
        }
        if (nearestIdx >= 0 && nearestDist < CURSOR_RADIUS) {
          const star = stars[nearestIdx];
          drawSparkle(
            context,
            star.x,
            star.y,
            star.radius * 3.2 + 3,
            "rgba(255, 255, 255, 0.85)"
          );
        }
      }

      if (now >= nextMeteorAt && meteors.length < 2) {
        const fromLeft = Math.random() < 0.5;
        const startX = fromLeft
          ? Math.random() * width * 0.3
          : width - Math.random() * width * 0.3;
        const startY = Math.random() * height * 0.12;
        const travel = Math.max(width, height) * (0.5 + Math.random() * 0.3);
        const duration = 380 + Math.random() * 180;
        const dirX = fromLeft ? 1 : -1;
        meteors.push({
          x: startX,
          y: startY,
          vx: (dirX * travel) / duration,
          vy: travel / duration,
          born: now,
          duration,
          length: 90 + Math.random() * 60,
        });
        nextMeteorAt =
          now +
          METEOR_MIN_INTERVAL +
          Math.random() * (METEOR_MAX_INTERVAL - METEOR_MIN_INTERVAL);
      }

      meteors = meteors.filter((meteor) => now - meteor.born < meteor.duration);
      for (const meteor of meteors) {
        const elapsed = now - meteor.born;
        const headX = meteor.x + meteor.vx * elapsed;
        const headY = meteor.y + meteor.vy * elapsed;
        const speedMag = Math.sqrt(meteor.vx * meteor.vx + meteor.vy * meteor.vy);
        const dirX = meteor.vx / speedMag;
        const dirY = meteor.vy / speedMag;
        const tailX = headX - dirX * meteor.length;
        const tailY = headY - dirY * meteor.length;

        const progress = elapsed / meteor.duration;
        const fadeIn = Math.min(1, progress / 0.15);
        const fadeOut = Math.min(1, (1 - progress) / 0.25);
        const opacity = Math.min(fadeIn, fadeOut);

        const gradient = context.createLinearGradient(headX, headY, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        context.strokeStyle = gradient;
        context.lineWidth = 1.4;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(headX, headY);
        context.lineTo(tailX, tailY);
        context.stroke();
      }

      drawVignette(context, width, height);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
    </div>
  );
}
