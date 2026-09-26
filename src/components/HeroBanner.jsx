import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Play, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function HeroBanner({ items = [] }) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(items.length, 5));
    }, 8000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items || items.length === 0) return null;
  const item = items[currentIndex] || items[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.min(items.length, 5));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.min(items.length, 5)) % Math.min(items.length, 5));
  };

  const handlePlay = () => {
    navigate(`/watch/${item.media_type || 'movie'}/${item.id}`);
  };

  return (
    <div className="hero-container">
      {/* Background Image */}
      <div className="hero-backdrop">
        <img
          src={item.backdropUrl}
          alt=""
          fetchPriority="high"
          decoding="sync"
          width={1280}
          height={720}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
      </div>
      <div className="hero-gradient" />

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-tag">
          <span className="badge-shark" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <img src="/logo icon.svg" alt="" style={{ width: '16px', height: '16px' }} />
            <span>{t('hero.exclusive')} • {item.year || '2026'}</span>
          </span>
        </div>

        <h1 className="hero-title">{item.title}</h1>

        <div className="hero-meta">
          <span className="badge-green">{item.match_score || 88}% {t('hero.match')}</span>
          <span className="badge-gold">
            <Star size={14} fill="#f5c518" stroke="#f5c518" />
            {item.rating || '7.5'} TMDB
          </span>
          <span style={{ color: '#94a3b8', fontWeight: 600 }}>{item.year || '2026'}</span>
          <span className="badge-outline">{item.certification || '13+'}</span>
          <span className="badge-red" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
            {item.quality || 'ULTRA HD 4K'}
          </span>
          <span className="badge-outline" style={{ fontSize: '0.68rem' }}>
            {item.audio || 'Spatial Audio'}
          </span>
        </div>

        <p className="hero-overview">
          {item.overview || 'Follow the thrilling saga with unmissable twists and high-octane suspense.'}
        </p>

        <div className="hero-buttons">
          <button className="btn-play-now" onClick={handlePlay}>
            <Play size={20} fill="currentColor" />
            <span>{t('hero.playNow')}</span>
          </button>
          <button className="btn-more-info" onClick={handlePlay}>
            <Info size={20} />
            <span>{t('hero.moreInfo')}</span>
          </button>
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      {items.length > 1 && (
        <div style={{
          position: 'absolute',
          right: '2rem',
          bottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 20
        }}>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <div style={{ display: 'flex', gap: '6px' }} role="tablist" aria-label="Hero slides">
            {items.slice(0, 5).map((slideItem, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={`Slide ${idx + 1}: ${slideItem.title || ''}`}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: currentIndex === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentIndex === idx ? '#65FFBB' : 'rgba(255,255,255,0.3)',
                  boxShadow: currentIndex === idx ? '0 0 10px rgba(101, 255, 187, 0.6)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
