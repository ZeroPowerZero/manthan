import React, { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

export interface ChakraData {
  id: string;
  name: string;
  sanskrit: string;
  english: string;
  meaning: string;
  color: string;
  glowColor: string;
  freq: number;
  yPercent: number; // percentage from top of figure
}

export const CHAKRAS: ChakraData[] = [
  {
    id: 'crown',
    name: 'Sahasrara',
    sanskrit: 'सहस्रार',
    english: 'Crown Chakra',
    meaning: 'Pure Cosmic Consciousness · The Infinite Transcendence',
    color: '#FFFFFF',
    glowColor: 'rgba(255, 255, 255, 0.9)',
    freq: 963,
    yPercent: 17.5,
  },
  {
    id: 'third-eye',
    name: 'Ajna',
    sanskrit: 'आज्ञा',
    english: 'Third Eye',
    meaning: 'Perception · Lucid Vision & Intuitive Awakening',
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.85)',
    freq: 852,
    yPercent: 22.8,
  },
  {
    id: 'throat',
    name: 'Vishuddha',
    sanskrit: 'विशुद्ध',
    english: 'Throat Chakra',
    meaning: 'Empirical Truth · Sonic Expression & Resonance',
    color: '#4FD8E8',
    glowColor: 'rgba(79, 216, 232, 0.85)',
    freq: 741,
    yPercent: 29.5,
  },
  {
    id: 'heart',
    name: 'Anahata',
    sanskrit: 'अनाहत',
    english: 'Heart Center',
    meaning: 'Unstruck Sound · Empathy & Collective Psyche',
    color: '#00F5A0',
    glowColor: 'rgba(0, 245, 160, 0.85)',
    freq: 639,
    yPercent: 37.5,
  },
  {
    id: 'solar',
    name: 'Manipura',
    sanskrit: 'मणिपूर',
    english: 'Solar Plexus',
    meaning: 'Inner Fire · Willpower, Drive & Vitality',
    color: '#F2B84B',
    glowColor: 'rgba(242, 184, 75, 0.85)',
    freq: 528,
    yPercent: 46.2,
  },
  {
    id: 'sacral',
    name: 'Svadhisthana',
    sanskrit: 'स्वाधिष्ठान',
    english: 'Sacral Chakra',
    meaning: 'Creative Flow · Emotion & Expressive Artistry',
    color: '#C13DD6',
    glowColor: 'rgba(193, 61, 214, 0.85)',
    freq: 417,
    yPercent: 52.8,
  },
  {
    id: 'root',
    name: 'Muladhara',
    sanskrit: 'मूलाधार',
    english: 'Root Chakra',
    meaning: 'Foundation · Primordial Grounding & Existence',
    color: '#FF3366',
    glowColor: 'rgba(255, 51, 102, 0.85)',
    freq: 396,
    yPercent: 59.2,
  },
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
  const [animatingAll, setAnimatingAll] = useState(false);

  // Play Crystal Singing Bowl Solfeggio frequency via Web Audio
  const playChakraTone = useCallback((freq: number) => {
    if (!audioActive) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.85);
    } catch {
      // Audio not supported or blocked
    }
  }, [audioActive]);

  const handleSelect = (chakra: ChakraData) => {
    setActiveChakra(chakra);
    playChakraTone(chakra.freq);
    if (onChakraTrigger) onChakraTrigger(chakra);
  };

  // Kundalini Ascension Sequence: ripple through all 7 chakras
  const triggerAscension = () => {
    if (animatingAll) return;
    setAnimatingAll(true);

    const reversed = [...CHAKRAS].reverse(); // from root to crown
    reversed.forEach((c, idx) => {
      setTimeout(() => {
        setActiveChakra(c);
        playChakraTone(c.freq);
        if (onChakraTrigger) onChakraTrigger(c);
        if (idx === reversed.length - 1) {
          setTimeout(() => {
            setAnimatingAll(false);
          }, 1500);
        }
      }, idx * 420);
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Central Spinal Conduit Line */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-[1.5px] pointer-events-none"
        style={{
          top: '16%',
          bottom: '39%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(168,85,247,0.7), rgba(79,216,232,0.7), rgba(0,245,160,0.7), rgba(242,184,75,0.7), rgba(193,61,214,0.7), rgba(255,51,102,0.8))',
          boxShadow: '0 0 10px rgba(79, 216, 232, 0.6)',
          opacity: activeChakra ? 0.85 : 0.45,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* 7 Interactive Spinal Chakra Pulsars */}
      {CHAKRAS.map((chakra) => {
        const isCurrent = activeChakra?.id === chakra.id;

        return (
          <div
            key={chakra.id}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer group"
            style={{
              top: `${chakra.yPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => handleSelect(chakra)}
            onClick={() => handleSelect(chakra)}
          >
            {/* Pulsing Outer Energy Corona */}
            <div
              className="absolute -inset-3 rounded-full transition-all duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${chakra.glowColor} 0%, transparent 75%)`,
                transform: isCurrent ? 'scale(2.2)' : 'scale(1)',
                opacity: isCurrent ? 0.95 : 0.4,
              }}
            />

            {/* Core Glowing Energy Node */}
            <div
              className="relative w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
              style={{
                border: `1.5px solid ${chakra.color}`,
                boxShadow: `0 0 12px ${chakra.color}, inset 0 0 8px ${chakra.color}`,
                backgroundColor: isCurrent ? chakra.color : 'rgba(23, 20, 31, 0.7)',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full transition-transform"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: `0 0 6px ${chakra.color}`,
                  transform: isCurrent ? 'scale(1.4)' : 'scale(1)',
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Holographic Chakra Energy Card (Floats beside the active chakra) */}
      {activeChakra && (
        <div
          className="absolute z-30 transition-all duration-400 ease-out pointer-events-none"
          style={{
            top: `${activeChakra.yPercent}%`,
            left: 'calc(50% + 42px)',
            transform: 'translateY(-50%)',
          }}
        >
          <div className="glass-panel px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl max-w-xs text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px]"
                style={{
                  backgroundColor: activeChakra.color,
                  boxShadow: `0 0 10px ${activeChakra.color}`,
                }}
              />
              <span className="text-[10px] font-mono tracking-widest uppercase text-ivory/60">
                {activeChakra.sanskrit} · {activeChakra.freq} Hz
              </span>
            </div>
            <div className="text-sm font-semibold text-ivory tracking-wide flex items-center gap-1.5">
              <span>{activeChakra.name}</span>
              <span className="text-xs text-lavender font-normal">({activeChakra.english})</span>
            </div>
            <p className="text-[11px] text-ivory-muted leading-tight mt-1">
              {activeChakra.meaning}
            </p>
          </div>
        </div>
      )}

      {/* Floating Kundalini Awakening Trigger Button */}
      <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
        <button
          onClick={triggerAscension}
          disabled={animatingAll}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lavender/25 bg-midnight/80 backdrop-blur-md text-xs font-medium text-lavender hover:text-ivory hover:border-holo-cyan/50 transition-all duration-300 shadow-xl cursor-pointer group"
          title="Harmonize all 7 spinal energy centers"
        >
          <Sparkles className="w-3.5 h-3.5 text-holo-cyan group-hover:rotate-45 transition-transform" />
          <span className="font-mono text-[11px] tracking-wider uppercase">
            {animatingAll ? 'Harmonizing Psyche...' : 'Awaken 7 Chakras'}
          </span>
        </button>
      </div>
    </div>
  );
};
