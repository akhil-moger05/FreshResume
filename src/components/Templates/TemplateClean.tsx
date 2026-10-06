import React from 'react';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export const TemplateClean: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, education, skills, projects, certifications } = data;

  return (
    <div className="text-gray-800 bg-white font-sans text-[11px] leading-relaxed p-8 sm:p-10 select-text">
      {/* Centered Heading */}
      <header className="text-center pb-4 mb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold tracking-normal text-gray-900 uppercase">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-gray-600 text-[10px] mt-1.5">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>|  {personalInfo.phone}</span>}
          {personalInfo.city && <span>|  {personalInfo.city}</span>}
          {personalInfo.linkedIn && <span>|  {personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>|  {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>|  {personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && summary.trim() && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 whitespace-nowrap">
              Profile Summary
            </h2>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          <p className="text-gray-700 text-[10.5px] leading-relaxed text-justify px-1">
            {summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && education.some(e => e.degree || e.institution) && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 whitespace-nowrap">
              Education
            </h2>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          <div className="space-y-2 px-1">
            {education.map((edu, idx) => (
              (edu.degree || edu.institution) && (
                <div key={edu.id || idx} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-gray-900 text-[11px]">{edu.degree}</span>
                    <span className="text-gray-600 text-[10px] ml-2">— {edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                  </div>
                  <div className="text-right whitespace-nowrap text-[10px] text-gray-600">
                    <span className="font-medium text-gray-800">{edu.endYear}</span>
                    {edu.score && <span className="ml-2 bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 text-[9.5px]">{edu.score}</span>}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 whitespace-nowrap">
              Technical Competencies
            </h2>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          <div className="px-1 text-[10.5px] text-gray-800 leading-normal">
            <span className="font-semibold text-gray-900">Technologies: </span>
            {skills.join(', ')}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && projects.some(p => p.title) && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 whitespace-nowrap">
              Key Projects
            </h2>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          <div className="space-y-2.5 px-1">
            {projects.map((proj, idx) => (
              proj.title && (
                <div key={proj.id || idx}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div>
                      <span className="font-bold text-gray-900 text-[11px]">{proj.title}</span>
                      {proj.techStack && (
                        <span className="text-gray-500 text-[10px] ml-2">[{proj.techStack}]</span>
                      )}
                    </div>
                    {proj.link && (
                      <span className="text-gray-600 font-mono text-[9.5px]">{proj.link}</span>
                    )}
                  </div>
                  {proj.description && (
                    <div className="text-gray-700 text-[10px] mt-0.5 whitespace-pre-line leading-relaxed">
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
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 whitespace-nowrap">
              Certifications
            </h2>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          <div className="space-y-1.5 px-1">
            {certifications.map((cert, idx) => (
              cert.name && (
                <div key={cert.id || idx} className="flex justify-between items-baseline text-[10px]">
                  <div>
                    <span className="font-semibold text-gray-900">{cert.name}</span>
                    {cert.issuer && <span className="text-gray-600 ml-1.5">| {cert.issuer}</span>}
                  </div>
                  <div className="text-gray-600">
                    {cert.year && <span>{cert.year}</span>}
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
