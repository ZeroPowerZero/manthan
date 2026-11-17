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

    // --- Star Textures (Bright Warm White with Actual Warm Stellar Colors) ---
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.15, 'rgba(255, 253, 242, 0.98)');
      grad.addColorStop(0.4, 'rgba(254, 240, 138, 0.75)');
      grad.addColorStop(0.7, 'rgba(250, 204, 21, 0.3)');
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
      coreGrad.addColorStop(0.2, 'rgba(255, 253, 240, 0.95)');
      coreGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.45)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, 128, 128);

      const hGrad = ctx.createLinearGradient(0, cy, 128, cy);
      hGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      hGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      hGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, cy - 1, 128, 2);

      const vGrad = ctx.createLinearGradient(cx, 0, cx, 128);
      vGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      vGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(cx - 1, 0, 2, 128);

      return new THREE.CanvasTexture(canvas);
    };

    const createSupergiantTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const cx = 128;
      const cy = 128;

      // 1. Soft cosmic corona halo
      const coronaGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 95);
      coronaGrad.addColorStop(0, 'rgba(255, 253, 245, 0.98)');
      coronaGrad.addColorStop(0.12, 'rgba(254, 240, 138, 0.85)');
      coronaGrad.addColorStop(0.3, 'rgba(250, 204, 21, 0.45)');
      coronaGrad.addColorStop(0.6, 'rgba(234, 179, 8, 0.15)');
      coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coronaGrad;
      ctx.fillRect(0, 0, 256, 256);

      // 2. Blazing hot diamond core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coreGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.95)');
      coreGrad.addColorStop(0.8, 'rgba(254, 240, 138, 0.7)');
      coreGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(cx - 26, cy - 26, 52, 52);

      // 3. Primary Horizontal & Vertical Diffraction Spikes
      const hSpike = ctx.createLinearGradient(0, cy, 256, cy);
      hSpike.addColorStop(0, 'rgba(255, 255, 255, 0)');
      hSpike.addColorStop(0.35, 'rgba(254, 240, 138, 0.35)');
      hSpike.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
      hSpike.addColorStop(0.65, 'rgba(254, 240, 138, 0.35)');
      hSpike.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = hSpike;
      ctx.fillRect(0, cy - 1.5, 256, 3);

      const vSpike = ctx.createLinearGradient(cx, 0, cx, 256);
      vSpike.addColorStop(0, 'rgba(255, 255, 255, 0)');
      vSpike.addColorStop(0.35, 'rgba(254, 240, 138, 0.35)');
      vSpike.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
      vSpike.addColorStop(0.65, 'rgba(254, 240, 138, 0.35)');
      vSpike.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = vSpike;
      ctx.fillRect(cx - 1.5, 0, 3, 256);

      // 4. Secondary Diagonal Spikes (45-degree angle)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      const diagSpike = ctx.createLinearGradient(-90, 0, 90, 0);
      diagSpike.addColorStop(0, 'rgba(255, 255, 255, 0)');
      diagSpike.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
      diagSpike.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = diagSpike;
      ctx.fillRect(-90, -1, 180, 2);
      ctx.fillRect(-1, -90, 2, 180);
      ctx.restore();

      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createStarTexture();
    const beaconTexture = createBeaconStarTexture();
    const supergiantTexture = createSupergiantTexture();

    // --- Star Layer 1: Distant Background Micro-Stars (Authentic Stellar Warm White/Yellow) ---
    const DISTANT_COUNT = 3800;
    const distantGeo = new THREE.BufferGeometry();
    const distantPos = new Float32Array(DISTANT_COUNT * 3);
    const distantColors = new Float32Array(DISTANT_COUNT * 3);

    const starPalette = [
      new THREE.Color('#FFFFFF'), // Sirius Bright White
      new THREE.Color('#FFFDF5'), // Vega Warm White
      new THREE.Color('#FFF8E7'), // Stellar Ivory
      new THREE.Color('#FEF9C3'), // Solar Pale Yellow
      new THREE.Color('#FEF08A'), // Warm Star Yellow
      new THREE.Color('#FACC15'), // Radiant Starlight Yellow
      new THREE.Color('#FBBF24'), // Warm Gold Star
      new THREE.Color('#F59E0B'), // Warm Amber Giant
    ];

    for (let i = 0; i < DISTANT_COUNT; i++) {
      const i3 = i * 3;
      distantPos[i3] = (Math.random() - 0.5) * 1150;
      distantPos[i3 + 1] = (Math.random() - 0.5) * 2200;
      distantPos[i3 + 2] = (Math.random() - 0.5) * 600 - 100;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      distantColors[i3] = col.r;
      distantColors[i3 + 1] = col.g;
      distantColors[i3 + 2] = col.b;
    }

    distantGeo.setAttribute('position', new THREE.BufferAttribute(distantPos, 3));
    distantGeo.setAttribute('color', new THREE.BufferAttribute(distantColors, 3));

    const distantMat = new THREE.PointsMaterial({
      size: 2.4,
      map: starTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.88,
    });
    const distantMesh = new THREE.Points(distantGeo, distantMat);
    scene.add(distantMesh);

    // --- Star Layer 2: Midground Twinkling Stars (850 stars spanning full page height) ---
    const MID_COUNT = 850;
    const midGeo = new THREE.BufferGeometry();
    const midPos = new Float32Array(MID_COUNT * 3);
    const midColors = new Float32Array(MID_COUNT * 3);
    const midInitialColors = new Float32Array(MID_COUNT * 3);
    const midPhases = new Float32Array(MID_COUNT);
    const midSpeeds = new Float32Array(MID_COUNT);

    for (let i = 0; i < MID_COUNT; i++) {
      const i3 = i * 3;
      midPos[i3] = (Math.random() - 0.5) * 1000;
      midPos[i3 + 1] = (Math.random() - 0.5) * 2100;
      midPos[i3 + 2] = (Math.random() - 0.5) * 450 + 40;

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
      size: 6.0,
      map: starTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const midMesh = new THREE.Points(midGeo, midMat);
    scene.add(midMesh);

    // --- Star Layer 3: Prominent Beacon Stars (84 stars with 4-point cross diffraction) ---
    const BEACON_COUNT = 84;
    const beaconGeo = new THREE.BufferGeometry();
    const beaconPos = new Float32Array(BEACON_COUNT * 3);
    const beaconColors = new Float32Array(BEACON_COUNT * 3);

    for (let i = 0; i < BEACON_COUNT; i++) {
      const i3 = i * 3;
      beaconPos[i3] = (Math.random() - 0.5) * 950;
      beaconPos[i3 + 1] = (Math.random() - 0.5) * 1900;
      beaconPos[i3 + 2] = (Math.random() - 0.5) * 250 + 80;

      const col = i % 2 === 0 ? new THREE.Color('#FFFFFF') : new THREE.Color('#FACC15');
      beaconColors[i3] = col.r;
      beaconColors[i3 + 1] = col.g;
      beaconColors[i3 + 2] = col.b;
    }

    beaconGeo.setAttribute('position', new THREE.BufferAttribute(beaconPos, 3));
    beaconGeo.setAttribute('color', new THREE.BufferAttribute(beaconColors, 3));

    const beaconMat = new THREE.PointsMaterial({
      size: 16,
      map: beaconTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const beaconMesh = new THREE.Points(beaconGeo, beaconMat);
    scene.add(beaconMesh);

    // --- Star Layer 4: Radiant Stellar Supergiants (36 prominent, blazing stars) ---
    const SUPERGIANT_COUNT = 36;
    const superGeo = new THREE.BufferGeometry();
    const superPos = new Float32Array(SUPERGIANT_COUNT * 3);
    const superColors = new Float32Array(SUPERGIANT_COUNT * 3);
    const superInitialColors = new Float32Array(SUPERGIANT_COUNT * 3);
    const superPhases = new Float32Array(SUPERGIANT_COUNT);
    const superSpeeds = new Float32Array(SUPERGIANT_COUNT);

    const superPalette = [
      new THREE.Color('#FFFFFF'), // Sirius Diamond White
      new THREE.Color('#FFFDF5'), // Vega Warm White
      new THREE.Color('#FEF08A'), // Capella Gold
      new THREE.Color('#FACC15'), // Radiant Solar Yellow
      new THREE.Color('#FBBF24'), // Warm Gold Star
    ];

    for (let i = 0; i < SUPERGIANT_COUNT; i++) {
      const i3 = i * 3;
      superPos[i3] = (Math.random() - 0.5) * 880;
      superPos[i3 + 1] = (Math.random() - 0.5) * 1950;
      superPos[i3 + 2] = (Math.random() - 0.5) * 180 + 90; // High depth visibility

      const col = superPalette[i % superPalette.length];
      superColors[i3] = col.r;
      superColors[i3 + 1] = col.g;
      superColors[i3 + 2] = col.b;
      superInitialColors[i3] = col.r;
      superInitialColors[i3 + 1] = col.g;
      superInitialColors[i3 + 2] = col.b;

      superPhases[i] = Math.random() * Math.PI * 2;
      superSpeeds[i] = 0.8 + Math.random() * 1.6;
    }

    superGeo.setAttribute('position', new THREE.BufferAttribute(superPos, 3));
    superGeo.setAttribute('color', new THREE.BufferAttribute(superColors, 3));

    const superMat = new THREE.PointsMaterial({
      size: 30, // Large, prominent, blazing
      map: supergiantTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const superMesh = new THREE.Points(superGeo, superMat);
    scene.add(superMesh);

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
          color: 0xfacc15,
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

    // --- Mouse Tracking, Scroll Parallax & Click Spawning ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentScrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 20;
      targetY = y * 14;
    };

    const handleScroll = () => {
      targetScrollY = (window.scrollY || window.pageYOffset) * 0.12;
    };

    const handleClick = (e: MouseEvent) => {
      if (!enableClickInteraction) return;

      // Do not trigger cosmic effects when user clicks inside form inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Project onto z = 0 plane in world coordinates aligned with current camera Y
      const worldX = normX * (container.clientWidth / 2) * 0.45 + mouseX;
      const worldY = normY * (container.clientHeight / 2) * 0.45 + camera.position.y;

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

      // 3. Ethereal Melodious Glass Chime (Soft & Harmonious)
      playStardustChime();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);

    // --- Main Render / Animation Loop ---
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth scroll parallax
      currentScrollY += (targetScrollY - currentScrollY) * 0.05;

      // Smooth camera parallax with mouse and scroll depth
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = mouseY - currentScrollY;
      camera.lookAt(new THREE.Vector3(mouseX * 0.3, mouseY * 0.3 - currentScrollY, 0));

      distantMesh.rotation.y += 0.00015;
      midMesh.rotation.y += 0.00025;
      beaconMesh.rotation.y += 0.00025;
      superMesh.rotation.y += 0.0002;

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

      // Luminous breathing pulse on radiant supergiants
      const superColArr = superGeo.attributes.color.array as Float32Array;
      for (let i = 0; i < SUPERGIANT_COUNT; i++) {
        const i3 = i * 3;
        const phase = superPhases[i];
        const speed = superSpeeds[i];
        const factor = 0.72 + 0.38 * Math.sin(time * speed + phase);
        superColArr[i3] = superInitialColors[i3] * factor;
        superColArr[i3 + 1] = superInitialColors[i3 + 1] * factor;
        superColArr[i3 + 2] = superInitialColors[i3 + 2] * factor;
      }
      superGeo.attributes.color.needsUpdate = true;

      // Natural periodic shooting star spanning across currently viewed section
      meteorTimer++;
      if (meteorTimer % 280 === 0) {
        const idleMeteor = meteors.find((m) => !m.active);
        if (idleMeteor) {
          const spawnX = (Math.random() - 0.5) * 450;
          const spawnY = camera.position.y + 100 + Math.random() * 80;
          idleMeteor.spawn(spawnX, spawnY);
        }
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
      window.removeEventListener('scroll', handleScroll);
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
      superGeo.dispose();
      superMat.dispose();
      starTexture?.dispose();
      beaconTexture?.dispose();
      supergiantTexture?.dispose();
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
