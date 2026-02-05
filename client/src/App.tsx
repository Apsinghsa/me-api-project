import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProjectsGrid from "./components/ProjectsGrid";
import Skills from "./components/Skills";
import { api } from "./services/api";
import type { IProfile, IProject, IEducation } from "./types";

function App() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await api.getProfile();
      setProfile(data);
      setProjects(data.projects || []);
      setFilteredProjects(data.projects || []);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch profile";
      setError(errorMessage);
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string): void => {
    if (!searchTerm.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = projects.filter(
      (project: IProject) =>
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.stack.some((tech: string) => tech.toLowerCase().includes(term)),
    );

    setFilteredProjects(filtered);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={fetchProfile} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="app">
        <div className="error">
          <p>No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header profile={profile} />

      <main className="main-content">
        <section className="about-section">
          <h2>About</h2>
          <div className="education-card">
            <h3>Education</h3>
            {typeof profile.education === "object" ? (
              <div>
                <p className="degree">
                  {(profile.education as IEducation).degree}
                </p>
                <p className="institution">
                  {(profile.education as IEducation).institution}
                </p>
                <p className="cgpa">
                  CGPA: {(profile.education as IEducation).cgpa}
                </p>
              </div>
            ) : (
              <p>{profile.education}</p>
            )}
          </div>
        </section>

        <Skills skills={profile.skills || []} />

        <section className="projects-section">
          <div className="section-header">
            <h2>Projects ({filteredProjects.length})</h2>
            <SearchBar onSearch={handleSearch} />
          </div>
          <ProjectsGrid projects={filteredProjects} />
        </section>
      </main>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built with React +
          TypeScript + Vite + Express + MongoDB
        </p>
      </footer>
    </div>
  );
}

export default App;
