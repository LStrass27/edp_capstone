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
                        
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Add this to ensure cookies are sent
                body: JSON.stringify({ username, password }),
            });
            
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