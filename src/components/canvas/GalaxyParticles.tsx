import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GalaxyParticlesProps {
  motionEnabled: boolean;
  count?: number;
}

export const GalaxyParticles: React.FC<GalaxyParticlesProps> = ({ 
  motionEnabled, 
  count = 3500 
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);

  // Generate cosmic particle positions, colors, and scales
  const [positions, colors, initialCoords] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);

    // Color palette in Three.Color
    const palette = [
      new THREE.Color('#4FD8E8'), // Prism Cyan
      new THREE.Color('#C13DD6'), // Holo Magenta
      new THREE.Color('#F2B84B'), // Stardust Gold
      new THREE.Color('#D8C5F5'), // Lavender
      new THREE.Color('#2B2A6B'), // Nebula Indigo
      new THREE.Color('#F2E9DB'), // Ivory stardust
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Logarithmic spiral / vortex galaxy distribution
      const radius = Math.pow(Math.random(), 1.6) * 7.5 + 0.5;
      const spinAngle = radius * 2.8;
      const branchAngle = ((i % 4) * ((2 * Math.PI) / 4));

      // Random spherical jitter
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8 * radius;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.7 * radius;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8 * radius;

      const x = Math.cos(spinAngle + branchAngle) * radius + randomX;
      const y = (Math.random() - 0.5) * 3.5 + randomY;
      const z = Math.sin(spinAngle + branchAngle) * radius + randomZ;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      init[i3] = x;
      init[i3 + 1] = y;
      init[i3 + 2] = z;

      // Color selection based on distance from core (hot core cyan/gold, outer arms magenta/lavender)
      const mixedColor = palette[Math.floor(Math.random() * palette.length)].clone();
      if (radius < 2.5) {
        mixedColor.lerp(new THREE.Color('#4FD8E8'), 0.5);
      }

      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }

    return [pos, col, init];
  }, [count]);

  // Soft circle texture for stardust
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.85)');
      gradient.addColorStop(0.5, 'rgba(216,197,245,0.4)');
      gradient.addColorStop(1, 'rgba(23,20,31,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.premultiplyAlpha = true;
    return texture;
  }, []);

  useFrame((state) => {
    if (!motionEnabled || !pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const ptr = state.pointer;

    // Fluid galaxy rotation with pointer gravity influence
    pointsRef.current.rotation.y = t * 0.04 + ptr.x * 0.25;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 - ptr.y * 0.15;
    pointsRef.current.rotation.z = ptr.x * 0.08;

    // Dynamic wave ripples across particle array
    const geom = pointsRef.current.geometry;
    const positionsAttr = geom.attributes.position;
    const posArray = positionsAttr.array as Float32Array;

    // Modulate a subset of particles for performance
    const step = 8;
    for (let i = 0; i < count; i += step) {
      const i3 = i * 3;
      const initialY = initialCoords[i3 + 1];
      const initialX = initialCoords[i3];

      // Subtle ripple responding to pointer
      posArray[i3 + 1] = initialY + Math.sin(t * 1.5 + initialX * 0.8) * 0.15 * (1 + Math.abs(ptr.y));
    }
    positionsAttr.needsUpdate = true;

    // Slower counter-rotating nebula
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = -t * 0.02 + ptr.x * 0.1;
      nebulaRef.current.rotation.z = Math.cos(t * 0.03) * 0.05;
    }
  });

  return (
    <>
      {/* Primary Galaxy Vortex */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          alphaMap={particleTexture}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Outer Ethereal Nebula Dust */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.35}
          alphaMap={particleTexture}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </>
  );
};
