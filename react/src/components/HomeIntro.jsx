import React from 'react';
import './DuckDirectory.css'; // You'll need to create this CSS file

function DuckEnterpriseDirectory() {
  // Sample features - replace with your actual features
  const features = [
  <><strong>Login</strong>: Sign into your Duck Enterprises LLC enterprise account</>,
  <><strong>My Account</strong>: View your account information</>,
  <><strong>Directory</strong>: View all Duck Enterprises LLC Employees</>,
  <><strong>Advanced Search</strong>: Filter the directory by employee identifiers</>,
  <><strong>Predict Salary</strong>: Estimate Salaries Based on Location & Position</>,
  <><strong>Logout</strong>: Sign Out of your Duck Enterprises LLC enterprise account</>
];

  return (
    <main className="duck-directory-main">
      {/* Yellow banner across the top */}
      <div className="yellow-banner">
        <h1>Welcome to the Duck Enterprises LLC Directory</h1>
      </div>
      
      {/* Main content area */}
      <div className="content-container">
        <section className="features-section">
          <h2>How to use the directory:</h2>
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default DuckEnterpriseDirectory;
