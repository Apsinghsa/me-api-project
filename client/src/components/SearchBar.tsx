import React, { useState, type ChangeEvent } from "react";
import type { SearchBarProps } from "../types";
import "../styles/SearchBar.css";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = (): void => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by skill, keyword, or project name..."
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Search projects"
        />
        {searchTerm && (
          <button
            className="clear-btn"
            onClick={handleClear}
            title="Clear search"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
