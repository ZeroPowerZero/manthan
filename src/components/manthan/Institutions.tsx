import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  School,
  GraduationCap,
  Award,
  Clock,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { MANTHAN_CONTENT } from '../../data/manthanContent';

interface InstitutionsProps {
  selectedTopicTitle?: string;
}

export const Institutions: React.FC<InstitutionsProps> = ({ selectedTopicTitle }) => {
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: 'College / University',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    preferredTopic: selectedTopicTitle || MANTHAN_CONTENT.workshops[0].title,
    cohortSize: '50 - 100 Students',
    preferredTimeline: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  useEffect(() => {
    if (selectedTopicTitle) {
      setFormData((prev) => ({ ...prev, preferredTopic: selectedTopicTitle }));
    }
  }, [selectedTopicTitle]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ref = `MANTHAN-${Date.now().toString().slice(-6)}`;
    setReferenceCode(ref);

    try {
      const existing = JSON.parse(localStorage.getItem('manthan_bookings') || '[]');
      existing.push({
        ...formData,
        ref,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('manthan_bookings', JSON.stringify(existing));
    } catch {
      // Fallback
    }

    setSubmitted(true);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(
      `MANTHAN Institutional Collaboration [${referenceCode}] — ${formData.institutionName}`
    );
    const body = encodeURIComponent(
      `Dear MANTHAN Team,\n\n` +
        `We would like to explore organizing an institutional collaboration / session with MANTHAN.\n\n` +
        `--- Institutional Details ---\n` +
        `Reference ID: ${referenceCode}\n` +
        `Institution: ${formData.institutionName} (${formData.institutionType})\n` +
        `Contact Person: ${formData.contactPerson} (${formData.designation || 'Coordinator'})\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Preferred Focus Area: ${formData.preferredTopic}\n` +
        `Estimated Cohort: ${formData.cohortSize}\n` +
        `Preferred Timeline: ${formData.preferredTimeline || 'Flexible'}\n` +
        `Specific Objectives / Notes: ${formData.notes || 'None specified'}\n\n` +
        `Looking forward to discussing the schedule and session structure.\n\n` +
        `Sincerely,\n` +
        `${formData.contactPerson}\n` +
        `${formData.institutionName}`
    );
    return `mailto:${MANTHAN_CONTENT.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="institutions" className="py-28 sm:py-36 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-400/10 text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>{MANTHAN_CONTENT.institutions.sectionTitle}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide mb-4">
            Bringing <span className="text-yellow-400 font-serif italic font-normal">MANTHAN</span> to Institutions
          </h2>

          <p className="font-serif italic text-2xl sm:text-3xl text-yellow-400 font-normal mb-6">
            &ldquo;{MANTHAN_CONTENT.institutions.subtitle}&rdquo;
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {MANTHAN_CONTENT.institutions.body}
          </p>
        </div>

        {/* 3 Institutional Collaboration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {MANTHAN_CONTENT.institutions.collaborationTypes.map((tier, idx) => {
            const icons = [
              <School className="w-5 h-5 text-yellow-400" key="1" />,
              <GraduationCap className="w-5 h-5 text-yellow-400" key="2" />,
              <Award className="w-5 h-5 text-yellow-400" key="3" />,
            ];
            return (
              <div key={tier.title} className="theme-card p-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-5">
                  {icons[idx]}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {tier.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {tier.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Booking Console with Soft Rounded Layout */}
        <div className="max-w-3xl mx-auto theme-card overflow-hidden">
          <div className="px-6 py-5 sm:px-8 sm:py-6 bg-white/[0.02] flex items-center justify-between">
            <div>
              <span className="text-xs font-mono tracking-wider text-yellow-400 uppercase font-semibold">
                Official Collaboration Portal
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Request an Institutional Session
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span>Prompt response within 24-48 hrs</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 text-emerald-400 mx-auto flex items-center justify-center mb-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/20 px-3.5 py-1 rounded-full uppercase">
                  Enquiry Registered · Ref #{referenceCode}
                </span>

                <h4 className="text-2xl font-bold text-white mt-4 mb-2">
                  Thank You for Connecting with MANTHAN
                </h4>

                <p className="text-sm text-slate-300 max-w-md mx-auto mb-8 font-sans">
                  Your request for <span className="font-semibold text-white">{formData.institutionName}</span> has been documented.
                  To ensure immediate coordination, dispatch your official email or connect directly with our team.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={generateMailto()}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold btn-primary flex items-center justify-center gap-2 shadow"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Official Email Now</span>
                  </a>

                  <a
                    href={MANTHAN_CONTENT.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-400 hover:text-white underline py-2 cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Institution Name */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300">
                      Institution Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="institutionName"
                      required
                      placeholder="e.g. Heritage School Jammu / University of Jammu"
                      value={formData.institutionName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-all"
                    />
                  </div>

                  {/* Institution Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Institution Type <span className="text-amber-400">*</span>
                    </label>
                    <select
                      name="institutionType"
                      value={formData.institutionType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 focus:border-yellow-400 transition-all"
                    >
                      <option>School (Secondary / Senior Secondary)</option>
                      <option>College / Undergraduate</option>
                      <option>University / Postgraduate</option>
                      <option>Educational Society / NGO</option>
                      <option>Other Educational Organisation</option>
                    </select>
                  </div>

                  {/* Preferred Topic */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Preferred Focus Area / Topic <span className="text-amber-400">*</span>
                    </label>
                    <select
                      name="preferredTopic"
                      value={formData.preferredTopic}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 focus:border-yellow-400 transition-all"
                    >
                      {MANTHAN_CONTENT.workshops.map((w) => (
                        <option key={w.id} value={w.title}>
                          {w.title}
                        </option>
                      ))}
                      <option value="Custom Interdisciplinary Symposium">
                        Custom Interdisciplinary Symposium
                      </option>
                    </select>
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Contact Person Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      placeholder="e.g. Prof. Sharma / Dr. Verma / Mrs. Gupta"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-all"
                    />
                  </div>

                  {/* Designation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      name="designation"
                      placeholder="e.g. Principal / HOD Psychology / Cultural Dean"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Official Email <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. principal@institution.edu.in"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Contact Phone / WhatsApp <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-all"
                    />
                  </div>

                  {/* Cohort Size */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Estimated Student Cohort Size
                    </label>
                    <select
                      name="cohortSize"
                      value={formData.cohortSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 focus:border-yellow-400 transition-all"
                    >
                      <option>30 - 60 Students (Classroom Workshop)</option>
                      <option>60 - 150 Students (Auditorium Session)</option>
                      <option>150 - 300 Students (Department Assembly)</option>
                      <option>300+ Students (Full Institution Gathering)</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Preferred Timeline / Date
                    </label>
                    <input
                      type="text"
                      name="preferredTimeline"
                      placeholder="e.g. Next month / Flexible / Dec 2026"
                      value={formData.preferredTimeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-all"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Specific Learning Objectives or Comments (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    placeholder="Share any specific needs, cohort year group, or custom themes you would like included..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border-yellow-500/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold btn-primary flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Institutional Request</span>
                  </button>

                  <span className="text-xs text-slate-400 text-center sm:text-right">
                    Official Email: <a href={`mailto:${MANTHAN_CONTENT.contact.email}`} className="text-amber-400 font-semibold underline">{MANTHAN_CONTENT.contact.email}</a>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
