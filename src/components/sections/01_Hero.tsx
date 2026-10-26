import React from 'react';
import { CosmicHeroCanvas } from '../canvas/CosmicHeroCanvas';
import { useModalStore } from '../../store/useModalStore';
import { ArrowDown, Sparkles, BookOpen } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { openRegistration, openHandbook } = useModalStore();

  const handleScrollToNext = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-midnight">
      {/* 3D WebGL Cosmic Hero Canvas Background */}
      <CosmicHeroCanvas />

      {/* Hero Foreground Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center flex flex-col items-center justify-center pointer-events-none">
        {/* Subtle Ethereal Pill Badge */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lavender/25 bg-midnight/70 backdrop-blur-md mb-6 shadow-lg shadow-holo-indigo/20">
          <Sparkles className="w-3.5 h-3.5 text-holo-cyan animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-lavender font-medium">
            MANTHAN: PSYCHE · JAMMU · 2026/27*
          </span>
        </div>

        {/* Floating Centered Editorial Heading */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ivory leading-[1.08] max-w-4xl mb-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          What does it mean <br className="hidden sm:inline" />
          to be <span className="text-iridescent italic font-serif font-light">human?</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-ivory/80 leading-relaxed font-sans mb-10 drop-shadow-[0_2px_12px_rgba(23,20,31,0.9)]">
          A two-day youth festival in Jammu celebrating the human psyche, mind, and soul. 
          Where dance, theatre, debate, painting, and empirical research intersect as light.
        </p>

        {/* Magnetic Interactive CTA Buttons */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('experience');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="iridescent-border group px-8 py-3.5 text-sm font-semibold text-ivory hover:text-white transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-2xl shadow-holo-cyan/20"
          >
            <span>Enter the Experience</span>
            <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan group-hover:scale-150 transition-transform" />
          </button>

          <button
            onClick={() => openRegistration('institution')}
            className="px-7 py-3.5 rounded-full border border-lavender/30 bg-midnight/80 backdrop-blur-md text-sm font-medium text-lavender hover:text-ivory hover:border-lavender/60 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-lg"
          >
            <span>Register Institution</span>
          </button>

          <button
            onClick={openHandbook}
            className="hidden sm:flex items-center gap-1.5 text-xs text-ivory-muted hover:text-ivory px-4 py-3 rounded-full hover:bg-midnight-card/50 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-holo-gold" />
            <span>Prospectus</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <button
        onClick={handleScrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto text-ivory-muted hover:text-lavender transition-colors flex flex-col items-center gap-2 cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
          Scroll to explore
        </span>
        <div className="w-8 h-8 rounded-full border border-lavender/20 flex items-center justify-center group-hover:border-holo-cyan/60 transition-colors">
          <ArrowDown className="w-4 h-4 animate-bounce text-holo-cyan" />
        </div>
      </button>

      {/* Bottom Vignette Gradient to smoothly fade into Section 02 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight via-midnight/60 to-transparent pointer-events-none z-10" />
    </section>
  );
};
