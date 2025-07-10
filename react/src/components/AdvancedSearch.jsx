import React, { useState } from 'react';
import EmpCardDisplay from './EmpCardDisplay';
import ASFilterBox from './ASFilterBox';
import edeData from './ede.json';

function AdvancedSearch() {
    const [data, setData] = useState(edeData);
    const [filteredData, setFilteredData] = useState(edeData);

    const handleFilterChange = (filterOptions) => {
        console.log("Filter options changed:", filterOptions);
        // Comment: Here you would implement the actual filtering logic
        // For example:
        // const filtered = data.filter(emp => {
        //   if (filterOptions.searchTerm === '') return true;
        //   
        //   let matchesSearch = false;
        //   if (filterOptions.filters.name && emp.name.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
        //     matchesSearch = true;
        //   }
        //   if (filterOptions.filters.jobRole && emp.job_role.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
        //     matchesSearch = true;
        //   }
        //   if (filterOptions.filters.location && emp.location.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
        //     matchesSearch = true;
        //   }
        //   return matchesSearch;
        // });
        // setFilteredData(filtered);
  };

    return (
        <div className="home-intro-container">
        <ASFilterBox onFilterChange={handleFilterChange}/>
        <EmpCardDisplay employeeData={edeData}/>
        </div>
    );
}

export default AdvancedSearch;