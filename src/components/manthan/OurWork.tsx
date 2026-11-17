import React, { useState } from 'react';
import {
  GraduationCap,
  MessageSquareText,
  BookOpenCheck,
  Palette,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MANTHAN_CONTENT, WorkshopTopic } from '../../data/manthanContent';

interface OurWorkProps {
  onSelectTopicForBooking: (topicTitle: string) => void;
}

export const OurWork: React.FC<OurWorkProps> = ({ onSelectTopicForBooking }) => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'workshops'>('pillars');
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopTopic | null>(
    MANTHAN_CONTENT.workshops[0]
  );

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-amber-400" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-5 h-5 text-amber-400" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-5 h-5 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-amber-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-amber-400" />;
      default:
        return <GraduationCap className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleBookTopic = (topicTitle: string) => {
    onSelectTopicForBooking(topicTitle);
    const instEl = document.getElementById('institutions');
    if (instEl) {
      const navOffset = 80;
      const elementPosition = instEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="work" className="py-24 sm:py-32 bg-[#0A0B1E] relative overflow-hidden border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{MANTHAN_CONTENT.ourWork.sectionTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Connecting Knowledge, Dialogue & Creative Expression
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {MANTHAN_CONTENT.ourWork.lead}
          </p>

          {/* Soft Rounded Tab Toggles */}
          <div className="inline-flex p-1 bg-[#0F112B] rounded-full mt-8 border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pillars'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              5 Core Work Pillars
            </button>
            <button
              onClick={() => setActiveTab('workshops')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'workshops'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Educational Sessions & Topics</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: 5 CORE WORK PILLARS */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {MANTHAN_CONTENT.ourWork.pillars.map((pillar, index) => {
              const isFeatured = index === 0;
              return (
                <div
                  key={pillar.id}
                  className={`theme-card p-8 flex flex-col justify-between ${
                    isFeatured ? 'md:col-span-2 lg:col-span-2 bg-[#121538]' : ''
                  }`}
                >
                  <div>
                    {/* Top Bar with Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        {getPillarIcon(pillar.icon)}
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400/80 bg-white/[0.03] px-3 py-1 rounded-full">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                      {pillar.description}
                    </p>

                    {/* Highlights list with soft rounded pills */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase block">
                        Core Dimensions:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {pillar.highlights.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 text-xs text-amber-100/90 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {isFeatured && (
                    <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-slate-400 font-medium">
                        Open for Schools, Colleges & Universities across India.
                      </span>
                      <button
                        onClick={() => setActiveTab('workshops')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                      >
                        <span>Explore Detailed Session Topics</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: WORKSHOP CURRICULUM CATALOG */}
        {activeTab === 'workshops' && (
          <div className="theme-card p-6 sm:p-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Pillar 01 Curriculum
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-2">
                Educational Sessions & Workshop Topics
              </h3>
              <p className="text-sm text-slate-400">
                Schools, colleges and universities can select from these interactive modules or request a tailored syllabus for their student cohort.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Topic List */}
              <div className="lg:col-span-5 space-y-2">
                {MANTHAN_CONTENT.workshops.map((ws, i) => {
                  const isSelected = selectedWorkshop?.id === ws.id;
                  return (
                    <button
                      key={ws.id}
                      onClick={() => setSelectedWorkshop(ws)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500/40 text-white'
                          : 'bg-[#121538] border-white/5 hover:bg-[#161a46] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-amber-400/80">
                          0{i + 1}
                        </span>
                        <span className="text-sm font-semibold">
                          {ws.title}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Selected Topic Detail Card */}
              <div className="lg:col-span-7">
                {selectedWorkshop && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#121538] border border-white/5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/20 px-3.5 py-1 rounded-full">
                        Interactive Workshop Module
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Audience: {selectedWorkshop.recommendedFor}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-3">
                      {selectedWorkshop.title}
                    </h4>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-sans">
                      {selectedWorkshop.shortDesc}
                    </p>

                    <div className="mb-8">
                      <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase block mb-3">
                        Key Learning Dimensions:
                      </span>
                      <div className="space-y-2.5">
                        {selectedWorkshop.outcomes.map((out) => (
                          <div key={out} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-slate-200 font-medium">
                              {out}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => handleBookTopic(selectedWorkshop.title)}
                        className="btn-primary px-7 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer shadow"
                      >
                        <span>Book This Session for Your Institution</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-xs text-slate-500 font-medium">
                        Format: Interactive Facilitation + Experiential Inquiry
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
