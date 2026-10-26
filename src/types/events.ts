export type EventCategory = 
  | 'painting'
  | 'dance'
  | 'theatre'
  | 'debate'
  | 'academic_forum'
  | 'research_forum'
  | 'psychology_experiences';

export interface EventDetail {
  id: EventCategory;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  duration: string;
  teamFormat: string;
  capacity: string;
  venue: string;
  theme: string;
  eligibility: string[];
  rules: string[];
  judgingCriteria: { criterion: string; weight: string; description: string }[];
  inclusions: {
    provided: string[];
    optional: string[];
    participantBrings: string[];
  };
  capacityStatus: 'open' | 'pending_reconciliation' | 'invite_only' | 'open_participation';
  capacityNotice?: string;
  color: {
    primary: string;
    accent: string;
    glow: string;
  };
}
