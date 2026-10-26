import React from 'react';
import { PRICING_TIERS } from '../../data/detailsData';
import { RegistrationPathway } from '../../types/registration';
import { useModalStore } from '../../store/useModalStore';
import { Sparkles, Building2, User, BookOpenCheck, Store, Handshake, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegistrationSection: React.FC = () => {
  const { openRegistration } = useModalStore();

  const pathways: {
    id: RegistrationPathway;
    title: string;
    badge: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    limits: string;
  }[] = [
    {
      id: 'institution',
      title: 'Official Institution Delegation',
      badge: 'Schools & Colleges',
      description: 'Comprehensive roster portal for faculty coordinators. Register teams across Painting (1), Debate (2), Theatre (up to 6), and Dance (up to 6).',
      icon: <Building2 className="w-6 h-6 text-holo-cyan" />,
      color: '#4FD8E8',
      limits: 'Multi-category access with strict cross-roster verification.'
    },
    {
      id: 'individual',
      title: 'Individual Student Participant',
      badge: 'Solo / Independent',
      description: 'Single-event registration for students entering independently in open categories or solo painting.',
      icon: <User className="w-6 h-6 text-holo-magenta" />,
      color: '#C13DD6',
      limits: 'Restricted to 1 category only.'
    },
    {
      id: 'research_scholar',
      title: 'Research Scholar / Paper Author',
      badge: 'Academic Forum',
      description: 'Submit original empirical or theoretical papers across cognitive science, perception, and psychology for peer review.',
      icon: <BookOpenCheck className="w-6 h-6 text-holo-gold" />,
      color: '#F2B84B',
      limits: 'Includes paper title, abstract, and manuscript dropzone.'
    },
    {
      id: 'stall_vendor',
      title: 'Artisan & Academic Stall Vendor',
      badge: 'Concourse Marketplace',
      description: 'Book display canopies for books, psychology apparatus, mindfulness artifacts, or student craft initiatives.',
      icon: <Store className="w-6 h-6 text-lavender" />,
      color: '#D8C5F5',
      limits: 'Includes 6x6 / 10x10 space, power socket, and vendor badges.'
    },
    {
      id: 'sponsor_partner',
      title: 'Corporate Patron & CSR Partner',
      badge: 'Bespoke Patronage',
      description: 'Direct inquiry channel for university patrons, cultural councils, and institutional supporters.',
      icon: <Handshake className="w-6 h-6 text-ivory" />,
      color: '#F2E9DB',
      limits: 'Routes directly to Festival Secretariat (No checkout gate).'
    }
  ];

  return (
    <section id="register" className="relative py-28 md:py-36 bg-midnight overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-holo-indigo/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lavender/20 bg-midnight-card/80 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-holo-cyan" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-lavender">
              06 · Join the Experience
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight mb-4">
            Five Gateways into <br />
            <span className="text-iridescent italic font-serif">The Human Psyche</span>
          </h2>
          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-sans">
            Every visitor has a dedicated path. Choose your portal below to open the registration engine with automatic draft persistence.
          </p>
        </div>

        {/* Visual Motif: "Connection" (Two Hands Touching Spark of Light) */}
        <div className="relative my-12 max-w-2xl mx-auto p-6 rounded-3xl bg-midnight-card/60 border border-lavender/10 flex items-center justify-center overflow-hidden">
          <div className="relative w-full flex items-center justify-between px-6 sm:px-12 py-3">
            {/* Left Hand Indicator */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-lavender/80">Self</span>
              <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-lavender/40 to-holo-cyan" />
            </div>

            {/* Central Spark of Connection */}
            <div className="relative flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-holo-cyan blur-sm animate-ping opacity-75" />
              <div className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#4FD8E8]" />
            </div>

            {/* Right Hand Indicator */}
            <div className="flex items-center gap-2">
              <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-holo-magenta to-lavender/40" />
              <span className="font-mono text-xs uppercase tracking-widest text-lavender/80">Cosmos</span>
            </div>
          </div>
        </div>

        {/* 5 Pathways Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {pathways.map((pathway, idx) => (
            <div
              key={pathway.id}
              onClick={() => openRegistration(pathway.id)}
              className={`group relative rounded-3xl p-7 bg-midnight-card/70 border border-lavender/10 hover:border-lavender/30 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1 border-holo-cyan/40 shadow-lg shadow-holo-cyan/5' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-midnight border border-lavender/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pathway.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-midnight border border-lavender/15 text-lavender">
                    {pathway.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-ivory mb-2 group-hover:text-lavender transition-colors">
                  {pathway.title}
                </h3>
                <p className="text-xs text-ivory-muted leading-relaxed mb-4">
                  {pathway.description}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-lavender/10 text-[11px] font-mono text-ivory-dim mb-4">
                  {pathway.limits}
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-full bg-midnight border border-lavender/20 group-hover:bg-holo-cyan group-hover:text-midnight group-hover:font-semibold transition-all text-xs font-mono flex items-center justify-center gap-2 text-ivory"
                >
                  <span>Launch Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fees & Inclusions Breakdown Table (Strict Blueprint Formatting: Burgundy Headers & Ivory Text) */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-lavender/15 shadow-2xl bg-midnight-card">
          {/* Table Banner Header */}
          <div className="bg-burgundy px-8 py-5 border-b border-burgundy-light/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-ivory">
                Schedule of Fees & Participation Entitlements
              </h3>
              <p className="text-xs text-ivory/80 font-mono">
                Blueprint Section 06 Standard · Unconfirmed figures strictly designated as [Fee TBA]
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-dark/70 text-[11px] font-mono text-ivory border border-burgundy-light/30">
              <ShieldCheck className="w-3.5 h-3.5 text-holo-gold" />
              <span>Institutional Transparency</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-burgundy-dark/60 text-ivory border-b border-lavender/10 text-xs font-mono uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Registration Category</th>
                  <th className="py-4 px-6 font-semibold">Published Fee</th>
                  <th className="py-4 px-6 font-semibold">Scope of Access & Deliverables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lavender/10 text-xs text-ivory font-sans">
                {PRICING_TIERS.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-midnight/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-ivory">
                      <span className="block font-semibold text-sm">{tier.type}</span>
                      <span className="text-[11px] text-ivory-dim font-mono">{tier.covers}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-holo-gold font-semibold whitespace-nowrap">
                      {tier.displayPrice}
                      {tier.note && (
                        <span className="block text-[10px] text-ivory-dim font-normal font-sans mt-0.5">
                          {tier.note}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-ivory-muted leading-relaxed">
                      {tier.inclusionsSummary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Disclaimer */}
          <div className="p-4 bg-midnight border-t border-lavender/10 text-center text-xs font-mono text-ivory-dim">
            Final approved fees will be published upon official syndicate ratifications. Draft submissions are preserved in local storage.
          </div>
        </div>
      </div>
    </section>
  );
};
