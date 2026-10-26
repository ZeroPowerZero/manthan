import React, { useState } from 'react';
import { PROGRAMME_SESSIONS } from '../../data/programmeData';
import { ProgrammeDay, ProgrammeTrack } from '../../types/programme';
import { Sparkles, Calendar, Clock, MapPin, Tag } from 'lucide-react';

export const ProgrammeSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<ProgrammeDay>('day1');
  const [selectedTrack, setSelectedTrack] = useState<ProgrammeTrack>('all');

  const filteredSessions = PROGRAMME_SESSIONS.filter((session) => {
    const matchesDay = session.day === selectedDay;
    const matchesTrack = selectedTrack === 'all' || session.track === selectedTrack;
    return matchesDay && matchesTrack;
  });

  return (
    <section id="programme" className="relative py-28 md:py-36 bg-midnight-darker overflow-hidden border-t border-b border-lavender/10">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-holo-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lavender/20 bg-midnight-card/80 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-holo-cyan" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-lavender">
                05 · The Programme
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-ivory tracking-tight">
              Two-Day <span className="text-iridescent italic font-serif">Curricular Cadence</span>
            </h2>
            <p className="mt-2 text-sm text-ivory-muted max-w-xl font-sans">
              Main Auditorium stage showcases run in synchrony with academic concourses and parallel studios. Minimal motion applied for clean, effortless legibility.
            </p>
          </div>

          {/* Day Selector Buttons */}
          <div className="flex items-center p-1.5 rounded-2xl bg-midnight-card border border-lavender/15 self-start md:self-end">
            <button
              onClick={() => setSelectedDay('day1')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedDay === 'day1'
                  ? 'bg-gradient-to-r from-holo-magenta/80 to-holo-cyan/80 text-white shadow-lg'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>DAY 01 (FRIDAY)</span>
            </button>
            <button
              onClick={() => setSelectedDay('day2')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedDay === 'day2'
                  ? 'bg-gradient-to-r from-holo-cyan/80 to-holo-gold/80 text-midnight font-bold shadow-lg'
                  : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>DAY 02 (SATURDAY)</span>
            </button>
          </div>
        </div>

        {/* Track Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-lavender/10">
          <span className="text-xs font-mono text-ivory-dim mr-2">Filter Venue Track:</span>
          {(['all', 'auditorium', 'parallel'] as ProgrammeTrack[]).map((track) => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedTrack === track
                  ? 'bg-lavender text-midnight font-semibold'
                  : 'bg-midnight-card/80 border border-lavender/15 text-ivory-muted hover:text-ivory'
              }`}
            >
              {track === 'all' && 'All Concourse Tracks'}
              {track === 'auditorium' && 'Main Auditorium Stage (Dance / Theatre / Keynote)'}
              {track === 'parallel' && 'Parallel Rooms (Research / Painting / Debate / Labs)'}
            </button>
          ))}
        </div>

        {/* Timeline Stream */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className={`p-6 rounded-2xl transition-all duration-200 border ${
                session.isHighlight
                  ? 'bg-midnight-card/90 border-holo-cyan/40 shadow-lg shadow-holo-cyan/5'
                  : 'bg-midnight-card/40 border-lavender/10 hover:border-lavender/25'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Time Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-midnight border border-lavender/20 text-xs font-mono text-holo-cyan">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-semibold">{session.timeSlot}</span>
                  </div>

                  {/* Venue Tag */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-ivory-dim">
                    <MapPin className="w-3.5 h-3.5 text-lavender/60" />
                    <span>{session.venue}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-burgundy/30 text-lavender border border-burgundy/40">
                    <Tag className="w-2.5 h-2.5" />
                    <span>{session.category}</span>
                  </div>
                </div>

                {/* Track Badge */}
                <span className="text-[10px] font-mono uppercase tracking-widest text-ivory-dim/60 self-start md:self-auto">
                  {session.track === 'auditorium' ? 'Main Proscenium' : 'Academic Concourse'}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-ivory mb-2">
                {session.title}
              </h3>
              <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed max-w-4xl">
                {session.description}
              </p>

              {/* Optional Speaker or Capacity Notes */}
              {(session.speakerOrFacilitator || session.capacityNotes) && (
                <div className="mt-4 pt-3 border-t border-lavender/10 flex flex-wrap items-center gap-6 text-xs font-mono text-ivory-dim">
                  {session.speakerOrFacilitator && (
                    <span className="text-lavender">
                      <span className="text-ivory-dim">Facilitator / Keynote: </span>
                      {session.speakerOrFacilitator}
                    </span>
                  )}
                  {session.capacityNotes && (
                    <span className="text-holo-gold/90">
                      <span className="text-ivory-dim">Protocol: </span>
                      {session.capacityNotes}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
