import React, { useState } from 'react';
import './ASFilterBox.css';

const ASFilterBox = ({ onFilterChange }) => {
  // State for search and filters
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
    
    // Call parent component's filter function with current search and filters
    // Comment: This is where you would trigger the actual filtering logic
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
    
    // Call parent component's filter function with current search and updated filters
    // Comment: This is where you would trigger the actual filtering logic
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
      {/* Accordion header */}
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>Advanced Search</h3>
        <span className={`accordion-icon ${isOpen ? 'open' : 'closed'}`} style={{ fontSize: '20px' }}>
          {isOpen ? '▾ Hide' : '▸ Open'}
        </span>
      </div>
      
      {/* Collapsible content */}
      {isOpen && (
        <div className="accordion-content">
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search directory..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-button">
              <i className="search-icon">🔍</i>
            </button>
          </div>
          
          {/* Filter Options */}
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
          
          {/* Filter actions */}
          <div className="filter-actions">
            <button className="apply-filters-btn">Apply Filters</button>
            <button className="clear-filters-btn">Clear All</button>
          </div>
          
          {/* Active filters */}
          <div className="active-filters">
            {/* Active filters would be displayed here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ASFilterBox;