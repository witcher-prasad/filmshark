import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, X, Film, Tv, Star, ChevronRight, TrendingUp } from 'lucide-react';
import { searchContent, getImageUrl } from '../services/tmdb';
import { SearchModalSkeleton } from './Skeletons';

const TRENDING_SEARCH_SUGGESTIONS = [
  'UNABOMBER',
  'Resident Evil',
  'Avatar',
  'Dune',
  'The Last of Us',
  'Severance'
];

export default function SearchModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const boxRef = useRef(null);
  const navigate = useNavigate();

  // Reset state during render when modal opens
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Robust document-level listeners for ESC and outside clicks
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    const handlePointerDown = (e) => {
      // If click/pointerdown occurs outside the search box
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown, true);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, onClose]);

  const handleQueryChange = (val) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      setLoading(false);
      setSelectedIndex(0);
    } else {
      setLoading(true);
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) return;

    const handler = setTimeout(async () => {
      try {
        const data = await searchContent(query.trim(), 1);
        setResults(data ? data.slice(0, 8) : []);
        setSelectedIndex(0);
      } catch (err) {
        console.error('Quick search error:', err);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSelectResult = useCallback((item) => {
    onClose();
    navigate(`/watch/${item.media_type || 'movie'}/${item.id}`);
  }, [navigate, onClose]);

  const handleFullSearch = useCallback(() => {
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }, [query, navigate, onClose]);

  // Keyboard navigation within modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        handleSelectResult(results[selectedIndex]);
      } else if (query.trim()) {
        handleFullSearch();
      }
    }
  };

  if (!isOpen) return null;

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  return (
    <div 
      className="search-modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search movies and series"
    >
      <div 
        ref={boxRef}
        className="search-modal-box" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Search Input Bar */}
        <div className="search-modal-input-row">
          <Search size={22} color="#65FFBB" className="search-modal-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder={t('search.placeholder') || 'Search movies, TV shows, actors...'}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {query && (
              <button 
                type="button" 
                className="search-modal-clear-btn"
                onClick={() => { handleQueryChange(''); inputRef.current?.focus(); }}
                aria-label="Clear query"
              >
                <X size={16} />
              </button>
            )}

            <button 
              type="button" 
              className="search-modal-esc-badge" 
              onClick={onClose}
              title="Close (Esc)"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Results / Suggestions Area */}
        <div className="search-modal-body" ref={listRef}>
          {loading ? (
            <div style={{ padding: '0.2rem 0' }}>
              <div className="search-modal-section-title">
                {t('search.searching') || 'Searching catalog...'}
              </div>
              <SearchModalSkeleton count={5} />
            </div>
          ) : results.length > 0 ? (
            <div className="search-modal-results-list">
              <div className="search-modal-section-title">
                {t('search.title') || 'Instant Matches'} ({results.length})
              </div>

              {results.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const poster = item.posterUrl || getImageUrl(item.poster_path, 'w185');
                const isMovie = item.media_type === 'movie' || item.title;

                return (
                  <div
                    key={`${item.media_type}-${item.id}-${idx}`}
                    className={`search-modal-result-item ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    {/* Thumbnail */}
                    <div className="search-modal-thumbnail-wrapper">
                      <img
                        src={poster}
                        alt={item.title || item.name}
                        className="search-modal-thumbnail"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>

                    {/* Metadata */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="search-modal-item-title">
                        {item.title || item.name}
                      </div>

                      <div className="search-modal-item-meta">
                        <span className="search-modal-type-badge">
                          {isMovie ? <Film size={11} /> : <Tv size={11} />}
                          <span>{isMovie ? 'Movie' : 'TV Show'}</span>
                        </span>

                        {item.year && <span>{item.year}</span>}

                        {item.rating && Number(item.rating) > 0 && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#f5c518', fontWeight: 700 }}>
                            <Star size={11} fill="#f5c518" />
                            {item.rating}
                          </span>
                        )}

                        {item.quality && (
                          <span className="search-modal-quality-badge">{item.quality}</span>
                        )}
                      </div>
                    </div>

                    <ChevronRight size={18} className="search-modal-item-arrow" />
                  </div>
                );
              })}

              {/* View all button */}
              <div 
                className="search-modal-view-all"
                onClick={handleFullSearch}
              >
                <span>View all results for <strong>"{query}"</strong></span>
                <span className="search-modal-key-hint">↵ Enter</span>
              </div>
            </div>
          ) : query ? (
            <div className="search-modal-empty">
              <p style={{ fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>
                {t('search.noResults') || 'No titles found'}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                {t('search.noResultsDesc') || 'Try searching with another keyword or browse trending titles.'}
              </p>
            </div>
          ) : (
            /* Empty State: Trending Searches */
            <div className="search-modal-suggestions">
              <div className="search-modal-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TrendingUp size={14} color="#65FFBB" />
                <span>Trending Searches</span>
              </div>

              <div className="search-modal-pills">
                {TRENDING_SEARCH_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="search-modal-pill"
                    onClick={() => setQuery(s)}
                  >
                    <Search size={12} color="#65FFBB" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Keyboard Shortcuts Footer */}
        <div className="search-modal-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>ESC</kbd> to close</span>
          </div>
          <div style={{ color: '#65FFBB', fontWeight: 600 }}>
            {isMac ? '⌘K' : 'Ctrl+K'} anywhere
          </div>
        </div>
      </div>
    </div>
  );
}
