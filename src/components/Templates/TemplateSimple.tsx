import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export const TemplateSimple: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, education, skills, projects, certifications } = data;

  return (
    <div className="text-gray-900 bg-white font-sans text-[11px] leading-relaxed p-8 sm:p-10 select-text">
      {/* Header */}
      <header className="border-b-2 border-gray-900 pb-3 mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-700 text-[10px] mt-1.5 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {(personalInfo.email || personalInfo.phone) && personalInfo.city && <span>•</span>}
          {personalInfo.city && <span>{personalInfo.city}</span>}
          {personalInfo.linkedIn && (
            <>
              <span>•</span>
              <span className="text-gray-900 font-semibold">{personalInfo.linkedIn}</span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>•</span>
              <span className="text-gray-900 font-semibold">{personalInfo.github}</span>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>•</span>
              <span>{personalInfo.portfolio}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && summary.trim() && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-gray-800 text-[10.5px] leading-normal text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && education.some(e => e.degree || e.institution) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              (edu.degree || edu.institution) && (
                <div key={edu.id || idx} className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900 text-[11px]">{edu.degree || 'Degree Program'}</div>
                    <div className="text-gray-700 text-[10px]">
                      {edu.institution}
                      {edu.location ? `, ${edu.location}` : ''}
                    </div>
                  </div>
                  <div className="text-right whitespace-nowrap ml-4">
                    {edu.endYear && <div className="text-gray-900 font-semibold text-[10px]">{edu.endYear}</div>}
                    {edu.score && <div className="text-gray-700 text-[10px] font-medium">{edu.score}</div>}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Technical Skills
          </h2>
          <p className="text-gray-800 text-[10.5px] leading-relaxed">
            {skills.join('  •  ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && projects.some(p => p.title) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Academic & Personal Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              proj.title && (
                <div key={proj.id || idx}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-bold text-gray-900 text-[11px]">
                      {proj.title}
                      {proj.techStack && (
                        <span className="font-normal text-gray-600 text-[10px] ml-1.5">
                          | <span className="italic">Tech: {proj.techStack}</span>
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <span className="text-[9.5px] text-gray-700 font-mono">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <div className="text-gray-800 text-[10px] mt-1 space-y-0.5 whitespace-pre-line leading-normal">
                      {proj.description}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && certifications.some(c => c.name) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Certifications & Achievements
          </h2>
          <div className="space-y-1.5">
            {certifications.map((cert, idx) => (
              cert.name && (
                <div key={cert.id || idx} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-900 text-[10.5px]">{cert.name}</span>
                    {cert.issuer && <span className="text-gray-700 text-[10px] ml-1">({cert.issuer})</span>}
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    {cert.link && <span className="text-[9.5px] text-gray-600 underline font-mono">{cert.link}</span>}
                    {cert.year && <span className="text-gray-700 text-[10px] font-medium">{cert.year}</span>}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
