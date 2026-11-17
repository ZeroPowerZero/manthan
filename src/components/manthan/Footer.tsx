import React from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { MANTHAN_CONTENT } from '../../data/manthanContent';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <footer className="w-full bg-[#070817] border-t border-white/[0.06] py-16 px-4 sm:px-6 lg:px-8 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/manthan-emblem-transparent.png"
                  alt="MANTHAN Emblem"
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-lg font-black text-[#EDD8BD] tracking-[0.2em] uppercase">
                  MANTHAN
                </span>
                <span className="text-[11px] font-serif italic text-amber-300 -mt-0.5">
                  Celebrating the Art of Being Human
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans">
              MANTHAN is a youth-led interdisciplinary cultural initiative exploring psychology, philosophy, science, research, art, performance, and dialogue.
            </p>

            <div className="pt-1 text-xs text-amber-300/80 font-medium">
              ✦ Bringing inquiry and dialogue to schools, colleges and universities across India.
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  About MANTHAN (Who We Are)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('work')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Our Work & Workshops
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('institutions')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Bringing MANTHAN to Institutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Official Communication */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 block">
              Official Communication
            </span>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <a
                  href={`tel:${MANTHAN_CONTENT.contact.phone}`}
                  className="hover:text-amber-300 font-medium"
                >
                  {MANTHAN_CONTENT.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <a
                  href={`mailto:${MANTHAN_CONTENT.contact.email}`}
                  className="hover:text-amber-300 font-medium break-all"
                >
                  {MANTHAN_CONTENT.contact.email}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => scrollTo('institutions')}
                className="btn-primary px-5 py-2.5 text-xs font-bold cursor-pointer shadow-sm inline-flex items-center gap-1.5 rounded-full"
              >
                <span>Book an Institutional Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} MANTHAN Initiative. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-slate-400">
              Youth-Led Interdisciplinary Cultural Initiative
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#121538] hover:bg-[#181C48] text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer shadow-sm"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
