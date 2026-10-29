import React, { useState, useCallback } from 'react';

export interface ChakraData {
  id: string;
  name: string;
  sanskrit: string;
  english: string;
  meaning: string;
  color: string;
  glowColor: string;
  freq: number;
  yPercent: number;
}

export const CHAKRAS: ChakraData[] = [
  { id:'crown',     name:'Sahasrara',    sanskrit:'सहस्रार',       english:'Crown',        meaning:'Pure Cosmic Consciousness',          color:'#FFFFFF', glowColor:'rgba(255,255,255,0.85)', freq:963, yPercent:17.5 },
  { id:'third-eye', name:'Ajna',         sanskrit:'आज्ञा',          english:'Third Eye',    meaning:'Lucid Perception & Intuition',       color:'#A855F7', glowColor:'rgba(168,85,247,0.85)',  freq:852, yPercent:23.5 },
  { id:'throat',    name:'Vishuddha',    sanskrit:'विशुद्ध',        english:'Throat',       meaning:'Sonic Expression & Truth',           color:'#4FD8E8', glowColor:'rgba(79,216,232,0.85)',  freq:741, yPercent:30.5 },
  { id:'heart',     name:'Anahata',      sanskrit:'अनाहत',          english:'Heart',        meaning:'Empathy & Collective Consciousness', color:'#00F5A0', glowColor:'rgba(0,245,160,0.85)',   freq:639, yPercent:38.5 },
  { id:'solar',     name:'Manipura',     sanskrit:'मणिपूर',         english:'Solar Plexus', meaning:'Willpower, Drive & Inner Fire',      color:'#F2B84B', glowColor:'rgba(242,184,75,0.85)',  freq:528, yPercent:47.0 },
  { id:'sacral',    name:'Svadhisthana', sanskrit:'स्वाधिष्ठान',   english:'Sacral',       meaning:'Creative Flow & Emotional Depth',   color:'#C13DD6', glowColor:'rgba(193,61,214,0.85)', freq:417, yPercent:53.5 },
  { id:'root',      name:'Muladhara',    sanskrit:'मूलाधार',        english:'Root',         meaning:'Primordial Grounding & Existence',   color:'#FF3366', glowColor:'rgba(255,51,102,0.85)', freq:396, yPercent:60.0 },
];

interface ChakraEnergySystemProps {
  onChakraTrigger?: (chakra: ChakraData) => void;
  audioActive: boolean;
}

export const ChakraEnergySystem: React.FC<ChakraEnergySystemProps> = ({
  onChakraTrigger,
  audioActive,
}) => {
  const [activeChakra, setActiveChakra] = useState<ChakraData | null>(null);

  const playTone = useCallback((freq: number) => {
    if (!audioActive) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 1.7);
    } catch { /* blocked */ }
  }, [audioActive]);

  const handleSelect = (chakra: ChakraData) => {
    setActiveChakra(chakra);
    playTone(chakra.freq);
    onChakraTrigger?.(chakra);
  };

  const handleDeselect = () => setActiveChakra(null);

  return (
    <>
      {/* ── SPINAL DOT OVERLAY (purely inside the figure) ── */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Spinal conduit */}
        <div
          className="absolute left-1/2 -translate-x-px transition-opacity duration-500"
          style={{
            top: '17%',
            bottom: '39%',
            width: '1.5px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(168,85,247,0.6), rgba(79,216,232,0.6), rgba(0,245,160,0.6), rgba(242,184,75,0.6), rgba(193,61,214,0.6), rgba(255,51,102,0.7))',
            boxShadow: '0 0 8px rgba(79,216,232,0.5)',
            opacity: activeChakra ? 0.9 : 0.4,
          }}
        />

        {/* Chakra dots */}
        {CHAKRAS.map((c) => {
          const active = activeChakra?.id === c.id;
          return (
            <div
              key={c.id}
              className="absolute left-1/2 pointer-events-auto cursor-pointer"
              style={{ top: `${c.yPercent}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => handleSelect(c)}
              onMouseLeave={handleDeselect}
              onClick={() => handleSelect(c)}
            >
              {/* corona */}
              <div
                className="absolute rounded-full transition-all duration-300 pointer-events-none"
                style={{
                  inset: '-10px',
                  background: `radial-gradient(circle, ${c.glowColor} 0%, transparent 70%)`,
                  opacity: active ? 1 : 0.3,
                  transform: active ? 'scale(1.8)' : 'scale(1)',
                }}
              />
              {/* dot */}
              <div
                className="relative w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-200"
                style={{
                  border: `1.5px solid ${c.color}`,
                  backgroundColor: active ? c.color : 'rgba(23,20,31,0.8)',
                  boxShadow: active ? `0 0 14px ${c.color}` : `0 0 6px ${c.color}55`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── CHAKRA INFO PANEL — fixed bottom-left, never overlaps hero text ── */}
      <div
        className="fixed bottom-24 left-5 z-50 pointer-events-none transition-all duration-300"
        style={{ opacity: activeChakra ? 1 : 0, transform: activeChakra ? 'translateY(0)' : 'translateY(8px)' }}
      >
        {activeChakra && (
          <div
            className="rounded-2xl px-4 py-3 text-left max-w-[220px]"
            style={{
              background: 'rgba(14,12,22,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${activeChakra.color}44`,
              boxShadow: `0 0 24px ${activeChakra.color}22, 0 8px 32px rgba(0,0,0,0.5)`,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: activeChakra.color, boxShadow: `0 0 8px ${activeChakra.color}` }}
              />
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-60" style={{ color: activeChakra.color }}>
                {activeChakra.sanskrit} · {activeChakra.freq} Hz
              </span>
            </div>
            <p className="text-[13px] font-semibold text-white leading-tight">
              {activeChakra.name}
              <span className="text-[11px] font-normal ml-1.5 opacity-60">({activeChakra.english})</span>
            </p>
            <p className="text-[11px] mt-1 leading-snug opacity-55 text-white">
              {activeChakra.meaning}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
