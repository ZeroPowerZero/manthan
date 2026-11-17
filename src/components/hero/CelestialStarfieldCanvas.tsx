import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { playStardustChime } from '../../lib/cosmicSound';

interface CelestialStarfieldProps {
  className?: string;
  enableClickInteraction?: boolean;
}

export const CelestialStarfieldCanvas: React.FC<CelestialStarfieldProps> = ({
  className = 'absolute inset-0 w-full h-full pointer-events-none z-10',
  enableClickInteraction = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1200
    );
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Star Textures ---
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.15, 'rgba(255, 245, 220, 0.95)');
      grad.addColorStop(0.4, 'rgba(165, 243, 252, 0.5)');
      grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.15)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const createBeaconStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const cx = 64;
      const cy = 64;

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coreGrad.addColorStop(0.2, 'rgba(253, 224, 71, 0.9)');
      coreGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.35)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, 128, 128);

      const hGrad = ctx.createLinearGradient(0, cy, 128, cy);
      hGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      hGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
      hGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, cy - 1, 128, 2);

      const vGrad = ctx.createLinearGradient(cx, 0, cx, 128);
      vGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      vGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
      vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(cx - 1, 0, 2, 128);

      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createStarTexture();
    const beaconTexture = createBeaconStarTexture();

    // --- Star Layer 1: Distant Background Micro-Stars (1,800 stars) ---
    const DISTANT_COUNT = 1800;
    const distantGeo = new THREE.BufferGeometry();
    const distantPos = new Float32Array(DISTANT_COUNT * 3);
    const distantColors = new Float32Array(DISTANT_COUNT * 3);

    const starPalette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#E0F2FE'),
      new THREE.Color('#FEF08A'),
      new THREE.Color('#BAE6FD'),
      new THREE.Color('#E9D5FF'),
      new THREE.Color('#FDE047'),
    ];

    for (let i = 0; i < DISTANT_COUNT; i++) {
      const i3 = i * 3;
      distantPos[i3] = (Math.random() - 0.5) * 900;
      distantPos[i3 + 1] = (Math.random() - 0.5) * 600;
      distantPos[i3 + 2] = (Math.random() - 0.5) * 500 - 100;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      distantColors[i3] = col.r;
      distantColors[i3 + 1] = col.g;
      distantColors[i3 + 2] = col.b;
    }

    distantGeo.setAttribute('position', new THREE.BufferAttribute(distantPos, 3));
    distantGeo.setAttribute('color', new THREE.BufferAttribute(distantColors, 3));

    const distantMat = new THREE.PointsMaterial({
      size: 2.2,
      map: starTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });
    const distantMesh = new THREE.Points(distantGeo, distantMat);
    scene.add(distantMesh);

    // --- Star Layer 2: Midground Twinkling Stars (350 stars) ---
    const MID_COUNT = 350;
    const midGeo = new THREE.BufferGeometry();
    const midPos = new Float32Array(MID_COUNT * 3);
    const midColors = new Float32Array(MID_COUNT * 3);
    const midInitialColors = new Float32Array(MID_COUNT * 3);
    const midPhases = new Float32Array(MID_COUNT);
    const midSpeeds = new Float32Array(MID_COUNT);

    for (let i = 0; i < MID_COUNT; i++) {
      const i3 = i * 3;
      midPos[i3] = (Math.random() - 0.5) * 750;
      midPos[i3 + 1] = (Math.random() - 0.5) * 450;
      midPos[i3 + 2] = (Math.random() - 0.5) * 350 + 50;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      midColors[i3] = col.r;
      midColors[i3 + 1] = col.g;
      midColors[i3 + 2] = col.b;
      midInitialColors[i3] = col.r;
      midInitialColors[i3 + 1] = col.g;
      midInitialColors[i3 + 2] = col.b;

      midPhases[i] = Math.random() * Math.PI * 2;
      midSpeeds[i] = 1.0 + Math.random() * 3.0;
    }

    midGeo.setAttribute('position', new THREE.BufferAttribute(midPos, 3));
    midGeo.setAttribute('color', new THREE.BufferAttribute(midColors, 3));

    const midMat = new THREE.PointsMaterial({
      size: 5.5,
      map: starTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const midMesh = new THREE.Points(midGeo, midMat);
    scene.add(midMesh);

    // --- Star Layer 3: Prominent Beacon Stars (36 stars) ---
    const BEACON_COUNT = 36;
    const beaconGeo = new THREE.BufferGeometry();
    const beaconPos = new Float32Array(BEACON_COUNT * 3);
    const beaconColors = new Float32Array(BEACON_COUNT * 3);

    for (let i = 0; i < BEACON_COUNT; i++) {
      const i3 = i * 3;
      beaconPos[i3] = (Math.random() - 0.5) * 700;
      beaconPos[i3 + 1] = (Math.random() - 0.5) * 400;
      beaconPos[i3 + 2] = (Math.random() - 0.5) * 200 + 80;

      const col = i % 2 === 0 ? new THREE.Color('#FDE047') : new THREE.Color('#38BDF8');
      beaconColors[i3] = col.r;
      beaconColors[i3 + 1] = col.g;
      beaconColors[i3 + 2] = col.b;
    }

    beaconGeo.setAttribute('position', new THREE.BufferAttribute(beaconPos, 3));
    beaconGeo.setAttribute('color', new THREE.BufferAttribute(beaconColors, 3));

    const beaconMat = new THREE.PointsMaterial({
      size: 14,
      map: beaconTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const beaconMesh = new THREE.Points(beaconGeo, beaconMat);
    scene.add(beaconMesh);

    // --- Dynamic Shooting Star / Comet System with Click Spawning ---
    class ShootingStar {
      active = false;
      mesh: THREE.Line;
      geometry: THREE.BufferGeometry;
      speed = 14;
      dir = new THREE.Vector3(-1, -0.6, 0).normalize();
      progress = 0;
      maxDist = 350;

      constructor() {
        this.geometry = new THREE.BufferGeometry();
        const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
        this.geometry.setFromPoints(pts);

        const mat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
        });
        this.mesh = new THREE.Line(this.geometry, mat);
        scene.add(this.mesh);
      }

      spawn(customX?: number, customY?: number, angleOffset?: number) {
        this.active = true;
        this.progress = 0;
        this.maxDist = 250 + Math.random() * 200;
        this.speed = 12 + Math.random() * 10;

        const startX = customX !== undefined ? customX : 150 + Math.random() * 250;
        const startY = customY !== undefined ? customY : 100 + Math.random() * 150;
        const startZ = (Math.random() - 0.5) * 80;
        this.mesh.position.set(startX, startY, startZ);

        const baseAngle = -Math.PI * 0.75 + (angleOffset || 0);
        this.dir.set(Math.cos(baseAngle), Math.sin(baseAngle), 0).normalize();
      }

      update() {
        if (!this.active) return;
        this.progress += this.speed;

        const tailLen = Math.min(this.progress, 55);
        const head = this.dir.clone().multiplyScalar(this.progress);
        const tail = this.dir.clone().multiplyScalar(this.progress - tailLen);

        const positions = new Float32Array([
          tail.x, tail.y, tail.z,
          head.x, head.y, head.z
        ]);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const half = this.maxDist / 2;
        let opacity = 0;
        if (this.progress < half) {
          opacity = this.progress / half;
        } else {
          opacity = 1 - (this.progress - half) / half;
        }
        (this.mesh.material as THREE.LineBasicMaterial).opacity = Math.max(0, opacity * 0.95);

        if (this.progress >= this.maxDist) {
          this.active = false;
          (this.mesh.material as THREE.LineBasicMaterial).opacity = 0;
        }
      }

      dispose() {
        this.geometry.dispose();
        (this.mesh.material as THREE.Material).dispose();
        scene.remove(this.mesh);
      }
    }

    // Pool of 10 shooting stars for rapid click spawning
    const meteors: ShootingStar[] = [];
    for (let i = 0; i < 10; i++) {
      meteors.push(new ShootingStar());
    }
    let meteorTimer = 0;

    // --- Click Stardust Sparkle Burst System ---
    class SparkleBurst {
      active = false;
      age = 0;
      maxAge = 40;
      particlesCount = 28;
      geometry: THREE.BufferGeometry;
      points: THREE.Points;
      positions: Float32Array;
      velocities: Float32Array;

      constructor() {
        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array(this.particlesCount * 3);
        this.velocities = new Float32Array(this.particlesCount * 3);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

        const mat = new THREE.PointsMaterial({
          size: 5.5,
          map: starTexture || undefined,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          color: 0x60a5fa,
          opacity: 0,
        });
        this.points = new THREE.Points(this.geometry, mat);
        scene.add(this.points);
      }

      spawn(originX: number, originY: number, originZ: number) {
        this.active = true;
        this.age = 0;
        for (let i = 0; i < this.particlesCount; i++) {
          const i3 = i * 3;
          this.positions[i3] = originX;
          this.positions[i3 + 1] = originY;
          this.positions[i3 + 2] = originZ;

          const angle = Math.random() * Math.PI * 2;
          const spd = 1.2 + Math.random() * 3.2;
          this.velocities[i3] = Math.cos(angle) * spd;
          this.velocities[i3 + 1] = Math.sin(angle) * spd;
          this.velocities[i3 + 2] = (Math.random() - 0.5) * 1.5;
        }
        this.geometry.attributes.position.needsUpdate = true;
        (this.points.material as THREE.PointsMaterial).opacity = 1;
      }

      update() {
        if (!this.active) return;
        this.age++;

        for (let i = 0; i < this.particlesCount; i++) {
          const i3 = i * 3;
          this.positions[i3] += this.velocities[i3];
          this.positions[i3 + 1] += this.velocities[i3 + 1];
          this.positions[i3 + 2] += this.velocities[i3 + 2];
          // Gentle friction
          this.velocities[i3] *= 0.96;
          this.velocities[i3 + 1] *= 0.96;
        }
        this.geometry.attributes.position.needsUpdate = true;

        const progress = this.age / this.maxAge;
        (this.points.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - progress);

        if (this.age >= this.maxAge) {
          this.active = false;
        }
      }

      dispose() {
        this.geometry.dispose();
        (this.points.material as THREE.Material).dispose();
        scene.remove(this.points);
      }
    }

    const bursts: SparkleBurst[] = [];
    for (let i = 0; i < 6; i++) {
      bursts.push(new SparkleBurst());
    }

    // --- Mouse Tracking & Click Spawning ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 20;
      targetY = y * 14;
    };

    const handleClick = (e: MouseEvent) => {
      if (!enableClickInteraction) return;

      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Project onto z = 0 plane in world coordinates
      const worldX = normX * (container.clientWidth / 2) * 0.45;
      const worldY = normY * (container.clientHeight / 2) * 0.45;

      // 1. Spawn a shooting star shooting across from the click location!
      const idleMeteor = meteors.find((m) => !m.active);
      if (idleMeteor) {
        const randomAngle = (Math.random() - 0.5) * 0.7;
        idleMeteor.spawn(worldX, worldY, randomAngle);
      }

      // 2. Spawn a stardust sparkle burst at click point!
      const idleBurst = bursts.find((b) => !b.active);
      if (idleBurst) {
        idleBurst.spawn(worldX, worldY, 0);
      }

      // 3. Ethereal Chime
      playStardustChime(660 + Math.random() * 440);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    // --- Main Render / Animation Loop ---
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth camera parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(scene.position);

      distantMesh.rotation.y += 0.00015;
      midMesh.rotation.y += 0.00025;
      beaconMesh.rotation.y += 0.00025;

      // Twinkle effect on midground stars
      const colArr = midGeo.attributes.color.array as Float32Array;
      for (let i = 0; i < MID_COUNT; i++) {
        const i3 = i * 3;
        const phase = midPhases[i];
        const speed = midSpeeds[i];
        const factor = 0.5 + 0.5 * Math.sin(time * speed + phase);
        colArr[i3] = midInitialColors[i3] * factor;
        colArr[i3 + 1] = midInitialColors[i3 + 1] * factor;
        colArr[i3 + 2] = midInitialColors[i3 + 2] * factor;
      }
      midGeo.attributes.color.needsUpdate = true;

      // Natural periodic shooting star (every ~5 seconds)
      meteorTimer++;
      if (meteorTimer % 300 === 0) {
        const idleMeteor = meteors.find((m) => !m.active);
        if (idleMeteor) idleMeteor.spawn();
      }

      meteors.forEach((m) => m.update());
      bursts.forEach((b) => b.update());

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      meteors.forEach((m) => m.dispose());
      bursts.forEach((b) => b.dispose());
      distantGeo.dispose();
      distantMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      starTexture?.dispose();
      beaconTexture?.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [enableClickInteraction]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
    />
  );
};
