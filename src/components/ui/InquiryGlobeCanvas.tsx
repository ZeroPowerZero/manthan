import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DomainNode {
  name: string;
  question: string;
  color: string;
  theta: number;
  phi: number;
}

const DOMAINS: DomainNode[] = [
  {
    name: 'Mind & Consciousness',
    question: 'How does inner experience arise and shape reality?',
    color: '#38BDF8',
    theta: 0.8,
    phi: 0.4,
  },
  {
    name: 'Philosophy & Logic',
    question: 'What are the assumptions guiding how we think and live?',
    color: '#FBBF24',
    theta: 2.1,
    phi: -0.3,
  },
  {
    name: 'Emotions & Identity',
    question: 'Who are we beneath social conditioning and expectation?',
    color: '#F43F5E',
    theta: 3.6,
    phi: 0.5,
  },
  {
    name: 'Creative Expression',
    question: 'How do art and performance give voice to what words cannot?',
    color: '#C084FC',
    theta: 4.8,
    phi: -0.4,
  },
  {
    name: 'Society & Existence',
    question: 'How do relationships, culture, and meaning sustain human life?',
    color: '#34D399',
    theta: 1.5,
    phi: -0.7,
  },
];

export const InquiryGlobeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<DomainNode>(DOMAINS[0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Globe Group ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Wireframe Outer Sphere
    const sphereRadius = 80;
    const sphereGeo = new THREE.IcosahedronGeometry(sphereRadius, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(wireframeSphere);

    // 2. Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(18, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 3. Orbital Rings
    const createRing = (radius: number, rotX: number, rotY: number, color: number) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.5, radius + 0.5, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      globeGroup.add(ring);
    };

    createRing(sphereRadius * 1.15, Math.PI / 3, 0.4, 0x38bdf8);
    createRing(sphereRadius * 1.25, -Math.PI / 4, 0.8, 0xc084fc);

    // 4. Luminous Nodes on Sphere Surface
    const nodeMeshes: { mesh: THREE.Mesh; data: DomainNode }[] = [];

    DOMAINS.forEach((domain) => {
      const x = sphereRadius * Math.cos(domain.phi) * Math.sin(domain.theta);
      const y = sphereRadius * Math.sin(domain.phi);
      const z = sphereRadius * Math.cos(domain.phi) * Math.cos(domain.theta);

      const nodeGeo = new THREE.SphereGeometry(4.5, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(domain.color),
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      globeGroup.add(nodeMesh);

      // Node Halo
      const haloGeo = new THREE.SphereGeometry(7, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(domain.color),
        transparent: true,
        opacity: 0.25,
        wireframe: true,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.set(x, y, z);
      globeGroup.add(haloMesh);

      nodeMeshes.push({ mesh: nodeMesh, data: domain });
    });

    // --- Interactive Drag Rotation ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.008;
      globeGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // --- Animation Loop ---
    let animationId: number;
    let nodeCycleCounter = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.0035;
        globeGroup.rotation.x += 0.0012;
      }

      // Periodically rotate active domain highlight
      nodeCycleCounter++;
      if (nodeCycleCounter % 280 === 0) {
        const nextIdx = (DOMAINS.indexOf(activeNode) + 1) % DOMAINS.length;
        setActiveNode(DOMAINS[nextIdx]);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize ---
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      domElement.removeEventListener('mousedown', onPointerDown);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (domElement && container.contains(domElement)) {
        container.removeChild(domElement);
      }
      sphereGeo.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, [activeNode]);

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto flex flex-col items-center justify-center">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative"
      />

      {/* Floating Interactive Active Node Indicator */}
      <div className="absolute -bottom-4 inset-x-2 sm:inset-x-6 p-4 rounded-2xl bg-[#0F112B]/90 backdrop-blur-md border border-white/[0.08] shadow-2xl text-center z-20 transition-all duration-300">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: activeNode.color }}
          />
          <span
            className="text-xs font-mono font-bold uppercase tracking-wider"
            style={{ color: activeNode.color }}
          >
            {activeNode.name}
          </span>
        </div>
        <p className="text-xs text-slate-300 italic font-serif">
          &ldquo;{activeNode.question}&rdquo;
        </p>
      </div>
    </div>
  );
};
