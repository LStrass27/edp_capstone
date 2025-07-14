import React, { useState, useEffect } from 'react';
import Description from './Description';
import './MyAccount.css'; // Import the CSS file

function MyAccount() {
  const [data, setData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const IMAGE_COUNT = 26; // Number of images in public/ducks

  const setEmployeeImage = (employeeId) => {
    if (!employeeId) return;
    const imageIndex = employeeId % IMAGE_COUNT;
    const formattedIndex = imageIndex.toString().padStart(2, '0');
    const imageUrl = `/ducks/${formattedIndex}.jpg`;

    setImageSrc(imageUrl);
    setImageError(false);
    setImageLoaded(false); // reset loaded status for new image
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_ACCOUNT_URL;
        const response = await fetch(url, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error('Please log in to view your account information');
          else throw new Error('Data could not be fetched!');
        }

        const data = await response.json();
        setData(data);

        if (data.employee_id) {
          setEmployeeImage(data.employee_id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-intro-container">
      <h2>My Account</h2>
      {data ? (
        <div className="account-content-container">
          <div className="account-info">
            <Description
              name={data.name}
              phone={data.phone_number || 'N/A'}
              role={data.job_role}
              loc={data.location || 'N/A'}
              sal={data.salary}
            />
          </div>
          <div className="account-image-container">
            {imageSrc && !imageError ? (
              <img
                src={imageSrc}
                alt="Profile"
                onLoad={() => {
                  setImageLoaded(true);
                }}
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  setImageError(true);
                }}
              />
            ) : (
              <div className="image-placeholder">
                {imageError ? 'Failed to load image' : 'Loading image...'}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading account information...</p>
      )}
    </div>
  );
}

export default MyAccount;