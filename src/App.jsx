import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import VideoEditor from './components/videoEditor/VideoEditor';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedValue = localStorage.getItem('isLoggedIn');
        return storedValue ? JSON.parse(storedValue) : false;
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                {!isLoggedIn ? (
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                ) : (
                    <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/videoEditor" element={<VideoEditor />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;