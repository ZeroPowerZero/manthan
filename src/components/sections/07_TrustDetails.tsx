import React, { useState } from 'react';
import { ELIGIBILITY_RULES, INCLUSIONS_MATRIX, TRUST_STANDARDS } from '../../data/detailsData';
import { useModalStore } from '../../store/useModalStore';
import { Sparkles, Check, Plus, AlertCircle, ChevronDown, ChevronUp, Download } from 'lucide-react';

export const TrustDetailsSection: React.FC = () => {
  const { openHandbook } = useModalStore();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="details" className="relative py-28 md:py-36 bg-midnight text-ivory border-t border-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lavender/20 bg-midnight-card/80 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-lavender" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-lavender">
              07 · The Details & Trust Standards
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-ivory tracking-tight mb-4">
            Clarity, Regulations & <br />
            <span className="text-iridescent italic font-serif">Participation Safeguards</span>
          </h2>
          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-sans">
            Nothing left for a phone call. High-contrast, zero-motion reference section detailing institutional permissions, venue inclusions, and eligibility protocols.
          </p>
        </div>

        {/* ================= 3-COLUMN "WHAT WE PROVIDE" MATRIX ================= */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-ivory mb-6 text-center">
            Logistical Transparency: The Three-Column Provision Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Included */}
            <div className="rounded-3xl p-6 bg-midnight-card/80 border border-holo-cyan/30 flex flex-col justify-between shadow-lg shadow-holo-cyan/5">
              <div>
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-lavender/10">
                  <div className="w-8 h-8 rounded-xl bg-holo-cyan/15 flex items-center justify-center">
                    <Check className="w-4 h-4 text-holo-cyan" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-ivory">Included in Entry</h4>
                    <span className="text-[10px] font-mono text-holo-cyan uppercase tracking-wider">
                      Guaranteed by Secretariat
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-ivory-muted">
                  {INCLUSIONS_MATRIX.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Optional, Paid Separately */}
            <div className="rounded-3xl p-6 bg-midnight-card/80 border border-lavender/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-lavender/10">
                  <div className="w-8 h-8 rounded-xl bg-lavender/15 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-lavender" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-ivory">Optional Add-ons</h4>
                    <span className="text-[10px] font-mono text-lavender uppercase tracking-wider">
                      Booked Separately
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-ivory-muted">
                  {INCLUSIONS_MATRIX.optional.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-lavender mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Arranged by Participant */}
            <div className="rounded-3xl p-6 bg-midnight-card/80 border border-burgundy/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-lavender/10">
                  <div className="w-8 h-8 rounded-xl bg-burgundy/30 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-holo-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-ivory">Participant Arranged</h4>
                    <span className="text-[10px] font-mono text-holo-gold uppercase tracking-wider">
                      Bring With You
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-ivory-muted">
                  {INCLUSIONS_MATRIX.participantArranged.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-holo-gold mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ELIGIBILITY & RULES ACCORDION ================= */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-semibold text-ivory mb-6 text-center">
            Frequently Addressed Regulations & Institutional Governance
          </h3>
          <div className="space-y-3">
            {ELIGIBILITY_RULES.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-lavender/15 bg-midnight-card/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 hover:bg-midnight/60 transition-colors cursor-pointer"
                  >
                    <span className="font-display text-base sm:text-lg font-medium text-ivory">
                      {item.question}
                    </span>
                    <span className="p-1 rounded-full bg-midnight border border-lavender/15 text-lavender shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-ivory-muted leading-relaxed font-sans border-t border-lavender/10">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= OFFICIAL HANDBOOK DOWNLOAD CTA ================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-burgundy/30 via-midnight-card to-holo-indigo/20 border border-lavender/20 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-midnight border border-holo-cyan/40 flex items-center justify-center mb-5 shadow-lg shadow-holo-cyan/15">
            <Download className="w-6 h-6 text-holo-cyan" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ivory mb-3">
            Download the Official Delegation Handbook & Syllabus
          </h3>
          <p className="text-xs sm:text-sm text-ivory-muted max-w-xl mb-6 font-sans">
            A comprehensive institutional dossier containing stage dimensional schematics, lighting cue guidelines, research abstract formatting templates, and official faculty delegation forms.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openHandbook}
              className="iridescent-border group px-6 py-3 text-xs font-mono font-semibold text-ivory hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-holo-magenta/20"
            >
              <span>Download Handbook (PDF)</span>
              <Download className="w-3.5 h-3.5 text-holo-cyan" />
            </button>
            <a
              href={`mailto:${TRUST_STANDARDS.contactEmail}?subject=Institutional%20Inquiry%20MANTHAN%20PSYCHE`}
              className="px-6 py-3 rounded-full border border-lavender/20 bg-midnight text-xs font-mono text-lavender hover:text-ivory transition-colors"
            >
              Contact Festival Director
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
