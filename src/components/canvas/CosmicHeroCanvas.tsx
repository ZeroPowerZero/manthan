import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConsciousnessFigure } from './ConsciousnessFigure';
import { GalaxyParticles } from './GalaxyParticles';
import { StillFallbackCanvas } from './StillFallbackCanvas';
import { useMotionStore } from '../../store/useMotionStore';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

export const CosmicHeroCanvas: React.FC = () => {
  const motionEnabled = useMotionStore((state) => state.motionEnabled);
  const [hasWebGlError, setHasWebGlError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Graceful fallback to static high-res graphic if motion disabled or WebGL error
  if (!motionEnabled || hasWebGlError) {
    return <StillFallbackCanvas />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Suspense fallback={<StillFallbackCanvas />}>
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: isMobile ? 55 : 45 }}
          dpr={[1, isMobile ? 1.25 : 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color('#17141F'), 1);
          }}
          onError={() => setHasWebGlError(true)}
        >
          {/* Ambient Cosmic Lights */}
          <ambientLight intensity={0.4} color="#D8C5F5" />
          
          {/* Main Key Prismatic Light */}
          <directionalLight position={[4, 6, 5]} intensity={1.8} color="#ECE2FA" />
          
          {/* Rim lights in iridescent palette */}
          <pointLight position={[-4, 2, -2]} intensity={2.5} color="#4FD8E8" distance={12} />
          <pointLight position={[4, -1, -2]} intensity={2.2} color="#C13DD6" distance={12} />
          <pointLight position={[0, 4, -3]} intensity={2.0} color="#F2B84B" distance={10} />
          <pointLight position={[0, -3, 2]} intensity={1.2} color="#2B2A6B" distance={8} />

          {/* Interactive Mouse-Reactive Galaxy (dynamic count for mobile vs desktop) */}
          <GalaxyParticles motionEnabled={motionEnabled} count={isMobile ? 1800 : 3600} />

          {/* Luminous Centerpiece Figure */}
          <ConsciousnessFigure motionEnabled={motionEnabled} />

          {/* Post-Processing Pipeline */}
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.25}
              mipmapBlur
              intensity={1.2}
              radius={0.7}
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.0012, 0.0012)}
              radialModulation={false}
              modulationOffset={0.15}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
};
