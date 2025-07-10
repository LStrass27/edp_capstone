import React from 'react';
import Description from './Description';

function MyAccount() {
  return (
    <div className="home-intro-container">
      <h2>My Account</h2>
      <Description 
        name="Test Duck"
        phone="555-123-4567"
        role="Software Developer"
        loc="Pond Office"
        sal="75000"
      />
    </div>
  );
}

export default MyAccount;