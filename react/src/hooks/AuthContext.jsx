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
            const response = await fetch(`${import.meta.env.VITE_ACCOUNT_URL}`, {
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
            const response = await fetch(`${import.meta.env.VITE_LOGIN_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            if(!response.ok) {
                throw new Error('Login failed');
            }

            const userData = await response.json();
            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Login Error: ', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null); // In real scenarios, you might want to invalidate the session on the server as well
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);