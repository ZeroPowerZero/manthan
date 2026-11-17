import React from 'react';
import { SESSIONS_DATA, SessionTopic } from '../../data/manthanContent';
import { Brain, Compass, BookOpen, Heart, Users, Palette, ArrowRight, UserCheck } from 'lucide-react';

interface SessionsProps {
  onSelectSessionForBooking: (topicTitle: string) => void;
}

export const Sessions: React.FC<SessionsProps> = ({ onSelectSessionForBooking }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'psychology-wellbeing':
        return <Brain className="w-5 h-5 text-holo-cyan" />;
      case 'self-discovery':
        return <Compass className="w-5 h-5 text-holo-magenta" />;
      case 'philosophy-thinking':
        return <BookOpen className="w-5 h-5 text-holo-gold" />;
      case 'emotional-intelligence':
        return <Heart className="w-5 h-5 text-holo-cyan" />;
      case 'human-behaviour':
        return <Users className="w-5 h-5 text-lavender" />;
      case 'creativity-expression':
        return <Palette className="w-5 h-5 text-holo-magenta" />;
      default:
        return <Brain className="w-5 h-5 text-holo-cyan" />;
    }
  };

  const handleBook = (session: SessionTopic) => {
    onSelectSessionForBooking(session.title);
    const bookEl = document.getElementById('book');
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sessions" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 bg-midnight-surface border-t border-b border-lavender/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-widest text-holo-cyan uppercase mb-3">
            Institutional Programmes
          </span>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight mb-4">
            Sessions Offered
          </h2>
          <p className="text-sm sm:text-base text-ivory/70 font-sans leading-relaxed">
            Thoughtfully crafted interactive sessions designed for schools, colleges, and educational institutions.
            Each session blends experiential learning, inquiry, and practical psychological understanding.
          </p>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SESSIONS_DATA.map((session: SessionTopic, index: number) => (
            <div
              key={session.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-lavender/15 bg-midnight/60 hover:bg-midnight/90 transition-all duration-300 group"
            >
              <div>
                {/* Header with Icon & Index */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(session.id)}
                  </div>
                  <span className="font-mono text-[11px] text-lavender/40 font-semibold">
                    0{index + 1}
                  </span>
                </div>

                {/* Session Title */}
                <h3 className="text-lg font-semibold text-ivory tracking-tight mb-2.5 group-hover:text-holo-cyan transition-colors">
                  {session.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-[13px] text-ivory/65 leading-relaxed font-sans mb-5">
                  {session.shortDesc}
                </p>

                {/* Intended Audience Tag */}
                <div className="mb-4 pt-3 border-t border-white/5">
                  <div className="flex items-start gap-1.5 text-[11px] font-mono text-lavender/80">
                    <UserCheck className="w-3.5 h-3.5 mt-0.5 text-holo-gold shrink-0" />
                    <span>
                      <strong className="text-ivory/90 font-medium">Audience: </strong>
                      {session.intendedAudience}
                    </span>
                  </div>
                </div>

                {/* Key focus tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {session.keyAreas.map((area: string) => (
                    <span
                      key={area}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/5 text-ivory-dim"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBook(session)}
                className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-lavender hover:text-ivory bg-white/5 hover:bg-holo-cyan hover:text-midnight border border-lavender/15 hover:border-transparent transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer group-hover:border-holo-cyan/40"
              >
                <span>Enquire About This Session</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Note on Customization */}
        <div className="mt-12 text-center p-5 rounded-2xl border border-lavender/10 bg-midnight/40 max-w-2xl mx-auto">
          <p className="text-xs text-ivory/60 font-sans leading-relaxed">
            ✦ <span className="text-ivory/80 font-medium">Customizable Formats:</span> These represent initial focus areas.
            Session duration, depth, and specific modules can be tailored in conversation with your institution to match student age group and curriculum goals.
          </p>
        </div>
      </div>
    </section>
  );
};
