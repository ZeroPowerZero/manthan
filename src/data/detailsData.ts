export interface PricingTier {
  type: string;
  displayPrice: string;
  covers: string;
  inclusionsSummary: string;
  note?: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    type: 'Institution Delegate Pass',
    displayPrice: '[Fee TBA — Pending Confirmation]',
    covers: 'Entry per nominated student across Painting, Dance, Theatre, or Debate.',
    inclusionsSummary: 'Access to festival venue, competition badge, official delegate kit, lunch, and accredited participation certificate.',
    note: 'Initial planning estimate was ~₹1,000 per delegate. Final fee pending organizing committee approval.'
  },
  {
    type: 'Individual Participant',
    displayPrice: '[Fee TBA — Pending Confirmation]',
    covers: 'Direct solo or independent entry in eligible categories (Painting or Independent Scholar).',
    inclusionsSummary: 'Session access, stage/gallery materials as listed, feedback rubric, and official festival certificate.',
    note: 'Final fee will be officially published alongside registration opening.'
  },
  {
    type: 'Research Paper Submission',
    displayPrice: '[Fee TBA — Pending Confirmation]',
    covers: 'Peer-review processing and presentation of accepted paper in the Research Forum.',
    inclusionsSummary: 'Review dossier, presentation slot, defense adjudication, and publication in the indexed festival proceedings.',
    note: 'Applies per accepted paper or presenting author.'
  },
  {
    type: 'Spectator & Visitor Pass',
    displayPrice: '[Fee TBA — Pending Confirmation]',
    covers: 'Access for students, faculty observers, and general attendees.',
    inclusionsSummary: 'Access to the Main Auditorium gallery, Perception Pavilion, Academic Symposia, and Evening Cultural & Social Night.',
    note: 'Early estimate was ~₹250 per pass. Formal rate announced upon ticket gate release.'
  },
  {
    type: 'Artisan / Vendor Stall',
    displayPrice: '[Fee TBA — Pending Confirmation]',
    covers: 'Commercial or creative exhibition space in the central festival concourse.',
    inclusionsSummary: 'Covered canopy space, 2 tables, 2 chairs, standard single-phase electrical power socket, and 2 vendor badges.',
    note: 'Estimated planning baseline ₹3,000–₹4,000/day. Formal rate announced upon stall vetting.'
  },
  {
    type: 'Institutional / Corporate Sponsor',
    displayPrice: 'Custom Bespoke Packages',
    covers: 'Title patronage, category awards naming, academic session curation, and campus branding.',
    inclusionsSummary: 'Direct coordination with Festival Director. Contact routes to secretariat desk without online transaction.',
    note: 'Bespoke corporate and CSR sponsorship tiers tailored to institutional goals.'
  }
];

export const INCLUSIONS_MATRIX = {
  included: [
    'Festival access for the registered day(s)',
    'Entry into confirmed competition or showcase session',
    'Nutritious delegate lunch for registered delegates',
    'Official MANTHAN: PSYCHE Participation & Presentation Certificate',
    'Standard venue presentation equipment, staging, and basic canvas boards',
    'Full access to Perception Pavilion interactive psychology experiences, open mic, and social evening'
  ],
  optional: [
    'Extra faculty / spectator meal passes (booked in advance)',
    'Official festival cotton merchandise & embroidered commemorative tote',
    'Hardcover copy of the peer-reviewed Research Proceedings & ISBN Index',
    'Multi-camera 4K stage recording archives'
  ],
  participantArranged: [
    'Intercity travel and Jammu local transport to festival campus',
    'Outstation accommodation (host university provides list of partnered guest houses)',
    'Performance costumes, specialized theatrical props, and makeup kits',
    'Personal paint mediums, brushes, and specialized art supplies',
    'Audio cue tracks and presentation backup drives'
  ]
};

export const ELIGIBILITY_RULES = [
  {
    question: 'Who is eligible to participate in MANTHAN: PSYCHE?',
    answer: 'The festival is open to bona fide students from recognised secondary schools (Grades 9–12), undergraduate colleges, postgraduate university departments, and registered doctoral research scholars across India. Independent youth participants and gap-year students may enter eligible individual categories with valid government identity proof.'
  },
  {
    question: 'Can one student participate in multiple categories?',
    answer: 'No. To ensure scheduling integrity and give broad representation to delegates, a participant cannot cross-register across multiple competitive categories (e.g., a student in Dance cannot also participate in Theatre or Debate). Research scholars may present their paper and separately attend non-competitive academic forums.'
  },
  {
    question: 'Are mixed-institution teams allowed?',
    answer: 'For institutional categories (Dance troupe of 6, Theatre troupe of 6, Debate delegation of 2, Painting solo), all members must belong to the nominating school or college and be rostered by the official faculty coordinator. Independent entries in open categories do not require institutional affiliation.'
  },
  {
    question: 'What are the institutional entry caps?',
    answer: 'Each registered institution may enter up to: 1 Painting participant, 2 Debate speakers, 1 Theatre team (up to 6 members), and 1 Dance team (up to 6 members). Each student may appear in only one roster.'
  },
  {
    question: 'What is the debate capacity status?',
    answer: 'Per Section 07 of the festival blueprint, the organising senate is currently resolving daily capacity (60 vs 120 debaters). To prevent oversubscription, debate registration is marked as "Capacity Being Finalised / Notify Me". You may sign up to receive priority notification when the slot schedule unlocks.'
  },
  {
    question: 'How are research papers reviewed and vetted?',
    answer: 'Submissions undergo double-blind peer review by an academic jury of senior psychology and cognitive science faculty. Plagiarism must remain strictly under 10% (Turnitin/Urkund certified). Accepted papers are scheduled for 7-minute presentations followed by a 3-minute oral defense.'
  },
  {
    question: 'What is the refund and cancellation policy?',
    answer: 'Formal refund and cancellation policies will be published simultaneously with confirmed fee announcements. Generally, institutional fees are transferable to alternate eligible students from the same institute up to 72 hours before the festival upon coordinator request.'
  }
];

export const TRUST_STANDARDS = {
  venue: 'Main University Arts & Academic Concourse, Jammu, J&K (180006)',
  dates: 'PSYCHE 2026/27 (Two Days — Official Calendar Dates Announced Upon Final Syndicate Ratification)',
  contactEmail: 'secretariat@manthanpsyche.org',
  helplinePhone: '+91 (0191) 243-XXXX / +91 94191-XXXXX',
  nonDiagnosticDisclaimer: 'IMPORTANT NOTICE: All sensory, perceptual, and psychological activities conducted at MANTHAN: PSYCHE are purely educational, experiential, and artistic explorations of human cognition. None of the demonstrations, interactive pods, or discussions constitute clinical psychological diagnosis, psychiatric assessment, or therapeutic consultation.'
};
