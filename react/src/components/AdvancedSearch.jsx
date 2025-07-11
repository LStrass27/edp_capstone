import React, { useState, useEffect } from 'react';
import EmpCardDisplay from './EmpCardDisplay';
import ASFilterBox from './ASFilterBox';

function AdvancedSearch() {
    const [employeeData, setEmployeeData] = useState([]);
    const [filteredData, setFilteredData] = useState(employeeData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
          try {
            setLoading(true);
    
            const response = await fetch('http://localhost:3000/directory', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            });
            
            const data = await response.json();
    
            setEmployeeData(data);
            setFilteredData(data);
            setLoading(false);
          } catch (err) {
            console.error("Failed to fetch employee data:", err);
            setError("Failed to load employee directory. Please try again later.");
            setLoading(false);
          }
        };
        
        fetchEmployees();
      }, []);

    const handleFilterChange = (filterOptions) => {
        console.log("Filter options changed:", filterOptions);

        const filtered = employeeData.filter(emp => {
           if (filterOptions.searchTerm === '') return true;
           
           let matchesSearch = false;
           if (filterOptions.filters.name && emp.name.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
             matchesSearch = true;
           }
           if (filterOptions.filters.jobRole && emp.job_role.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
             matchesSearch = true;
           }
           if (filterOptions.filters.location && emp.location.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
             matchesSearch = true;
           }
           return matchesSearch;
        });
        setFilteredData(filtered);
  };

    return (
        <div className="home-intro-container">
            <ASFilterBox onFilterChange={handleFilterChange}/>
            {loading ? (
                <p>Loading employee data...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <EmpCardDisplay employeeData={filteredData}/>
            )}
        </div>
    );
}

export default AdvancedSearch;