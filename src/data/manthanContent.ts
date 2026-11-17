export interface WorkPillar {
  id: string;
  number: string;
  title: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface WorkshopTopic {
  id: string;
  title: string;
  shortDesc: string;
  outcomes: string[];
  recommendedFor: string;
}

export interface SessionTopic {
  id: string;
  title: string;
  shortDesc: string;
  intendedAudience: string;
  keyAreas: string[];
}

export const MANTHAN_CONTENT = {
  name: 'MANTHAN',
  tagline: 'Celebrating the Art of Being Human.',
  introduction: {
    lead: 'MANTHAN is a youth-led interdisciplinary cultural initiative that explores the human experience through psychology, philosophy, science, research, art, performance, and dialogue.',
    body: 'It brings together students, educators, researchers, artists, and institutions to explore fundamental questions about the mind, soul, consciousness, identity, emotions, relationships, society, and existence.',
    disciplines: [
      'Psychology',
      'Philosophy',
      'Science',
      'Research',
      'Art',
      'Performance',
      'Dialogue',
    ],
    inquiryDomains: [
      'Mind & Consciousness',
      'Emotions & Identity',
      'Relationships & Society',
      'Meaning & Existence',
    ],
  },
  about: {
    sectionTitle: 'ABOUT MANTHAN',
    headline: 'Who We Are',
    paragraphs: [
      'MANTHAN is a space for curiosity, exploration, learning and expression. We believe that understanding the human experience requires looking beyond a single discipline and bringing together different perspectives, ideas and forms of creativity.',
      'As a youth-led initiative, we aim to create opportunities for meaningful engagement, intellectual exploration and cultural participation.',
    ],
    values: [
      {
        title: 'Beyond a Single Discipline',
        description: 'Bridging empirical science, cognitive inquiry, philosophical thought, and the arts to see human nature in its entirety.',
      },
      {
        title: 'A Space for Curiosity',
        description: 'Encouraging young minds to ask fearless questions, dismantle assumptions, and embrace deep learning.',
      },
      {
        title: 'Youth-Led Cultural Participation',
        description: 'Empowering students and communities to co-create dialogue, cultural expression, and shared insight.',
      },
    ],
  },
  ourWork: {
    sectionTitle: 'OUR WORK',
    lead: 'At MANTHAN, we believe that understanding the human experience requires more than one perspective. Our work brings together knowledge, research, dialogue and creative expression to encourage individuals to think, question, explore and connect.',
    pillars: [
      {
        id: 'educational-sessions',
        number: '01',
        title: 'Educational Sessions & Workshops',
        description:
          'We organise interactive educational sessions and workshops for schools, colleges and institutions, introducing students to subjects that encourage self-awareness, critical thinking and a deeper understanding of human behaviour.',
        highlights: [
          'Psychology and Mental Well-being',
          'Emotional Intelligence & Self-Awareness',
          'Personality & Identity Development',
          'Human Relationships & Social Dynamics',
          'Philosophy & Critical Thinking',
        ],
        icon: 'GraduationCap',
      },
      {
        id: 'dialogue-discussion',
        number: '02',
        title: 'Dialogue, Discussion & Intellectual Exchange',
        description:
          'We create spaces for meaningful conversations, open discussions and the exchange of ideas. Through dialogues, debates and interactive discussions, we encourage individuals to question assumptions, explore different perspectives and engage with fundamental questions about human existence.',
        highlights: [
          'Socratic Inquiry Circles',
          'Philosophical Debates & Dialectics',
          'Interdisciplinary Roundtables',
          'Youth Open Forums',
        ],
        icon: 'MessageSquareText',
      },
      {
        id: 'research-knowledge',
        number: '03',
        title: 'Research & Knowledge',
        description:
          'We aim to encourage research-oriented thinking, interdisciplinary learning and the pursuit of knowledge. By creating opportunities for students, educators and researchers to share ideas and explore questions, we seek to contribute to a culture of curiosity and intellectual development.',
        highlights: [
          'Interdisciplinary Study Cohorts',
          'Student-Led Inquiry Projects',
          'Academic Paper Discussions',
          'Scientific & Cognitive Literacy',
        ],
        icon: 'BookOpenCheck',
      },
      {
        id: 'arts-culture',
        number: '04',
        title: 'Arts, Culture & Creative Expression',
        description:
          'We celebrate the human experience through art and culture. From theatre, music, dance and painting to storytelling and creative expression, we provide spaces where individuals can communicate ideas, emotions and experiences beyond conventional forms of learning.',
        highlights: [
          'Theatre & Dramatic Storytelling',
          'Live Painting & Visual Explorations',
          'Dance & Expressive Movement',
          'Reflective Literature & Spoken Word',
        ],
        icon: 'Palette',
      },
      {
        id: 'cultural-gatherings',
        number: '05',
        title: 'Cultural Gatherings & Events',
        description:
          'We bring together students, institutions, educators, researchers and creative communities through interdisciplinary gatherings and events. These experiences encourage collaboration, cultural participation and meaningful engagement with the many dimensions of being human.',
        highlights: [
          'Interdisciplinary Youth Symposiums',
          'Institutional Exchange Meets',
          'Experiential Inquiry Festivals',
          'Collaborative Creative Showcases',
        ],
        icon: 'Users',
      },
    ] as WorkPillar[],
  },
  workshops: [
    {
      id: 'psychology-mental-wellbeing',
      title: 'Psychology and Mental Well-being',
      shortDesc: 'Evidence-based cognitive habits, emotional resilience, stress regulation, and de-stigmatizing psychological distress in academic environments.',
      outcomes: ['Understanding emotional responses', 'Stress and coping mechanisms', 'Cultivating mental fitness'],
      recommendedFor: 'Schools, colleges, universities & educators',
    },
    {
      id: 'emotional-intelligence',
      title: 'Emotional Intelligence & Empathy',
      shortDesc: 'Practical toolkits on emotional awareness, affective regulation, active empathy, and constructive interpersonal communication.',
      outcomes: ['Emotional granularity', 'Perspective taking', 'Conflict resolution and dialogue'],
      recommendedFor: 'Students, youth leaders, student councils & teachers',
    },
    {
      id: 'personality-self-discovery',
      title: 'Personality & Self-Discovery',
      shortDesc: 'Structured introspection workshops guiding participants to identify core values, temperament, authentic strengths, and self-concept.',
      outcomes: ['Values identification', 'Temperament & behavioural traits', 'Narrative identity building'],
      recommendedFor: 'High school students & undergraduates',
    },
    {
      id: 'human-relationships',
      title: 'Human Relationships & Social Dynamics',
      shortDesc: 'Examining how people relate, conform, and connect — exploring social heuristics, interpersonal trust, boundaries, and community bonds.',
      outcomes: ['Healthy interpersonal boundaries', 'Navigating peer dynamics', 'Fostering genuine connection'],
      recommendedFor: 'Colleges, student cohorts & youth communities',
    },
    {
      id: 'philosophy-critical-thinking',
      title: 'Philosophy & Critical Thinking',
      shortDesc: 'Dialectical discussions and Socratic inquiry challenging cognitive biases, encouraging ethical reasoning, and exploring fundamental questions of existence.',
      outcomes: ['Spotting cognitive distortions', 'Constructive logical reasoning', 'Ethical and philosophical inquiry'],
      recommendedFor: 'Colleges, universities & senior school students',
    },
    {
      id: 'creativity-expression',
      title: 'Creativity, Art & Expressive Mediums',
      shortDesc: 'Experiential arts translating internal states, philosophical inquiries, and personal stories into painting, writing, drama, and movement.',
      outcomes: ['Expressive self-reflection', 'Creative collaboration', 'Non-verbal communication'],
      recommendedFor: 'Open to all educational tiers & art societies',
    },
  ] as WorkshopTopic[],
  institutions: {
    sectionTitle: 'INSTITUTIONAL COLLABORATION',
    headline: 'Bringing MANTHAN to Institutions',
    subtitle: "Let's learn, explore and grow together.",
    body: 'MANTHAN collaborates with educational institutions to organise engaging sessions and workshops for students. Whether you are a school, college or university, you can connect with us to explore a potential collaboration.',
    ctaButton: 'Book an institutional session',
    collaborationTypes: [
      {
        title: 'Schools (Secondary & Senior Secondary)',
        description: 'Age-appropriate modules on emotional literacy, self-discovery, critical inquiry, and healthy relationship dynamics.',
      },
      {
        title: 'Colleges & Higher Education',
        description: 'Interdisciplinary workshops, debate circles, psychological insights, and experiential discussions on identity and meaning.',
      },
      {
        title: 'Universities & Research Bodies',
        description: 'Collaborative symposiums, research dialogues, student-led scholarship, and cross-departmental panels.',
      },
    ],
  },
  contact: {
    sectionTitle: 'CONTACT US',
    headline: "Let's Connect.",
    description:
      "Whether you represent an institution, are interested in collaborating, or simply want to know more about MANTHAN, we'd love to hear from you.",
    phone: '+91 6005200595',
    phoneFormatted: '+91 60052 00595',
    email: 'info.manthanorg@gmail.com',
    whatsappUrl: 'https://wa.me/916005200595?text=Hello%20MANTHAN%20Team,%20I%20would%20like%20to%20connect%20regarding%20an%20institutional%20collaboration.',
    locationText: 'Open for Pan-India On-Campus & Virtual Institutional Sessions',
  },
};

// Backward-compatible exports
export const CONTACT_INFO = {
  email: MANTHAN_CONTENT.contact.email,
  phone: MANTHAN_CONTENT.contact.phoneFormatted,
  instagram: 'https://instagram.com/manthan.initiative',
  instagramHandle: '@manthan.initiative',
  linkedin: 'https://linkedin.com/company/manthan-initiative',
  linkedinHandle: 'MANTHAN Initiative',
  location: MANTHAN_CONTENT.contact.locationText,
};

export const SESSIONS_DATA: SessionTopic[] = MANTHAN_CONTENT.workshops.map((w) => ({
  id: w.id,
  title: w.title,
  shortDesc: w.shortDesc,
  intendedAudience: w.recommendedFor,
  keyAreas: w.outcomes,
}));
