import React from 'react';
import Description from './Description';
import { useState, useEffect } from 'react';

function MyAccount() {

  const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = import.meta.env.VITE_ACCOUNT_URL;
                console.log(url);
                const response = await fetch(url, {
                  credentials: 'include', // This is crucial for sending cookies with the request
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                if (!response.ok) {
                  if (response.status === 401) {
                    throw new Error('Please log in to view your account information');
                  } else {
                    throw new Error('Data could not be fetched!');
                  }
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        console.log("MY ACCOUNT DATA:", data);
        
    }, []);

  return (
    <div className="home-intro-container">
      <h2>My Account</h2>
      {data ? (
        <Description 
          name={data.name}
          phone={data.phone_number || 'N/A'}
          role={data.job_role}
          loc={data.location || 'N/A'}
          sal={data.salary}
        />
      ) : (
        <p>Loading account information...</p>
      )}
    </div>
  );
}

export default MyAccount;