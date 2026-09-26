import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopTenRow({ items = [], title = "Top 10 on FilmShark Today" }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="content-row-section">
      <div className="row-header">
        <h2 className="row-title">{title}</h2>
      </div>

      <button 
        className="scroll-nav-btn prev" 
        onClick={() => handleScroll('left')}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="row-scroll-container" ref={scrollRef}>
        {items.slice(0, 10).map((item, index) => {
          const rank = index + 1;
          return (
            <div
              key={item.id || index}
              className="top10-card-wrapper"
              onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/watch/${item.media_type || 'movie'}/${item.id}`); } }}
              role="link"
              tabIndex={0}
              aria-label={`#${rank} ${item.title}`}
            >
              <span className="top10-number">{rank}</span>
              <div className="top10-poster-box">
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  width={140}
                  height={200}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60';
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    insetInline: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                    padding: '0.4rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        className="scroll-nav-btn next" 
        onClick={() => handleScroll('right')}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
