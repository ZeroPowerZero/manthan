import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CelestialStarfieldCanvas } from './components/hero/CelestialStarfieldCanvas';
import { Navbar } from './components/manthan/Navbar';
import { Hero } from './components/manthan/Hero';
import { About } from './components/manthan/About';
import { OurWork } from './components/manthan/OurWork';
import { Institutions } from './components/manthan/Institutions';
import { Contact } from './components/manthan/Contact';
import { Footer } from './components/manthan/Footer';

export const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  // Smooth inertial scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
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
  }, []);

  const handleSelectTopicForBooking = (topicTitle: string) => {
    setSelectedTopic(topicTitle);
  };

  return (
    <div className="bg-black text-[#F8FAFC] min-h-screen selection:bg-yellow-400 selection:text-black font-sans relative antialiased">
      {/* Global Celestial Starfield Canvas (Extends Across All Sections with Parallax) */}
      <CelestialStarfieldCanvas
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        enableClickInteraction={true}
      />

      {/* 1. Header Navigation */}
      <Navbar />

      <main className="relative z-10">
        {/* 2. Background Video & Night Sky Starfield Hero */}
        <Hero onSelectTopic={handleSelectTopicForBooking} />

        {/* 3. About Section with 3D Inquiry Sphere */}
        <About />

        {/* 4. Our Work: 5 Pillars & Workshop Curriculum */}
        <OurWork onSelectTopicForBooking={handleSelectTopicForBooking} />

        {/* 5. Bringing MANTHAN to Institutions: Collaboration Console */}
        <Institutions selectedTopicTitle={selectedTopic} />

        {/* 6. Contact Us: Phone, Email & WhatsApp */}
        <Contact />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

export default App;
