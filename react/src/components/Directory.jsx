import React from 'react';
import EmpCardDisplay from './EmpCardDisplay';
import edeData from './ede.json';
import './Directory.css';

function Directory() {
  
  return (
    <div className="directory-container">
      <div className="directory-header">
        <h2>Full Employee Directory</h2>
      </div>
      <EmpCardDisplay employeeData={edeData}/>
    </div>
  );
}

export default Directory;