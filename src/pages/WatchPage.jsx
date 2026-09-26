import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import VideoPlayer from '../components/VideoPlayer';
import BannerAd from '../components/BannerAd';
import PropellerAdsZone from '../components/PropellerAdsZone';
import ContentRow from '../components/ContentRow';
import { WatchPageSkeleton } from '../components/Skeletons';
import { getItemDetails } from '../services/tmdb';
import { Star, Clock, Calendar, Bookmark, Share2, Check } from 'lucide-react';

export default function WatchPage() {
  const { t, i18n } = useTranslation();
  const { type = 'movie', id } = useParams();
  
  // Security sanitization on routing inputs
  const safeType = type === 'tv' ? 'tv' : 'movie';
  const safeId = String(id || '').replace(/[^a-zA-Z0-9_-]/g, '');

  const [item, setItem] = useState(null);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadItem() {
      if (!safeId) return;
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        const details = await getItemDetails(safeType, safeId);
        setItem(details);
      } catch (err) {
        console.error('Failed to load item:', err);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [safeType, safeId, i18n.language]);

  // Dynamic SEO Page Title & Meta Description
  useEffect(() => {
    if (item?.title) {
      const pageTitle = safeType === 'tv'
        ? `Watch ${item.title} S${season} E${episode} Online Free - FilmShark`
        : `Watch ${item.title} (${item.year || ''}) Full Movie Online Free - FilmShark`;
      document.title = pageTitle;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          item.overview
            ? `${item.overview.slice(0, 155)}...`
            : `Stream ${item.title} in HD on FilmShark with zero ads and no registration.`
        );
      }
    }
    return () => {
      document.title = 'FilmShark - Watch Free HD Movies & TV Shows Online (No Sign-Up)';
    };
  }, [item, safeType, season, episode]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <WatchPageSkeleton />;
  }

  if (!item) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h2>{t('watch.titleNotFound')}</h2>
          <Link to="/" style={{ color: '#65FFBB', marginTop: '1rem', display: 'inline-block' }}>{t('watch.returnHome')}</Link>
        </div>
      </div>
    );
  }

  const currentSeasonEpisodes =
    item?.seasons?.find((s) => s.season_number === season)?.episode_count ||
    (item?.number_of_episodes && item?.number_of_seasons
      ? Math.ceil(item.number_of_episodes / item.number_of_seasons)
      : 12);

  return (
    <div className="watch-page">
      {/* Video Stream Container */}
      <div className="player-container">
        <VideoPlayer
          type={safeType}
          id={safeId}
          title={item.title}
          season={season}
          episode={episode}
          onSeasonChange={(s) => { setSeason(s); setEpisode(1); }}
          onEpisodeChange={(ep) => setEpisode(ep)}
          totalSeasons={item.number_of_seasons || 1}
          totalEpisodes={currentSeasonEpisodes}
        />

        {/* Monetization Banner Ad — VPN Affiliate */}
        <BannerAd variant="horizontal" />

        {/* PropellerAds Leaderboard — highest CPM placement, below the player */}
        <div style={{ margin: '0.5rem 0 1.5rem', display: 'flex', justifyContent: 'center' }}>
          <PropellerAdsZone zoneId="ZONE_ID" size="leaderboard" />
        </div>

        {/* Media Details */}
        <div className="movie-details-layout">
          {/* Left: Poster */}
          <div>
            <img 
              src={item.posterUrl} 
              alt={item.title} 
              className="detail-poster-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* Right: Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <span className="badge-shark">
                {type === 'tv' ? t('nav.tvShows').toUpperCase() : t('nav.movies').toUpperCase()}
              </span>
              <span className="badge-outline">{item.quality || '4K ULTRA HD'}</span>
              <span className="badge-outline">{item.certification || 'PG-13'}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.1 }}>
              {item.title}
            </h1>

            {/* Meta Row */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <span className="badge-green">{item.match_score || 88}% {t('hero.match')}</span>
              <span className="badge-gold">
                <Star size={15} fill="#f5c518" stroke="#f5c518" />
                {item.rating || '7.5'} / 10
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={15} color="#94a3b8" />
                {item.year || '2025'}
              </span>
              {item.runtime && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={15} color="#94a3b8" />
                  {item.runtime} min
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="watch-action-buttons" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="watch-action-btn"
                style={{
                  background: bookmarked ? 'rgba(101, 255, 187, 0.15)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${bookmarked ? '#65FFBB' : 'rgba(255,255,255,0.12)'}`,
                  color: bookmarked ? '#65FFBB' : '#fff',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={16} fill={bookmarked ? '#65FFBB' : 'none'} />
                <span>{bookmarked ? t('watch.inWatchlist') : t('watch.addToWatchlist')}</span>
              </button>

              <button
                onClick={handleShare}
                className="watch-action-btn"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={16} color="#65FFBB" /> : <Share2 size={16} />}
                <span>{copied ? t('watch.linkCopied') : t('watch.share')}</span>
              </button>
            </div>

            {/* Overview */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
              {t('watch.overview')}
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {item.overview || 'No synopsis available for this title.'}
            </p>

            {/* Genres */}
            {item.genres && item.genres.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                  {t('watch.genres')}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {item.genres.map((g) => (
                    <span key={g.id || g.name} className="badge-outline" style={{ padding: '0.25rem 0.65rem' }}>
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cast Members */}
            {item.cast && item.cast.length > 0 && (
              <div>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
                  {t('watch.topCast')}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {item.cast.slice(0, 6).map((actor) => (
                    <div 
                      key={actor.id} 
                      style={{ 
                        background: 'rgba(255,255,255,0.04)', 
                        padding: '0.4rem 0.75rem', 
                        borderRadius: '6px', 
                        fontSize: '0.82rem',
                        border: '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <strong style={{ color: '#fff', display: 'block' }}>{actor.name}</strong>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{actor.character}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PropellerAds Rectangle — between cast info and similar titles */}
        <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center' }}>
          <PropellerAdsZone zoneId="ZONE_ID" size="rectangle" />
        </div>

        {/* Similar Titles */}
        {item.similar && item.similar.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <ContentRow title={t('sections.youMayAlsoLike')} items={item.similar} />
          </div>
        )}
      </div>
    </div>
  );
}
