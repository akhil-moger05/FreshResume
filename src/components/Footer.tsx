import React, { useState } from 'react';
import { FileText, Heart, Shield, HelpCircle, Mail, X } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  const [modalType, setModalType] = useState<'about' | 'privacy' | 'contact' | null>(null);

  return (
    <footer className="no-print bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Fresh<span className="text-blue-400">Resume</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's dedicated free resume maker for college freshers, BCA, B.Tech, MCA, and non-tech graduates entering the software and IT industry.
            </p>
            <p className="text-[11px] text-slate-500">
              ATS-compliant • Clean plain text formatting • Instant PDF
            </p>
          </div>

          {/* Fresher Formats (SEO Pages) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Resume Formats
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/resume-for-freshers"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); onNavigate('/resume-for-freshers'); }}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  Resume for Freshers (Complete Guide)
                </a>
              </li>
              <li>
                <a href="/bca-resume-format"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); onNavigate('/bca-resume-format'); }}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  BCA Fresher Resume Format
                </a>
              </li>
              <li>
                <a href="/resume-for-it-freshers"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); onNavigate('/resume-for-it-freshers'); }}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  IT Fresher Resume for TCS, Infosys & Startups
                </a>
              </li>
              <li>
                <a href="/builder"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); onNavigate('/builder'); }}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  ATS Single-Page Resume Generator
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Templates & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/builder"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); onNavigate('/builder'); }}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  Template 1: Simple (Black & White ATS)
                </a>
              </li>
              <li>
                <a href="/builder"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); onNavigate('/builder'); }}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  Template 2: Modern (Blue Accent 2-Column)
                </a>
              </li>
              <li>
                <a href="/builder"
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); onNavigate('/builder'); }}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  Template 3: Clean (Minimal Centered)
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    setTimeout(() => {
                      document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  Pricing (Free vs ₹49 Pro)
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setModalType('about')}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  About FreshResume
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('privacy')}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('contact')}
                  className="hover:text-blue-400 transition text-slate-300 cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} FreshResume. Designed for Indian job seekers & campus placements.</p>
          <p className="flex items-center gap-1">
            Built with 100% ATS-friendly clean HTML/PDF architecture
          </p>
        </div>
      </div>

      {/* Info Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white text-slate-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'about' && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">About FreshResume</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  FreshResume was created with a single mission: to help every Indian college student and graduate create a high-scoring, ATS-approved resume without paying expensive design fees or fighting complex formatting software.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Most generic resume makers create heavy graphical PDFs with tables and rating stars that Applicant Tracking Systems (ATS) at major companies like TCS, Infosys, Wipro, and high-growth startups fail to read. FreshResume ensures 100% parseable, professional single-page resumes.
                </p>
              </div>
            )}

            {modalType === 'privacy' && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Privacy Policy</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your resume draft is saved in your browser and on our server, so you can come back to it. We use it only to run the resume maker.
                </p>
                <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
                  <li>We do not sell your personal resume information to recruiters or third parties.</li>
                  <li>Use the "Clear" button in the builder to remove your details. To delete the copy on our server, email us.</li>
                  <li>Google AdSense may show ads on this site and may use cookies.</li>
                  <li>Downloaded PDFs are compiled securely on demand.</li>
                </ul>
              </div>
            )}

            {modalType === 'contact' && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Contact FreshResume</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Have a suggestion or need help tailoring your resume for an upcoming campus drive? We'd love to hear from you.
                </p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Support Email: <strong>support@freshresume.in</strong></span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Typical response time: Within 24 hours.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setModalType(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
