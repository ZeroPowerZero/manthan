import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import { MANTHAN_CONTENT } from '../../data/manthanContent';

export const Contact: React.FC = () => {
  const [msgForm, setMsgForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-400/10 text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>{MANTHAN_CONTENT.contact.sectionTitle}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide mb-4">
            Let&apos;s <span className="text-yellow-400 font-serif italic font-normal">Collaborate</span> &amp; Inquire Together
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
            {MANTHAN_CONTENT.contact.description}
          </p>
        </div>

        {/* 2-Column Contact Channels & Direct Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card */}
            <a
              href={`tel:${MANTHAN_CONTENT.contact.phone}`}
              className="theme-card p-6 flex items-start gap-4 group cursor-pointer block"
            >
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] text-yellow-400 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono font-semibold uppercase text-slate-500 tracking-wider block">
                  Direct Phone / Inquiry
                </span>
                <p className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mt-0.5">
                  {MANTHAN_CONTENT.contact.phoneFormatted}
                </p>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  Call or WhatsApp for institutional coordination
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors" />
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${MANTHAN_CONTENT.contact.email}`}
              className="theme-card p-6 flex items-start gap-4 group cursor-pointer block"
            >
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] text-yellow-400 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono font-semibold uppercase text-slate-500 tracking-wider block">
                  Official Email
                </span>
                <p className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mt-0.5 break-all">
                  {MANTHAN_CONTENT.contact.email}
                </p>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  Proposals, workshop briefs & general correspondence
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors" />
            </a>

            {/* WhatsApp Quick Connect */}
            <a
              href={MANTHAN_CONTENT.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-card p-6 flex items-start gap-4 group cursor-pointer block"
            >
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] text-emerald-400 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono font-semibold uppercase text-slate-500 tracking-wider block">
                  Instant Messaging
                </span>
                <p className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mt-0.5">
                  WhatsApp Support
                </p>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  Direct inquiry & scheduling
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* Geographic Scope */}
            <div className="p-6 rounded-3xl bg-black/40 backdrop-blur-md shadow-2xl text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>Geographic Scope & Delivery</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                MANTHAN organizes in-person summits, on-campus workshop sessions, and virtual interactive modules for schools, colleges and universities across India.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Message Form with Soft Inputs */}
          <div className="lg:col-span-7 theme-card p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Have a question, feedback, or collaborative idea to share? Write to us directly.
            </p>

            {sent ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-950/70 text-emerald-400 mx-auto flex items-center justify-center mb-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Message Prepared
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
                  Thank you for reaching out to MANTHAN. Our team will review your message and reply via email shortly.
                </p>
                <a
                  href={`mailto:${MANTHAN_CONTENT.contact.email}?subject=${encodeURIComponent(msgForm.subject || 'Inquiry')}&body=${encodeURIComponent(msgForm.message)}`}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold btn-primary"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email Client</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={msgForm.name}
                      onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-yellow-500/20 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@gmail.com"
                      value={msgForm.email}
                      onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-yellow-500/20 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Inquiry regarding Youth Cultural Exchange"
                    value={msgForm.subject}
                    onChange={(e) => setMsgForm({ ...msgForm, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-yellow-500/20 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you'd like to explore, discuss, or inquire about..."
                    value={msgForm.message}
                    onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-yellow-500/20 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full text-xs font-bold btn-primary flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
