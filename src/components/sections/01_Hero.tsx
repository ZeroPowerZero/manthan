import React, { useRef } from 'react';
import { Cosmic2DHero } from '../hero/Cosmic2DHero';
import { useModalStore } from '../../store/useModalStore';
import { BookOpen, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { openRegistration, openHandbook } = useModalStore();
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-midnight"
    >
      {/* ── Background: WebGL galaxy + floating figure ── */}
      <Cosmic2DHero />

      {/* ── Foreground UI ── */}
      <div className="relative z-30 w-full min-h-screen flex flex-col justify-between pointer-events-none">

        {/* TOP — Eyebrow + Title */}
        <div className="flex flex-col items-center pt-28 sm:pt-32 px-6 text-center">
          {/* Eyebrow label */}
          <div className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-1 rounded-full mb-5 select-none"
            style={{
              background: 'rgba(23,20,31,0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(216,197,245,0.18)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-lavender/80">
              Manthan: Psyche &nbsp;·&nbsp; Jammu &nbsp;·&nbsp; 2026 / 27
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display font-normal leading-[1.04] text-ivory max-w-3xl"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', textShadow: '0 16px 48px rgba(0,0,0,0.9)' }}
          >
            What does it mean<br />
            to be{' '}
            <em className="not-italic text-iridescent font-serif font-light"
              style={{ textShadow: '0 0 40px rgba(79,216,232,0.35)' }}
            >
              human?
            </em>
          </h1>
        </div>

        {/* MIDDLE — open space for the figure */}
        <div className="flex-1" />

        {/* BOTTOM — description + CTAs + scroll cue */}
        <div className="flex flex-col items-center gap-6 pb-10 px-6 text-center">
          <p className="text-[13px] sm:text-[15px] text-ivory/65 leading-relaxed max-w-md font-sans pointer-events-none"
            style={{ letterSpacing: '0.01em' }}
          >
            A two-day youth festival celebrating the human psyche, mind and soul —<br className="hidden sm:inline" />
            where dance, theatre, debate, research and art converge.
          </p>

          {/* CTA row */}
          <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
            {/* Primary CTA */}
            <button
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="iridescent-border px-7 py-3 text-[13px] font-semibold text-ivory hover:brightness-110 transition-all duration-300 cursor-pointer group flex items-center gap-2"
            >
              Enter the Experience
              <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan group-hover:scale-150 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => openRegistration('institution')}
              className="px-7 py-3 rounded-full text-[13px] font-medium text-lavender border border-lavender/25 hover:border-lavender/55 hover:text-ivory transition-all duration-300 cursor-pointer"
              style={{ background: 'rgba(23,20,31,0.75)', backdropFilter:'blur(12px)' }}
            >
              Register Institution
            </button>

            {/* Tertiary — handbook */}
            <button
              onClick={openHandbook}
              className="hidden sm:flex items-center gap-1.5 px-5 py-3 rounded-full text-[12px] text-ivory-muted hover:text-ivory transition-colors cursor-pointer border border-transparent hover:border-lavender/15"
            >
              <BookOpen className="w-3.5 h-3.5 text-holo-gold" />
              Prospectus
            </button>
          </div>

          {/* Scroll cue */}
          <button
            onClick={scrollToNext}
            className="pointer-events-auto flex flex-col items-center gap-1.5 text-ivory-muted hover:text-lavender transition-colors cursor-pointer group mt-2"
          >
            <span className="text-[9px] font-mono tracking-[0.22em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">
              Scroll
            </span>
            <ArrowDown className="w-4 h-4 text-holo-cyan animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
