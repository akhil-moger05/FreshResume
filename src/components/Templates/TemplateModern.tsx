import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export const TemplateModern: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, education, skills, projects, certifications } = data;

  return (
    <div className="text-slate-800 bg-white font-sans text-[11px] leading-relaxed p-8 sm:p-10 select-text">
      {/* Top Banner with Blue Accent */}
      <header className="border-b-2 border-blue-600 pb-3 mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-blue-900 uppercase">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>
        <p className="text-slate-600 text-[10px] mt-2 font-medium">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.city,
            personalInfo.linkedIn,
            personalInfo.github,
            personalInfo.portfolio
          ]
            .filter(Boolean)
            .join('  •  ')}
        </p>
      </header>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (Skills & Education) */}
        <div className="md:col-span-5 space-y-5">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1 mb-2">
                Core Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-800 border border-blue-100 rounded px-2 py-0.5 text-[9.5px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && education.some(e => e.degree || e.institution) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  (edu.degree || edu.institution) && (
                    <div key={edu.id || idx} className="border-l-2 border-blue-300 pl-2.5">
                      <div className="font-bold text-slate-900 text-[10.5px]">{edu.degree}</div>
                      <div className="text-slate-700 text-[10px]">{edu.institution}</div>
                      <div className="text-slate-500 text-[9.5px] flex justify-between mt-0.5">
                        <span>{edu.location}</span>
                        <span className="font-semibold text-slate-700">{edu.endYear}</span>
                      </div>
                      {edu.score && (
                        <div className="text-blue-700 text-[9.5px] font-semibold mt-0.5">
                          Score: {edu.score}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Certifications in left sidebar */}
          {certifications && certifications.length > 0 && certifications.some(c => c.name) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1 mb-2">
                Certificates
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, idx) => (
                  cert.name && (
                    <div key={cert.id || idx} className="text-[10px]">
                      <div className="font-semibold text-slate-900">{cert.name}</div>
                      <div className="text-slate-600 flex justify-between">
                        <span>{cert.issuer}</span>
                        {cert.year && <span>{cert.year}</span>}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Summary & Projects) */}
        <div className="md:col-span-7 space-y-5">
          {/* Summary */}
          {summary && summary.trim() && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1 mb-2">
                About Me
              </h2>
              <p className="text-slate-700 text-[10.5px] leading-relaxed">
                {summary}
              </p>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && projects.some(p => p.title) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1 mb-2">
                Key Projects
              </h2>
              <div className="space-y-3.5">
                {projects.map((proj, idx) => (
                  proj.title && (
                    <div key={proj.id || idx} className="bg-slate-50/70 p-2.5 rounded border border-slate-200/80">
                      <div className="flex justify-between items-baseline flex-wrap gap-1">
                        <span className="font-bold text-slate-900 text-[11px]">{proj.title}</span>
                        {proj.link && (
                          <span className="text-[9.5px] text-blue-600 font-mono hover:underline">
                            {proj.link}
                          </span>
                        )}
                      </div>
                      {proj.techStack && (
                        <div className="text-blue-700 text-[9.5px] font-medium mt-0.5">
                          Tech: {proj.techStack}
                        </div>
                      )}
                      {proj.description && (
                        <div className="text-slate-700 text-[10px] mt-1.5 whitespace-pre-line leading-normal">
                          {proj.description}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
