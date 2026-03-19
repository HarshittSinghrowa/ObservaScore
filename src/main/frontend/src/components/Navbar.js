import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/calculator', label: 'Calculator', icon: '🧮' },
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/history', label: 'History', icon: '📜' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">👁️</span>
          <span className="brand-name">Observa<span className="brand-accent">Score</span></span>
        </Link>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>



        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
