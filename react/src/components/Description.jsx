import React from 'react';
import './Description.css';

/*
Things to Potentially add:
- Subordinate Chart
- Duck Skillset Chart
- Hire Date
- Duck LOB
- Employee ID
- Duck Address
*/

const Description = ({name, phone, role, loc, sal, subordinates}) => {
    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h5 className="card-title">Information Summary</h5>
                <div className="card-text">Name: {name}</div>
                <div className="card-text">Phone Number: {phone}</div>
                <div className="card-text">Job Role: {role}</div>
                <div className="card-text">Work Location: {loc}</div>
                <div className="card-text">Salary: £{sal}</div>
            </div>
        </div>
    );
};

export default Description;