"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 140;
const FIELD_RADIUS = 6.5;
const WAVE_AMPLITUDE = 0.9;
const WAVE_FREQUENCY = 0.35;
const WAVE_SPEED = 0.6;

function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(160,200,255,0.85)");
    gradient.addColorStop(0.6, "rgba(76,141,255,0.25)");
    gradient.addColorStop(1, "rgba(76,141,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

// Deterministic seeded PRNG (mulberry32) so the node field is generated once
// at module load, outside React render, without relying on impure Math.random.
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

interface NodeField {
  base: Float32Array;
  positions: Float32Array;
  phase: Float32Array;
  speed: Float32Array;
  drift: Float32Array;
}

function buildNodeField(): NodeField {
  const rand = mulberry32(1337);
  const base = new Float32Array(NODE_COUNT * 3);
  const phase = new Float32Array(NODE_COUNT * 3);
  const speed = new Float32Array(NODE_COUNT);
  const drift = new Float32Array(NODE_COUNT * 3);

  for (let i = 0; i < NODE_COUNT; i++) {
    const r = FIELD_RADIUS * Math.cbrt(rand());
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    base[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
    base[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 2;

    phase[i * 3] = rand() * Math.PI * 2;
    phase[i * 3 + 1] = rand() * Math.PI * 2;
    phase[i * 3 + 2] = rand() * Math.PI * 2;
    speed[i] = 0.15 + rand() * 0.25;
    drift[i * 3] = 0.35 + rand() * 0.35;
    drift[i * 3 + 1] = 0.35 + rand() * 0.35;
    drift[i * 3 + 2] = 0.2 + rand() * 0.2;
  }

  return { base, positions: base.slice(), phase, speed, drift };
}

const NODE_FIELD = buildNodeField();

function AgentGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const elapsed = useRef(0);
  const glowTexture = useGlowTexture();

  useFrame((state, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;

    const group = groupRef.current;
    if (group) {
      const targetX = (state.pointer.x * viewport.width) / 40;
      const targetY = (state.pointer.y * viewport.height) / 40;
      group.rotation.y += delta * 0.03;
      group.rotation.x += (targetY - group.rotation.x) * 0.02;
      group.position.x += (targetX - group.position.x) * 0.02;
    }

    const geometry = pointsRef.current?.geometry;
    const attr = geometry?.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (!attr) return;

    const { base, phase, speed, drift } = NODE_FIELD;
    for (let i = 0; i < NODE_COUNT; i++) {
      const s = speed[i] * t;
      const x = base[i * 3] + Math.sin(s + phase[i * 3]) * drift[i * 3];
      const wave =
        Math.sin(x * WAVE_FREQUENCY + t * WAVE_SPEED + phase[i * 3 + 1]) *
        WAVE_AMPLITUDE;
      attr.array[i * 3] = x;
      attr.array[i * 3 + 1] =
        base[i * 3 + 1] +
        Math.cos(s * 0.9 + phase[i * 3 + 1]) * drift[i * 3 + 1] +
        wave;
      attr.array[i * 3 + 2] =
        base[i * 3 + 2] +
        Math.sin(s * 0.7 + phase[i * 3 + 2]) * drift[i * 3 + 2] +
        wave * 0.4;
    }
    attr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[NODE_FIELD.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#9fc4ff"
          map={glowTexture ?? undefined}
          size={0.32}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      className="!pointer-events-none"
    >
      <ambientLight intensity={0.6} />
      <AgentGraph />
    </Canvas>
  );
}
