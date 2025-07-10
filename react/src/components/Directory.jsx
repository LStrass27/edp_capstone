import React, { useState, useEffect } from 'react';
import EmpCardDisplay from './EmpCardDisplay';
import './Directory.css';

function Directory() {
  const [employeeData, setEmployeeData] = useState([]);
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
        
        console.log("RES: ", response);
        const data = await response.text();
        console.log("RES: ", data);

        setEmployeeData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch employee data:", err);
        setError("Failed to load employee directory. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);
  
  return (
    <div className="directory-container">
      <div className="directory-header">
        <h2>Full Employee Directory</h2>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <p>Loading employee data...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : (
        <EmpCardDisplay employeeData={employeeData} />
      )}
    </div>
  );
}

export default Directory;