import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/report">📌 Report Issue</Link></li>
          <li><Link to="/dashboard">📊 Civic Dashboard</Link></li>
          <li><Link to="/mydashboard">👤 My Dashboard</Link></li>
          <li><Link to="/polls">🗳 Polls</Link></li>
          <li><Link to="/admin">🔧 Admin Panel</Link></li>
          <li><Link to="/schemes">🏛 Schemes</Link></li>
          <li><Link to="/meetings">📅 Meetings</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
