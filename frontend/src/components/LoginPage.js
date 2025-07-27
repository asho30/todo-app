import React, { useState } from 'react';
import axios from 'axios';

// Configure axios to send credentials (cookies) with requests
axios.defaults.withCredentials = true;

const LoginPage = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            onLoginSuccess(response.data.user);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <input
                    type="text"
                    placeholder="Username (Asho)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password (P@ssw0rd)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;