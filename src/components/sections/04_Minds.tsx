import React from 'react';
import { Sparkles, ShieldCheck, UserCheck, BookmarkCheck } from 'lucide-react';

export const MindsSection: React.FC = () => {
  const mindRoles = [
    {
      discipline: 'Keynote Psychology Dialogue',
      role: 'Invited Clinical Psychologist',
      institutionAffiliation: 'National Institute of Mental Health & Neurosciences / AIIMS Network',
      session: 'Joint 15-Minute Keynote: "What Does It Mean to Be Human?"',
      status: 'Confirmation in Senate Clearance',
      glow: '#C13DD6'
    },
    {
      discipline: 'Philosophy of Mind & Dialectics',
      role: 'Visiting Senior Philosopher',
      institutionAffiliation: 'Premier Central University Faculty of Humanities',
      session: 'Parliamentary Debate Jury Chair & Epistemology Dialogue',
      status: 'Confirmation in Senate Clearance',
      glow: '#4FD8E8'
    },
    {
      discipline: 'Cognitive Neuroscience & Perception',
      role: 'Research Forum Jury Chair',
      institutionAffiliation: 'Cognitive Science Research Initiative & Academic Review Board',
      session: '50 Research Papers Jury Evaluation & Best Paper Award',
      status: 'Confirmation in Senate Clearance',
      glow: '#F2B84B'
    },
    {
      discipline: 'Theatrical Arts & Body Movement',
      role: 'Sangeet Natak Akademi Fellow / Director',
      institutionAffiliation: 'National School of Drama / Contemporary Movement Arts',
      session: 'Masks and Mirrors & Dance Stage Adjudication',
      status: 'Confirmation in Senate Clearance',
      glow: '#D8C5F5'
    }
  ];

  return (
    <section id="minds" className="relative py-28 md:py-36 bg-midnight overflow-hidden">
      {/* Awakening cosmic aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-holo-magenta/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lavender/20 bg-midnight-card/80 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-holo-gold" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-lavender">
              04 · The Minds & Partners
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight mb-4">
            Intellectual Rigour & <br />
            <span className="text-iridescent italic font-serif">Academic Stewardship</span>
          </h2>
          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-sans">
            Under Blueprint Section 08 quality standards, MANTHAN adheres to strict governance: guest scholars, adjudicators, and keynote psychologists are officially published only upon signed syndicate protocol.
          </p>
        </div>

        {/* 4 Soft-glowing Academic Placeholder Cards (Awakening Motif) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mindRoles.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl p-6 bg-midnight-card/70 border border-lavender/10 hover:border-lavender/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Celestial Portrait Placeholder */}
                <div className="relative w-full aspect-square rounded-2xl bg-midnight/90 border border-lavender/15 flex flex-col items-center justify-center p-6 mb-5 overflow-hidden group-hover:border-holo-cyan/40 transition-colors">
                  {/* Subtle pulsing core */}
                  <div 
                    className="w-20 h-20 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity"
                    style={{ background: item.glow }}
                  />
                  <div className="relative z-10 w-14 h-14 rounded-full border border-lavender/30 bg-midnight/80 flex items-center justify-center shadow-inner">
                    <UserCheck className="w-6 h-6 text-lavender/80" />
                  </div>
                  <span className="relative z-10 mt-3 text-[10px] font-mono tracking-widest uppercase text-ivory-dim">
                    Confirmed Guest
                  </span>
                  <span className="relative z-10 text-[9px] font-mono text-holo-cyan/80">
                    Announcement Imminent
                  </span>
                </div>

                {/* Role Details */}
                <span className="text-[10px] font-mono uppercase tracking-wider text-holo-cyan block mb-1">
                  {item.discipline}
                </span>
                <h4 className="font-display text-lg font-semibold text-ivory mb-2">
                  {item.role}
                </h4>
                <p className="text-xs text-ivory-muted leading-relaxed mb-4">
                  {item.institutionAffiliation}
                </p>
              </div>

              {/* Session Footnote */}
              <div className="pt-3 border-t border-lavender/10 text-[11px] font-mono text-ivory-dim">
                <p className="text-lavender/80 font-medium">{item.session}</p>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-holo-gold/80">
                  <BookmarkCheck className="w-3 h-3" />
                  <span>{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Partner Endorsement Bar */}
        <div className="p-8 rounded-3xl bg-midnight-surface/80 border border-lavender/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-burgundy/40 border border-burgundy flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-lavender" />
            </div>
            <div>
              <h5 className="font-display text-lg font-semibold text-ivory">
                Institutional Academic Endorsement
              </h5>
              <p className="text-xs text-ivory-muted">
                Inviting university student councils, psychology departments, and cultural boards across Jammu, Kashmir, and northern universities.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="px-4 py-2 rounded-full border border-lavender/20 text-xs font-mono text-lavender bg-midnight">
              Accredited Youth Festival
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
