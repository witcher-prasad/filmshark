import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Tv, Search, Download } from 'lucide-react';

export default function MobileBottomNav({ onOpenSearch, onOpenInstall }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <Link
        to="/"
        className={`mobile-bottom-item ${isActive('/') ? 'active' : ''}`}
        aria-label="Home"
      >
        <Home size={20} />
        <span>Home</span>
      </Link>

      <Link
        to="/movies"
        className={`mobile-bottom-item ${isActive('/movies') ? 'active' : ''}`}
        aria-label="Movies"
      >
        <Film size={20} />
        <span>Movies</span>
      </Link>

      <Link
        to="/tv"
        className={`mobile-bottom-item ${isActive('/tv') ? 'active' : ''}`}
        aria-label="TV Series"
      >
        <Tv size={20} />
        <span>TV</span>
      </Link>

      <button
        type="button"
        className="mobile-bottom-item"
        onClick={onOpenSearch}
        aria-label="Search"
      >
        <Search size={20} />
        <span>Search</span>
      </button>

      <button
        type="button"
        className="mobile-bottom-item highlight"
        onClick={onOpenInstall}
        aria-label="Install App"
      >
        <Download size={20} color="#65FFBB" />
        <span style={{ color: '#65FFBB', fontWeight: 800 }}>App</span>
      </button>
    </nav>
  );
}
