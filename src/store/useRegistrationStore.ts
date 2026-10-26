import { create } from 'zustand';
import { 
  IndividualRegistrationData, 
  InstitutionRegistrationData, 
  ResearchScholarData, 
  VendorStallData, 
  SponsorPartnerData,
  ParticipantMember
} from '../types/registration';

interface RegistrationFormStore {
  // Individual Form
  individualData: IndividualRegistrationData;
  setIndividualField: <K extends keyof IndividualRegistrationData>(field: K, value: IndividualRegistrationData[K]) => void;
  resetIndividual: () => void;

  // Institution Form
  institutionData: InstitutionRegistrationData;
  setInstitutionField: <K extends keyof InstitutionRegistrationData>(field: K, value: InstitutionRegistrationData[K]) => void;
  addInstitutionParticipant: (category: 'painting' | 'debate' | 'theatre' | 'dance', member: ParticipantMember) => { success: boolean; error?: string };
  removeInstitutionParticipant: (category: 'painting' | 'debate' | 'theatre' | 'dance', index: number) => void;
  updateInstitutionParticipant: (category: 'painting' | 'debate' | 'theatre' | 'dance', index: number, member: ParticipantMember) => void;
  resetInstitution: () => void;

  // Research Scholar Form
  researchData: ResearchScholarData;
  setResearchField: <K extends keyof ResearchScholarData>(field: K, value: ResearchScholarData[K]) => void;
  resetResearch: () => void;

  // Vendor Stall Form
  vendorData: VendorStallData;
  setVendorField: <K extends keyof VendorStallData>(field: K, value: VendorStallData[K]) => void;
  resetVendor: () => void;

  // Sponsor Partner Form
  sponsorData: SponsorPartnerData;
  setSponsorField: <K extends keyof SponsorPartnerData>(field: K, value: SponsorPartnerData[K]) => void;
  resetSponsor: () => void;
}

const DEFAULT_INDIVIDUAL: IndividualRegistrationData = {
  fullName: '',
  email: '',
  phone: '',
  institutionOrIndependent: '',
  studentIdOrAadhar: '',
  eventCategory: 'painting',
  dayPreference: 'day1',
  emergencyContact: '',
};

const DEFAULT_INSTITUTION: InstitutionRegistrationData = {
  institutionName: '',
  institutionType: 'college',
  cityState: 'Jammu, J&K',
  coordinatorName: '',
  coordinatorDesignation: 'Faculty Cultural Advisor',
  coordinatorEmail: '',
  coordinatorPhone: '',
  principalDeanName: '',
  accompanyingFacultyCount: 1,
  entries: {
    painting: [],
    debate: [],
    theatre: [],
    dance: []
  },
  totalStudentDelegates: 0,
  specialRequirementsNotes: ''
};

const DEFAULT_RESEARCH: ResearchScholarData = {
  fullName: '',
  email: '',
  phone: '',
  academicAffiliation: '',
  designationOrDegree: 'PhD Research Scholar',
  paperTitle: '',
  researchTrack: 'perception_cognition',
  abstractText: '',
  keywords: '',
  coAuthors: '',
  ethicsDeclaration: true,
  originalityDeclaration: true
};

const DEFAULT_VENDOR: VendorStallData = {
  brandName: '',
  contactPerson: '',
  email: '',
  phone: '',
  category: 'books_psychology',
  spaceRequirement: 'standard_canopy_6x6',
  electricalLoadWatts: '500W Standard',
  daysAttending: 'both_days',
  specialSetupNeeds: '',
  agreedToRestrictions: true
};

const DEFAULT_SPONSOR: SponsorPartnerData = {
  organisationName: '',
  contactPerson: '',
  designation: 'Director / CSR Lead',
  email: '',
  phone: '',
  partnershipType: 'associate_patron',
  proposedContributionNotes: '',
  preferredMeetingTime: 'Morning (10:00 - 12:00)'
};

