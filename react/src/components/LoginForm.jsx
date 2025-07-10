import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // You'll need to create this CSS file

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
 
    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            await login(username, password);
            navigate('/directory')
        } catch (err) {
            setError(err.message || "Login Failed in LoginForm.jsx");
        }
    };
 
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
}
 
export default LoginForm;