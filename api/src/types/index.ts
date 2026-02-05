import { Document } from 'mongoose';

// Project interface
export interface IProject {
  title: string;
  description: string;
  stack: string[];
  links: {
    github?: string;
    demo?: string;
  };
}

// Education interface
export interface IEducation {
  degree: string;
  institution: string;
  cgpa: number;
}

// Candidate interface (for application logic)
export interface ICandidate {
  name: string;
  email: string;
  phone?: string;
  education: IEducation | string;
  skills: string[];
  projects: IProject[];
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
}

// Candidate Document interface (for Mongoose)
export interface ICandidateDocument extends ICandidate, Document {
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Search result interface
export interface ISearchResult {
  name: string;
  email: string;
  matchedSkills: string[];
  matchedProjects: IProject[];
}

// Query parameters
export interface IProjectQuery {
  skill?: string;
  keyword?: string;
}

export interface ISearchQuery {
  q: string;
}

// Environment variables type
export interface IEnvConfig {
  MONGO_URI: string;
  PORT: number;
  NODE_ENV: string;
}
