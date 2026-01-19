// Core types for the resume generator system

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  projects: Project[];
  skills: Skills;
  experience?: WorkExperience[];
  certifications?: Certification[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  contact: ContactInfo;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  twitter?: string;
}

export interface Education {
  id: number;
  date: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  date: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Skills {
  languages: Skill[];
  frameworks: Skill[];
  tools: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}
