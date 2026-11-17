import React from 'react';
import { Compass, Lightbulb, Users2, Quote, Sparkles } from 'lucide-react';
import { InquiryGlobeCanvas } from '../ui/InquiryGlobeCanvas';
import { MANTHAN_CONTENT } from '../../data/manthanContent';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#0A0B1E] relative overflow-hidden border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column: Vision & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{MANTHAN_CONTENT.about.sectionTitle}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              {MANTHAN_CONTENT.about.headline}
            </h2>

            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              {MANTHAN_CONTENT.about.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'text-white font-medium text-lg sm:text-xl' : ''}>
                  {p}
                </p>
              ))}
            </div>

            {/* Soft Rounded Quote Box */}
            <div className="p-6 rounded-2xl bg-[#0F112B] border border-white/[0.06]">
              <div className="flex items-start gap-4">
                <Quote className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <p className="font-serif italic text-base sm:text-lg text-slate-200 leading-snug">
                  &ldquo;Understanding the human experience requires looking beyond a single discipline and bringing together different perspectives, ideas and forms of creativity.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Inquiry Globe */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <span className="text-[11px] font-mono text-amber-300/80 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>✦ Sphere of Human Inquiry ✦</span>
              <span className="text-[10px] text-slate-400 font-sans">(Drag to Rotate)</span>
            </span>
            <InquiryGlobeCanvas />
          </div>
        </div>

        {/* 3 Core Values / Pillars with Soft Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {MANTHAN_CONTENT.about.values.map((val, idx) => {
            const icons = [
              <Compass className="w-5 h-5 text-amber-400" key="1" />,
              <Lightbulb className="w-5 h-5 text-amber-400" key="2" />,
              <Users2 className="w-5 h-5 text-amber-400" key="3" />,
            ];

            return (
              <div
                key={val.title}
                className="theme-card p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      {icons[idx]}
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400/80">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {val.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
