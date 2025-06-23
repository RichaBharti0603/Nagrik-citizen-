import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Civic Engagement Platform</h1>
      <nav>
        <a href="#report">Report Issue</a>
        <a href="#representatives">Local Reps</a>
        <a href="#polls">Polls</a>
      </nav>
    </header>
  );
};

export default Header;
