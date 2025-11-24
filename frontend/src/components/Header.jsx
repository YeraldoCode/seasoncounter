import React from 'react';
import './Header.css';

const Header = ({ toggleMenu, toggleAds, showAds }) => {
  return (
    <header className="header">
      <div className="logo">SEASONCOUNTER</div>
      <div className="header-controls">
        <button className="ads-toggle-btn" onClick={toggleAds}>
          {showAds ? 'Hide Ads' : 'Show Ads'}
        </button>
        <button className="menu-btn" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;
