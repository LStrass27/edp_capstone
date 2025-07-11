import React, { useState } from 'react';
import './SalaryPredictor.css';

function SalaryPredictor() {
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_role: jobRole, location })
      });

      const data = await response.json();
      if (response.ok) {
        setSalary(data.predicted_salary);
        setError('');
      } else {
        setSalary(null);
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setSalary(null);
      setError('Error connecting to Flask backend.');
    }
  };

  return (
    <div className="yellow-background-container">
      <div className="salary-predictor-container">
        <h2 className="salary-predictor-title">Predict Salary</h2>
        <div className="salary-predictor-form">
          <div className="form-group">
            <label>Job Role</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g. New York"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button className="salary-predictor-button" onClick={handlePredict}>
            Predict
          </button>

          {salary !== null && (
            <p className="salary-result">
              Predicted Salary: ${salary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          )}
          {error && <p className="salary-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default SalaryPredictor;