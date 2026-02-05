import React from 'react';
import type { SkillsProps } from '../types';
import '../styles/Skills.css';

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section className="skills-section">
      <h2>Skills</h2>
      <div className="skills-container">
        {skills.map((skill: string, index: number) => (
          <span key={index} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
