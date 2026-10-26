import React, { useState } from 'react';
import { EVENTS_DATA } from '../../data/eventsData';
import { EventDetail } from '../../types/events';
import { useModalStore } from '../../store/useModalStore';
import { Sparkles, Clock, Users, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { openEventModal, openRegistration } = useModalStore();
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  const handleCardClick = (event: EventDetail) => {
    openEventModal(event);
  };

  const handleRegisterDirect = (e: React.MouseEvent, event: EventDetail) => {
    e.stopPropagation();
    if (event.capacityStatus === 'pending_reconciliation') {
      openEventModal(event);
    } else {
      openRegistration('institution', event.id);
    }
  };

  return (
    <section id="experience" className="relative py-28 md:py-36 bg-midnight overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-holo-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-holo-magenta/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-lavender/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lavender/20 bg-midnight-card/80 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-holo-cyan" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-lavender">
                03 · Inside the Experience
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight">
              Seven Portals of <span className="text-iridescent italic font-serif">Inquiry</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ivory-muted max-w-2xl font-sans">
              Each event operates as a distinct vehicle for exploring the mind. Frameless, luminescent, and rigorously adjudicated. Tap any portal to review regulations, dossier criteria, and registration status.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono text-ivory-dim block">
              7 Official Competitive & Scholarly Tracks
            </span>
            <span className="text-xs font-mono text-holo-cyan">
              Jammu Campus Venues
            </span>
          </div>
        </div>

        {/* 7 Frameless Interactive Event Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS_DATA.map((event, index) => {
            const isHovered = hoveredEventId === event.id;
            const isPendingReconciliation = event.capacityStatus === 'pending_reconciliation';

            return (
              <div
                key={event.id}
                onMouseEnter={() => setHoveredEventId(event.id)}
                onMouseLeave={() => setHoveredEventId(null)}
                onClick={() => handleCardClick(event)}
                className={`group relative rounded-3xl p-7 transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
                style={{
                  background: 'linear-gradient(145deg, rgba(27, 23, 36, 0.7) 0%, rgba(20, 17, 27, 0.95) 100%)',
                  boxShadow: isHovered
                    ? `0 20px 40px -15px ${event.color.glow}, 0 0 0 1px ${event.color.primary}60`
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(216, 197, 245, 0.08)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                {/* Thin iridescent hover border flare */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${event.color.accent}33, transparent 70%)`
                  }}
                />

                {/* Top Row: Event Number & Status Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm tracking-widest text-lavender/60 group-hover:text-lavender transition-colors font-semibold">
                      PORTAL {event.number}
                    </span>

                    {isPendingReconciliation ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-burgundy/60 text-ivory border border-burgundy">
                        <AlertCircle className="w-3 h-3 text-holo-gold" />
                        <span>Capacity Review</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono bg-midnight border border-lavender/15 text-ivory-dim group-hover:border-holo-cyan/40 group-hover:text-holo-cyan transition-colors">
                        <CheckCircle2 className="w-3 h-3 text-holo-cyan" />
                        <span>Open Quota</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ivory group-hover:text-lavender transition-colors mb-2 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-xs text-holo-cyan font-mono mb-3">
                    {event.subtitle}
                  </p>
                  <p className="text-xs text-ivory-muted leading-relaxed line-clamp-3 mb-6">
                    {event.description}
                  </p>
                </div>

                {/* Event Facts Strip & Bottom Trigger */}
                <div>
                  <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-lavender/10 text-[11px] font-mono text-ivory-dim mb-5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-lavender/60" />
                      <span className="truncate">{event.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-lavender/60" />
                      <span className="truncate">{event.teamFormat}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono text-lavender group-hover:text-white flex items-center gap-1 transition-colors">
                      <span>Inspect Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>

                    <button
                      onClick={(e) => handleRegisterDirect(e, event)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-medium transition-all ${
                        isPendingReconciliation
                          ? 'bg-burgundy/40 text-ivory hover:bg-burgundy border border-burgundy'
                          : 'bg-midnight-card hover:bg-holo-cyan hover:text-midnight border border-lavender/20 text-ivory'
                      }`}
                    >
                      {isPendingReconciliation ? 'Notify Me' : 'Register Event'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
