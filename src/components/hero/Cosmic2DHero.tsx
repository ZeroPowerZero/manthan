import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useMotionStore } from '../../store/useMotionStore';
import { CosmicWebGLGalaxy } from './CosmicWebGLGalaxy';
import { ChakraEnergySystem, ChakraData } from './ChakraEnergySystem';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  baseRadius: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  color: string;
}

export const Cosmic2DHero: React.FC = () => {
  const motionEnabled = useMotionStore((state) => state.motionEnabled);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  // Smooth lerped mouse coordinates (kept in ref to eliminate React re-render lag)
  const mouseRef = useRef({
    currentX: 0.5,
    currentY: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    pixelX: -1000,
    pixelY: -1000,
  });

  // Shockwave state (only updated on click, not on mouse move)
  const [shockwave, setShockwave] = useState<{ x: number; y: number; progress: number } | null>(null);

  // Audio Toggle
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Particles & Ripples
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const shockwaveTimerRef = useRef<number | null>(null);

  // Active Chakra pulse color
  const [activeChakraColor, setActiveChakraColor] = useState<string | null>(null);

  // Initialize Particles (Cosmic Stardust)
  const initParticles = useCallback((width: number, height: number) => {
    const colors = ['#4FD8E8', '#C13DD6', '#D8C5F5', '#F2B84B', '#FFFFFF'];
    const count = window.innerWidth < 768 ? 35 : 65;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2.2 + 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.1,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Trigger expanding 2D ripple & WebGL shockwave
  const triggerRipple = useCallback((x: number, y: number, color = '#4FD8E8') => {
    ripplesRef.current.push({
      x,
      y,
      radius: 8,
      maxRadius: 380,
      speed: 6.0,
      alpha: 0.85,
      color,
    });

    // WebGL Shockwave pulse
    setShockwave({ x, y, progress: 0.01 });
    if (shockwaveTimerRef.current) clearInterval(shockwaveTimerRef.current);

    let progress = 0.01;
    shockwaveTimerRef.current = window.setInterval(() => {
      progress += 0.025;
      if (progress >= 1.0) {
        setShockwave(null);
        if (shockwaveTimerRef.current) clearInterval(shockwaveTimerRef.current);
      } else {
        setShockwave({ x, y, progress });
      }
    }, 16);
  }, []);

  // Pointer move handler (Only updates ref values, 0 React re-renders!)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    const m = mouseRef.current;
    m.targetX = nx;
    m.targetY = ny;
    m.pixelX = e.clientX - rect.left;
    m.pixelY = e.clientY - rect.top;
  };

  const handlePointerLeave = () => {
    const m = mouseRef.current;
    m.targetX = 0.5;
    m.targetY = 0.5;
    m.pixelX = -1000;
    m.pixelY = -1000;
  };

  // Click handler
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerRipple(x, y, '#4FD8E8');
  };

  // Chakra trigger callback
  const handleChakraTrigger = (chakra: ChakraData) => {
    setActiveChakraColor(chakra.color);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.width * 0.5;
      const cy = rect.height * (chakra.yPercent / 100);
      triggerRipple(cx, cy, chakra.color);
    }
  };

  // Web Audio 432Hz ambient drone
  const toggleAudio = () => {
    if (audioActive) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.4);
        setTimeout(() => {
          audioCtxRef.current?.suspend();
          setAudioActive(false);
        }, 450);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.connect(ctx.destination);
          masterGainRef.current = gain;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);
          filter.connect(gain);

          [108, 216, 432].forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const oGain = ctx.createGain();
            osc.type = idx === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(f, ctx.currentTime);
            osc.detune.setValueAtTime((idx - 1) * 3, ctx.currentTime);
            oGain.gain.setValueAtTime(0.12 / 3, ctx.currentTime);
            osc.connect(oGain);
            oGain.connect(filter);
            osc.start();
          });
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        masterGainRef.current?.gain.setTargetAtTime(0.16, audioCtxRef.current.currentTime, 0.8);
        setAudioActive(true);
      } catch (err) {
        console.warn('Audio error:', err);
      }
    }
  };

  // High-Performance 60-120 FPS Animation Loop (Zero React state updates!)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);
    initParticles(width, height);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles(width, height);
    };

    window.addEventListener('resize', handleResize);

    const m = mouseRef.current;

    const render = () => {
      // Smooth lerp mouse coordinates
      const lerpSpeed = motionEnabled ? 0.08 : 0.02;
      m.currentX += (m.targetX - m.currentX) * lerpSpeed;
      m.currentY += (m.targetY - m.currentY) * lerpSpeed;

      // Update Figure 2.5D Parallax directly via DOM transform (No React re-renders = pure 120 FPS!)
      if (figureRef.current) {
        if (motionEnabled) {
          const tiltX = -(m.currentY - 0.5) * 3.8;
          const tiltY = (m.currentX - 0.5) * 4.8;
          const shiftX = (m.currentX - 0.5) * 16;
          const shiftY = (m.currentY - 0.5) * 12;
          figureRef.current.style.transform = `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0) perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
        } else {
          figureRef.current.style.transform = 'none';
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Render 2D Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.lineWidth = 2 * (1 - r.radius / r.maxRadius);
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // Render 2D Particles (Stardust)
      const px = m.pixelX;
      const py = m.pixelY;

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + (-0.3 - p.vy) * 0.015;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse proximity interaction (smooth repulsion & tangential swirl)
        if (motionEnabled && px > 0 && py > 0) {
          const dx = p.x - px;
          const dy = p.y - py;
          const dist = Math.hypot(dx, dy);
          if (dist < 130 && dist > 1) {
            const force = (1 - dist / 130) * 0.45;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = Math.max(0.1, Math.min(1, p.alpha + Math.sin(p.pulsePhase) * 0.25));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [initParticles, motionEnabled]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-midnight cursor-crosshair pointer-events-auto"
    >
      {/* 1. Seamless Fullscreen WebGL Galaxy Shader (Fixed cosmic rotation, perfectly stable in background) */}
      <CosmicWebGLGalaxy shockwave={shockwave} />

      {/* 2. Centered Floating Meditating Figure (Levitating & Reactive to Cursor Parallax) */}
      <div
        ref={figureRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <div className="relative w-full max-w-[580px] sm:max-w-[660px] md:max-w-[740px] lg:max-w-[800px] aspect-square flex items-center justify-center">
          {/* Gentle Sinusoidal Floating Physics */}
          <div className="relative w-full h-full flex items-center justify-center animate-float-slow">
            {/* Luminous High-Res Transparent Figure */}
            <img
              src="/cosmic-figure.png"
              alt="Cosmic Meditating Consciousness"
              className="w-full h-full object-contain pointer-events-none select-none"
              style={{
                filter: activeChakraColor
                  ? `drop-shadow(0 0 35px ${activeChakraColor}) brightness(1.06)`
                  : 'drop-shadow(0 20px 45px rgba(79, 216, 232, 0.25))',
                transition: 'filter 0.4s ease',
              }}
            />

            {/* 7 Spinal Chakra Pulsars & Holographic Tooltip System */}
            <ChakraEnergySystem
              onChakraTrigger={handleChakraTrigger}
              audioActive={audioActive}
            />

            {/* Subtle Core Awakening Resonance Bloom */}
            <div
              className="absolute top-[37%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none mix-blend-screen filter blur-2xl opacity-60 transition-all duration-400"
              style={{
                background: activeChakraColor
                  ? `radial-gradient(circle, ${activeChakraColor} 0%, transparent 70%)`
                  : 'radial-gradient(circle, rgba(79, 216, 232, 0.35) 0%, rgba(193, 61, 214, 0.2) 45%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Interactive 2D Canvas Overlay (Stardust Motes & Shockwaves) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 4. Top and Bottom Seamless Vignette Gradients */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-midnight via-midnight/50 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-midnight via-midnight/70 to-transparent pointer-events-none z-20" />

      {/* 5. Audio & Interactive Controls */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3 pointer-events-auto">
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-lavender/15 bg-midnight/80 backdrop-blur-md text-[11px] font-mono text-ivory-muted shadow-lg">
          <Sparkles className="w-3 h-3 text-holo-cyan animate-pulse" />
          <span>Click canvas or chakras to harmonize</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAudio();
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 shadow-xl cursor-pointer ${
            audioActive
              ? 'border-holo-cyan/50 bg-holo-cyan/15 text-holo-cyan shadow-holo-cyan/20'
              : 'border-lavender/20 bg-midnight/80 text-ivory-muted hover:text-ivory hover:border-lavender/40'
          }`}
          title={audioActive ? 'Mute Cosmic Drone' : 'Enable 432Hz Cosmic Drone'}
          aria-label="Toggle Cosmic Drone Audio"
        >
          {audioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-holo-cyan" />
              <span className="font-mono text-[11px] tracking-wider uppercase">432Hz Sound On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] tracking-wider uppercase">Sound Off</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
