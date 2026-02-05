import React from 'react';
import type { HeaderProps } from '../types';
import '../styles/Header.css';

const Header: React.FC<HeaderProps> = ({ profile }) => {
  const { name, email, phone, links } = profile;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="name">{name}</h1>
          <div className="contact-info">
            <a href={`mailto:${email}`} className="contact-link">
              📧 {email}
            </a>
            {phone && (
              <a href={`tel:${phone}`} className="contact-link">
                📱 {phone}
              </a>
            )}
          </div>
        </div>

        <div className="social-links">
          {links && typeof links === 'object' && (
            <>
              {Object.entries(links).map(([platform, url]) => {
                if (!url) return null;

                const icons: Record<string, string> = {
                  github: '🔗',
                  linkedin: '💼',
                  portfolio: '🌐',
                  twitter: '🐦',
                };

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={platform}
                  >
                    {icons[platform] || '🔗'} {platform}
                  </a>
                );
              })}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
