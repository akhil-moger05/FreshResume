import React, { useState, useEffect, useRef } from 'react';
import { ResumeData, TemplateId, SAMPLE_FRESHER_RESUME, INITIAL_EMPTY_RESUME } from '../types/resume';
import { BuilderForm } from '../components/Builder/BuilderForm';
import { ResumeRenderer } from '../components/Templates/ResumeRenderer';
import { AdSenseBox } from '../components/AdSenseBox';
import {
  Download,
  Printer,
  Sparkles,
  RotateCcw,
  Check,
  AlertCircle,
  Eye,
  Edit3,
  Layers,
  ZoomIn,
  ZoomOut,
  Share2,
  FileDown
} from 'lucide-react';

interface Props {
  initialData: ResumeData;
  onDataChange: (data: ResumeData) => void;
  onOpenPricing: () => void;
  isPremium?: boolean;
}

export const BuilderPage: React.FC<Props> = ({
  initialData,
  onDataChange,
  onOpenPricing,
  isPremium = false
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    ...initialData,
    isPremium
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'synced'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Keep one id for this resume, so every auto-save updates the same row.
  const resumeIdRef = useRef<string | undefined>(initialData.id);

  // Sync premium status prop with state
  useEffect(() => {
    if (resumeData.isPremium !== isPremium) {
      const updated = { ...resumeData, isPremium };
      setResumeData(updated);
      onDataChange(updated);
    }
  }, [isPremium]);

  // Handle local state and auto-save
  const handleUpdateResume = (updated: ResumeData) => {
    const dataWithPremium = { ...updated, isPremium, id: resumeIdRef.current ?? updated.id };
    setResumeData(dataWithPremium);
    onDataChange(dataWithPremium);

    // Save to localStorage immediately
    try {
      localStorage.setItem('freshresume_draft', JSON.stringify(dataWithPremium));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }

    setSaveStatus('saving');

    // Debounce save to backend SQLite
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataWithPremium)
        });
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.id && resumeIdRef.current !== resJson.id) {
            resumeIdRef.current = resJson.id;
            setResumeData(prev => ({ ...prev, id: resJson.id }));
          }
          setSaveStatus('synced');
          setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } else {
          setSaveStatus('saved');
        }
      } catch (err) {
        console.warn('Backend sync failed, saved locally in browser', err);
        setSaveStatus('saved');
      }
    }, 1200);
  };

  // Remember the saved id in the browser draft too
  useEffect(() => {
    if (!resumeData.id) return;
    try {
      localStorage.setItem('freshresume_draft', JSON.stringify(resumeData));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  }, [resumeData.id]);

  // Stop the pending save timer when leaving the page
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Switch Template
  const handleTemplateChange = (tpl: TemplateId) => {
    handleUpdateResume({
      ...resumeData,
      template: tpl
    });
  };

  // Fill sample data
  const handleFillSample = () => {
    if (
      resumeData.personalInfo.fullName &&
      !window.confirm('Replace current resume details with the Rahul Sharma fresher example?')
    ) {
      return;
    }
    const sample = {
      ...SAMPLE_FRESHER_RESUME,
      template: resumeData.template,
      isPremium
    };
    handleUpdateResume(sample);
  };

  // Clear all
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all fields? This cannot be undone.')) {
      const empty = {
        ...INITIAL_EMPTY_RESUME,
        template: resumeData.template,
        isPremium
      };
      handleUpdateResume(empty);
    }
  };

  // Backend PDF Download
  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          resume: resumeData,
          template: resumeData.template,
          isPremium: !!resumeData.isPremium
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate PDF from server');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const cleanName = (resumeData.personalInfo.fullName || 'Fresher')
        .replace(/[^a-zA-Z0-9]/g, '_');
      a.download = `${cleanName}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback to browser print dialog
      window.alert('Could not build the PDF on the server. In the next window, choose "Save as PDF".');
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  // Print directly (A4 Vector output)
  const handlePrint = () => {
    window.print();
  };

  // Section warnings calculation
  const missingWarnings: string[] = [];
  if (!resumeData.personalInfo.fullName.trim()) missingWarnings.push('Full Name');
  if (!resumeData.personalInfo.email.trim()) missingWarnings.push('Email');
  if (!resumeData.personalInfo.phone.trim()) missingWarnings.push('Phone (+91)');
  if (!resumeData.summary.trim()) missingWarnings.push('Summary');
  if (
    resumeData.education.length === 0 ||
    !resumeData.education.some(e => e.degree.trim())
  ) {
    missingWarnings.push('Education');
  }
  if (resumeData.skills.length === 0) missingWarnings.push('Skills');
  if (
    resumeData.projects.length === 0 ||
    !resumeData.projects.some(p => p.title.trim())
  ) {
    missingWarnings.push('Projects');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. TOP ADSENSE BLANK BOX */}
      <AdSenseBox slotId="builder-top" />

      {/* 2. BUILDER CONTROL HEADER */}
      <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Template Switcher Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Template:
            </span>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleTemplateChange('simple')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  resumeData.template === 'simple'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Simple (B&W)
              </button>
              <button
                type="button"
                onClick={() => handleTemplateChange('modern')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  resumeData.template === 'modern'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Modern (Blue)
              </button>
              <button
                type="button"
                onClick={() => handleTemplateChange('clean')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  resumeData.template === 'clean'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3. Clean (Centered)
              </button>
            </div>
          </div>

          {/* Quick Actions (Sample, Clear, Auto-save status) */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleFillSample}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Fill Example</span>
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            {/* Auto-save status */}
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
              {saveStatus === 'saving' ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  <span>Saved ({lastSavedTime})</span>
                </>
              )}
            </div>

            {/* Print / Save button */}
            <button
              type="button"
              onClick={handlePrint}
              title="Quick Print or Save as PDF via browser"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Download PDF Primary Button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm shadow-blue-500/25 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Building PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile View Toggle (Editor vs Live Preview) */}
        <div className="lg:hidden flex border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Form</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview (A4)</span>
          </button>
        </div>
      </div>

      {/* 3. MISSING SECTION WARNINGS */}
      {missingWarnings.length > 0 && (
        <div className="no-print bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <span className="font-bold">
              Fresher Resume Tip: Complete the following to pass ATS screening:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {missingWarnings.map(sec => (
                <span
                  key={sec}
                  className="bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded text-[11px]"
                >
                  Missing: {sec}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. SPLIT SCREEN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Form (Hidden on mobile if preview tab selected) */}
        <div className={`no-print lg:col-span-6 space-y-4 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <BuilderForm data={resumeData} onChange={handleUpdateResume} />
        </div>

        {/* Right Side: Live Preview (Hidden on mobile if editor tab selected) */}
        <div className={`print-right lg:col-span-6 sticky top-20 ${activeTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
          <div className="no-print mb-2 flex items-center justify-between text-xs text-slate-500 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Live ATS Preview</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                Updates as you type
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
                className="p-1 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-600 w-8 text-center">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel(Math.min(110, zoomLevel + 10))}
                className="p-1 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scalable Container */}
          <div
            className="print-scroll overflow-auto max-h-[calc(100vh-140px)] p-2 sm:p-4 bg-slate-200/60 rounded-2xl border border-slate-300/80 shadow-inner flex justify-center"
          >
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out'
              }}
              className="print-zoom w-full flex justify-center"
            >
              <ResumeRenderer data={resumeData} onUpgradeClick={onOpenPricing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
