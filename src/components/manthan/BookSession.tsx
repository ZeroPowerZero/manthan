import React, { useState, useEffect } from 'react';
import { SESSIONS_DATA, CONTACT_INFO, SessionTopic } from '../../data/manthanContent';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, Calendar, Users, Building2, User, HelpCircle } from 'lucide-react';

interface BookSessionProps {
  selectedTopicTitle?: string;
}

export const BookSession: React.FC<BookSessionProps> = ({ selectedTopicTitle }) => {
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: 'College',
    contactName: '',
    email: '',
    phone: '',
    preferredTopic: selectedTopicTitle || SESSIONS_DATA[0].title,
    participantCount: '',
    preferredDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');

  // Update preferred topic if prop changes
  useEffect(() => {
    if (selectedTopicTitle) {
      setFormData((prev) => ({ ...prev, preferredTopic: selectedTopicTitle }));
    }
  }, [selectedTopicTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ref = `MANTHAN-${Date.now().toString().slice(-6)}`;
    setEnquiryRef(ref);

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('manthan_enquiries') || '[]');
      existing.push({
        ...formData,
        ref,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('manthan_enquiries', JSON.stringify(existing));
    } catch {
      // Fallback
    }

    setSubmitted(true);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(`MANTHAN Session Enquiry [${enquiryRef}] — ${formData.institutionName}`);
    const body = encodeURIComponent(
      `Hello MANTHAN Team,\n\n` +
      `We would like to enquire about organizing an institutional session with MANTHAN.\n\n` +
      `--- Enquiry Details ---\n` +
      `Reference Code: ${enquiryRef}\n` +
      `Institution Name: ${formData.institutionName}\n` +
      `Institution Type: ${formData.institutionType}\n` +
      `Contact Person: ${formData.contactName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Preferred Session Topic: ${formData.preferredTopic}\n` +
      `Approx. Participants: ${formData.participantCount || 'To be decided'}\n` +
      `Preferred Date: ${formData.preferredDate || 'Flexible'}\n` +
      `Additional Requirements: ${formData.message || 'None'}\n\n` +
      `Looking forward to hearing from you.\n` +
      `Warm regards,\n${formData.contactName}`
    );
    return `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="book" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 bg-midnight">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-mono tracking-widest text-holo-cyan uppercase mb-3">
            Institutional Enquiry
          </span>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight mb-4">
            Book an Institutional Session with MANTHAN
          </h2>
          <p className="text-sm sm:text-base text-ivory/70 font-sans leading-relaxed">
            Invite MANTHAN to your school, college, or university. Complete this short enquiry to begin a conversation.
          </p>
        </div>

        {/* IMPORTANT SAFEGUARD NOTICE */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-holo-cyan/5 border border-holo-cyan/20 flex items-start gap-3.5 text-left">
          <AlertCircle className="w-5 h-5 text-holo-cyan mt-0.5 shrink-0" />
          <div className="text-xs sm:text-[13px] text-ivory/80 leading-relaxed font-sans">
            <strong className="text-holo-cyan font-semibold">Important Notice: </strong>
            Submitting this form should be treated as an enquiry, not an automatically confirmed booking.
            After receiving your details, the MANTHAN team will contact your institution to discuss the topic, format, date, and specific requirements before confirming the session.
          </div>
        </div>

        {/* Success State */}
        {submitted ? (
          <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center border border-holo-cyan/30 bg-midnight-surface/80 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-holo-cyan/15 border border-holo-cyan/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-holo-cyan" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-holo-cyan">
              Enquiry Submitted
            </span>
            <h3 className="font-mono text-2xl sm:text-3xl font-bold text-ivory mt-2 mb-3">
              Thank You for Reaching Out
            </h3>
            <p className="text-sm text-ivory/70 max-w-lg mx-auto font-sans leading-relaxed mb-6">
              We have recorded your enquiry for <strong className="text-ivory">{formData.institutionName}</strong> under reference:
            </p>

            <div className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-sm sm:text-base text-lavender font-semibold mb-8">
              {enquiryRef}
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-ivory/70 max-w-md mx-auto mb-8 leading-relaxed">
              Our team will review your preferred topic (<span className="text-holo-cyan font-medium">{formData.preferredTopic}</span>)
              and contact <strong className="text-ivory">{formData.contactName}</strong> at <span className="text-ivory">{formData.email}</span> shortly.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={generateMailto()}
                className="px-6 py-3 rounded-full text-xs font-semibold text-midnight bg-holo-cyan hover:bg-holo-cyan/90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email to MANTHAN</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    institutionName: '',
                    institutionType: 'College',
                    contactName: '',
                    email: '',
                    phone: '',
                    preferredTopic: SESSIONS_DATA[0].title,
                    participantCount: '',
                    preferredDate: '',
                    message: '',
                  });
                }}
                className="px-6 py-3 rounded-full text-xs font-medium text-lavender border border-lavender/20 hover:border-lavender/50 transition-all cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form
            onSubmit={handleSubmit}
            className="glass-panel rounded-3xl p-6 sm:p-10 border border-lavender/15 bg-midnight-surface/70 space-y-6"
          >
            {/* Row 1: Institution Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                  Institution Name <span className="text-holo-cyan">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-lavender/40 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    placeholder="e.g. Model Academy / University of Jammu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-holo-cyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                  Institution Type <span className="text-holo-cyan">*</span>
                </label>
                <select
                  name="institutionType"
                  value={formData.institutionType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm focus:outline-none focus:border-holo-cyan transition-colors"
                >
                  <option value="School" className="bg-midnight text-ivory">School</option>
                  <option value="College" className="bg-midnight text-ivory">College</option>
                  <option value="University" className="bg-midnight text-ivory">University</option>
                  <option value="Other" className="bg-midnight text-ivory">Other Educational Entity</option>
                </select>
              </div>
            </div>

            {/* Row 2: Contact Person & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                  Contact Person's Name <span className="text-holo-cyan">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-lavender/40 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="e.g. Dr. A. Sharma / Prof. Verma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-holo-cyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                  Email Address <span className="text-holo-cyan">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-lavender/40 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@institution.edu.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-holo-cyan transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Phone & Preferred Topic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                  Phone Number <span className="text-holo-cyan">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-lavender/40 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-holo-cyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                  Preferred Session Topic <span className="text-holo-cyan">*</span>
                </label>
                <select
                  name="preferredTopic"
                  value={formData.preferredTopic}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm focus:outline-none focus:border-holo-cyan transition-colors"
                >
                  {SESSIONS_DATA.map((s: SessionTopic) => (
                    <option key={s.id} value={s.title} className="bg-midnight text-ivory">
                      {s.title}
                    </option>
                  ))}
                  <option value="Interdisciplinary / Custom Curriculum" className="bg-midnight text-ivory">
                    Custom Topic / Interdisciplinary Dialogue
                  </option>
                  <option value="To be discussed with MANTHAN team" className="bg-midnight text-ivory">
                    To be discussed with MANTHAN team
                  </option>
                </select>
              </div>
            </div>

            {/* Row 4: Participants & Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                  Approx. Students or Participants
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-lavender/40 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="participantCount"
                    value={formData.participantCount}
                    onChange={handleChange}
                    placeholder="e.g. 50-80 students"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-holo-cyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                  Preferred Date (or Timeline)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-lavender/40 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    placeholder="e.g. Mid Next Month / Specific Date"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-holo-cyan transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Message / Additional Requirements */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-lavender/80 mb-2">
                Additional Requirements or Message
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share any specific learning objectives, student age group, format preferences (in-person/virtual), or questions..."
                className="w-full px-4 py-3 rounded-xl bg-midnight/80 border border-lavender/20 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-holo-cyan transition-colors resize-y"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl text-sm font-semibold text-midnight bg-holo-cyan hover:bg-holo-cyan/90 transition-all duration-300 shadow-[0_0_20px_rgba(79,216,232,0.3)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Institutional Enquiry</span>
                <Send className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-ivory/50 font-sans text-center mt-2.5 flex items-center justify-center gap-1">
                <HelpCircle className="w-3 h-3 text-holo-cyan" />
                No immediate payment or commitment required. We discuss requirements first.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
