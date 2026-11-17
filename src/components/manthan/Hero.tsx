import React, { useRef, useState } from 'react';
import { ArrowDown, Play, Pause, Volume2, VolumeX, Building2, Bell, BellOff } from 'lucide-react';
import { CelestialStarfieldCanvas } from '../hero/CelestialStarfieldCanvas';
import { MANTHAN_CONTENT } from '../../data/manthanContent';
import { toggleCosmicSound } from '../../lib/cosmicSound';

interface HeroProps {
  onSelectTopic?: (topicId: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [soundActive, setSoundActive] = useState(false);

  const handleSoundToggle = () => {
    const newState = toggleCosmicSound();
    setSoundActive(newState);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-theme-bg"
    >
      {/* 1. Celestial Night Sky Starfield Canvas */}
      <CelestialStarfieldCanvas className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* 2. Background Video (Centered in background, naturally proportioned) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="h-[88vh] max-w-[540px] object-cover opacity-25 select-none"
        />
        {/* Soft cosmic dark vignette */}
        <div className="absolute inset-0 bg-[#0A0B1E]/45" />
      </div>

      {/* 3. Foreground Hero Content (Clean, Spacious, Majestic) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Brand Emblem with Starlight Aura */}
        <div className="relative mb-5 flex items-center justify-center group">
          <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-600/20 via-amber-400/20 to-cyan-400/20 blur-2xl rounded-full pointer-events-none" />
          <img
            src="/manthan-emblem-transparent.png"
            alt="MANTHAN Celestial Emblem"
            className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_0_30px_rgba(251,191,36,0.35)] select-none transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Grand Brand Heading with Logo-Accurate Tracking & Champagne Tone */}
        <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.22em] text-[#EDD8BD] uppercase pl-[0.22em] mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          MANTHAN
        </h1>

        {/* Celestial Warm Amber Tagline */}
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-amber-200/95 font-normal mb-8">
          &ldquo;{MANTHAN_CONTENT.tagline}&rdquo;
        </p>

        {/* Introduction Paragraph from Document */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl mb-10">
          {MANTHAN_CONTENT.introduction.lead}
        </p>

        {/* Rounded Pill Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => scrollTo('about')}
            className="btn-primary px-8 py-3.5 text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            <span>Explore Our Work</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('institutions')}
            className="btn-secondary px-8 py-3.5 text-sm font-semibold flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Book an Institutional Session</span>
          </button>
        </div>

        {/* Interdisciplinary Fields with Soft Rounded Pills */}
        <div className="pt-8 border-t border-white/[0.06] w-full flex flex-col items-center">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
            Interdisciplinary Inquiry Fields
          </span>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {MANTHAN_CONTENT.introduction.disciplines.map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 rounded-full text-xs font-mono text-amber-100/90 bg-[#141738]/60 border border-white/[0.07]"
              >
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Ambient Controls Dock (Soft Rounded Pill) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-[#0F112B]/90 border border-white/10 shadow-lg backdrop-blur-md">
        <button
          onClick={handleSoundToggle}
          className={`p-2 rounded-full transition-colors cursor-pointer flex items-center gap-1 text-xs ${
            soundActive ? 'text-amber-400 bg-amber-950/60' : 'text-slate-400 hover:text-white'
          }`}
          aria-label={soundActive ? 'Disable star chimes' : 'Enable star chimes'}
          title={soundActive ? 'Disable star chimes' : 'Enable star chimes on click'}
        >
          {soundActive ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          <span className="hidden sm:inline text-[11px] font-mono pr-1">Chimes</span>
        </button>

        <span className="w-px h-4 bg-white/10" />

        <button
          onClick={togglePlay}
          className="p-2 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          title={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-2 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          title={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>
      </div>
    </section>
  );
};