// Local storage caching helpers
const loadCached = <T>(key: string, fallback: T): T => {
  try {
    const val = localStorage.getItem(`manthan_draft_${key}`);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

const saveCache = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(`manthan_draft_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage save failed', e);
  }
};

export const useRegistrationStore = create<RegistrationFormStore>((set, get) => ({
  individualData: loadCached('individual', DEFAULT_INDIVIDUAL),
  setIndividualField: (field, value) => {
    set((state) => {
      const updated = { ...state.individualData, [field]: value };
      saveCache('individual', updated);
      return { individualData: updated };
    });
  },
  resetIndividual: () => {
    saveCache('individual', DEFAULT_INDIVIDUAL);
    set({ individualData: DEFAULT_INDIVIDUAL });
  },

  institutionData: loadCached('institution', DEFAULT_INSTITUTION),
  setInstitutionField: (field, value) => {
    set((state) => {
      const updated = { ...state.institutionData, [field]: value };
      saveCache('institution', updated);
      return { institutionData: updated };
    });
  },

  addInstitutionParticipant: (category, member) => {
    const current = get().institutionData;
    const catLimits: Record<'painting' | 'debate' | 'theatre' | 'dance', number> = {
      painting: 1,
      debate: 2,
      theatre: 6,
      dance: 6
    };

    // 1. Check category capacity
    if (current.entries[category].length >= catLimits[category]) {
      return {
        success: false,
        error: `Maximum quota reached for ${category.toUpperCase()} (${catLimits[category]} max per institution).`
      };
    }

    // 2. Strict Cross-Category Roster Deduplication (Check by Student ID and Full Name)
    const normalizedId = member.studentId.trim().toLowerCase();
    const normalizedName = member.fullName.trim().toLowerCase();

    const allMembers: { cat: string; member: ParticipantMember }[] = [
      ...current.entries.painting.map((m) => ({ cat: 'Painting', member: m })),
      ...current.entries.debate.map((m) => ({ cat: 'Debate', member: m })),
      ...current.entries.theatre.map((m) => ({ cat: 'Theatre', member: m })),
      ...current.entries.dance.map((m) => ({ cat: 'Dance', member: m })),
    ];

    const duplicate = allMembers.find((item) => {
      const sameId = normalizedId && item.member.studentId.trim().toLowerCase() === normalizedId;
      const sameName = normalizedName && item.member.fullName.trim().toLowerCase() === normalizedName;
      return sameId || sameName;
    });

    if (duplicate) {
      return {
        success: false,
        error: `Conflict: "${member.fullName}" (ID: ${member.studentId}) is already rostered under ${duplicate.cat}. Festival rules strictly prohibit one student participating in multiple categories.`
      };
    }

    // 3. Add to entries
    const updatedCategoryList = [...current.entries[category], member];
    const updatedEntries = {
      ...current.entries,
      [category]: updatedCategoryList
    };

    const newTotal = 
      updatedEntries.painting.length + 
      updatedEntries.debate.length + 
      updatedEntries.theatre.length + 
      updatedEntries.dance.length;

    const updatedData: InstitutionRegistrationData = {
      ...current,
      entries: updatedEntries,
      totalStudentDelegates: newTotal
    };

    saveCache('institution', updatedData);
    set({ institutionData: updatedData });
    return { success: true };
  },

  removeInstitutionParticipant: (category, index) => {
    set((state) => {
      const updatedCategory = state.institutionData.entries[category].filter((_, i) => i !== index);
      const updatedEntries = {
        ...state.institutionData.entries,
        [category]: updatedCategory
      };
      const newTotal = 
        updatedEntries.painting.length + 
        updatedEntries.debate.length + 
        updatedEntries.theatre.length + 
        updatedEntries.dance.length;

      const updatedData: InstitutionRegistrationData = {
        ...state.institutionData,
        entries: updatedEntries,
        totalStudentDelegates: newTotal
      };

      saveCache('institution', updatedData);
      return { institutionData: updatedData };
    });
  },

  updateInstitutionParticipant: (category, index, member) => {
    set((state) => {
      const updatedCategory = [...state.institutionData.entries[category]];
      updatedCategory[index] = member;
      const updatedEntries = {
        ...state.institutionData.entries,
        [category]: updatedCategory
      };
      const updatedData: InstitutionRegistrationData = {
        ...state.institutionData,
        entries: updatedEntries
      };
      saveCache('institution', updatedData);
      return { institutionData: updatedData };
    });
  },

  resetInstitution: () => {
    saveCache('institution', DEFAULT_INSTITUTION);
    set({ institutionData: DEFAULT_INSTITUTION });
  },

  researchData: loadCached('research', DEFAULT_RESEARCH),
  setResearchField: (field, value) => {
    set((state) => {
      const updated = { ...state.researchData, [field]: value };
      saveCache('research', updated);
      return { researchData: updated };
    });
  },
  resetResearch: () => {
    saveCache('research', DEFAULT_RESEARCH);
    set({ researchData: DEFAULT_RESEARCH });
  },

  vendorData: loadCached('vendor', DEFAULT_VENDOR),
  setVendorField: (field, value) => {
    set((state) => {
      const updated = { ...state.vendorData, [field]: value };
      saveCache('vendor', updated);
      return { vendorData: updated };
    });
  },
  resetVendor: () => {
    saveCache('vendor', DEFAULT_VENDOR);
    set({ vendorData: DEFAULT_VENDOR });
  },

  sponsorData: loadCached('sponsor', DEFAULT_SPONSOR),
  setSponsorField: (field, value) => {
    set((state) => {
      const updated = { ...state.sponsorData, [field]: value };
      saveCache('sponsor', updated);
      return { sponsorData: updated };
    });
  },
  resetSponsor: () => {
    saveCache('sponsor', DEFAULT_SPONSOR);
    set({ sponsorData: DEFAULT_SPONSOR });
  }
}));
