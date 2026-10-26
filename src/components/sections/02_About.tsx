import React from 'react';
import { Sparkles, Eye, Compass, Heart, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-midnight overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-holo-indigo/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lavender/20 bg-midnight-card/80 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-holo-cyan" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-lavender">
              02 · The Invitation
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight mb-6">
            A Crucible of the <br />
            <span className="text-iridescent italic font-serif">Human Spirit</span> in Jammu
          </h2>
          <p className="text-base sm:text-lg text-ivory-muted leading-relaxed font-sans">
            MANTHAN is not a passive symposium. It is an immersive two-day gathering where dance, theatre, parliamentary debate, live canvas painting, peer-reviewed cognitive research, and honest conversation converge to interrogate one enduring riddle: what does it mean to be human?
          </p>
        </div>

        {/* Mirrored Reflection Transition Motif ("Stillness" / Duality) */}
        <div className="relative my-16 max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 border border-lavender/10 bg-midnight-card/40 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Subtle water-surface specular gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-holo-cyan/5 via-transparent to-holo-magenta/5 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            {/* Left: Mirrored Silhouette Art Motif */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-midnight/70 border border-lavender/10">
              <div className="relative w-48 h-64 flex flex-col items-center justify-center">
                {/* Upper Meditative Figure */}
                <div className="w-24 h-24 rounded-full border border-holo-cyan/40 flex items-center justify-center shadow-lg shadow-holo-cyan/15">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-holo-cyan/20 to-holo-magenta/30 flex items-center justify-center">
                    <span className="text-holo-cyan text-xs font-mono tracking-tighter">MIND</span>
                  </div>
                </div>

                {/* Horizon Line / Water Plane */}
                <div className="w-full my-4 flex items-center justify-center relative">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-holo-cyan/50 to-transparent" />
                  <span className="absolute px-2 text-[9px] font-mono uppercase tracking-widest text-lavender/80 bg-midnight">
                    Stillness Plane
                  </span>
                </div>

                {/* Inverted Mirrored Reflection */}
                <div className="w-24 h-24 rounded-full border border-holo-magenta/30 flex items-center justify-center opacity-60 scale-y-[-1] filter blur-[0.5px]">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-holo-magenta/20 to-holo-gold/20 flex items-center justify-center">
                    <span className="text-holo-magenta text-xs font-mono tracking-tighter scale-y-[-1]">SOUL</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[11px] font-mono text-ivory-dim tracking-wider uppercase text-center">
                Reflective Duality · Self & Cosmos
              </p>
            </div>

            {/* Right: Institutional Vision Statement */}
            <div className="space-y-5">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ivory">
                The Architecture of Consciousness
              </h3>
              <p className="text-sm text-ivory-muted leading-relaxed font-sans">
                In an era dominated by algorithmic speed and sensory saturation, MANTHAN creates a sanctuary in Jammu for contemplation, rigorous discourse, and raw artistic vulnerability. 
              </p>
              <p className="text-sm text-ivory-muted leading-relaxed font-sans">
                Over two concentrated days, universities, colleges, and independent scholars convene not simply to compete, but to illuminate the subjective tapestry of consciousness.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-midnight border border-lavender/20 text-lavender">
                  2 Full Days
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-midnight border border-holo-cyan/30 text-holo-cyan">
                  Auditorium + 3 Parallel Tracks
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-midnight border border-holo-gold/30 text-holo-gold">
                  Peer-Reviewed Rigour
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of the Festival */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="p-6 rounded-2xl bg-midnight-card/60 border border-lavender/10 hover:border-holo-cyan/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-holo-cyan/10 border border-holo-cyan/20 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5 text-holo-cyan" />
            </div>
            <h4 className="font-display text-lg font-semibold text-ivory mb-2">Consciousness as Light</h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Live painting, optical investigations, and sensory art where the human form glows directly against deep cosmic darkness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-midnight-card/60 border border-lavender/10 hover:border-holo-magenta/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-holo-magenta/10 border border-holo-magenta/20 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 text-holo-magenta" />
            </div>
            <h4 className="font-display text-lg font-semibold text-ivory mb-2">Kinetic Catharsis</h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Choreographed movement and auditorium drama that articulate the unvoiced grief, joy, and paradoxes of the human condition.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-midnight-card/60 border border-lavender/10 hover:border-holo-gold/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-holo-gold/10 border border-holo-gold/20 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-holo-gold" />
            </div>
            <h4 className="font-display text-lg font-semibold text-ivory mb-2">Rigorous Dialectic</h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              90-second rapid-fire debate interrogating determinism, AI consciousness, and the moral responsibilities of selfhood.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-midnight-card/60 border border-lavender/10 hover:border-lavender/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-lavender/10 border border-lavender/20 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-lavender" />
            </div>
            <h4 className="font-display text-lg font-semibold text-ivory mb-2">Empirical Inquiry</h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              50 shortlisted research papers defended before senior psychologists, bridging laboratory cognitive science and philosophy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
