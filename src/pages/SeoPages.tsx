import React from 'react';
import { AdSenseBox } from '../components/AdSenseBox';
import { ArrowRight, CheckCircle2, AlertTriangle, Sparkles, BookOpen, FileCheck } from 'lucide-react';

interface Props {
  page: 'resume-for-freshers' | 'bca-resume-format' | 'resume-for-it-freshers';
  onGoToBuilder: (template?: 'simple' | 'modern' | 'clean') => void;
}

export const SeoPage: React.FC<Props> = ({ page, onGoToBuilder }) => {
  if (page === 'bca-resume-format') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Breadcrumb / Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" /> BCA Fresher Placement Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            BCA Resume Format (2026): How to Get Hired as a Software Developer
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            The ideal resume template and strategies for Bachelor of Computer Applications (BCA) graduates applying to IT firms, startups, and product companies.
          </p>
        </div>

        {/* Call to action card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Ready to build your BCA Resume?</h3>
            <p className="text-blue-100 text-xs">
              Pre-loaded with BCA projects, tech stacks, and ATS-tested layout.
            </p>
          </div>
          <button
            onClick={() => onGoToBuilder('modern')}
            className="whitespace-nowrap px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Create BCA Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content sections */}
        <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6">
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">1. Why Most BCA Resumes Get Filtered Out</h2>
            <p>
              Many recruiters prioritize B.Tech candidates over BCA graduates unless your resume strongly demonstrates hands-on coding ability. Standard word processor templates filled with graphics or two-page summaries often fail Applicant Tracking Systems (ATS).
            </p>
            <p>
              To beat the odds, your BCA resume must highlight:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Live Projects & GitHub Links:</strong> Proof of real programming beyond textbook syllabus.</li>
              <li><strong>Modern Tech Stacks:</strong> Full-Stack web development (React, Node.js), Python, or Java with Spring Boot.</li>
              <li><strong>Single-Page ATS Format:</strong> Direct text without columns that break ATS parsers.</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">2. Ideal Section Order for BCA Freshers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block text-xs">1. Header</span>
                <span className="text-xs text-slate-600">Name, Phone (+91), Email, LinkedIn & Active GitHub URL</span>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block text-xs">2. Summary</span>
                <span className="text-xs text-slate-600">2 lines defining your core programming languages & target role</span>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block text-xs">3. Technical Skills</span>
                <span className="text-xs text-slate-600">Categorized: Languages, Frameworks, Databases, Tools</span>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block text-xs">4. Academic & Personal Projects</span>
                <span className="text-xs text-slate-600">2-3 robust projects with tech stack and live demo links</span>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block text-xs">5. Education</span>
                <span className="text-xs text-slate-600">BCA College, University, Passing Year, CGPA or Percentage</span>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-bold text-slate-900 block text-xs">6. Certifications</span>
                <span className="text-xs text-slate-600">NPTEL, Coursera, HackerRank Problem Solving</span>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">3. Top Projects that Impress Hiring Managers</h2>
            <p className="text-slate-600">
              Replace standard calculator or library management college lab exercises with modern web applications:
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50/50 rounded border border-blue-100">
                <h4 className="font-bold text-blue-900 text-xs">E-Commerce Web App (MERN Stack or Java Spring Boot)</h4>
                <p className="text-xs text-slate-600">Cart management, product catalog, user auth, payment gateway integration.</p>
              </div>
              <div className="p-3 bg-blue-50/50 rounded border border-blue-100">
                <h4 className="font-bold text-blue-900 text-xs">Realtime Chat or Collaborative Board (Socket.io + React)</h4>
                <p className="text-xs text-slate-600">Demonstrates understanding of asynchronous network communication.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-6 bg-slate-100 rounded-2xl space-y-3">
          <h3 className="text-lg font-bold text-slate-800">Generate Your BCA Resume in 3 Minutes</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            100% Free, instant single-page PDF download with ATS-compliant structure.
          </p>
          <button
            onClick={() => onGoToBuilder('modern')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-sm"
          >
            Open FreshResume Builder
          </button>
        </div>

        {/* AdSense slot at bottom of SEO page */}
        <AdSenseBox slotId="seo-bca" />
      </div>
    );
  }

  if (page === 'resume-for-it-freshers') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5" /> Mass Recruiter & Startup Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Resume for IT Freshers: Land Jobs at TCS, Infosys, Wipro & Startups
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Proven tips, keyword strategy, and the exact resume format Indian recruiters look for during on-campus and off-campus recruitment drives.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Build an IT Fresher Resume</h3>
            <p className="text-blue-100 text-xs">
              Includes pre-configured keywords for TCS NQT, InfyTQ, and startup roles.
            </p>
          </div>
          <button
            onClick={() => onGoToBuilder('simple')}
            className="whitespace-nowrap px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Create IT Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-6 text-sm text-slate-700">
          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">The 6-Second Rule of Indian Campus Recruiters</h2>
            <p>
              In campus drives with thousands of students, HR managers spend fewer than 6 seconds screening each resume. If your resume has confusing multi-column tables, photos, or vague descriptions, it goes directly to the rejection pile.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs">
                  <CheckCircle2 className="w-4 h-4" /> What Recruiters Want:
                </div>
                <ul className="text-xs text-emerald-900 list-disc pl-4 space-y-0.5">
                  <li>Single-page length (never 2 pages for freshers)</li>
                  <li>Clear graduation year & CGPA / percentage</li>
                  <li>Specific programming languages (Java/Python/C++)</li>
                  <li>Clear GitHub links to verify project code</li>
                </ul>
              </div>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-800 text-xs">
                  <AlertTriangle className="w-4 h-4" /> What Gets You Rejected:
                </div>
                <ul className="text-xs text-rose-900 list-disc pl-4 space-y-0.5">
                  <li>Skill rating bars (e.g. "Java 4/5 stars")</li>
                  <li>Unnecessary personal details (father's name, caste, photo)</li>
                  <li>Unverified fluff ("hardworking team player")</li>
                  <li>Overloaded decorative canvas designs</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">Essential Keywords for IT Freshers</h2>
            <p>
              Ensure these keywords appear naturally in your skills, project descriptions, and summary:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Data Structures',
                'Algorithms',
                'Object-Oriented Programming (OOP)',
                'Database Management (DBMS)',
                'SQL',
                'REST APIs',
                'Git Version Control',
                'React',
                'Node.js',
                'Java',
                'Python',
                'Clean Code Principles'
              ].map((kw) => (
                <span key={kw} className="bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 rounded text-xs font-semibold">
                  {kw}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-6 bg-slate-100 rounded-2xl space-y-3">
          <h3 className="text-lg font-bold text-slate-800">Start Your Free IT Fresher Resume</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Choose our Simple or Modern ATS template and download instantly.
          </p>
          <button
            onClick={() => onGoToBuilder('simple')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-sm"
          >
            Open FreshResume Builder
          </button>
        </div>

        {/* AdSense slot at bottom of SEO page */}
        <AdSenseBox slotId="seo-it-freshers" />
      </div>
    );
  }

  // Default: resume-for-freshers
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Complete 2026 Career Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Resume for Freshers: Complete Step-by-Step Guide & Formats
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          How to write an entry-level resume with no work experience that passes ATS screening and lands you campus interviews.
        </p>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Build Your Fresher Resume for Free</h3>
          <p className="text-blue-100 text-xs">
            Clean ATS templates, real-time preview, single page format.
          </p>
        </div>
        <button
          onClick={() => onGoToBuilder('simple')}
          className="whitespace-nowrap px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Start Building Resume</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Guide Content */}
      <div className="space-y-6 text-sm text-slate-700">
        <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">What Should a Fresher Resume Include?</h2>
          <p>
            When you don't have past corporate job titles, your resume must highlight what you learned, what you built, and where you acquired your skills.
          </p>
          <div className="space-y-3 pt-1">
            <div className="border-l-3 border-blue-600 pl-3">
              <h4 className="font-bold text-slate-900 text-xs">1. Clear Contact Information</h4>
              <p className="text-xs text-slate-600">Provide your full name, phone number, professional email (avoid informal nicknames), city, LinkedIn URL, and GitHub.</p>
            </div>
            <div className="border-l-3 border-blue-600 pl-3">
              <h4 className="font-bold text-slate-900 text-xs">2. Impact-Driven Career Summary</h4>
              <p className="text-xs text-slate-600">A 2 to 3 sentence pitch highlighting your degree, primary coding technologies, and ambition.</p>
            </div>
            <div className="border-l-3 border-blue-600 pl-3">
              <h4 className="font-bold text-slate-900 text-xs">3. Education Section</h4>
              <p className="text-xs text-slate-600">College name, degree name, year of completion, and CGPA or percentage (include 10th and 12th if you have strong scores above 80%).</p>
            </div>
            <div className="border-l-3 border-blue-600 pl-3">
              <h4 className="font-bold text-slate-900 text-xs">4. Projects (Your Core Selling Point!)</h4>
              <p className="text-xs text-slate-600">Include at least 2 solid academic or hobby projects. Mention the technologies used and 2-3 bullet points on the features.</p>
            </div>
            <div className="border-l-3 border-blue-600 pl-3">
              <h4 className="font-bold text-slate-900 text-xs">5. Skills as Specific Keywords</h4>
              <p className="text-xs text-slate-600">Avoid broad terms like "Computer Savvy". Use exact tool names like Java, Python, React, PostgreSQL, Docker, Git.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">The 3 Most Common Fresher Mistakes</h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
              <strong>Mistake #1: Exceeding 1 Page.</strong> Recruiters discard freshers with 2-3 page resumes. Keep margins clean and fit everything onto a single crisp A4 page.
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
              <strong>Mistake #2: Using Heavy Graphics & Photos.</strong> Indian corporate ATS systems parse plain text resumes best. Visual progress bars fail parsing algorithms.
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
              <strong>Mistake #3: Missing Project Links.</strong> Always provide your GitHub or live deployment URL so technical interviewers can inspect your clean code.
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6 bg-slate-100 rounded-2xl space-y-3">
        <h3 className="text-lg font-bold text-slate-800">Generate Your ATS Fresher Resume Today</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Free, zero complicated setup, designed for Indian students.
        </p>
        <button
          onClick={() => onGoToBuilder('clean')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-sm"
        >
          Open FreshResume Builder
        </button>
      </div>

      {/* AdSense slot at bottom of SEO page */}
      <AdSenseBox slotId="seo-fresher" />
    </div>
  );
};
