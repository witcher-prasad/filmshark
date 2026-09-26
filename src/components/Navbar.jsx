import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Menu, X, Check, Download } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../i18n';

export default function Navbar({ onOpenSearch, onOpenInstall }) {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('filmshark_lang', code);
    setShowLangMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      {/* Brand */}
      <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
        <img
          src="/Logo.svg"
          alt="FilmShark"
          className="brand-logo-img"
          width={150}
          height={42}
        />
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="nav-links" aria-label="Main Navigation" style={{ display: mobileMenuOpen ? 'none' : undefined }}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          {t('nav.home')}
        </Link>
        <Link to="/movies" className={`nav-link ${isActive('/movies') ? 'active' : ''}`}>
          {t('nav.movies')}
        </Link>
        <Link to="/tv" className={`nav-link ${isActive('/tv') ? 'active' : ''}`}>
          {t('nav.tvShows')}
        </Link>
        <Link to="/trending" className={`nav-link ${isActive('/trending') ? 'active' : ''}`}>
          {t('nav.trending')}
        </Link>
        <Link to="/top10" className={`nav-link ${isActive('/top10') ? 'active' : ''}`}>
          {t('nav.top10')}
        </Link>
        <Link to="/anime" className={`nav-link ${isActive('/anime') ? 'active' : ''}`}>
          {t('nav.anime')}
        </Link>
        <Link to="/kdrama" className={`nav-link ${isActive('/kdrama') ? 'active' : ''}`}>
          {t('nav.kdrama')}
        </Link>
        <Link to="/faqs" className={`nav-link ${isActive('/faqs') ? 'active' : ''}`}>
          {t('nav.faqs')}
        </Link>
      </nav>

      {/* Right Actions */}
      <div className="navbar-actions">
        {/* Quick Search Trigger with Shortcut */}
        <button
          type="button"
          className="navbar-search-trigger"
          onClick={onOpenSearch}
          title={isMac ? "Search (⌘K or /)" : "Search (Ctrl+K or /)"}
          aria-label="Open search dialog"
        >
          <Search size={16} color="#65FFBB" />
          <span style={{ color: '#94a3b8' }}>{t('nav.searchPlaceholder')}</span>
          <span className="navbar-search-badge">
            {isMac ? '⌘K' : 'Ctrl+K'}
          </span>
        </button>

        {/* Production-Grade Language Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="lang-selector"
            onClick={() => setShowLangMenu(!showLangMenu)}
            title="Change Language"
            aria-label={`Change language, current: ${currentLang.label}`}
            aria-expanded={showLangMenu}
            aria-haspopup="listbox"
            style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
          >
            <span>{currentLang.flag}</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>{currentLang.code.toUpperCase()}</span>
          </button>
          
          {showLangMenu && (
            <div style={{
              position: 'absolute',
              top: '120%',
              right: 0,
              background: '#0e1724',
              border: '1px solid rgba(101, 255, 187, 0.25)',
              borderRadius: '12px',
              padding: '0.5rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.85), 0 0 25px rgba(101, 255, 187, 0.1)',
              zIndex: 300,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              minWidth: '170px'
            }}>
              <div style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#65FFBB',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Select Language
              </div>
              {SUPPORTED_LANGUAGES.map(lang => {
                const isSelected = i18n.language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: isSelected ? 800 : 500,
                      background: isSelected ? 'rgba(101, 255, 187, 0.15)' : 'transparent',
                      color: isSelected ? '#65FFBB' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.15s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {isSelected && <Check size={14} color="#65FFBB" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* PWA Install App Button */}
        <button
          type="button"
          className="btn-get-app nav-install-btn"
          onClick={onOpenInstall}
          title="Install FilmShark App on Device"
        >
          <Download size={14} />
          <span>App</span>
        </button>

        {/* Mobile menu trigger */}
        <button 
          type="button" 
          className="lang-selector mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-menu">
          <button
            type="button"
            className="player-nav-btn next-highlight"
            style={{ width: '100%', justifyContent: 'center', padding: '0.7rem 1rem' }}
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenInstall) onOpenInstall();
            }}
          >
            <Download size={16} />
            <span>Install FilmShark App</span>
          </button>

          <button
            type="button"
            className="navbar-search-trigger"
            style={{ width: '100%', justifyContent: 'space-between', padding: '0.65rem 1rem' }}
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenSearch) onOpenSearch();
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Search size={16} color="#65FFBB" />
              <span>{t('nav.searchPlaceholder')}</span>
            </div>
            <span className="navbar-search-badge">{isMac ? '⌘K' : 'Ctrl+K'}</span>
          </button>

          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.home')}
          </Link>
          <Link to="/movies" className={`nav-link ${isActive('/movies') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.movies')}
          </Link>
          <Link to="/tv" className={`nav-link ${isActive('/tv') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.tvShows')}
          </Link>
          <Link to="/trending" className={`nav-link ${isActive('/trending') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.trending')}
          </Link>
          <Link to="/top10" className={`nav-link ${isActive('/top10') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.top10')}
          </Link>
          <Link to="/anime" className={`nav-link ${isActive('/anime') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.anime')}
          </Link>
          <Link to="/kdrama" className={`nav-link ${isActive('/kdrama') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.kdrama')}
          </Link>
          <Link to="/faqs" className={`nav-link ${isActive('/faqs') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.faqs')}
          </Link>
        </div>
      )}
    </header>
  );
}
