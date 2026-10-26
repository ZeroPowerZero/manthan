export type RegistrationPathway = 
  | 'individual' 
  | 'institution' 
  | 'research_scholar' 
  | 'stall_vendor' 
  | 'sponsor_partner';

export interface ParticipantMember {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  role?: string;
  dietaryOrSpecialNeeds?: string;
}

export interface IndividualRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  institutionOrIndependent: string;
  studentIdOrAadhar: string;
  eventCategory: string;
  dayPreference: 'day1' | 'day2' | 'both';
  teamName?: string;
  teamMembers?: ParticipantMember[];
  emergencyContact: string;
}

export interface InstitutionCategoryEntry {
  category: 'painting' | 'debate' | 'theatre' | 'dance';
  maxAllowed: number;
  participants: ParticipantMember[];
}

export interface InstitutionRegistrationData {
  institutionName: string;
  institutionType: 'school' | 'college' | 'university' | 'autonomous_institute';
  cityState: string;
  coordinatorName: string;
  coordinatorDesignation: string;
  coordinatorEmail: string;
  coordinatorPhone: string;
  principalDeanName: string;
  accompanyingFacultyCount: number;
  entries: {
    painting: ParticipantMember[]; // max 1
    debate: ParticipantMember[];   // max 2
    theatre: ParticipantMember[];  // max 6 (1 team)
    dance: ParticipantMember[];    // max 6 (1 team)
  };
  totalStudentDelegates: number;
  specialRequirementsNotes: string;
}

export interface ResearchScholarData {
  fullName: string;
  email: string;
  phone: string;
  academicAffiliation: string;
  designationOrDegree: string;
  paperTitle: string;
  researchTrack: 'perception_cognition' | 'consciousness_philosophy' | 'clinical_sociocultural' | 'creative_arts_psychology';
  abstractText: string;
  keywords: string;
  coAuthors: string;
  fullPaperFileName?: string;
  ethicsDeclaration: boolean;
  originalityDeclaration: boolean;
}

export interface VendorStallData {
  brandName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: 'artisan_crafts' | 'books_psychology' | 'wellness_mind' | 'food_beverage' | 'student_initiative';
  spaceRequirement: 'table_space' | 'standard_canopy_6x6' | 'deluxe_canopy_10x10';
  electricalLoadWatts: string;
  daysAttending: 'day1' | 'day2' | 'both_days';
  foodLicenceNumber?: string;
  specialSetupNeeds: string;
  agreedToRestrictions: boolean;
}

export interface SponsorPartnerData {
  organisationName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  partnershipType: 'title_partner' | 'associate_patron' | 'session_curator' | 'creative_awards_sponsor' | 'in_kind';
  proposedContributionNotes: string;
  preferredMeetingTime: string;
}

export interface RegistrationSubmissionResult {
  referenceNumber: string;
  timestamp: string;
  pathway: RegistrationPathway;
  status: 'confirmed' | 'pending_review' | 'waitlisted';
  nameOrOrg: string;
  email: string;
  summary: string;
}
