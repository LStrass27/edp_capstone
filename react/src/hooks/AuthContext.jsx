import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating an authentication context
const AuthContext = createContext();

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
          try {
            const accountUrl = import.meta.env.VITE_ACCOUNT_URL;
            const response = await fetch(accountUrl, {
                credentials: 'include' // Important for sending cookies
              });

            
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            }
          } catch (error) {
            console.error('Error checking authentication:', error);
          } finally {
            setLoading(false);
          }
        };
        
        checkLoggedIn();
    }, []);

    const login = async (username, password) => {
        try {
            const loginUrl = import.meta.env.VITE_LOGIN_URL;
            
            console.log('Attempting login to:', loginUrl);
            
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Add this to ensure cookies are sent
                body: JSON.stringify({ username, password }),
            });

            console.log(response)
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const userData = await response.json();
            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Login Error: ', error);
            throw error;
        }
    };

    const logout = async () => {
      try {
          const logoutUrl = import.meta.env.VITE_LOGOUT_URL;
          const response = await fetch(logoutUrl, {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          
          if (response.ok) {
              setUser(null);
              // Optionally redirect to login page
              window.location.href = '/login';
              return true;
          } else {
              console.error('Logout failed');
              return false;
          }
      } catch (error) {
          console.error('Error during logout:', error);
          return false;
      }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);