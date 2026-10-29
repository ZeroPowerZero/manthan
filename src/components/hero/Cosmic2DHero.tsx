import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useMotionStore } from '../../store/useMotionStore';
import { CosmicWebGLGalaxy } from './CosmicWebGLGalaxy';
import { Volume2, VolumeX } from 'lucide-react';

interface Ripple { x: number; y: number; r: number; maxR: number; a: number; color: string; }

export const Cosmic2DHero: React.FC = () => {
  const motionEnabled = useMotionStore((s) => s.motionEnabled);
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const animRef       = useRef<number | null>(null);
  const ripplesRef    = useRef<Ripple[]>([]);

  // Scroll progress 0→1
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(0);

  // Shockwave (click only)
  const [shockwave, setShockwave] = useState<{ x: number; y: number; progress: number } | null>(null);
  const swTimerRef = useRef<number | null>(null);

  // Audio
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGain  = useRef<GainNode | null>(null);

  // ── Scroll listener ───────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const raw     = window.scrollY / (window.innerHeight * 0.9);
      const clamped = Math.min(Math.max(raw, 0), 1);
      scrollRef.current = clamped;
      setScrollProgress(clamped);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Click ripple + shockwave ──────────────────────────────────────
  const triggerRipple = useCallback((x: number, y: number, color = '#4FD8E8') => {
    ripplesRef.current.push({ x, y, r: 6, maxR: 360, a: 0.8, color });
    setShockwave({ x, y, progress: 0.01 });
    if (swTimerRef.current) clearInterval(swTimerRef.current);
    let p = 0.01;
    swTimerRef.current = window.setInterval(() => {
      p += 0.022;
      if (p >= 1) { setShockwave(null); clearInterval(swTimerRef.current!); }
      else setShockwave({ x, y, progress: p });
    }, 16);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    triggerRipple(e.clientX - rect.left, e.clientY - rect.top);
  };

  // ── Audio ─────────────────────────────────────────────────────────
  const toggleAudio = () => {
    if (audioActive) {
      masterGain.current?.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.35);
      setTimeout(() => { audioCtxRef.current?.suspend(); setAudioActive(false); }, 400);
    } else {
      try {
        const AC = window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AC(); audioCtxRef.current = ctx;
          const g = ctx.createGain(); g.gain.setValueAtTime(0.001, ctx.currentTime);
          g.connect(ctx.destination); masterGain.current = g;
          const lp = ctx.createBiquadFilter();
          lp.type = 'lowpass'; lp.frequency.value = 420; lp.connect(g);
          [108, 216, 432].forEach((f, i) => {
            const o  = ctx.createOscillator();
            const og = ctx.createGain();
            o.type = i ? 'triangle' : 'sine';
            o.frequency.value = f;
            o.detune.value    = (i - 1) * 3;
            og.gain.value     = 0.12 / 3;
            o.connect(og); og.connect(lp); o.start();
          });
        }
        audioCtxRef.current.state === 'suspended' && audioCtxRef.current.resume();
        masterGain.current?.gain.setTargetAtTime(0.15, audioCtxRef.current.currentTime, 0.7);
        setAudioActive(true);
      } catch { /* audio unavailable */ }
    }
  };

  // ── 2D Canvas (ripples only) ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.parentElement?.clientWidth  || innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rp = ripplesRef.current[i];
        rp.r += 5.5; rp.a -= 0.014;
        if (rp.a <= 0 || rp.r >= rp.maxR) { ripplesRef.current.splice(i, 1); continue; }
        ctx.save();
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle    = rp.color;
        ctx.globalAlpha    = Math.max(0, rp.a);
        ctx.lineWidth      = 1.8 * (1 - rp.r / rp.maxR);
        ctx.shadowColor    = rp.color;
        ctx.shadowBlur     = 10;
        ctx.stroke();
        ctx.restore();
      }
      animRef.current = requestAnimationFrame(render);
    };
    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-midnight cursor-crosshair pointer-events-auto"
    >
      {/* ── 1. WebGL Spiral Galaxy ── */}
      <CosmicWebGLGalaxy shockwave={shockwave} scrollProgress={scrollProgress} />

      {/* ── 2. Floating Meditating Figure — pure CSS float, NO mouse reaction ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative flex items-center justify-center"
          style={{
            width:  'min(72vmin, 680px)',
            height: 'min(72vmin, 680px)',
            animation: motionEnabled ? 'cosmicFloat 6s ease-in-out infinite' : 'none',
          }}
        >
          <img
            src="/cosmic-figure.png"
            alt="Cosmic consciousness"
            className="w-full h-full object-contain pointer-events-none"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(79,216,232,0.22)) drop-shadow(0 24px 48px rgba(0,0,0,0.55))',
            }}
          />

          {/* Soft cyan aura beneath the figure */}
          <div
            className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-48 h-8 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(79,216,232,0.18) 0%, transparent 70%)',
              filter: 'blur(12px)',
            }}
          />
        </div>
      </div>

      {/* ── 3. 2D Canvas (ripples) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* ── 4. Edge vignettes ── */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse 100% 85% at 50% 50%, transparent 55%, rgba(23,20,31,0.85) 100%)',
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-40 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, #17141F 0%, transparent 100%)' }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to top, #17141F 0%, transparent 100%)' }}
      />

      {/* ── 5. Audio toggle ── */}
      <div className="absolute bottom-6 right-5 z-30 pointer-events-auto">
        <button
          onClick={(e) => { e.stopPropagation(); toggleAudio(); }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wide border transition-all duration-300 cursor-pointer ${
            audioActive
              ? 'bg-holo-cyan/15 border-holo-cyan/40 text-holo-cyan'
              : 'bg-midnight/80 border-lavender/20 text-ivory-muted hover:text-ivory hover:border-lavender/40'
          }`}
        >
          {audioActive
            ? <><Volume2 className="w-3 h-3 animate-pulse" /> 432 Hz</>
            : <><VolumeX className="w-3 h-3" /> Sound</>
          }
        </button>
      </div>

      {/* ── Float keyframe ── */}
      <style>{`
        @keyframes cosmicFloat {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-18px); }
        }
      `}</style>
    </div>
  );
};
