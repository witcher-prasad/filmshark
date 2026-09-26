import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function ContentRow({ title, items = [] }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -700 : 700;
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
        {items.map((item) => (
          <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
        ))}
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
