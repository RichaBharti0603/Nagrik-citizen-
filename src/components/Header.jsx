import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/dashboard">📊 Civic Dashboard</Link></li>
          <li><Link to="/admin">🛠 Admin Panel</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
