import React from 'react';
import type { ProjectsGridProps, IProject } from '../types';
import '../styles/ProjectsGrid.css';

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="no-projects">
        <p>No projects found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="projects-grid">
      {projects.map((project: IProject, index: number) => (
        <div key={project._id || index} className="project-card">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          {project.stack && project.stack.length > 0 && (
            <div className="tech-stack">
              {project.stack.map((tech: string, idx: number) => (
                <span key={idx} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.links && (
            <div className="project-links">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link github"
                >
                  <span>🔗</span> GitHub
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link demo"
                >
                  <span>🚀</span> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
