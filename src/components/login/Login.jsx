import React, { useState, useEffect } from 'react';
import './login.css'

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('12345');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email !== 'admin@gmail.com' || password !== '12345') {
            alert('Credentials already provided, please refresh and click log in');
        } else {
            onLogin(true);
        }

    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleLogin}>
                <input className='login-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input className='login-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button className='login-btn' type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;