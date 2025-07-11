import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LogoutBtn.css';

function LogoutBtn() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      window.location.href = '/login';
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="logout-button"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
