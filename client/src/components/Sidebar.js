import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="sidebar">
            <h3>Admin Panel</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a></li>
                <li><a href="/settings" style={{ color: 'white', textDecoration: 'none' }}>Settings</a></li>
                <li><a href="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</a></li> 
            </ul>
            <button onClick={handleLogout} className="btn" style={{ width: '100%', marginTop: '20px' }}>Logout</button>
        </nav>
    );
};

export default Sidebar;