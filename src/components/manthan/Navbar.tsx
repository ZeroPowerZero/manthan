import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { MANTHAN_CONTENT } from '../../data/manthanContent';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Our Work', href: '#work' },
    { label: 'Institutions', href: '#institutions' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0B1E]/95 backdrop-blur-md border-b border-white/[0.06] shadow-xl py-3'
          : 'bg-[#0A0B1E]/80 backdrop-blur-sm border-b border-white/[0.03] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          {/* Transparent Logo Emblem */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
            <img
              src="/manthan-emblem-transparent.png"
              alt="MANTHAN Emblem"
              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(251,191,36,0.35)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sans text-lg sm:text-xl font-black tracking-[0.2em] text-[#EDD8BD] group-hover:text-amber-300 transition-colors uppercase">
                MANTHAN
              </span>
            </div>
            <span className="text-[11px] text-amber-200/70 font-serif italic hidden sm:inline -mt-0.5">
              Celebrating the Art of Being Human
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors duration-150 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${MANTHAN_CONTENT.contact.phone}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{MANTHAN_CONTENT.contact.phoneFormatted}</span>
          </a>

          <button
            onClick={() => handleNavClick('#institutions')}
            className="btn-primary flex items-center gap-1.5 px-5 py-2 text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-sm rounded-full"
          >
            <span>Book a Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/[0.05] focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F112B]/95 backdrop-blur-xl border-b border-white/[0.08] px-6 py-6 flex flex-col gap-4 shadow-2xl">
          <div className="flex flex-col gap-2 pb-4 border-b border-white/[0.06]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-semibold text-slate-200 hover:text-amber-300 py-1.5 transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <a
              href={`tel:${MANTHAN_CONTENT.contact.phone}`}
              className="text-xs font-medium text-slate-300 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{MANTHAN_CONTENT.contact.phoneFormatted}</span>
            </a>

            <button
              onClick={() => handleNavClick('#institutions')}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold btn-primary cursor-pointer shadow rounded-full"
            >
              <span>Book an Institutional Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
