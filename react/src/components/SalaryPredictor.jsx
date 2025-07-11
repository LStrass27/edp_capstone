import React, { useState } from 'react';

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
    <div>
      <h2>Predict Salary</h2>
      <input
        type="text"
        placeholder="Job Role"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handlePredict}>Predict</button>

      {salary && <p>Predicted Salary: ${salary}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SalaryPredictor;
