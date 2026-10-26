import React, { useState, useEffect } from 'react';
import { useMotionStore } from '../../store/useMotionStore';
import { useModalStore } from '../../store/useModalStore';
import { Sparkles, Menu, X, ArrowUpRight, Compass } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { motionEnabled, toggleMotion } = useMotionStore();
  const { openRegistration, openHandbook } = useModalStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'The Experience', href: '#experience' },
    { label: 'Programme', href: '#programme' },
    { label: 'The Minds', href: '#minds' },
    { label: 'The Details', href: '#details' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight/90 backdrop-blur-xl border-b border-lavender/10 shadow-2xl shadow-midnight/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-holo-magenta via-holo-cyan to-holo-gold p-[1px] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center group-hover:bg-midnight/70 transition-colors">
              <span className="text-holo-cyan text-sm font-semibold tracking-tighter">Ψ</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg tracking-wider font-semibold text-ivory group-hover:text-lavender transition-colors">
                MANTHAN
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono px-1.5 py-0.5 rounded bg-burgundy/40 text-lavender border border-burgundy/60">
                PSYCHE
              </span>
            </div>
            <p className="text-[10px] text-ivory-dim tracking-wider font-mono">
              JAMMU · 2026/27*
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-sm font-medium text-ivory/80 hover:text-lavender hover:drop-shadow-[0_0_8px_rgba(216,197,245,0.4)] transition-all cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Group */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Prospectus Button */}
          <button
            onClick={openHandbook}
            className="flex items-center gap-1.5 text-xs text-lavender/90 hover:text-ivory px-3 py-1.5 rounded-full border border-lavender/20 hover:border-lavender/40 transition-colors cursor-pointer"
            title="Download Official Delegation Handbook"
          >
            <Compass className="w-3.5 h-3.5 text-holo-cyan" />
            <span>Handbook</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={toggleMotion}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
              motionEnabled
                ? 'border-holo-cyan/40 text-holo-cyan/90 bg-holo-cyan/5 hover:bg-holo-cyan/15'
                : 'border-ivory/20 text-ivory-muted bg-midnight-card hover:text-ivory'
            }`}
            title="Toggle 3D visual motion"
          >
            <Sparkles className="w-3 h-3" />
            <span>Motion: {motionEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => openRegistration('institution')}
            className="iridescent-border group px-5 py-2 text-xs font-semibold text-ivory hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-holo-magenta/20"
          >
            <span>Register / Involve</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleMotion}
            className={`p-2 rounded-lg border text-xs font-mono ${
              motionEnabled ? 'border-holo-cyan/40 text-holo-cyan' : 'border-ivory/20 text-ivory-muted'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ivory hover:text-lavender focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-midnight/98 border-b border-lavender/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-2 text-base font-display text-ivory hover:text-lavender transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-lavender/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openHandbook();
              }}
              className="w-full py-2.5 rounded-full border border-lavender/30 text-xs font-semibold text-lavender flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-holo-cyan" />
              <span>Download Official Delegation Handbook</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openRegistration('institution');
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-holo-magenta via-holo-cyan to-holo-gold text-xs font-semibold text-midnight font-bold tracking-wider uppercase text-center shadow-lg"
            >
              Register / Enter Delegation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
