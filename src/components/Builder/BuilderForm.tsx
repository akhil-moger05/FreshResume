import React, { useState } from 'react';
import { ResumeData, Education, Project, Certification, POPULAR_FRESHER_SKILLS } from '../../types/resume';
import {
  User,
  GraduationCap,
  Code,
  FolderGit2,
  Award,
  FileText,
  Plus,
  Trash2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const BuilderForm: React.FC<Props> = ({ data, onChange }) => {
  const [skillInput, setSkillInput] = useState('');
  const [openSections, setOpenSections] = useState({
    personal: true,
    summary: true,
    education: true,
    skills: true,
    projects: true,
    certifications: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Personal Info updater
  const handlePersonalInfoChange = (field: string, val: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: val
      }
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: 'edu_' + Date.now(),
      degree: '',
      institution: '',
      location: '',
      endYear: '',
      score: ''
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (index: number, field: keyof Education, val: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...data, education: updated });
  };

  const removeEducation = (index: number) => {
    const updated = data.education.filter((_, i) => i !== index);
    onChange({ ...data, education: updated });
  };

  // Skill handlers
  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || data.skills.includes(trimmed)) return;
    onChange({
      ...data,
      skills: [...data.skills, trimmed]
    });
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s !== skillToRemove)
    });
  };

  // Project handlers
  const addProject = () => {
    const newProj: Project = {
      id: 'proj_' + Date.now(),
      title: '',
      techStack: '',
      description: '',
      link: ''
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj]
    });
  };

  const updateProject = (index: number, field: keyof Project, val: string) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...data, projects: updated });
  };

  const removeProject = (index: number) => {
    const updated = data.projects.filter((_, i) => i !== index);
    onChange({ ...data, projects: updated });
  };

  // Certification handlers
  const addCertification = () => {
    const newCert: Certification = {
      id: 'cert_' + Date.now(),
      name: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      link: ''
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert]
    });
  };

  const updateCertification = (index: number, field: keyof Certification, val: string) => {
    const updated = [...data.certifications];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...data, certifications: updated });
  };

  const removeCertification = (index: number) => {
    const updated = data.certifications.filter((_, i) => i !== index);
    onChange({ ...data, certifications: updated });
  };

  // Quick summary suggestions
  const applySummaryPreset = (text: string) => {
    onChange({ ...data, summary: text });
  };

  return (
    <div className="space-y-4">
      {/* 1. PERSONAL INFO SECTION */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 text-sm">1. Personal Information</span>
              <p className="text-[11px] text-slate-500">Contact details and online profiles</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!data.personalInfo.fullName && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                <AlertCircle className="w-3 h-3 text-amber-500" /> Name needed
              </span>
            )}
            {openSections.personal ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>
        </button>

        {openSections.personal && (
          <div className="p-5 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={data.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul.sharma@gmail.com"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone Number (+91) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  City & State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru, Karnataka"
                  value={data.personalInfo.city}
                  onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  placeholder="e.g. linkedin.com/in/rahul-dev"
                  value={data.personalInfo.linkedIn || ''}
                  onChange={(e) => handlePersonalInfoChange('linkedIn', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  type="text"
                  placeholder="e.g. github.com/rahul-sharma"
                  value={data.personalInfo.github || ''}
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. SUMMARY SECTION */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('summary')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 text-sm">2. Career Summary</span>
              <p className="text-[11px] text-slate-500">2-3 impactful lines about your aspirations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!data.summary.trim() && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                <AlertCircle className="w-3 h-3 text-amber-500" /> Empty
              </span>
            )}
            {openSections.summary ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>
        </button>

        {openSections.summary && (
          <div className="p-5 space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Summary (Keep concise for ATS)
                </label>
                <span className="text-[11px] text-slate-400">
                  {data.summary.length} characters
                </span>
              </div>
              <textarea
                rows={3}
                placeholder="Energetic Computer Science graduate with strong knowledge of Data Structures and Full Stack Web Development..."
                value={data.summary}
                onChange={(e) => onChange({ ...data, summary: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition leading-relaxed"
              />
            </div>

            {/* Fresher Presets */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                Quick Fresher Templates (Click to fill):
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applySummaryPreset('Results-oriented Computer Science graduate with a strong foundation in Data Structures, Java, and modern Web Technologies. Eager to leverage problem-solving skills in an entry-level Software Engineer role.')}
                  className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-md transition border border-slate-200 cursor-pointer"
                >
                  🚀 B.Tech / CSE Fresher
                </button>
                <button
                  type="button"
                  onClick={() => applySummaryPreset('BCA graduate with practical experience in Full-Stack JavaScript (React, Node.js) and Database design. Passionate about building responsive user interfaces and clean RESTful APIs.')}
                  className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-md transition border border-slate-200 cursor-pointer"
                >
                  💻 BCA / MCA Developer
                </button>
                <button
                  type="button"
                  onClick={() => applySummaryPreset('Motivated IT Fresher proficient in Python, SQL, and Object-Oriented Programming. Seeking an opportunity to start a career in Software Development and contribute to team success.')}
                  className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-md transition border border-slate-200 cursor-pointer"
                >
                  🌐 General IT Fresher
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. EDUCATION SECTION */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('education')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 text-sm">3. Education</span>
              <p className="text-[11px] text-slate-500">Degree, college name, graduation year & CGPA/percentage</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data.education.length === 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                <AlertCircle className="w-3 h-3 text-amber-500" /> None added
              </span>
            )}
            {openSections.education ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>
        </button>

        {openSections.education && (
          <div className="p-5 space-y-4">
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200/90 relative group">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-slate-700">
                    Education #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700 text-xs inline-flex items-center gap-1 p-1 rounded hover:bg-red-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Degree / Course</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech in CSE / BCA"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">College / University</label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore Institute of Tech"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">City, State</label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, Karnataka"
                      value={edu.location}
                      onChange={(e) => updateEducation(index, 'location', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Passing Year</label>
                      <input
                        type="text"
                        placeholder="e.g. 2024"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(index, 'endYear', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">CGPA / %</label>
                      <input
                        type="text"
                        placeholder="e.g. 8.5 CGPA"
                        value={edu.score}
                        onChange={(e) => updateEducation(index, 'score', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add More Education
            </button>
          </div>
        )}
      </div>

      {/* 4. SKILLS SECTION */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('skills')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 text-sm">4. Skills (Tags)</span>
              <p className="text-[11px] text-slate-500">Programming languages, frameworks & databases</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data.skills.length === 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                <AlertCircle className="w-3 h-3 text-amber-500" /> Empty
              </span>
            )}
            {openSections.skills ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>
        </button>

        {openSections.skills && (
          <div className="p-5 space-y-3.5">
            {/* Input row */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type skill & press Enter (e.g. Java, React, SQL)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addSkill(skillInput)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            {/* Current skill tags */}
            <div>
              <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-slate-50/70 border border-slate-200 rounded-lg">
                {data.skills.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No skills added yet. Click suggestions below or type your skills.</span>
                ) : (
                  data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 bg-white border border-slate-300 text-slate-800 text-xs px-2.5 py-1 rounded-md shadow-xs font-medium"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Quick Suggestions for Indian Freshers */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                Popular Fresher Skills (Click to add):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_FRESHER_SKILLS.map((item) => {
                  const isAdded = data.skills.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      disabled={isAdded}
                      onClick={() => addSkill(item)}
                      className={`text-[11px] px-2 py-0.5 rounded transition cursor-pointer ${
                        isAdded
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-medium'
                      }`}
                    >
                      {isAdded ? `✓ ${item}` : `+ ${item}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. PROJECTS SECTION */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('projects')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 text-sm">5. Academic & Final Year Projects</span>
              <p className="text-[11px] text-slate-500">Crucial for freshers without prior company experience</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data.projects.length === 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                <AlertCircle className="w-3 h-3 text-amber-500" /> None added
              </span>
            )}
            {openSections.projects ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>
        </button>

        {openSections.projects && (
          <div className="p-5 space-y-4">
            {data.projects.map((proj, index) => (
              <div key={proj.id || index} className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200/90 relative group">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-slate-700">
                    Project #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 text-xs inline-flex items-center gap-1 p-1 rounded hover:bg-red-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Project Title</label>
                      <input
                        type="text"
                        placeholder="e.g. E-Commerce Store or Weather App"
                        value={proj.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Tech Stack Used</label>
                      <input
                        type="text"
                        placeholder="e.g. React, Node.js, MongoDB"
                        value={proj.techStack}
                        onChange={(e) => updateProject(index, 'techStack', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Project Link / GitHub URL</label>
                    <input
                      type="text"
                      placeholder="e.g. github.com/username/project"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Description (Bullets recommended: What you built, impact & features)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="• Built a full-stack responsive web application&#10;• Implemented JWT authentication and payment integration&#10;• Tested across 10+ devices with 98% Lighthouse score"
                      value={proj.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProject}
              className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add More Project
            </button>
          </div>
        )}
      </div>

      {/* 6. CERTIFICATIONS SECTION */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('certifications')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 text-sm">6. Certifications & Badges</span>
              <p className="text-[11px] text-slate-500">NPTEL, Coursera, HackerRank, AWS, Udemy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {openSections.certifications ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>
        </button>

        {openSections.certifications && (
          <div className="p-5 space-y-4">
            {data.certifications.map((cert, index) => (
              <div key={cert.id || index} className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200/90 relative group">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold text-slate-700">
                    Certification #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="text-red-500 hover:text-red-700 text-xs inline-flex items-center gap-1 p-1 rounded hover:bg-red-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Certification Name</label>
                    <input
                      type="text"
                      placeholder="e.g. AWS Cloud Practitioner / HackerRank SQL"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Issuer / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. AWS, NPTEL, Coursera"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024"
                      value={cert.year}
                      onChange={(e) => updateCertification(index, 'year', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Credential URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. coursera.org/verify/..."
                      value={cert.link || ''}
                      onChange={(e) => updateCertification(index, 'link', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCertification}
              className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Certification
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
