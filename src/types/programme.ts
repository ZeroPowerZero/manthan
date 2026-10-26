export type ProgrammeTrack = 'auditorium' | 'parallel' | 'all';
export type ProgrammeDay = 'day1' | 'day2';

export interface ProgrammeSession {
  id: string;
  day: ProgrammeDay;
  timeSlot: string;
  track: 'auditorium' | 'parallel';
  title: string;
  venue: string;
  category: string;
  description: string;
  speakerOrFacilitator?: string;
  capacityNotes?: string;
  isHighlight?: boolean;
}
