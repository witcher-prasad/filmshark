import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ item }) {
  const navigate = useNavigate();

  if (!item) return null;

  const handleClick = () => {
    navigate(`/watch/${item.media_type || 'movie'}/${item.id}`);
  };

  return (
    <article className="movie-card" onClick={handleClick} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }} role="link" tabIndex={0} aria-label={`Watch ${item.title}`}>
      <div className="card-poster-wrapper">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="card-poster"
          loading="lazy"
          decoding="async"
          width={342}
          height={513}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60';
          }}
        />
        <div className="card-badge-quality">{item.quality || '4K'}</div>
      </div>

      <div className="card-info">
        <h3 className="card-title" title={item.title}>{item.title}</h3>
        <div className="card-meta">
          <span className="badge-green">{item.match_score || 85}% Match</span>
          <div className="card-sub-meta">
            <span className="card-year">{item.year || '2025'}</span>
            <span className="badge-outline card-cert">
              {item.certification || 'PG-13'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
