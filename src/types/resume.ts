export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear?: string;
  endYear: string;
  score: string;
}

export interface Project {
  id: string;
  title: string;
  techStack: string;
  description: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  link?: string;
}

export type TemplateId = 'simple' | 'modern' | 'clean';

export interface ResumeData {
  id?: string;
  template: TemplateId;
  isPremium?: boolean;
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  updatedAt?: string;
}

export const SAMPLE_FRESHER_RESUME: ResumeData = {
  template: 'simple',
  isPremium: false,
  personalInfo: {
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma24@gmail.com',
    phone: '+91 98765 43210',
    city: 'Bengaluru, Karnataka',
    linkedIn: 'linkedin.com/in/rahul-sharma-dev',
    github: 'github.com/rahul-dev-tech',
    portfolio: 'rahulsharma.dev'
  },
  summary: 'Motivated Computer Science graduate with strong fundamentals in Data Structures, Algorithms, and Full-Stack Web Development. Built production-ready projects in React, Node.js, and SQL. Seeking an Associate Software Engineer or SDE-1 role to contribute to scalable software solutions.',
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Visvesvaraya Technological University (VTU)',
      location: 'Bengaluru, India',
      startYear: '2020',
      endYear: '2024',
      score: 'CGPA: 8.7 / 10.0'
    },
    {
      id: 'edu-2',
      degree: 'Class XII (Senior Secondary - CBSE PCM)',
      institution: 'Delhi Public School',
      location: 'Bengaluru, India',
      startYear: '2019',
      endYear: '2020',
      score: '91.4%'
    }
  ],
  skills: [
    'Java',
    'Python',
    'JavaScript',
    'TypeScript',
    'React.js',
    'Node.js',
    'Express.js',
    'SQL / PostgreSQL',
    'MongoDB',
    'Data Structures & Algorithms',
    'Git & GitHub',
    'RESTful APIs',
    'Tailwind CSS'
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Campus Placement Portal & Drive Tracker',
      techStack: 'React, Node.js, Express, PostgreSQL, Tailwind CSS',
      description: '• Developed a comprehensive placement management web application serving 800+ students and 45 recruiters.\n• Implemented secure JWT authentication and role-based access for students, placement cell coordinators, and HRs.\n• Engineered an automated eligibility filter reducing manual screening time by 65%.',
      link: 'github.com/rahul-dev-tech/campus-placement-portal'
    },
    {
      id: 'proj-2',
      title: 'DevCollab - Realtime Code Snippet Sharing Tool',
      techStack: 'React.js, Socket.io, Node.js, Prism.js',
      description: '• Created a lightweight code-sharing platform supporting syntax highlighting for 12+ programming languages.\n• Enabled live multi-user collaborative editing and instant temporary shareable URLs with 99.9% uptime on Vercel.',
      link: 'github.com/rahul-dev-tech/devcollab-live'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Problem Solving (Intermediate) Certificate',
      issuer: 'HackerRank',
      year: '2023',
      link: 'hackerrank.com/certificates/rahul_ps'
    },
    {
      id: 'cert-2',
      name: 'NPTEL Elite Certificate - Database Management Systems',
      issuer: 'IIT Kharagpur / SWAYAM',
      year: '2023',
      link: 'nptel.ac.in/noc/Ecertificate/?q=rahul2023'
    }
  ]
};

export const INITIAL_EMPTY_RESUME: ResumeData = {
  template: 'simple',
  isPremium: false,
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    linkedIn: '',
    github: '',
    portfolio: ''
  },
  summary: '',
  education: [
    {
      id: 'edu-new-1',
      degree: '',
      institution: '',
      location: '',
      endYear: '',
      score: ''
    }
  ],
  skills: [],
  projects: [
    {
      id: 'proj-new-1',
      title: '',
      techStack: '',
      description: '',
      link: ''
    }
  ],
  certifications: []
};

export const POPULAR_FRESHER_SKILLS = [
  'Java',
  'Python',
  'C++',
  'JavaScript',
  'TypeScript',
  'React.js',
  'Node.js',
  'SQL',
  'MongoDB',
  'Data Structures & Algorithms',
  'Git / GitHub',
  'HTML5 / CSS3',
  'Tailwind CSS',
  'REST APIs',
  'Spring Boot',
  'Linux Basics',
  'Problem Solving',
  'Object-Oriented Programming (OOP)'
];


// Makes any saved/old/broken draft safe to use. Stops white-screen crashes.
const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const arr = (v: unknown): any[] => (Array.isArray(v) ? v : []);

export function normalizeResume(input: any): ResumeData {
  const p = input?.personalInfo ?? {};
  const template: TemplateId = ['simple', 'modern', 'clean'].includes(input?.template) ? input.template : 'simple';
  return {
    ...(typeof input?.id === 'string' && input.id ? { id: input.id } : {}),
    template,
    isPremium: !!input?.isPremium,
    personalInfo: {
      fullName: str(p.fullName),
      email: str(p.email),
      phone: str(p.phone),
      city: str(p.city),
      state: str(p.state),
      linkedIn: str(p.linkedIn),
      github: str(p.github),
      portfolio: str(p.portfolio)
    },
    summary: str(input?.summary),
    education: arr(input?.education).map((e, i) => ({
      id: str(e?.id) || `edu-${i}`,
      degree: str(e?.degree),
      institution: str(e?.institution),
      location: str(e?.location),
      startYear: str(e?.startYear),
      endYear: str(e?.endYear),
      score: str(e?.score)
    })),
    skills: arr(input?.skills).filter((x) => typeof x === 'string' && x.trim()),
    projects: arr(input?.projects).map((x, i) => ({
      id: str(x?.id) || `proj-${i}`,
      title: str(x?.title),
      techStack: str(x?.techStack),
      description: str(x?.description),
      link: str(x?.link)
    })),
    certifications: arr(input?.certifications).map((c, i) => ({
      id: str(c?.id) || `cert-${i}`,
      name: str(c?.name),
      issuer: str(c?.issuer),
      year: str(c?.year),
      link: str(c?.link)
    }))
  };
}
