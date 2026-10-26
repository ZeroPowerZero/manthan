import React, { useState } from 'react';
import { useModalStore } from '../../store/useModalStore';
import { useRegistrationStore } from '../../store/useRegistrationStore';
import { RegistrationPathway, ParticipantMember, RegistrationSubmissionResult } from '../../types/registration';
import { RegistrationService } from '../../services/api';
import confetti from 'canvas-confetti';
import { 
  X, Building2, User, BookOpenCheck, Store, Handshake, 
  Plus, Trash2, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Loader2, Copy, Check
} from 'lucide-react';

export const RegistrationDrawer: React.FC = () => {
  const { registrationDrawerOpen, closeRegistration, activePathway, openRegistration } = useModalStore();
  const regStore = useRegistrationStore();

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<RegistrationSubmissionResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // New Participant Input Buffer for Institution Roster
  const [activeRosterCategory, setActiveRosterCategory] = useState<'painting' | 'debate' | 'theatre' | 'dance'>('dance');
  const [memberBuffer, setMemberBuffer] = useState<ParticipantMember>({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    role: 'Performer / Participant'
  });

  if (!registrationDrawerOpen) return null;

  const pathways: { id: RegistrationPathway; label: string; icon: React.ReactNode }[] = [
    { id: 'institution', label: 'Institution', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'individual', label: 'Individual', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'research_scholar', label: 'Research', icon: <BookOpenCheck className="w-3.5 h-3.5" /> },
    { id: 'stall_vendor', label: 'Stall / Vendor', icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'sponsor_partner', label: 'Patron / Sponsor', icon: <Handshake className="w-3.5 h-3.5" /> },
  ];

  const handlePathwayChange = (p: RegistrationPathway) => {
    setValidationError(null);
    setSubmissionResult(null);
    setStep(1);
    openRegistration(p);
  };

  const handleAddMemberToRoster = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!memberBuffer.fullName.trim() || !memberBuffer.studentId.trim()) {
      setValidationError('Please provide both the student full name and institutional Roll / Student ID.');
      return;
    }

    const res = regStore.addInstitutionParticipant(activeRosterCategory, { ...memberBuffer });
    if (!res.success) {
      setValidationError(res.error || 'Could not add student to category.');
    } else {
      // Clear buffer for next student entry
      setMemberBuffer({
        fullName: '',
        email: '',
        phone: '',
        studentId: '',
        role: activeRosterCategory === 'theatre' ? 'Actor / Crew' : 'Performer / Participant'
      });
    }
  };

  const handleSubmit = async () => {
    setValidationError(null);
    setSubmitting(true);

    try {
      let result: RegistrationSubmissionResult;

      if (activePathway === 'institution') {
        const inst = regStore.institutionData;
        if (!inst.institutionName.trim() || !inst.coordinatorName.trim() || !inst.coordinatorEmail.trim()) {
          setValidationError('Please fill in Institution Name, Coordinator Name, and Official Email.');
          setSubmitting(false);
          setStep(1);
          return;
        }

        const totalEntries = 
          inst.entries.painting.length + 
          inst.entries.debate.length + 
          inst.entries.theatre.length + 
          inst.entries.dance.length;

        if (totalEntries === 0) {
          setValidationError('Please add at least one student participant to the delegation roster.');
          setSubmitting(false);
          setStep(2);
          return;
        }

        result = await RegistrationService.submitInstitution(inst);
      } else if (activePathway === 'individual') {
        const ind = regStore.individualData;
        if (!ind.fullName.trim() || !ind.email.trim() || !ind.institutionOrIndependent.trim()) {
          setValidationError('Please complete the mandatory personal and institutional fields.');
          setSubmitting(false);
          return;
        }
        result = await RegistrationService.submitIndividual(ind);
      } else if (activePathway === 'research_scholar') {
        const res = regStore.researchData;
        if (!res.fullName.trim() || !res.paperTitle.trim() || !res.abstractText.trim()) {
          setValidationError('Please provide the Paper Title, Abstract, and Author credentials.');
          setSubmitting(false);
          return;
        }
        result = await RegistrationService.submitResearch(res);
      } else if (activePathway === 'stall_vendor') {
        const vnd = regStore.vendorData;
        if (!vnd.brandName.trim() || !vnd.contactPerson.trim() || !vnd.email.trim()) {
          setValidationError('Please provide Brand Name, Contact Person, and Email.');
          setSubmitting(false);
          return;
        }
        result = await RegistrationService.submitStall(vnd);
      } else {
        const spn = regStore.sponsorData;
        if (!spn.organisationName.trim() || !spn.contactPerson.trim() || !spn.email.trim()) {
          setValidationError('Please provide Organisation Name and Secretariat Contact details.');
          setSubmitting(false);
          return;
        }
        result = await RegistrationService.submitSponsor(spn);
      }

      setSubmissionResult(result);
      setSubmitting(false);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4FD8E8', '#C13DD6', '#F2B84B', '#D8C5F5']
        });
      } catch {
        // Safe fallback if canvas context unavailable
      }
    } catch {
      setValidationError('An unexpected error occurred while processing registration. Please try again.');
      setSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (submissionResult?.referenceNumber) {
      navigator.clipboard.writeText(submissionResult.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-midnight/80 backdrop-blur-md flex justify-end animate-in fade-in duration-300">
      <div 
        className="w-full max-w-2xl bg-midnight-card border-l border-lavender/20 h-full overflow-y-auto flex flex-col justify-between text-ivory shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="p-6 border-b border-lavender/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-holo-cyan block">
                Official Festival Portal · Jammu
              </span>
              <h3 className="font-display text-2xl font-bold text-ivory">
                Registration & Delegation Engine
              </h3>
            </div>
            <button
              onClick={closeRegistration}
              className="p-2 rounded-full bg-midnight border border-lavender/15 text-ivory-dim hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pathway Navigation Pills */}
          {!submissionResult && (
            <div className="px-6 py-3 border-b border-lavender/10 bg-midnight/60 flex items-center gap-2 overflow-x-auto">
              {pathways.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePathwayChange(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    activePathway === p.id
                      ? 'bg-lavender text-midnight font-bold shadow-md'
                      : 'bg-midnight-card/80 border border-lavender/15 text-ivory-muted hover:text-ivory'
                  }`}
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Validation Error Banner */}
          {validationError && (
            <div className="m-6 p-4 rounded-xl bg-burgundy/40 border border-burgundy flex items-start gap-3 text-xs text-ivory">
              <AlertCircle className="w-4 h-4 text-holo-gold shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Content Area */}
          <div className="p-6">
            {/* SUCCESS SLIP */}
            {submissionResult ? (
              <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-holo-cyan/15 border border-holo-cyan/40 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-holo-cyan" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-holo-cyan block">
                    Registration Dossier Filed
                  </span>
                  <h4 className="font-display text-3xl font-bold text-ivory mt-1">
                    Receipt Generated
                  </h4>
                  <p className="text-xs text-ivory-muted max-w-md mx-auto mt-2">
                    Your festival registration has been validated and recorded. An official confirmation summary has been routed for accreditation.
                  </p>
                </div>

                {/* Reference Slip Card */}
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-midnight border border-lavender/20 text-left font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-lavender/10">
                    <span className="text-ivory-dim">Reference Dossier ID</span>
                    <button
                      onClick={handleCopyReference}
                      className="flex items-center gap-1 text-holo-cyan hover:text-white"
                    >
                      <span>{submissionResult.referenceNumber}</span>
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-holo-cyan" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div>
                    <span className="text-ivory-dim text-[10px] block">Registrant / Delegation</span>
                    <span className="text-ivory font-semibold">{submissionResult.nameOrOrg}</span>
                  </div>
                  <div>
                    <span className="text-ivory-dim text-[10px] block">Summary Dossier</span>
                    <span className="text-ivory-muted text-[11px]">{submissionResult.summary}</span>
                  </div>
                  <div className="pt-2 text-[10px] text-holo-gold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved to local state storage for secretariat synchronization</span>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setSubmissionResult(null);
                      closeRegistration();
                    }}
                    className="px-6 py-2.5 rounded-full bg-lavender text-midnight font-mono text-xs font-bold hover:bg-white transition-colors"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* ================= PATHWAY 1: INSTITUTION ================= */}
                {activePathway === 'institution' && (
                  <div className="space-y-6">
                    {/* Stepper Tabs */}
                    <div className="flex items-center justify-between pb-4 border-b border-lavender/10 text-xs font-mono">
                      <button
                        onClick={() => setStep(1)}
                        className={`cursor-pointer ${step === 1 ? 'text-holo-cyan font-bold' : 'text-ivory-dim'}`}
                      >
                        1. Institution Credentials
                      </button>
                      <span className="text-ivory-dim">→</span>
                      <button
                        onClick={() => setStep(2)}
                        className={`cursor-pointer ${step === 2 ? 'text-holo-cyan font-bold' : 'text-ivory-dim'}`}
                      >
                        2. Multi-Category Roster
                      </button>
                      <span className="text-ivory-dim">→</span>
                      <button
                        onClick={() => setStep(3)}
                        className={`cursor-pointer ${step === 3 ? 'text-holo-cyan font-bold' : 'text-ivory-dim'}`}
                      >
                        3. Review & File
                      </button>
                    </div>

                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-mono text-ivory-dim block mb-1">
                              School / College Name *
                            </label>
                            <input
                              type="text"
                              value={regStore.institutionData.institutionName}
                              onChange={(e) => regStore.setInstitutionField('institutionName', e.target.value)}
                              placeholder="e.g., University of Jammu / Model Academy"
                              className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-mono text-ivory-dim block mb-1">
                              Institution Type
                            </label>
                            <select
                              value={regStore.institutionData.institutionType}
                              onChange={(e) => regStore.setInstitutionField('institutionType', e.target.value as any)}
                              className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            >
                              <option value="college">Degree College</option>
                              <option value="university">University Department</option>
                              <option value="school">Secondary School (Grades 9-12)</option>
                              <option value="autonomous_institute">Autonomous Institution</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-mono text-ivory-dim block mb-1">
                              Faculty Coordinator Name *
                            </label>
                            <input
                              type="text"
                              value={regStore.institutionData.coordinatorName}
                              onChange={(e) => regStore.setInstitutionField('coordinatorName', e.target.value)}
                              placeholder="Prof. / Dr. / Teacher In-charge"
                              className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-mono text-ivory-dim block mb-1">
                              Coordinator Email *
                            </label>
                            <input
                              type="email"
                              value={regStore.institutionData.coordinatorEmail}
                              onChange={(e) => regStore.setInstitutionField('coordinatorEmail', e.target.value)}
                              placeholder="coordinator@institution.edu.in"
                              className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-mono text-ivory-dim block mb-1">
                              Coordinator Contact Phone
                            </label>
                            <input
                              type="tel"
                              value={regStore.institutionData.coordinatorPhone}
                              onChange={(e) => regStore.setInstitutionField('coordinatorPhone', e.target.value)}
                              placeholder="+91 94191-XXXXX"
                              className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-mono text-ivory-dim block mb-1">
                              Principal / Dean of Student Welfare
                            </label>
                            <input
                              type="text"
                              value={regStore.institutionData.principalDeanName}
                              onChange={(e) => regStore.setInstitutionField('principalDeanName', e.target.value)}
                              placeholder="Name of Dean / Principal"
                              className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-5 py-2.5 rounded-full bg-lavender text-midnight font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5"
                          >
                            <span>Proceed to Student Roster</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        {/* Blueprint Quota Rules Notice */}
                        <div className="p-3.5 rounded-xl bg-midnight border border-lavender/15 text-[11px] font-mono text-ivory-muted">
                          <span className="text-holo-cyan font-bold block mb-1">Institutional Quota Rules Enforced:</span>
                          Painting (Max 1) • Debate (Max 2) • Theatre (Max 6) • Dance (Max 6).
                          <span className="text-holo-magenta block mt-0.5">
                            *Cross-category rule: No student may appear in more than one event roster.
                          </span>
                        </div>

                        {/* Category Selector Tabs */}
                        <div className="flex items-center gap-2 border-b border-lavender/10 pb-3">
                          {(['dance', 'theatre', 'debate', 'painting'] as const).map((cat) => {
                            const count = regStore.institutionData.entries[cat].length;
                            const max = cat === 'painting' ? 1 : cat === 'debate' ? 2 : 6;
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveRosterCategory(cat)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all ${
                                  activeRosterCategory === cat
                                    ? 'bg-midnight text-holo-cyan border border-holo-cyan/50 font-bold'
                                    : 'text-ivory-dim hover:text-ivory'
                                }`}
                              >
                                {cat} ({count}/{max})
                              </button>
                            );
                          })}
                        </div>

                        {/* Add Member Form */}
                        <form onSubmit={handleAddMemberToRoster} className="p-4 rounded-2xl bg-midnight/80 border border-lavender/15 space-y-3">
                          <h5 className="text-xs font-mono uppercase text-lavender font-semibold">
                            Add Student to {activeRosterCategory.toUpperCase()} Roster
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={memberBuffer.fullName}
                              onChange={(e) => setMemberBuffer({ ...memberBuffer, fullName: e.target.value })}
                              placeholder="Student Full Name *"
                              className="px-3 py-2 rounded-xl bg-midnight-card border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                            <input
                              type="text"
                              value={memberBuffer.studentId}
                              onChange={(e) => setMemberBuffer({ ...memberBuffer, studentId: e.target.value })}
                              placeholder="College Roll No / Student ID *"
                              className="px-3 py-2 rounded-xl bg-midnight-card border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="email"
                              value={memberBuffer.email}
                              onChange={(e) => setMemberBuffer({ ...memberBuffer, email: e.target.value })}
                              placeholder="Student Email (optional)"
                              className="px-3 py-2 rounded-xl bg-midnight-card border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                            <input
                              type="text"
                              value={memberBuffer.role}
                              onChange={(e) => setMemberBuffer({ ...memberBuffer, role: e.target.value })}
                              placeholder="Role / Position"
                              className="px-3 py-2 rounded-xl bg-midnight-card border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                            />
                          </div>

                          <div className="flex justify-end pt-1">
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-holo-cyan/20 border border-holo-cyan/50 text-holo-cyan hover:bg-holo-cyan hover:text-midnight font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to {activeRosterCategory} Roster</span>
                            </button>
                          </div>
                        </form>

                        {/* Current Category Members Table */}
                        <div className="space-y-2">
                          <h6 className="text-[11px] font-mono uppercase text-ivory-dim">
                            Current Enrolled Roster for {activeRosterCategory.toUpperCase()}:
                          </h6>
                          {regStore.institutionData.entries[activeRosterCategory].length === 0 ? (
                            <p className="text-xs font-mono text-ivory-dim italic p-3 bg-midnight/40 rounded-xl">
                              No students rostered yet for this category.
                            </p>
                          ) : (
                            <div className="space-y-1.5">
                              {regStore.institutionData.entries[activeRosterCategory].map((mem, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded-xl bg-midnight border border-lavender/10 flex items-center justify-between text-xs font-mono"
                                >
                                  <div>
                                    <span className="font-semibold text-ivory">{mem.fullName}</span>
                                    <span className="text-ivory-dim text-[11px] ml-2">ID: {mem.studentId}</span>
                                    {mem.role && <span className="text-holo-gold/80 text-[10px] ml-2">({mem.role})</span>}
                                  </div>
                                  <button
                                    onClick={() => regStore.removeInstitutionParticipant(activeRosterCategory, idx)}
                                    className="p-1 rounded text-burgundy-light hover:text-red-400"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Stepper Nav */}
                        <div className="flex justify-between pt-4 border-t border-lavender/10">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-4 py-2 rounded-full border border-lavender/20 text-xs font-mono text-ivory flex items-center gap-1.5"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="px-5 py-2 rounded-full bg-lavender text-midnight font-mono text-xs font-bold hover:bg-white flex items-center gap-1.5"
                          >
                            <span>Review Delegation</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="p-4 rounded-2xl bg-midnight border border-lavender/15 space-y-3 text-xs font-mono">
                          <h5 className="font-semibold text-lavender uppercase text-[11px] pb-2 border-b border-lavender/10">
                            Delegation Summary
                          </h5>
                          <div>
                            <span className="text-ivory-dim">Institution: </span>
                            <span className="text-ivory font-semibold">{regStore.institutionData.institutionName}</span>
                          </div>
                          <div>
                            <span className="text-ivory-dim">Coordinator: </span>
                            <span className="text-ivory">{regStore.institutionData.coordinatorName} ({regStore.institutionData.coordinatorEmail})</span>
                          </div>
                          <div className="pt-2 border-t border-lavender/10">
                            <span className="text-ivory-dim block mb-1">Rostered Delegates by Category:</span>
                            <ul className="space-y-1 text-ivory">
                              <li>• Dance: {regStore.institutionData.entries.dance.length} / 6 members</li>
                              <li>• Theatre: {regStore.institutionData.entries.theatre.length} / 6 members</li>
                              <li>• Debate: {regStore.institutionData.entries.debate.length} / 2 debaters</li>
                              <li>• Painting: {regStore.institutionData.entries.painting.length} / 1 artist</li>
                            </ul>
                            <div className="mt-2 text-holo-cyan font-bold">
                              Total Students: {regStore.institutionData.totalStudentDelegates}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4 border-t border-lavender/10">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-4 py-2 rounded-full border border-lavender/20 text-xs font-mono text-ivory flex items-center gap-1.5"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Modify Roster</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="iridescent-border group px-6 py-2.5 text-xs font-mono font-semibold text-ivory hover:text-white flex items-center gap-2 cursor-pointer shadow-lg"
                          >
                            {submitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin text-holo-cyan" />
                                <span>Validating & Filing...</span>
                              </>
                            ) : (
                              <span>Confirm & File Delegation</span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ================= PATHWAY 2: INDIVIDUAL ================= */}
                {activePathway === 'individual' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-midnight border border-lavender/15 text-[11px] font-mono text-ivory-muted">
                      Individual pathway allows entering exactly 1 category only. Solo or independent artists.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={regStore.individualData.fullName}
                          onChange={(e) => regStore.setIndividualField('fullName', e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Email *</label>
                        <input
                          type="email"
                          value={regStore.individualData.email}
                          onChange={(e) => regStore.setIndividualField('email', e.target.value)}
                          placeholder="your.email@domain.com"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          value={regStore.individualData.phone}
                          onChange={(e) => regStore.setIndividualField('phone', e.target.value)}
                          placeholder="+91 98765-XXXXX"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Institution or Independent *</label>
                        <input
                          type="text"
                          value={regStore.individualData.institutionOrIndependent}
                          onChange={(e) => regStore.setIndividualField('institutionOrIndependent', e.target.value)}
                          placeholder="College / School Name or 'Independent'"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Event Category *</label>
                        <select
                          value={regStore.individualData.eventCategory}
                          onChange={(e) => regStore.setIndividualField('eventCategory', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        >
                          <option value="painting">01 Painting — The Inner Canvas</option>
                          <option value="psychology_experiences">07 Psychology Experiences & Open Mic</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Attendance Day</label>
                        <select
                          value={regStore.individualData.dayPreference}
                          onChange={(e) => regStore.setIndividualField('dayPreference', e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        >
                          <option value="day1">Day 1 (Friday)</option>
                          <option value="day2">Day 2 (Saturday)</option>
                          <option value="both">Both Festival Days</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="iridescent-border group px-6 py-2.5 text-xs font-mono font-semibold text-ivory hover:text-white flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin text-holo-cyan" /> : <span>Submit Individual Entry</span>}
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= PATHWAY 3: RESEARCH SCHOLAR ================= */}
                {activePathway === 'research_scholar' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-midnight border border-lavender/15 text-[11px] font-mono text-ivory-muted">
                      Submit for the Research Forum: "Ideas Into Inquiry". 50 shortlisted papers (25/day) presented before academic reviewers.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Author Full Name *</label>
                        <input
                          type="text"
                          value={regStore.researchData.fullName}
                          onChange={(e) => regStore.setResearchField('fullName', e.target.value)}
                          placeholder="Scholar Name"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Academic Affiliation *</label>
                        <input
                          type="text"
                          value={regStore.researchData.academicAffiliation}
                          onChange={(e) => regStore.setResearchField('academicAffiliation', e.target.value)}
                          placeholder="University / Department"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-ivory-dim block mb-1">Research Paper Title *</label>
                      <input
                        type="text"
                        value={regStore.researchData.paperTitle}
                        onChange={(e) => regStore.setResearchField('paperTitle', e.target.value)}
                        placeholder="e.g., The Neural Substrates of Metacognitive Reflection"
                        className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-ivory-dim block mb-1">Abstract (Max 300 words) *</label>
                      <textarea
                        rows={4}
                        value={regStore.researchData.abstractText}
                        onChange={(e) => regStore.setResearchField('abstractText', e.target.value)}
                        placeholder="Provide background, methodology, empirical findings, and implications..."
                        className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none resize-none font-sans"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="iridescent-border group px-6 py-2.5 text-xs font-mono font-semibold text-ivory hover:text-white flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin text-holo-cyan" /> : <span>Submit Research Paper</span>}
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= PATHWAY 4: STALL / VENDOR ================= */}
                {activePathway === 'stall_vendor' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-midnight border border-lavender/15 text-[11px] font-mono text-ivory-muted">
                      Concourse Stalls: 6x6 or 10x10 covered canopies with power. Food and merchandise subject to festival regulations.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Brand / Enterprise Name *</label>
                        <input
                          type="text"
                          value={regStore.vendorData.brandName}
                          onChange={(e) => regStore.setVendorField('brandName', e.target.value)}
                          placeholder="Brand Name"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Contact Person *</label>
                        <input
                          type="text"
                          value={regStore.vendorData.contactPerson}
                          onChange={(e) => regStore.setVendorField('contactPerson', e.target.value)}
                          placeholder="Contact Person"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Category</label>
                        <select
                          value={regStore.vendorData.category}
                          onChange={(e) => regStore.setVendorField('category', e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        >
                          <option value="books_psychology">Books & Psychology Literature</option>
                          <option value="artisan_crafts">Artisan Crafts & Stationery</option>
                          <option value="wellness_mind">Mindfulness & Wellness Apparatus</option>
                          <option value="food_beverage">Food & Refreshments</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Space Requirement</label>
                        <select
                          value={regStore.vendorData.spaceRequirement}
                          onChange={(e) => regStore.setVendorField('spaceRequirement', e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        >
                          <option value="standard_canopy_6x6">Standard Canopy (6x6 ft)</option>
                          <option value="deluxe_canopy_10x10">Deluxe Pavilion (10x10 ft)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="iridescent-border group px-6 py-2.5 text-xs font-mono font-semibold text-ivory hover:text-white flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin text-holo-cyan" /> : <span>Submit Stall Inquiry</span>}
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= PATHWAY 5: SPONSOR / PARTNER ================= */}
                {activePathway === 'sponsor_partner' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-midnight border border-lavender/15 text-[11px] font-mono text-ivory-muted">
                      Blueprint Rule: Sponsorship routes to festival secretariat desk for custom coordination. No payment gateway.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Organisation / Company Name *</label>
                        <input
                          type="text"
                          value={regStore.sponsorData.organisationName}
                          onChange={(e) => regStore.setSponsorField('organisationName', e.target.value)}
                          placeholder="Corporate / Foundation Name"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-ivory-dim block mb-1">Contact Officer *</label>
                        <input
                          type="text"
                          value={regStore.sponsorData.contactPerson}
                          onChange={(e) => regStore.setSponsorField('contactPerson', e.target.value)}
                          placeholder="Lead Officer / CSR Head"
                          className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-ivory-dim block mb-1">Patronage Tier of Interest</label>
                      <select
                        value={regStore.sponsorData.partnershipType}
                        onChange={(e) => regStore.setSponsorField('partnershipType', e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-midnight border border-lavender/15 text-xs text-ivory focus:border-holo-cyan focus:outline-none"
                      >
                        <option value="associate_patron">Associate Patron & Concourse Sponsor</option>
                        <option value="title_partner">Title Festival Patron</option>
                        <option value="session_curator">Academic Session Curator</option>
                        <option value="creative_awards_sponsor">Championship Trophy & Laureate Sponsor</option>
                      </select>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="iridescent-border group px-6 py-2.5 text-xs font-mono font-semibold text-ivory hover:text-white flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin text-holo-cyan" /> : <span>Dispatch Partnership Dossier</span>}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-midnight border-t border-lavender/10 text-center text-[10px] font-mono text-ivory-dim">
          Official MANTHAN: PSYCHE 2026/27* Syndicate Protocol · Jammu
        </div>
      </div>
    </div>
  );
};
