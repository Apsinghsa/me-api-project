// API Service for Resume API Playground
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import type { ApiResponse, IProfile, IProject, ISearchResult } from "../types";

// Generic API error class
export class ApiError extends Error {
  public status?: number;
  public data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

// Generic fetch wrapper with error handling
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || "API request failed",
        response.status,
        data,
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiError(error.message);
    }

    throw new ApiError("Unknown error occurred");
  }
}

// API methods
export const api = {
  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await fetch(`${API_URL}/health`);
    return response.json();
  },

  // Get profile
  async getProfile(): Promise<IProfile> {
    const response = await apiCall<IProfile>("/api/profile");
    return response.data!;
  },

  // Create or update profile
  async saveProfile(profileData: Partial<IProfile>): Promise<IProfile> {
    const response = await apiCall<IProfile>("/api/profile", {
      method: "POST",
      body: JSON.stringify(profileData),
    });
    return response.data!;
  },

  // Get all projects
  async getProjects(): Promise<IProject[]> {
    const response = await apiCall<IProject[]>("/api/projects");
    return response.data!;
  },

  // Get projects filtered by skill
  async getProjectsBySkill(skill: string): Promise<IProject[]> {
    const response = await apiCall<IProject[]>(
      `/api/projects?skill=${encodeURIComponent(skill)}`,
    );
    return response.data!;
  },

  // Get projects filtered by keyword
  async getProjectsByKeyword(keyword: string): Promise<IProject[]> {
    const response = await apiCall<IProject[]>(
      `/api/projects?keyword=${encodeURIComponent(keyword)}`,
    );
    return response.data!;
  },

  // Search across profile
  async search(query: string): Promise<ISearchResult> {
    const response = await apiCall<ISearchResult>(
      `/api/search?q=${encodeURIComponent(query)}`,
    );
    return response.data!;
  },
};

export default api;
