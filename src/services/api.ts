import { 
  IndividualRegistrationData, 
  InstitutionRegistrationData, 
  ResearchScholarData, 
  VendorStallData, 
  SponsorPartnerData,
  RegistrationSubmissionResult,
  RegistrationPathway
} from '../types/registration';

const LOCAL_STORAGE_SUBMISSIONS_KEY = 'manthan_psyche_submissions_v1';

export class RegistrationService {
  /**
   * Helper to retrieve persisted submissions from localStorage
   */
  static getPersistedSubmissions(): RegistrationSubmissionResult[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Could not read submissions from localStorage', e);
      return [];
    }
  }

  /**
   * Simulates backend submission with validation, ID generation, and simulated network delay
   */
  private static async persistSubmission(
    pathway: RegistrationPathway, 
    nameOrOrg: string, 
    email: string, 
    summary: string,
    fullPayload: unknown
  ): Promise<RegistrationSubmissionResult> {
    // Simulate network roundtrip latency (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const prefixMap: Record<RegistrationPathway, string> = {
      individual: 'IND',
      institution: 'INST',
      research_scholar: 'RES',
      stall_vendor: 'VND',
      sponsor_partner: 'SPN'
    };

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `MANTHAN-2027-${prefixMap[pathway]}-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const result: RegistrationSubmissionResult = {
      referenceNumber,
      timestamp,
      pathway,
      status: pathway === 'sponsor_partner' ? 'pending_review' : 'confirmed',
      nameOrOrg,
      email,
      summary
    };

    // Store in localStorage for backend readiness & demo inspection
    try {
      const existing = this.getPersistedSubmissions();
      const updated = [result, ...existing];
      localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(updated));
      // Also save detailed log for backend developer review
      localStorage.setItem(`manthan_payload_${referenceNumber}`, JSON.stringify(fullPayload));
    } catch (err) {
      console.error('Error caching submission to localStorage', err);
    }

    return result;
  }

  static async submitIndividual(data: IndividualRegistrationData): Promise<RegistrationSubmissionResult> {
    return this.persistSubmission(
      'individual',
      data.fullName,
      data.email,
      `Individual Registration: ${data.eventCategory.toUpperCase()} (${data.institutionOrIndependent})`,
      data
    );
  }

  static async submitInstitution(data: InstitutionRegistrationData): Promise<RegistrationSubmissionResult> {
    const totalCount = 
      data.entries.painting.length + 
      data.entries.debate.length + 
      data.entries.theatre.length + 
      data.entries.dance.length;

    return this.persistSubmission(
      'institution',
      data.institutionName,
      data.coordinatorEmail,
      `Institution Delegation: ${data.institutionName} (${totalCount} student delegates, Coordinator: ${data.coordinatorName})`,
      data
    );
  }

  static async submitResearch(data: ResearchScholarData): Promise<RegistrationSubmissionResult> {
    return this.persistSubmission(
      'research_scholar',
      data.fullName,
      data.email,
      `Research Paper: "${data.paperTitle}" (${data.academicAffiliation})`,
      data
    );
  }

  static async submitStall(data: VendorStallData): Promise<RegistrationSubmissionResult> {
    return this.persistSubmission(
      'stall_vendor',
      data.brandName,
      data.email,
      `Vendor Stall Request: ${data.brandName} (${data.category}, ${data.spaceRequirement})`,
      data
    );
  }

  static async submitSponsor(data: SponsorPartnerData): Promise<RegistrationSubmissionResult> {
    return this.persistSubmission(
      'sponsor_partner',
      data.organisationName,
      data.email,
      `Sponsorship Inquiry: ${data.organisationName} (${data.partnershipType})`,
      data
    );
  }
}
