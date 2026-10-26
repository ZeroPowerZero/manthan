import React from 'react';
import { useModalStore } from '../../store/useModalStore';
import { X, Clock, Users, MapPin, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export const EventDetailModal: React.FC = () => {
  const { activeEventModal, closeEventModal, openRegistration } = useModalStore();

  if (!activeEventModal) return null;

  const event = activeEventModal;
  const isPendingReconciliation = event.capacityStatus === 'pending_reconciliation';

  const handleRegister = () => {
    closeEventModal();
    openRegistration('institution', event.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-midnight/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-midnight-card border border-lavender/20 shadow-2xl text-ivory p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeEventModal}
          className="absolute top-6 right-6 p-2 rounded-full bg-midnight/80 border border-lavender/20 text-ivory-dim hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="mb-8 pr-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs tracking-widest text-holo-cyan uppercase font-semibold">
              PORTAL {event.number} · OFFICIAL SPECIFICATION
            </span>
            {isPendingReconciliation && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-burgundy/60 text-ivory border border-burgundy">
                Capacity Review
              </span>
            )}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory">
            {event.title}
          </h2>
          <p className="text-sm font-mono text-lavender mt-1">
            {event.subtitle}
          </p>
        </div>

        {/* Capacity Notice Alert if applicable */}
        {event.capacityNotice && (
          <div className="mb-8 p-4 rounded-2xl bg-burgundy/30 border border-burgundy/60 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-holo-gold shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-mono font-semibold uppercase tracking-wider text-holo-gold">
                Senate Capacity Reconciliation Notice
              </p>
              <p className="text-ivory-muted leading-relaxed">
                {event.capacityNotice}
              </p>
            </div>
          </div>
        )}

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-midnight border border-lavender/10 mb-8 text-xs font-mono">
          <div>
            <span className="text-[10px] text-ivory-dim block uppercase">Duration</span>
            <span className="text-holo-cyan font-semibold flex items-center gap-1.5 mt-1">
              <Clock className="w-3.5 h-3.5" />
              {event.duration}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-ivory-dim block uppercase">Team Format</span>
            <span className="text-lavender font-semibold flex items-center gap-1.5 mt-1">
              <Users className="w-3.5 h-3.5" />
              {event.teamFormat}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-ivory-dim block uppercase">Venue Concourse</span>
            <span className="text-holo-gold font-semibold flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {event.venue}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-ivory-dim block uppercase">Capacity Cap</span>
            <span className="text-ivory font-semibold truncate block mt-1">
              {event.capacity}
            </span>
          </div>
        </div>

        {/* Overview & Theme */}
        <div className="space-y-6 mb-8 text-sm">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-lavender font-semibold mb-2">
              Philosophical Scope & Purpose
            </h4>
            <p className="text-ivory-muted leading-relaxed font-sans">
              {event.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-midnight/50 border border-lavender/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-holo-cyan block mb-1">
              Curatorial Theme
            </span>
            <p className="font-display text-lg italic text-ivory">
              "{event.theme}"
            </p>
          </div>
        </div>

        {/* Rules & Eligibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Eligibility */}
          <div className="p-5 rounded-2xl bg-midnight/60 border border-lavender/10">
            <h4 className="font-mono text-xs uppercase tracking-widest text-holo-cyan font-semibold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-holo-cyan" />
              <span>Eligibility & Credentials</span>
            </h4>
            <ul className="space-y-2 text-xs text-ivory-muted">
              {event.eligibility.map((el, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{el}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Regulations */}
          <div className="p-5 rounded-2xl bg-midnight/60 border border-lavender/10">
            <h4 className="font-mono text-xs uppercase tracking-widest text-holo-magenta font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-holo-magenta" />
              <span>Performance Regulations</span>
            </h4>
            <ul className="space-y-2 text-xs text-ivory-muted">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-holo-magenta mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Judging Criteria Table */}
        <div className="mb-8">
          <h4 className="font-mono text-xs uppercase tracking-widest text-lavender font-semibold mb-3">
            Adjudication Framework & Jury Weights
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-lavender/10 bg-midnight">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-lavender/10 text-[11px] font-mono uppercase text-ivory-dim">
                  <th className="py-2.5 px-4 font-semibold">Evaluation Criterion</th>
                  <th className="py-2.5 px-4 font-semibold">Weight</th>
                  <th className="py-2.5 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lavender/10 text-ivory-muted">
                {event.judgingCriteria.map((crit, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-4 font-medium text-ivory">{crit.criterion}</td>
                    <td className="py-2.5 px-4 font-mono text-holo-cyan">{crit.weight}</td>
                    <td className="py-2.5 px-4">{crit.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Inclusions Strip & Trigger */}
        <div className="p-5 rounded-2xl bg-midnight border border-lavender/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-ivory-dim block">
              Official Festival Inclusions:
            </span>
            <p className="text-xs text-lavender mt-0.5">
              {event.inclusions.provided.slice(0, 2).join(' • ')} and official credentials
            </p>
          </div>

          <button
            onClick={handleRegister}
            className="iridescent-border group px-6 py-2.5 text-xs font-mono font-semibold text-ivory hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0"
          >
            <span>{isPendingReconciliation ? 'Notify on Capacity Release' : 'Register for this Event'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
