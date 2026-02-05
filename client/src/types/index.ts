// Project interface
export interface IProject {
  title: string;
  description: string;
  stack: string[];
  links: {
    github?: string;
    demo?: string;
  };
  _id?: string;
}

// Education interface
export interface IEducation {
  degree: string;
  institution: string;
  cgpa: number;
}

// Candidate/Profile interface
export interface IProfile {
  _id?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

// Search result interface
export interface ISearchResult {
  name: string;
  email: string;
  matchedSkills: string[];
  matchedProjects: IProject[];
}

// Component Props Types
export interface HeaderProps {
  profile: IProfile;
}

export interface SkillsProps {
  skills: string[];
}

export interface ProjectsGridProps {
  projects: IProject[];
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

// API Service Types
export interface ApiConfig {
  baseURL: string;
}

// State Types
export interface AppState {
  profile: IProfile | null;
  projects: IProject[];
  filteredProjects: IProject[];
  loading: boolean;
  error: string | null;
}
