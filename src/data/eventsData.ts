import { EventDetail } from '../types/events';

export const EVENTS_DATA: EventDetail[] = [
  {
    id: 'painting',
    number: '01',
    title: 'Painting — The Inner Canvas',
    subtitle: 'A live painting competition inspired by the mind, identity, and consciousness',
    tagline: 'Translate the intangible textures of consciousness onto raw canvas.',
    description: 'The Inner Canvas invites painters to explore the subjective architecture of the human psyche. Guided by the overarching question "What does it mean to be human?", artists must conceive, compose, and execute a live work within an intensive 90-minute immersion.',
    duration: '90 Minutes',
    teamFormat: 'Individual Entry (Solo)',
    capacity: '1 Session per Day (Strict quota per institution: Max 1 entry)',
    venue: 'Parallel Studio Gallery A',
    theme: 'The Mind Unveiled: Memory, Perception, and Inner Duality',
    eligibility: [
      'Bona fide enrolled students from recognised schools (Grade 9–12), colleges, and universities.',
      'Independent student artists with valid institutional ID or enrolment proof.',
      'One individual entry per registered institution.'
    ],
    rules: [
      'Duration is strictly 90 minutes; reporting time is 30 minutes prior to session bell.',
      'Standard A2 sized canvas paper/boards provided by festival organisers.',
      'Participants must bring their own mediums (acrylics, watercolours, charcoals, oils, or mixed media).',
      'No pre-sketched materials, digital aids, or stencil references allowed in the hall.',
      'Artworks must be completed on-site and titled with a 50-word written reflection statement.'
    ],
    judgingCriteria: [
      { criterion: 'Conceptual Depth', weight: '35%', description: 'Interpretation of the human psyche, emotional resonance, and metaphorical strength.' },
      { criterion: 'Originality & Vision', weight: '30%', description: 'Uniqueness of stylistic voice and deviation from clichéd iconography.' },
      { criterion: 'Technical Execution', weight: '20%', description: 'Composition, colour harmony, tonal control, and medium handling.' },
      { criterion: 'Written Artist Statement', weight: '15%', description: 'Clarity and philosophical alignment of the 50-word thematic rationale.' }
    ],
    inclusions: {
      provided: ['Standard A2 primed canvas boards', 'Easel support', 'Water containers, mixing palettes, and basic rags', 'Participation certificate & jury appraisal'],
      optional: ['Festival lunch pass add-on', 'Post-festival exhibition catalogue inclusion'],
      participantBrings: ['Paints, brushes, palette knives, drawing pencils', 'Fixative sprays (if using charcoal/pastels)']
    },
    capacityStatus: 'open',
    color: {
      primary: '#D8C5F5',
      accent: '#C13DD6',
      glow: 'rgba(193, 61, 214, 0.4)'
    }
  },
  {
    id: 'dance',
    number: '02',
    title: 'Dance — Movement Beyond Words',
    subtitle: 'Interpret the human experience through movement, emotion, and choreography',
    tagline: 'Where kinetic momentum becomes the voice of unspoken psychic states.',
    description: 'Movement Beyond Words is a theatrical dance showcase probing emotional turbulence, existential yearning, joy, and the fractures of the subconscious. Ensembles articulate what words fail to contain.',
    duration: '3 Minutes per Team',
    teamFormat: 'Team of up to 6 members',
    capacity: '15 Teams per Day (Strict daily cap; early closure upon threshold)',
    venue: 'Main Auditorium Stage',
    theme: 'States of Being: Turmoil, Awakening, Connection & Catharsis',
    eligibility: [
      'Institutions can register one official troupe of up to 6 student dancers.',
      'No student may perform in multiple troupes or cross-register into other stage categories.',
      'Open to classical, contemporary, physical theatre, and expressive choreographic forms.'
    ],
    rules: [
      'Performance time: Exactly 3 minutes (grace period: 10 seconds before warning buzzer).',
      'Music track (MP3 320kbps) must be submitted via registration portal 72 hours before festival.',
      'Stage clearance time: 60 seconds maximum between consecutive troupes.',
      'Props allowed if portable and non-hazardous (no flames, liquids, or unanchored powders).',
      'Costumes must conform to the institutional decorum guidelines of the host university.'
    ],
    judgingCriteria: [
      { criterion: 'Choreographic Interpretation', weight: '30%', description: 'Expressive clarity and metaphorical conveyance of the psyche.' },
      { criterion: 'Synchrony & Spatial Dynamic', weight: '25%', description: 'Ensemble geometry, stage balance, and fluid transitions.' },
      { criterion: 'Technical Precision & Rhythm', weight: '25%', description: 'Footwork, posture, alignment, and tempo adherence.' },
      { criterion: 'Emotional Impact & Stage Presence', weight: '20%', description: 'Authenticity of performance and audience engagement.' }
    ],
    inclusions: {
      provided: ['Acoustic sound system and pro stage lighting grid', 'Green room dressing mirror space', 'Official certificate of stage showcase'],
      optional: ['Professional multi-cam 4K stage recording footage pass'],
      participantBrings: ['Performance costumes and makeup', 'Backup USB drive with audio track']
    },
    capacityStatus: 'open',
    color: {
      primary: '#4FD8E8',
      accent: '#2B2A6B',
      glow: 'rgba(79, 216, 232, 0.4)'
    }
  },
  {
    id: 'theatre',
    number: '03',
    title: 'Theatre — Masks and Mirrors',
    subtitle: 'Auditorium stage skits & dramatic plays exploring inner life, identity, and conflict',
    tagline: 'The unmasking of character, moral paradoxes, and the labyrinth of truth.',
    description: 'Masks and Mirrors provides the grand proscenium for original dramatic works, physical theatre, and one-act skits. Productions tackle societal friction, existential crossroads, and mental landscapes.',
    duration: '10 Minutes per Team (Strictly inclusive of stage set-up & strike)',
    teamFormat: 'Team of up to 6 actors/crew',
    capacity: '15 Teams per Day',
    venue: 'Main Auditorium Stage',
    theme: 'The Dual Self: Public Facades, Private Truths & Moral Dilemmas',
    eligibility: [
      'One drama troupe per institution with a maximum of 6 students (actors + backstage crew).',
      'Script must be original or appropriately credited adaptation with creative re-imagination.',
      'Performers must be enrolled students carrying official institutional accreditation.'
    ],
    rules: [
      'Total stage time: 10 minutes maximum, comprising 2 min setup + 7 min performance + 1 min clearance.',
      'Exceeding 10 minutes initiates an automatic point deduction per 15 seconds.',
      'Languages permitted: English, Hindi, Urdu, Dogri, or bilingual synthesis.',
      'Light and sound cues must be handed to festival stage crew during the morning technical briefing.',
      'Zero offensive caricature, hate speech, or defamatory political targeting permitted.'
    ],
    judgingCriteria: [
      { criterion: 'Script & Dramaturgy', weight: '30%', description: 'Narrative structure, thematic depth, dialogue craft, and resolution.' },
      { criterion: 'Acting & Characterisation', weight: '30%', description: 'Vocal modulation, emotional honesty, character arc, and pacing.' },
      { criterion: 'Stagecraft & Ensemble Synergy', weight: '25%', description: 'Use of space, lighting coordination, timing, and props.' },
      { criterion: 'Originality of Perspective', weight: '15%', description: 'Fresh approach to the festival core existential question.' }
    ],
    inclusions: {
      provided: ['Standard 4-lapel / 2-shotgun stage mic setup', 'Fixed warm/cool stage wash presets', 'Green room dressing wing'],
      optional: ['Detailed adjudicator script review notes package'],
      participantBrings: ['Stage hand-props, costumes, specific audio cue tracks on flash drive']
    },
    capacityStatus: 'open',
    color: {
      primary: '#F2B84B',
      accent: '#6E263D',
      glow: 'rgba(242, 184, 75, 0.4)'
    }
  },
  {
    id: 'debate',
    number: '04',
    title: 'Debate — The Question of Reality',
    subtitle: 'Challenge assumptions, question existence, and defend positions through rigorous dialectic',
    tagline: 'Dissecting free will, artificial consciousness, and moral reality under strict time constraints.',
    description: 'A rapid-fire parliamentary-style dialectic confronting the most contested philosophical, psychological, and technological dilemmas of our century. Includes an opening 15-minute joint keynote by two visiting psychologists.',
    duration: '90 Seconds per Speaker',
    teamFormat: '2 Debaters per Institution (1 Affirmative, 1 Interrogative/Opposition)',
    capacity: 'Capacity Reconciliation in Progress (See Blueprint Notice)',
    venue: 'Parallel Seminar Hall Beta',
    theme: 'Is Consciousness Computed? Identity, Determinism & Free Will in the Modern Age',
    eligibility: [
      'Institution representation: Maximum 2 debaters per school/college.',
      'Pre-registration mandatory; no walk-in entries permitted.',
      'Debaters must be prepared to speak either for or against the proposition following a draw of lots.'
    ],
    rules: [
      'Strict 90-second speech limit per contestant; single bell at 75 seconds, double bell at 90 seconds.',
      'Points of Information (POIs) may be offered between 30s and 60s at the speaker discretion.',
      'Cross-examination round of 60 seconds following each proposition clash.',
      'Use of paper notes permitted; digital screens prohibited at the podium.',
      'Respectful parliamentary discourse must be maintained at all times.'
    ],
    judgingCriteria: [
      { criterion: 'Logical Architecture & Evidence', weight: '35%', description: 'Deductive coherence, avoidance of fallacies, and empirical support.' },
      { criterion: 'Rebuttal & Agility', weight: '30%', description: 'Responsiveness to counter-arguments and spontaneous dialectic.' },
      { criterion: 'Rhetorical Eloquence', weight: '20%', description: 'Articulation, vocal dynamic, presence, and persuasive clarity.' },
      { criterion: 'Time Adherence & Form', weight: '15%', description: 'Strict respect for the 90-second bell and debate decorum.' }
    ],
    inclusions: {
      provided: ['Podium with professional audio capture', 'Official adjudication scorecard dossier', 'Debate delegation certificate'],
      optional: ['Institutional trophy contention tally inclusion'],
      participantBrings: ['Prepared argumentative dossiers and citation notes']
    },
    capacityStatus: 'pending_reconciliation',
    capacityNotice: 'Blueprint Section 07 Alert: Institutional capacity reconciliation underway. Total speaker quotas (60 vs 120 per day) are being finalized by the organizing senate. Debate registration will open immediately upon council notification.',
    color: {
      primary: '#D8C5F5',
      accent: '#4FD8E8',
      glow: 'rgba(216, 197, 245, 0.4)'
    }
  },
  {
    id: 'academic_forum',
    number: '05',
    title: 'Academic Forum — Minds in Dialogue',
    subtitle: 'Expert dialogues, invited talks, and interdisciplinary intersections',
    tagline: 'Bridging neuroscience, philosophy of mind, literature, and cognitive psychology.',
    description: 'A curated forum where senior clinicians, cognitive neuroscientists, and humanities scholars engage in moderated panel discussions. Focuses on unpacking contemporary mental health, cognitive resilience, and the future of human empathy.',
    duration: '45-Minute Panel Sessions + 15-Minute Q&A',
    teamFormat: 'Open Delegate Attendance (Institutional & Individual)',
    capacity: 'Main Auditorium & Live Stream Relay (Audience capacity: 350 seats)',
    venue: 'Main Auditorium / Academic Concourse',
    theme: 'The Human Condition: Neuroscience Meets Existential Philosophy',
    eligibility: [
      'Open to all registered student delegates, faculty advisors, and research scholars.',
      'Registered attendees receive reserved seating for morning keynote dialogues.'
    ],
    rules: [
      'Sessions commence promptly; late entry permitted only between speaker transitions.',
      'Audience Q&A conducted through roving microphones and digital question submission console.',
      'Photography without flash permitted; audio recording restricted to accredited press.'
    ],
    judgingCriteria: [
      { criterion: 'Academic Engagement', weight: '100%', description: 'Open academic symposia; certificates of intellectual delegation awarded.' }
    ],
    inclusions: {
      provided: ['Academic symposium delegate kit and abstract compilation book', 'Reserved seating pass for both festival days', 'Accredited symposium attendance certificate'],
      optional: ['Post-conference whitepaper publication reprint'],
      participantBrings: ['Notebook and active inquiry']
    },
    capacityStatus: 'open_participation',
    color: {
      primary: '#2B2A6B',
      accent: '#F2B84B',
      glow: 'rgba(43, 42, 107, 0.5)'
    }
  },
  {
    id: 'research_forum',
    number: '06',
    title: 'Research Forum — Ideas Into Inquiry',
    subtitle: '50 shortlisted papers presented across 2 days before an expert peer jury',
    tagline: 'Rigorous empirical and theoretical inquiry into the human mind.',
    description: 'Ideas Into Inquiry is the peer-reviewed scholarly spine of MANTHAN: PSYCHE. 50 shortlisted papers (25 per day) are presented by undergraduate, postgraduate, and doctoral scholars before an evaluation jury.',
    duration: '7-Minute Presentation + 3-Minute Defense / Q&A',
    teamFormat: 'Individual Presenter (Up to 2 co-authors named on paper)',
    capacity: '50 Papers Overall (25 papers per day across parallel tracks)',
    venue: 'Academic Concourse Room 101 & 102',
    theme: 'Cognition, Perception, Mental Health, and Socio-Cultural Psychology',
    eligibility: [
      'Undergraduate, postgraduate, and MPhil/PhD scholars from accredited universities.',
      'Paper must represent original work with similarity index under 10% (Turnitin/Urkund certified).',
      'One designated presenter per accepted submission.'
    ],
    rules: [
      'Presentation strictly capped at 7 minutes; timer displays countdown on podium monitor.',
      'Slides (16:9 PDF/PPTX format) must be uploaded at least 48 hours prior to assigned session.',
      'Defense round lasts exactly 3 minutes with jury questions and peer critique.',
      'All authors must submit signed ethical approval and plagiarism declaration.'
    ],
    judgingCriteria: [
      { criterion: 'Methodological Rigour', weight: '35%', description: 'Research design, sampling integrity, validity of empirical/theoretical tools.' },
      { criterion: 'Original Contribution', weight: '25%', description: 'Novelty of insights, conceptual nuance, and relevance to the discipline.' },
      { criterion: 'Presentation & Defense', weight: '25%', description: 'Clarity of delivery, slide aesthetics, and poise during jury interrogation.' },
      { criterion: 'Literature & Citations', weight: '15%', description: 'Comprehensive grounding in contemporary psychological literature.' }
    ],
    inclusions: {
      provided: ['Dual projection multimedia display console', 'Inclusion in official ISBN Conference Proceedings Index', 'Best Research Paper Laureate citation and certificate'],
      optional: ['Journal peer-review fast-track pipeline'],
      participantBrings: ['Digital presentation slides backup on encrypted USB drive']
    },
    capacityStatus: 'open',
    color: {
      primary: '#6E263D',
      accent: '#C13DD6',
      glow: 'rgba(110, 38, 61, 0.4)'
    }
  },
  {
    id: 'psychology_experiences',
    number: '07',
    title: 'Psychology Experiences — Reach Inward',
    subtitle: 'Interactive perception, memory, attention, and reflection labs + open mic',
    tagline: 'Direct experiential encounters with the paradoxes of human perception.',
    description: 'Reach Inward transforms psychological theory into vivid sensory stations. Designed strictly as non-diagnostic cognitive and perceptual experiences, visitors participate in optical illusions, memory span trials, biofeedback relaxation pods, and evening open-mic reflections.',
    duration: 'Walk-through experiential stations (10–15 mins per pod) + Evening Open Mic',
    teamFormat: 'Open to all registered delegates & pass holders',
    capacity: 'Continuous flow across Festival Days; Open Mic capacity 120 delegates',
    venue: 'Perception Pavilion & Open Courtyard',
    theme: 'Illusion, Mindful Awareness, Sensory Thresholds & Shared Stories',
    eligibility: [
      'Open to all festival attendees with general or delegate credentials.',
      'Non-diagnostic experiential educational design; no psychiatric assessment performed.'
    ],
    rules: [
      'Interactive modules are self-paced; please follow facilitator guidance at each station.',
      'No personal psychological data or identity details are stored from experience terminals.',
      'Open mic sign-ups open at 14:00 daily at the Perception Pavilion registration kiosk.',
      'Evening Social Night requires visible festival pass badge.'
    ],
    judgingCriteria: [
      { criterion: 'Experiential Journey', weight: '100%', description: 'Open participatory learning; non-competitive.' }
    ],
    inclusions: {
      provided: ['Access to 8 interactive perceptual and cognitive experiment pods', 'Guided biofeedback and mindfulness sound chamber', 'Open mic stage access and social evening reception'],
      optional: ['Souvenir perception experiment handbook'],
      participantBrings: ['Curiosity and an open mind']
    },
    capacityStatus: 'open_participation',
    color: {
      primary: '#4FD8E8',
      accent: '#F2B84B',
      glow: 'rgba(79, 216, 232, 0.4)'
    }
  }
];
