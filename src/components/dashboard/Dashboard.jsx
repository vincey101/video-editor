import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';


const Dashboard = ({ onCreateVideo }) => {
    return (
        <div className="dashboard-container">
            <h2>Create Interactive Video</h2>
            <Link to="/videoEditor">
                <button className='create-video-button'>
                    Get Started
                </button>
            </Link>
        </div>
    );
};

export default Dashboard;
