import React from 'react';
import { Cosmic2DHero } from '../hero/Cosmic2DHero';
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
      {/* 2D Interactive Cosmic Hero Background (Exact match of IMG_2622.MP4) */}
      <Cosmic2DHero />

      {/* Hero Foreground Content Overlay with Open Visual Center */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 min-h-screen flex flex-col justify-between items-center text-center pointer-events-none">
        {/* Top Section: Pill Badge & Editorial Headline */}
        <div className="flex flex-col items-center pt-4 sm:pt-8">
          {/* Subtle Ethereal Pill Badge */}
          <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lavender/25 bg-midnight/80 backdrop-blur-md mb-4 shadow-xl shadow-holo-indigo/30 transition-transform hover:scale-105 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-holo-cyan animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-lavender font-medium">
              MANTHAN: PSYCHE · JAMMU · 2026/27*
            </span>
          </div>

          {/* Floating Centered Editorial Heading */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ivory leading-[1.08] max-w-4xl drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
            What does it mean <br className="hidden sm:inline" />
            to be <span className="text-iridescent italic font-serif font-light drop-shadow-[0_0_30px_rgba(79,216,232,0.45)]">human?</span>
          </h1>
        </div>

        {/* Center Space: Unobstructed view of the Floating Meditating Figure & 7 Chakras */}
        <div className="w-full h-16 sm:h-24 md:h-32 pointer-events-none" />

        {/* Bottom Section: Subtext, Magnetic CTAs, & Scroll Indicator */}
        <div className="flex flex-col items-center max-w-2xl pb-4">
          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg text-ivory/85 leading-relaxed font-sans mb-6 drop-shadow-[0_4px_16px_rgba(14,12,19,0.95)] max-w-xl">
            A two-day youth festival in Jammu celebrating the human psyche, mind, and soul. 
            Where dance, theatre, debate, painting, and empirical research intersect as light.
          </p>

          {/* Magnetic Interactive CTA Buttons */}
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 mb-8">
            <button
              onClick={() => {
                const el = document.getElementById('experience');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="iridescent-border group px-8 py-3.5 text-sm font-semibold text-ivory hover:text-white transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-2xl shadow-holo-cyan/25 hover:shadow-holo-cyan/40"
            >
              <span>Enter the Experience</span>
              <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan group-hover:scale-150 transition-transform shadow-[0_0_8px_#4FD8E8]" />
            </button>

            <button
              onClick={() => openRegistration('institution')}
              className="px-7 py-3.5 rounded-full border border-lavender/30 bg-midnight/80 backdrop-blur-md text-sm font-medium text-lavender hover:text-ivory hover:border-lavender/70 hover:bg-midnight/90 transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-xl shadow-midnight/80"
            >
              <span>Register Institution</span>
            </button>

            <button
              onClick={openHandbook}
              className="hidden sm:flex items-center gap-1.5 text-xs text-ivory-muted hover:text-ivory px-4 py-3 rounded-full hover:bg-midnight-card/60 backdrop-blur-sm transition-colors cursor-pointer border border-transparent hover:border-lavender/20"
            >
              <BookOpen className="w-3.5 h-3.5 text-holo-gold" />
              <span>Prospectus</span>
            </button>
          </div>

          {/* Subtle Scroll Down Indicator */}
          <button
            onClick={handleScrollToNext}
            className="pointer-events-auto text-ivory-muted hover:text-lavender transition-all duration-300 flex flex-col items-center gap-1.5 cursor-pointer group"
            aria-label="Scroll to next section"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              Scroll to explore
            </span>
            <div className="w-7 h-7 rounded-full border border-lavender/25 flex items-center justify-center group-hover:border-holo-cyan/70 group-hover:bg-holo-cyan/10 transition-colors shadow-lg">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-holo-cyan" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
