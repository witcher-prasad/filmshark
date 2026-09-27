import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Tv, Search, Menu, X } from 'lucide-react';

export default function MobileBottomNav({ 
  onOpenSearch, 
  onToggleMenu, 
  isMenuOpen, 
  isSearchOpen, 
  onCloseAll 
}) {
  const location = useLocation();

  const isRouteActive = (path) => {
    if (isMenuOpen || isSearchOpen) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavClick = () => {
    if (onCloseAll) onCloseAll();
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <Link
        to="/"
        className={`mobile-bottom-item ${isRouteActive('/') ? 'active' : ''}`}
        onClick={handleNavClick}
        aria-label="Home"
      >
        <Home size={20} />
        <span>Home</span>
      </Link>

      <Link
        to="/movies"
        className={`mobile-bottom-item ${isRouteActive('/movies') ? 'active' : ''}`}
        onClick={handleNavClick}
        aria-label="Movies"
      >
        <Film size={20} />
        <span>Movies</span>
      </Link>

      <Link
        to="/tv"
        className={`mobile-bottom-item ${isRouteActive('/tv') ? 'active' : ''}`}
        onClick={handleNavClick}
        aria-label="TV Series"
      >
        <Tv size={20} />
        <span>TV</span>
      </Link>

      <button
        type="button"
        className={`mobile-bottom-item ${isSearchOpen ? 'active' : ''}`}
        onClick={onOpenSearch}
        aria-label="Search"
      >
        <Search size={20} />
        <span>Search</span>
      </button>

      <button
        type="button"
        className={`mobile-bottom-item ${isMenuOpen ? 'active' : ''}`}
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        <span>Menu</span>
      </button>
    </nav>
  );
}
