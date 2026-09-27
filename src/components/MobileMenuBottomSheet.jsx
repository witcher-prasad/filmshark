import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Film, 
  Tv, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Heart, 
  HelpCircle, 
  ChevronRight,
  X, 
  Download 
} from 'lucide-react';
import { usePwaInstall } from '../services/usePwaInstall';

export default function MobileMenuBottomSheet({ isOpen, onClose, onOpenInstall }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { isInstalled } = usePwaInstall();

  // Animation and drag state
  const [rendered, setRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const sheetRef = useRef(null);

  // Synchronize opening/closing animation states
  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      setIsClosing(false);
      setDragY(0);
      document.body.style.overflow = 'hidden';
    } else if (rendered) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setRendered(false);
        setIsClosing(false);
        setDragY(0);
        document.body.style.overflow = '';
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Keyboard shortcut (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Touch Drag to Dismiss
  const handleTouchStart = (e) => {
    // Only allow drag-to-dismiss if we start at the top or handle
    const touch = e.touches[0];
    startYRef.current = touch.clientY;
    currentYRef.current = touch.clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaY = touch.clientY - startYRef.current;
    
    // Only permit dragging downwards
    if (deltaY > 0) {
      currentYRef.current = touch.clientY;
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaY = currentYRef.current - startYRef.current;

    // If dragged more than 70px downward, trigger close
    if (deltaY > 70) {
      onClose?.();
    } else {
      // Spring back to 0
      setDragY(0);
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  if (!rendered) return null;

  const content = (
    <div 
      className={`custom-bottom-sheet-root ${isOpen && !isClosing ? 'is-open' : 'is-closing'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Semi-transparent Backdrop Overlay */}
      <div 
        className="custom-bottom-sheet-backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-up Bottom Sheet Panel */}
      <div 
        ref={sheetRef}
        className={`custom-bottom-sheet-panel ${isDragging ? 'is-dragging' : ''}`}
        style={{
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.26s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.2s ease'
        }}
      >
        {/* Drag Handle Area */}
        <div 
          className="bottom-sheet-drag-area"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bottom-sheet-drag-handle" />
        </div>

        {/* Sheet Header */}
        <div 
          className="custom-sheet-header"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img src="/logo icon.svg" alt="FilmShark" style={{ width: 26, height: 26 }} />
            <h2 className="custom-sheet-title">Menu</h2>
          </div>

          <button 
            type="button" 
            className="bottom-sheet-close-btn" 
            onClick={onClose}
            title="Close Menu"
            aria-label="Close Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="custom-sheet-body">
          {/* Section 1: Browse Catalog */}
          <div className="bottom-sheet-section-title">
            <Film size={13} color="#65FFBB" />
            <span>Browse Catalog</span>
          </div>

          <div className="bottom-sheet-items-list">
            <Link 
              to="/" 
              className={`bottom-sheet-item ${isActive('/') ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="bottom-sheet-item-icon">
                <Home size={18} />
              </div>
              <div className="bottom-sheet-item-text">
                <span className="item-title">{t('nav.home')}</span>
                <span className="item-sub">Trending, top 10 & featured</span>
              </div>
              <ChevronRight size={18} className="item-arrow" />
            </Link>

            <Link 
              to="/movies" 
              className={`bottom-sheet-item ${isActive('/movies') ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="bottom-sheet-item-icon">
                <Film size={18} />
              </div>
              <div className="bottom-sheet-item-text">
                <span className="item-title">{t('nav.movies')}</span>
                <span className="item-sub">Blockbusters & cinematic hits</span>
              </div>
              <ChevronRight size={18} className="item-arrow" />
            </Link>

            <Link 
              to="/tv" 
              className={`bottom-sheet-item ${isActive('/tv') ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="bottom-sheet-item-icon">
                <Tv size={18} />
              </div>
              <div className="bottom-sheet-item-text">
                <span className="item-title">{t('nav.tvShows')}</span>
                <span className="item-sub">Popular series & episodes</span>
              </div>
              <ChevronRight size={18} className="item-arrow" />
            </Link>

            <Link 
              to="/trending" 
              className={`bottom-sheet-item ${isActive('/trending') ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="bottom-sheet-item-icon">
                <TrendingUp size={18} />
              </div>
              <div className="bottom-sheet-item-text">
                <span className="item-title">{t('nav.trending')}</span>
                <span className="item-sub">What's viral right now</span>
              </div>
              <ChevronRight size={18} className="item-arrow" />
            </Link>

            <Link 
              to="/top10" 
              className={`bottom-sheet-item ${isActive('/top10') ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="bottom-sheet-item-icon">
                <Award size={18} />
              </div>
              <div className="bottom-sheet-item-text">
                <span className="item-title">{t('nav.top10')}</span>
                <span className="item-sub">Top 10 highest-ranked titles</span>
              </div>
              <ChevronRight size={18} className="item-arrow" />
            </Link>
          </div>

          {/* Section 2: Special Collections & Info */}
          <div className="bottom-sheet-section-title" style={{ marginTop: '1.25rem' }}>
            <Sparkles size={13} color="#65FFBB" />
            <span>Special Collections & Info</span>
          </div>

          <div className="bottom-sheet-items-list">
            <Link 
              to="/anime" 
              className={`bottom-sheet-item ${isActive('/anime') ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="bottom-sheet-item-icon">
                <Sparkles size={18} />
              </div>
              <div className="bottom-sheet-item-text">
                <span className="item-title">{t('nav.anime')}</span>
                <span className="item-sub">Shonen, romance & popular anime</span>
              </div>
              <ChevronRight size={18} className="item-arrow" />
            </Link>

            <Link 
              to="/kdrama" 
              className={`bottom-sheet-item ${isActive('/kdrama') ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="bottom-sheet-item-icon">
                <Heart size={18} />
              </div>
              <div className="bottom-sheet-item-text">
                <span className="item-title">{t('nav.kdrama')}</span>
                <span className="item-sub">Korean drama & romance series</span>
              </div>
              <ChevronRight size={18} className="item-arrow" />
            </Link>

            <Link 
              to="/faqs" 
              className={`bottom-sheet-item ${isActive('/faqs') ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="bottom-sheet-item-icon">
                <HelpCircle size={18} />
              </div>
              <div className="bottom-sheet-item-text">
                <span className="item-title">{t('nav.faqs')}</span>
                <span className="item-sub">Help, streaming tips & questions</span>
              </div>
              <ChevronRight size={18} className="item-arrow" />
            </Link>
          </div>
        </div>

        {/* Bottom Pinned Download App Button */}
        {!isInstalled && (
          <div className="custom-sheet-footer">
            <button
              type="button"
              className="btn-sheet-install"
              onClick={() => {
                onClose?.();
                if (onOpenInstall) onOpenInstall();
              }}
            >
              <Download size={18} />
              <span>Download FilmShark App</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
