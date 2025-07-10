import React from 'react';
import Description from './Description';
import { useState, useEffect } from 'react';

function MyAccount() {

  const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = import.meta.env.VITE_ACCOUNT_URL;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        
    }, []);

  return (
    <div className="home-intro-container">
      <h2>My Account</h2>
      <Description 
        name={`${data.name}`}
        phone={data.phone || 'N/A'}
        role={data.job_role}
        loc={data.location || 'N/A'}
        sal={data.salary}
      />
    </div>
  );
}

export default MyAccount;