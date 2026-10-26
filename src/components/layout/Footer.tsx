import React from 'react';
import { TRUST_STANDARDS } from '../../data/detailsData';
import { useModalStore } from '../../store/useModalStore';
import { MapPin, Mail, Phone, FileText, ShieldAlert, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openHandbook } = useModalStore();

  return (
    <footer className="bg-midnight-darker border-t border-lavender/10 pt-16 pb-12 text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-lavender/10">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-2xl font-bold tracking-wider text-ivory">
                MANTHAN
              </span>
              <span className="text-xs tracking-widest uppercase font-mono px-2 py-0.5 rounded bg-burgundy/50 text-lavender border border-burgundy">
                PSYCHE
              </span>
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed font-sans">
              A two-day national youth festival in Jammu exploring the human psyche, mind, soul, and existence through dance, theatre, dialectic debate, live painting, and cognitive inquiry.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-holo-cyan">
              <Award className="w-4 h-4" />
              <span>Intercollegiate Academic & Cultural Assembly</span>
            </div>
          </div>

          {/* Location & Concourse */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-lavender font-semibold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-holo-cyan" />
              <span>Festival Concourse</span>
            </h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              {TRUST_STANDARDS.venue}
            </p>
            <p className="text-xs text-ivory-dim font-mono">
              Academic Senate Pavilion & Main Arts Proscenium
            </p>
            <p className="text-[11px] text-holo-gold/80 font-mono">
              Official Dates: 2026/27* (Pending Syndicate Calendar)
            </p>
          </div>

          {/* Secretariat Contact */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-lavender font-semibold flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-holo-magenta" />
              <span>Secretariat Inquiries</span>
            </h4>
            <div className="space-y-1.5 text-xs text-ivory-muted">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-ivory-dim" />
                <a href={`mailto:${TRUST_STANDARDS.contactEmail}`} className="hover:text-holo-cyan transition-colors">
                  {TRUST_STANDARDS.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-ivory-dim" />
                <span>{TRUST_STANDARDS.helplinePhone}</span>
              </div>
              <p className="text-[11px] text-ivory-dim pt-1">
                Hours: Monday – Saturday (09:30 to 17:30 IST)
              </p>
            </div>
          </div>

          {/* Governance & Resources */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-lavender font-semibold flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-holo-gold" />
              <span>Institutional Resources</span>
            </h4>
            <ul className="space-y-2 text-xs text-ivory-muted">
              <li>
                <button
                  onClick={openHandbook}
                  className="hover:text-lavender transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>→ Official Delegation Handbook & Rules</span>
                </button>
              </li>
              <li>
                <a href="#programme" className="hover:text-lavender transition-colors">
                  → Schedule & Venue Timelines
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-lavender transition-colors">
                  → "What We Provide" Logistics Matrix
                </a>
              </li>
              <li>
                <a href="#minds" className="hover:text-lavender transition-colors">
                  → Academic Juries & Adjudication Standards
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Non-Diagnostic Disclaimer Box */}
        <div className="my-8 p-4 rounded-xl bg-midnight-card border border-burgundy/40 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-burgundy-light shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-burgundy-light">
              Non-Diagnostic Educational Safeguard
            </p>
            <p className="text-xs text-ivory-muted leading-relaxed">
              {TRUST_STANDARDS.nonDiagnosticDisclaimer}
            </p>
          </div>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-ivory-dim gap-4">
          <p>
            © {new Date().getFullYear()} MANTHAN: PSYCHE. All institutional rights reserved. Built for academic integrity & creative inquiry.
          </p>
          <div className="flex items-center space-x-6 text-[11px] font-mono">
            <span className="text-ivory-dim hover:text-ivory cursor-pointer">Code of Conduct</span>
            <span className="text-ivory-dim hover:text-ivory cursor-pointer">Privacy & Data Ethics</span>
            <span className="text-ivory-dim hover:text-ivory cursor-pointer">Cancellation Policy</span>
            <span className="text-ivory-dim hover:text-ivory cursor-pointer">Institutional Affiliations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
