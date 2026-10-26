import { ProgrammeSession } from '../types/programme';

export const PROGRAMME_SESSIONS: ProgrammeSession[] = [
  // DAY 1 - AUDITORIUM
  {
    id: 'd1-aud-1',
    day: 'day1',
    timeSlot: '09:00 — 10:15',
    track: 'auditorium',
    title: 'The Awakening: Opening Ceremonies & Keynote Prelude',
    venue: 'Main Auditorium Proscenium',
    category: 'Ceremony & Keynote',
    description: 'Inauguration of MANTHAN: PSYCHE with welcome addresses from university patrons, invocation of the festival ethos, and an introductory audiovisual immersion.',
    speakerOrFacilitator: 'Patron Council & Visiting Luminaries',
    isHighlight: true
  },
  {
    id: 'd1-aud-2',
    day: 'day1',
    timeSlot: '10:30 — 10:45',
    track: 'auditorium',
    title: 'Joint Keynote: "What Does It Mean to Be Human?"',
    venue: 'Main Auditorium',
    category: 'Keynote Dialogue',
    description: 'A 15-minute interdisciplinary dialogue delivered jointly by two prominent visiting psychologists unpacking the dualities of cognition and existential awareness.',
    speakerOrFacilitator: 'Two Invited Clinical & Cognitive Psychologists',
    isHighlight: true
  },
  {
    id: 'd1-aud-3',
    day: 'day1',
    timeSlot: '11:00 — 13:30',
    track: 'auditorium',
    title: 'Dance — Movement Beyond Words (Day 1 Session)',
    venue: 'Main Auditorium Stage',
    category: 'Stage Competition',
    description: '15 shortlisted college and school troupes present 3-minute choreographic explorations of psychological states, emotional conflict, and transcendence.',
    capacityNotes: '15 Troupes (Max 6 per troupe). Pre-allocated stage slots.'
  },
  {
    id: 'd1-aud-4',
    day: 'day1',
    timeSlot: '14:30 — 17:30',
    track: 'auditorium',
    title: 'Theatre — Masks and Mirrors (Day 1 Productions)',
    venue: 'Main Auditorium Stage',
    category: 'Stage Competition',
    description: '15 dramatic one-act plays and dramatic skits tackling the unmasking of character, moral paradoxes, and inner dialogue. 10 minutes per team inclusive of set change.',
    capacityNotes: '15 Dramatic Ensembles. Strict technical cue management.'
  },

  // DAY 1 - PARALLEL ROOMS
  {
    id: 'd1-par-1',
    day: 'day1',
    timeSlot: '10:30 — 12:00',
    track: 'parallel',
    title: 'Painting — The Inner Canvas (Live 90-Min Session)',
    venue: 'Parallel Studio Gallery A',
    category: 'Visual Arts Competition',
    description: '90-minute live painting immersion. Institutional delegates create original works on canvas boards responding to "The Mind Unveiled".',
    capacityNotes: 'Strict quota: 1 painter per institution. Easels pre-assigned.'
  },
  {
    id: 'd1-par-2',
    day: 'day1',
    timeSlot: '11:30 — 14:00',
    track: 'parallel',
    title: 'Debate — The Question of Reality (Preliminary Clashes)',
    venue: 'Parallel Seminar Hall Beta',
    category: 'Parliamentary Debate',
    description: 'Rapid-fire 90-second speeches confronting free will, cognitive determinism, and ethical autonomy.',
    capacityNotes: 'Capacity reconciliation notice: Registration will unlock upon final quota decision.'
  },
  {
    id: 'd1-par-3',
    day: 'day1',
    timeSlot: '10:00 — 17:00',
    track: 'parallel',
    title: 'Research Forum — Ideas Into Inquiry (Day 1 Track: 25 Papers)',
    venue: 'Academic Concourse Room 101 & 102',
    category: 'Scholarly Research',
    description: '25 peer-shortlisted research papers presented across 2 concurrent halls. 7-minute empirical presentation followed by a 3-minute defense before academic reviewers.',
    capacityNotes: '25 Papers scheduled for Day 1. Proceedings index published on site.'
  },
  {
    id: 'd1-par-4',
    day: 'day1',
    timeSlot: '10:00 — 18:00',
    track: 'parallel',
    title: 'Psychology Experiences & Artisan Stalls Concourse',
    venue: 'Perception Pavilion & Central Courtyard',
    category: 'Interactive Labs & Stalls',
    description: 'Non-diagnostic sensory and cognitive pods: optical illusions, memory span challenges, biofeedback mindfulness rooms, along with student & brand stalls.',
    speakerOrFacilitator: 'Peer Psychology Mentors & Student Curators'
  },
  {
    id: 'd1-par-5',
    day: 'day1',
    timeSlot: '18:15 — 19:45',
    track: 'parallel',
    title: 'Twilight Open Mic: Reflections on Existence',
    venue: 'Courtyard Amphitheatre',
    category: 'Open Forum & Poetry',
    description: 'An acoustic spoken word, poetry, and acoustic storytelling gathering reflecting on human vulnerability, grief, hope, and resilience.',
    isHighlight: true
  },

  // DAY 2 - AUDITORIUM
  {
    id: 'd2-aud-1',
    day: 'day2',
    timeSlot: '09:30 — 10:45',
    track: 'auditorium',
    title: 'Academic Forum: "Minds in Dialogue — The Frontiers of Consciousness"',
    venue: 'Main Auditorium',
    category: 'Interdisciplinary Symposium',
    description: 'Panel exploration bringing together cognitive psychologists, philosophers, and neuroscientists on the subjective experience in an AI-saturated world.',
    speakerOrFacilitator: 'Invited Keynote Panelists'
  },
  {
    id: 'd2-aud-2',
    day: 'day2',
    timeSlot: '11:00 — 13:30',
    track: 'auditorium',
    title: 'Dance — Movement Beyond Words (Day 2 Session)',
    venue: 'Main Auditorium Stage',
    category: 'Stage Competition',
    description: 'Day 2 cohort: 15 competing dance troupes perform before the national choreographic jury.',
    capacityNotes: '15 Troupes. Strict 3-minute stage time.'
  },
  {
    id: 'd2-aud-3',
    day: 'day2',
    timeSlot: '14:30 — 17:30',
    track: 'auditorium',
    title: 'Theatre — Masks and Mirrors (Day 2 Stage)',
    venue: 'Main Auditorium Stage',
    category: 'Stage Competition',
    description: 'Day 2 cohort: 15 drama troupes present dramatic skits addressing the fractured self and societal masks.',
    capacityNotes: '15 Troupes. 10 minutes per team inclusive of set-up and strike.'
  },
  {
    id: 'd2-aud-4',
    day: 'day2',
    timeSlot: '18:00 — 20:30',
    track: 'auditorium',
    title: 'The Grand Valedictory, Awards & Social Night',
    venue: 'Main Auditorium & Illuminated Central Lawn',
    category: 'Celebration & Awards',
    description: 'Presentation of the MANTHAN: PSYCHE Institutional Championship Trophy, Best Research Laureate, and concluding celebratory Social Night.',
    isHighlight: true
  },

  // DAY 2 - PARALLEL ROOMS
  {
    id: 'd2-par-1',
    day: 'day2',
    timeSlot: '10:00 — 11:30',
    track: 'parallel',
    title: 'Painting — The Inner Canvas (Day 2 Immersion)',
    venue: 'Parallel Studio Gallery A',
    category: 'Visual Arts Competition',
    description: 'Day 2 live painting session on "Reflections & Dualities: The Person and the Cosmos".',
    capacityNotes: '90-minute live session. 1 representative per Day 2 institution.'
  },
  {
    id: 'd2-par-2',
    day: 'day2',
    timeSlot: '10:00 — 16:30',
    track: 'parallel',
    title: 'Research Forum — Ideas Into Inquiry (Day 2 Track: 25 Papers)',
    venue: 'Academic Concourse Room 101 & 102',
    category: 'Scholarly Research',
    description: 'Presentation and defense of papers 26 through 50 across clinical insights, social psychology, and perception science.',
    capacityNotes: '25 Papers scheduled for Day 2.'
  },
  {
    id: 'd2-par-3',
    day: 'day2',
    timeSlot: '11:45 — 14:15',
    track: 'parallel',
    title: 'Debate — The Question of Reality (Final Rounds)',
    venue: 'Parallel Seminar Hall Beta',
    category: 'Parliamentary Debate',
    description: 'Grand debate finals addressing ethics, technological transcendence, and human soul.',
    capacityNotes: 'Adjudicated by visiting philosophy & psychology faculty.'
  },
  {
    id: 'd2-par-4',
    day: 'day2',
    timeSlot: '10:00 — 17:30',
    track: 'parallel',
    title: 'Continuous Interactive Psychology Experiments & Vendor Marketplace',
    venue: 'Perception Pavilion & Central Courtyard',
    category: 'Interactive Labs & Stalls',
    description: 'Interactive attention span tests, cognitive illusion chambers, university publication stalls, and artisan craft counters.',
    speakerOrFacilitator: 'Open Access to all delegates'
  }
];
