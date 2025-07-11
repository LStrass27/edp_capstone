import React from 'react';
import EmpCard from './EmpCard';
import './EmpCardDisplay.css';

const EmpCardDisplay = ({employeeData}) => {
    return (
        <div className="card-display-container">
            {
                employeeData.map((emp, index) => (
                    <EmpCard 
                        key={index} 
                        name={emp.name} 
                        role={emp.job_role} 
                        loc={emp.location} 
                        phone={emp.phone_number}
                        salary = {emp.salary}
                    />
                ))
            }
        </div>
    );
};

export default EmpCardDisplay;