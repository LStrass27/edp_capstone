/*
Eventually add Images and Reports to as options for EmpCard. (Or options to add)
*/

import React from 'react';
import './EmpCard.css'; // Add a CSS import

const EmpCard = ({name, role, loc, phone, salary}) => {
    return (
        <div className="emp-card">
            <div className="emp-card-body">
                <h5 className="emp-card-title">{name}</h5>
                <div className="emp-card-text">{role}</div>
                <div className="emp-card-text">{loc}</div>
                <div className="emp-card-text">{phone}</div>
                {salary && <div className="emp-card-text">£{salary}</div>}
            </div>
        </div>
    );
};

export default EmpCard;