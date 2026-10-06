import React, { useState, useEffect } from 'react';
import { ResumeData, TemplateId, SAMPLE_FRESHER_RESUME, normalizeResume } from './types/resume';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PricingModal } from './components/PricingModal';
import { HomePage } from './pages/HomePage';
import { BuilderPage } from './pages/BuilderPage';
import { SeoPage } from './pages/SeoPages';

const KNOWN_PATHS = ['/', '/builder', '/resume-for-freshers', '/bca-resume-format', '/resume-for-it-freshers'];

// '/builder/' and '/builder' are the same page. Unknown paths show Home.
const normalizePath = (p: string): string => {
  const clean = (p || '/').replace(/\/+$/, '') || '/';
  return KNOWN_PATHS.includes(clean) ? clean : '/';
};

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'FreshResume - Free Resume Maker for Indian Freshers',
    description: 'Create free ATS-friendly resumes for Indian freshers. Build, customize templates, and download your resume in minutes.'
  },
  '/builder': {
    title: 'ATS Resume Builder – FreshResume',
    description: 'Fill the form, see your resume update live, and download an ATS-friendly PDF. Free for freshers.'
  },
  '/resume-for-freshers': {
    title: 'Resume for Freshers (2026 Guide) – FreshResume',
    description: 'How to write a fresher resume that passes ATS: format, sections, skills and projects. Free guide with a resume builder.'
  },
  '/bca-resume-format': {
    title: 'BCA Resume Format (2026) – FreshResume',
    description: 'Best resume format for BCA students and graduates. Show projects and skills to get software jobs.'
  },
  '/resume-for-it-freshers': {
    title: 'Resume for IT Freshers (TCS, Infosys) – FreshResume',
    description: 'Resume tips for IT freshers applying to TCS, Infosys, Wipro and startups. Free ATS-friendly builder.'
  }
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [isPremium, setIsPremium] = useState<boolean>(() => {
    try {
      return localStorage.getItem('freshresume_pro') === 'true';
    } catch {
      return false;
    }
  });

  const [pricingOpen, setPricingOpen] = useState(false);

  // Resume state initialized from localStorage draft or default sample
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('freshresume_draft');
      if (saved) {
        const parsed = normalizeResume(JSON.parse(saved));
        return {
          ...parsed,
          isPremium: isPremium || !!parsed.isPremium
        };
      }
    } catch (e) {
      console.warn('Error reading saved draft', e);
    }
    return {
      ...SAMPLE_FRESHER_RESUME,
      isPremium
    };
  });

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title and description based on page
  useEffect(() => {
    const meta = PAGE_META[currentPath] || PAGE_META['/'];
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Navigate helper
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  // Quick navigate to builder with custom template or example
  const handleGoToBuilder = (template?: TemplateId, fillExample?: boolean) => {
    let updated = { ...resumeData };
    if (template) {
      updated.template = template;
    }
    if (fillExample) {
      updated = {
        ...SAMPLE_FRESHER_RESUME,
        template: template || resumeData.template,
        isPremium
      };
    }
    setResumeData(updated);
    try {
      localStorage.setItem('freshresume_draft', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    handleNavigate('/builder');
  };

  // Upgrade success
  const handleUpgradeSuccess = () => {
    setIsPremium(true);
    setResumeData(prev => {
      const next = { ...prev, isPremium: true };
      try {
        localStorage.setItem('freshresume_draft', JSON.stringify(next));
        localStorage.setItem('freshresume_pro', 'true');
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Global Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenPricing={() => setPricingOpen(true)}
        isPremium={isPremium}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage
            onGoToBuilder={handleGoToBuilder}
            onOpenPricing={() => setPricingOpen(true)}
            isPremium={isPremium}
          />
        )}

        {currentPath === '/builder' && (
          <BuilderPage
            initialData={resumeData}
            onDataChange={(newData) => setResumeData(newData)}
            onOpenPricing={() => setPricingOpen(true)}
            isPremium={isPremium}
          />
        )}

        {(currentPath === '/resume-for-freshers' ||
          currentPath === '/bca-resume-format' ||
          currentPath === '/resume-for-it-freshers') && (
          <SeoPage
            page={currentPath.replace('/', '') as any}
            onGoToBuilder={handleGoToBuilder}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Pro Upgrade Modal */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onUpgradeSuccess={handleUpgradeSuccess}
      />
    </div>
  );
}
