import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTop10 } from '../services/tmdb';
import { TopTenListSkeleton } from '../components/Skeletons';
import { Trophy, Play, Star } from 'lucide-react';

export default function TopTenPage() {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Top 10 Movies & TV Series of All Time | FilmShark';
    return () => {
      document.title = 'FilmShark - Watch Free HD Movies & TV Shows Online (No Sign-Up)';
    };
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getTop10();
        setItems(data);
      } catch (err) {
        console.error('Failed to load top 10:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [i18n.language]);

  return (
    <div className="container-fluid" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'rgba(245, 197, 24, 0.15)',
          border: '1px solid rgba(245, 197, 24, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Trophy size={24} color="#f5c518" />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>{t('sections.top10Today')}</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            {t('sections.top10Desc')}
          </p>
        </div>
      </div>

      {loading ? (
        <TopTenListSkeleton count={10} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '4rem' }}>
          {items.map((item, index) => {
            const rank = index + 1;
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
                className="top-ten-card"
              >
                {/* Huge Rank Number */}
                <div
                  className="top-ten-rank"
                  style={{ color: rank <= 3 ? '#65FFBB' : '#64748b' }}
                >
                  {rank}
                </div>

                {/* Poster Thumbnail */}
                <div className="top-ten-poster">
                  <img 
                    src={item.posterUrl} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                    <span className="badge-red" style={{ fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}>
                      {item.quality || '4K'}
                    </span>
                    <span className="badge-green">{item.match_score || 88}% Match</span>
                    <span className="badge-gold">
                      <Star size={13} fill="#f5c518" stroke="#f5c518" />
                      {item.rating || '7.5'}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.year || '2026'}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                    {item.title}
                  </h3>

                  <p style={{
                    color: '#94a3b8',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.overview}
                  </p>
                </div>

                {/* Play Button */}
                <div className="top-ten-play">
                  <Play size={20} fill="#fff" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
