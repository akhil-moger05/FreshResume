import React, { useState } from 'react';
import { FileText, Sparkles, Menu, X, ChevronDown, GraduationCap } from 'lucide-react';

interface Props {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenPricing?: () => void;
  isPremium?: boolean;
}

export const Navbar: React.FC<Props> = ({ currentPath, onNavigate, onOpenPricing, isPremium }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setGuidesDropdownOpen(false);
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  Fresh<span className="text-blue-600">Resume</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded border border-blue-200">
                  INDIA
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden xs:block">
                Free ATS Resume for Freshers
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="/"
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/'); }}
              className={`hover:text-blue-600 transition cursor-pointer ${
                currentPath === '/' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Home
            </a>

            <a href="/builder"
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/builder'); }}
              className={`hover:text-blue-600 transition cursor-pointer ${
                currentPath === '/builder' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Resume Builder
            </a>

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setGuidesDropdownOpen(!guidesDropdownOpen)}
                className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer"
              >
                <span>Fresher Guides</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {guidesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setGuidesDropdownOpen(false)}
                >
                  <a href="/resume-for-freshers"
                    onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/resume-for-freshers'); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer flex items-center gap-2"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                    <span>Resume for Freshers Guide</span>
                  </a>
                  <a href="/bca-resume-format"
                    onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/bca-resume-format'); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer flex items-center gap-2"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                    <span>BCA Resume Format (2026)</span>
                  </a>
                  <a href="/resume-for-it-freshers"
                    onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/resume-for-it-freshers'); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer flex items-center gap-2"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                    <span>Resume for IT Freshers (TCS/Infosys)</span>
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (currentPath === '/') {
                  document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                } else if (onOpenPricing) {
                  onOpenPricing();
                } else {
                  handleNav('/');
                }
              }}
              className="hover:text-blue-600 transition cursor-pointer flex items-center gap-1"
            >
              <span>Pricing</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                ₹49 Pro
              </span>
            </button>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            {isPremium ? (
              <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Pro Unlocked
              </span>
            ) : (
              <button
                onClick={onOpenPricing}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 font-semibold px-3 py-1.5 rounded-lg border border-blue-200 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Remove Watermark (₹49)</span>
              </button>
            )}

            <a href="/builder"
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/builder'); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Create My Resume</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <a href="/"
            onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/'); }}
            className="w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600 block"
          >
            Home
          </a>
          <a href="/builder"
            onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/builder'); }}
            className="w-full text-left py-2 text-sm font-semibold text-blue-600 block"
          >
            Resume Builder (Interactive)
          </a>
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Fresher Resume Guides
            </p>
            <a href="/resume-for-freshers"
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/resume-for-freshers'); }}
              className="w-full text-left py-1.5 text-xs text-slate-600 hover:text-blue-600 block"
            >
              • Resume for Freshers
            </a>
            <a href="/bca-resume-format"
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/bca-resume-format'); }}
              className="w-full text-left py-1.5 text-xs text-slate-600 hover:text-blue-600 block"
            >
              • BCA Resume Format
            </a>
            <a href="/resume-for-it-freshers"
              onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); handleNav('/resume-for-it-freshers'); }}
              className="w-full text-left py-1.5 text-xs text-slate-600 hover:text-blue-600 block"
            >
              • Resume for IT Freshers
            </a>
          </div>

          {!isPremium && onOpenPricing && (
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPricing();
                }}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Upgrade to Pro (₹49 No Watermark)
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
