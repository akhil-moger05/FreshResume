import React, { useState } from 'react';
import { SAMPLE_FRESHER_RESUME, TemplateId } from '../types/resume';
import { ResumeRenderer } from '../components/Templates/ResumeRenderer';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Download,
  Zap,
  Target,
  GraduationCap
} from 'lucide-react';

interface Props {
  onGoToBuilder: (template?: TemplateId, fillExample?: boolean) => void;
  onOpenPricing: () => void;
  isPremium?: boolean;
}

export const HomePage: React.FC<Props> = ({ onGoToBuilder, onOpenPricing, isPremium }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const templates: { id: TemplateId; name: string; tag: string; desc: string }[] = [
    {
      id: 'simple',
      name: 'Template 1: Simple',
      tag: 'ATS Favorite',
      desc: 'Single column classic black & white format. Clean typography favored by technical recruiters and automated screening software.'
    },
    {
      id: 'modern',
      name: 'Template 2: Modern',
      tag: 'Best for Developers',
      desc: 'Two-column design with a distinct blue header accent. Dedicated left column for technical skills and educational milestones.'
    },
    {
      id: 'clean',
      name: 'Template 3: Clean',
      tag: 'Minimal & Elegant',
      desc: 'Centered contact header with subtle dividers and balanced margins. Perfect for engineering, BCA, and corporate entry-level roles.'
    }
  ];

  const faqs = [
    {
      q: 'Why is an ATS-friendly resume mandatory for Indian freshers?',
      a: 'During mass recruitment drives (TCS, Infosys, Wipro, Capgemini) and high-growth startups, Applicant Tracking Systems (ATS) automatically parse your resume. Graphical multi-column tables, photos, and rating stars often scramble the parser and cause automatic rejection. FreshResume uses clean, semantic text structures that achieve 95%+ parsing accuracy.'
    },
    {
      q: 'Is FreshResume really free to use?',
      a: 'Yes, 100%! You can build your resume, customize all fields, and download high-resolution PDFs completely for free (includes a small discreet footer watermark). If you wish to remove the watermark, you can unlock FreshResume Pro for a one-time fee of just ₹49.'
    },
    {
      q: 'I am a fresher with no work experience. What should I highlight?',
      a: 'Focus on your academic projects, final-year capstone projects, coding practice (LeetCode, HackerRank), and technical skills. Our builder provides dedicated sections and templates to showcase your tech stack and bulleted accomplishments.'
    },
    {
      q: 'How does FreshResume ensure my resume fits on a single page?',
      a: 'Our templates are calibrated to standard international A4 dimensions with optimal margins and compact line heights. By following our guided section recommendations, you will easily keep your resume to a single page.'
    },
    {
      q: 'Is my resume data safe and private?',
      a: 'Yes. Your draft automatically saves to your browser local storage and our SQLite database. We do not sell your personal data or phone number to marketing agencies or recruiters.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-slate-200 bg-white">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial-[at_top_right] from-blue-50/70 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-2xs">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Built Specifically for Indian College Freshers & Job Seekers</span>
          </div>

          {/* Big Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
            Free Resume Maker <br className="hidden sm:inline" />
            <span className="text-blue-600">for Freshers</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
            Create an ATS-compliant, single-page professional resume in minutes. No design skills or complicated software needed — just fill your details, choose a template, and download.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onGoToBuilder()}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Create My Resume</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onGoToBuilder('simple', true)}
              className="w-full sm:w-auto px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-2 border border-slate-200"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Fill Example & Try Live</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ATS-Friendly Formatting
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant PDF Download
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Single-Page Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* 2. THREE TEMPLATES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            3 Recruiter-Approved Templates
          </h2>
          <p className="text-sm text-slate-600">
            All templates are strictly engineered for high ATS parsing scores: plain text, zero image distortion, single-page layout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-blue-300 hover:shadow-md transition group"
            >
              {/* Mini Preview Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{tpl.name}</h3>
                  <span className="text-[11px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                    {tpl.tag}
                  </span>
                </div>
                <button
                  onClick={() => onGoToBuilder(tpl.id, true)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                >
                  Use Template <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scaled Visual Thumbnail */}
              <div className="bg-slate-100/70 p-4 flex-1 flex items-center justify-center overflow-hidden">
                <div
                  className="w-full bg-white rounded shadow-xs p-3 transform transition duration-200 group-hover:scale-[1.02] border border-slate-200 text-left cursor-pointer"
                  onClick={() => onGoToBuilder(tpl.id, true)}
                >
                  {tpl.id === 'simple' && (
                    <div className="space-y-1.5 text-[7px] text-slate-700 select-none">
                      <div className="font-bold text-[9px] text-black border-b border-black pb-0.5">RAHUL SHARMA</div>
                      <div className="text-[6.5px] text-slate-500">rahul@example.com • +91 98765 43210 • Bengaluru</div>
                      <div className="font-bold text-[7px] border-b border-slate-300 pt-1">CAREER SUMMARY</div>
                      <p className="text-[6.5px] text-slate-600 line-clamp-2">Motivated CS graduate with hands-on skills in Data Structures, React, and Node.js.</p>
                      <div className="font-bold text-[7px] border-b border-slate-300 pt-1">EDUCATION</div>
                      <div className="flex justify-between"><span>B.Tech in Computer Science</span><span>2024</span></div>
                      <div className="font-bold text-[7px] border-b border-slate-300 pt-1">TECHNICAL SKILLS</div>
                      <div className="text-slate-600">Java • Python • React • SQL • Git</div>
                      <div className="font-bold text-[7px] border-b border-slate-300 pt-1">PROJECTS</div>
                      <div className="font-bold text-slate-800">Campus Placement Portal (MERN)</div>
                    </div>
                  )}

                  {tpl.id === 'modern' && (
                    <div className="space-y-1.5 text-[7px] text-slate-700 select-none">
                      <div className="border-b-2 border-blue-600 pb-0.5">
                        <div className="font-extrabold text-[9px] text-blue-900">RAHUL SHARMA</div>
                        <div className="text-[6.5px] text-blue-700">Aspiring Software Engineer</div>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 pt-1">
                        <div className="col-span-2 space-y-1 border-r border-slate-200 pr-1">
                          <div className="font-bold text-blue-900 text-[6.5px]">CORE SKILLS</div>
                          <div className="bg-blue-50 text-blue-800 p-0.5 rounded text-[5.5px]">Java, React, SQL</div>
                          <div className="font-bold text-blue-900 text-[6.5px] pt-1">EDUCATION</div>
                          <div className="text-[6px]">B.Tech CSE (8.7 CGPA)</div>
                        </div>
                        <div className="col-span-3 space-y-1">
                          <div className="font-bold text-blue-900 text-[6.5px]">PROFILE</div>
                          <p className="text-[6px] text-slate-600 line-clamp-2">Full-stack enthusiast focused on scalable web apps.</p>
                          <div className="font-bold text-blue-900 text-[6.5px] pt-1">PROJECTS</div>
                          <div className="bg-slate-50 p-1 rounded border border-slate-200 text-[6px]">
                            <div className="font-bold">Placement Portal</div>
                            <div className="text-slate-500">React, Node, PostgreSQL</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {tpl.id === 'clean' && (
                    <div className="space-y-1.5 text-[7px] text-slate-700 select-none text-center">
                      <div className="font-bold text-[9px] text-slate-900">RAHUL SHARMA</div>
                      <div className="text-[6.5px] text-slate-500 pb-1 border-b border-slate-200">
                        rahul@example.com | +91 98765 43210 | Bengaluru
                      </div>
                      <div className="text-left space-y-1 pt-1">
                        <div className="text-[6.5px] font-bold text-slate-800 border-b border-slate-200 pb-0.5">
                          EDUCATION
                        </div>
                        <div className="flex justify-between text-[6px]">
                          <span className="font-semibold">B.Tech in Computer Science</span>
                          <span>2024 (8.7 CGPA)</span>
                        </div>
                        <div className="text-[6.5px] font-bold text-slate-800 border-b border-slate-200 pb-0.5 pt-1">
                          TECHNICAL COMPETENCIES
                        </div>
                        <div className="text-[6px] text-slate-600">Java, Python, JavaScript, React, PostgreSQL, Git</div>
                        <div className="text-[6.5px] font-bold text-slate-800 border-b border-slate-200 pb-0.5 pt-1">
                          PROJECTS
                        </div>
                        <div className="text-[6px] font-bold">DevCollab - Realtime Code Sharing</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom description */}
              <div className="p-4 bg-white border-t border-slate-100 space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed min-h-[48px]">
                  {tpl.desc}
                </p>
                <button
                  onClick={() => onGoToBuilder(tpl.id)}
                  className="w-full py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 font-semibold rounded-lg text-xs transition border border-slate-200 hover:border-blue-600 cursor-pointer"
                >
                  Choose {tpl.name.split(':')[1]?.trim() || tpl.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY FRESHRESUME FOR FRESHERS */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Why Indian Freshers Love FreshResume
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Designed specifically for campus placements, pool drives, and off-campus recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Guaranteed ATS Pass</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero complex graphics or multi-column chaos that confuses parsers at TCS, Wipro, Infosys, and Cognizant.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Live Real-time Preview</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                What you type updates immediately on the right side. See exactly how recruiters will see your single page.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Instant PDF Download</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download high-resolution, vector-crisp PDFs ready for immediate submission on company job portals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section id="pricing-section" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Fair & Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Simple Pricing for Freshers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Start 100% free. Upgrade for less than the price of a coffee to get an ultra-clean watermark-free resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold text-slate-900">Free Tier</h3>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
                  Forever Free
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">₹0</span>
                <span className="text-xs text-slate-500">/ free forever</span>
              </div>
              <p className="text-xs text-slate-600">
                Ideal for building and testing your resume drafts for college submissions.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Access to all 3 ATS Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Unlimited edits & real-time preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Download instant A4 PDF</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px]">i</span>
                  <span>Small watermark at the footer</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onGoToBuilder()}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Start for Free
              </button>
            </div>
          </div>

          {/* Paid ₹49 Tier */}
          <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-2xl border-2 border-blue-600 p-6 flex flex-col justify-between shadow-md relative">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm">
              MOST POPULAR
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold text-blue-900">FreshResume Pro</h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Save 84%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-blue-950">₹49</span>
                <span className="text-xs text-slate-400 line-through">₹299</span>
                <span className="text-xs text-slate-600">• One-time payment</span>
              </div>
              <p className="text-xs text-slate-600">
                100% clean, watermark-free vector PDF ready for dream companies.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span><strong>Zero Watermark</strong> on all PDF downloads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>All 3 ATS-Optimized templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Vector high-res download for campus drives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Instant UPI / QR / Card payment unlock</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              {isPremium ? (
                <button
                  onClick={() => onGoToBuilder()}
                  className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Pro Unlocked • Go to Builder
                </button>
              ) : (
                <button
                  onClick={onOpenPricing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Unlock Pro for ₹49</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHORT FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-600">
            Got queries about your fresher resume? Here are quick answers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Build Your Winning Fresher Resume?
          </h3>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Join thousands of Indian students from IITs, NITs, VTU, AKTU, Pune University and BCA colleges who created their interview-ready resumes with FreshResume.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onGoToBuilder()}
              className="px-8 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl text-sm transition shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Create My Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
