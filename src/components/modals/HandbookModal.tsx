import React, { useState } from 'react';
import { useModalStore } from '../../store/useModalStore';
import { X, Download, BookOpen, Check, FileText, Printer } from 'lucide-react';

export const HandbookModal: React.FC = () => {
  const { handbookModalOpen, closeHandbook } = useModalStore();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!handbookModalOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-midnight/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-midnight-card border border-lavender/25 shadow-2xl text-ivory p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeHandbook}
          className="absolute top-6 right-6 p-2 rounded-full bg-midnight border border-lavender/20 text-ivory-dim hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-burgundy/40 border border-burgundy flex items-center justify-center text-lavender">
            <BookOpen className="w-6 h-6 text-holo-cyan" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-holo-cyan block">
              Official Institutional Document · 2026/27*
            </span>
            <h3 className="font-display text-2xl font-bold text-ivory">
              MANTHAN: PSYCHE Delegation Handbook
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-sans mb-6">
          The comprehensive reference handbook designed for School Principals, University Deans, Faculty Cultural In-charges, and Research Advisors. Contains codified regulations, stage dimensions, technical cue submission templates, and the full event rubric.
        </p>

        {/* Syllabus Content Outline */}
        <div className="space-y-3 mb-6 p-4 rounded-2xl bg-midnight border border-lavender/10 text-xs font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-lavender/10 text-ivory-dim uppercase text-[10px]">
            <span>Document Section</span>
            <span>Version Status</span>
          </div>
          <div className="flex items-center justify-between text-ivory">
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-holo-cyan" />
              <span>Section 1: Festival Philosophy & Thematic Scope</span>
            </span>
            <span className="text-holo-cyan text-[11px]">Approved</span>
          </div>
          <div className="flex items-center justify-between text-ivory">
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-holo-magenta" />
              <span>Section 2: Stage & Technical Cue Schematics</span>
            </span>
            <span className="text-holo-cyan text-[11px]">Approved</span>
          </div>
          <div className="flex items-center justify-between text-ivory">
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-holo-gold" />
              <span>Section 3: Academic Review & Turnitin Benchmarks</span>
            </span>
            <span className="text-holo-cyan text-[11px]">Approved</span>
          </div>
          <div className="flex items-center justify-between text-ivory">
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-lavender" />
              <span>Section 4: Institution Quotas & Deduplication Rules</span>
            </span>
            <span className="text-holo-cyan text-[11px]">Codified</span>
          </div>
          <div className="flex items-center justify-between text-ivory">
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-ivory-dim" />
              <span>Section 5: Debate Capacity Senate Resolution</span>
            </span>
            <span className="text-holo-gold text-[11px]">Pending Ratification</span>
          </div>
        </div>

        {/* Download Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto flex-1 iridescent-border group py-3 px-6 text-xs font-mono font-semibold text-ivory hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-holo-cyan" />
                <span>Handbook Generated (Check Downloads)</span>
              </>
            ) : downloading ? (
              <span>Compiling PDF Dossier...</span>
            ) : (
              <>
                <Download className="w-4 h-4 text-holo-cyan" />
                <span>Download Official Handbook (PDF · 4.2 MB)</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-3 rounded-full border border-lavender/20 bg-midnight text-xs font-mono text-ivory hover:text-lavender transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-lavender" />
            <span>Print Overview</span>
          </button>
        </div>

        <p className="mt-4 text-[10px] font-mono text-ivory-dim text-center">
          Printed under the authority of MANTHAN Secretariat, Jammu. Verifiable digital watermark attached.
        </p>
      </div>
    </div>
  );
};
