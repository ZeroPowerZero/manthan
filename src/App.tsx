import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useMotionStore } from './store/useMotionStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/01_Hero';
import { AboutSection } from './components/sections/02_About';
import { EventsSection } from './components/sections/03_Events';
import { MindsSection } from './components/sections/04_Minds';
import { ProgrammeSection } from './components/sections/05_Programme';
import { RegistrationSection } from './components/sections/06_Registration';
import { TrustDetailsSection } from './components/sections/07_TrustDetails';
import { EventDetailModal } from './components/modals/EventDetailModal';
import { RegistrationDrawer } from './components/modals/RegistrationDrawer';
import { HandbookModal } from './components/modals/HandbookModal';

export const App: React.FC = () => {
  const motionEnabled = useMotionStore((state) => state.motionEnabled);

  // Initialize Lenis buttery smooth inertia scrolling
  useEffect(() => {
    if (!motionEnabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [motionEnabled]);

  return (
    <div className="bg-midnight text-ivory min-h-screen selection:bg-holo-magenta/30 selection:text-ivory font-sans relative">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* Main 7-Section Journey */}
      <main>
        {/* 01. The Question (Hero with 3D Centerpiece & Interactive Galaxy) */}
        <HeroSection />

        {/* 02. The Invitation (About + Mirrored Reflection Motif) */}
        <AboutSection />

        {/* 03. The Experience (7 Frameless Glowing Event Portals) */}
        <EventsSection />

        {/* 04. The Minds (Awakening Celestial Placeholders) */}
        <MindsSection />

        {/* 05. The Programme (Interactive Day 1 & Day 2 Schedule) */}
        <ProgrammeSection />

        {/* 06. Join the Experience (5 Pathways & Connection Motif) */}
        <RegistrationSection />

        {/* 07. The Details (Zero-Motion High Contrast Rules & Matrix) */}
        <TrustDetailsSection />
      </main>

      {/* Institutional Trust Footer */}
      <Footer />

      {/* Interactive Portals & Modals */}
      <EventDetailModal />
      <RegistrationDrawer />
      <HandbookModal />
    </div>
  );
};

export default App;
