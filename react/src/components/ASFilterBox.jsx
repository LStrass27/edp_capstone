import React, { useState } from 'react';
import './ASFilterBox.css';

const ASFilterBox = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    name: true,
    jobRole: true,
    location: true
  });

  const [isOpen, setIsOpen] = useState(true);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Change filtering logic for new search iterm
    if (onFilterChange) {
      onFilterChange({
        searchTerm: value,
        filters: filters
      });
    }
  };

  // Handle filter checkbox changes
  const handleFilterChange = (filterName) => {
    const updatedFilters = {
      ...filters,
      [filterName]: !filters[filterName]
    };
    
    setFilters(updatedFilters);
    
    // Change filtering logic
    if (onFilterChange) {
      onFilterChange({
        searchTerm,
        filters: updatedFilters
      });
    }
  };

  // Toggle accordion open/closed
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="as-filter-box">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>Advanced Search</h3>
        <span className={`accordion-icon ${isOpen ? 'open' : 'closed'}`} style={{ fontSize: '20px' }}>
          {isOpen ? '▾ Hide' : '▸ Open'}
        </span>
      </div>
      
      {isOpen && (
        <div className="accordion-content">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search directory..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="filter-options">
            <h4>Search in:</h4>
            <div className="filter-option">
              <input
                type="checkbox"
                id="nameFilter"
                checked={filters.name}
                onChange={() => handleFilterChange('name')}
              />
              <label htmlFor="nameFilter">Name</label>
            </div>
            
            <div className="filter-option">
              <input
                type="checkbox"
                id="jobRoleFilter"
                checked={filters.jobRole}
                onChange={() => handleFilterChange('jobRole')}
              />
              <label htmlFor="jobRoleFilter">Job Role</label>
            </div>
            
            <div className="filter-option">
              <input
                type="checkbox"
                id="locationFilter"
                checked={filters.location}
                onChange={() => handleFilterChange('location')}
              />
              <label htmlFor="locationFilter">Location</label>
            </div>
          </div>

          <div className="active-filters">
          </div>
        </div>
      )}
    </div>
  );
};

export default ASFilterBox;