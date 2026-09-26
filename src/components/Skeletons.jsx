import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Global Theme Wrapper for FilmShark Dark Oceanic Shimmer
 * Lightweight, GPU-accelerated CSS keyframe animations.
 */
export function FilmSharkSkeletonTheme({ children }) {
  return (
    <SkeletonTheme baseColor="#0d1624" highlightColor="#182538" borderRadius="8px">
      {children}
    </SkeletonTheme>
  );
}

/**
 * Single Movie Card Skeleton
 */
export function CardSkeleton() {
  return (
    <FilmSharkSkeletonTheme>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
        width: '100%',
        minWidth: 0
      }}>
        {/* Poster 2:3 ratio */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '2 / 3' }}>
          <Skeleton height="100%" style={{ display: 'block', borderRadius: 0 }} />
        </div>
        
        {/* Info */}
        <div style={{ padding: '0.85rem' }}>
          <Skeleton height={18} width="85%" style={{ marginBottom: '0.5rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton height={14} width="40%" />
            <Skeleton height={14} width="25%" />
          </div>
        </div>
      </div>
    </FilmSharkSkeletonTheme>
  );
}

/**
 * Horizontal Carousel Row of Card Skeletons
 */
export function RowSkeleton({ titleWidth = 220, count = 7 }) {
  return (
    <FilmSharkSkeletonTheme>
      <section className="content-row-section" style={{ marginBottom: '3.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <Skeleton height={28} width={titleWidth} />
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', overflow: 'hidden' }}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} style={{ flex: '0 0 210px' }}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      </section>
    </FilmSharkSkeletonTheme>
  );
}

/**
 * Full Hero Banner Skeleton
 */
export function HeroSkeleton() {
  return (
    <FilmSharkSkeletonTheme>
      <div style={{
        position: 'relative',
        height: '640px',
        minHeight: '640px',
        maxHeight: '640px',
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 2.5rem',
        marginBottom: '2rem',
        background: 'radial-gradient(ellipse at 70% 30%, #111a29 0%, #060a0f 70%)',
        borderRadius: '0 0 20px 20px',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div style={{ maxWidth: '650px', width: '100%', zIndex: 2 }}>
          {/* Badge */}
          <Skeleton height={22} width={180} style={{ borderRadius: '6px', marginBottom: '1.2rem' }} />
          
          {/* Title */}
          <Skeleton height={50} width="90%" style={{ marginBottom: '1rem' }} />
          
          {/* Meta line */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.2rem' }}>
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={70} />
            <Skeleton height={20} width={60} />
            <Skeleton height={20} width={90} />
          </div>

          {/* Synopsis */}
          <div style={{ marginBottom: '2rem' }}>
            <Skeleton count={3} height={16} style={{ marginBottom: '0.4rem' }} />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Skeleton height={44} width={140} style={{ borderRadius: '6px' }} />
            <Skeleton height={44} width={130} style={{ borderRadius: '6px' }} />
          </div>
        </div>
      </div>
    </FilmSharkSkeletonTheme>
  );
}

/**
 * Grid Skeleton for Movies, TV Shows, Trending, and Search results
 */
export function GridSkeleton({ count = 18 }) {
  return (
    <FilmSharkSkeletonTheme>
      <div className="catalog-grid" style={{ paddingBottom: '4rem' }}>
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </FilmSharkSkeletonTheme>
  );
}

/**
 * Watch Page Player & Metadata Skeleton
 */
export function WatchPageSkeleton() {
  return (
    <FilmSharkSkeletonTheme>
      <div className="player-container">
        {/* 16:9 Video Player Shimmer */}
        <div style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '1.25rem'
        }}>
          <Skeleton height="100%" style={{ display: 'block', borderRadius: 'inherit' }} />
        </div>

        {/* Server Selector Bar Shimmer */}
        <div style={{
          padding: '1rem',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <Skeleton height={32} width={120} />
          <Skeleton height={32} width={100} />
          <Skeleton height={32} width={100} />
          <Skeleton height={32} width={100} />
        </div>

        {/* Media Details */}
        <div className="movie-details-layout">
          {/* Poster */}
          <div style={{ width: '100%', aspectRatio: '2 / 3', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <Skeleton height="100%" style={{ display: 'block' }} />
          </div>

          {/* Info */}
          <div>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <Skeleton height={22} width={80} />
              <Skeleton height={22} width={90} />
            </div>

            <Skeleton height={42} width="80%" style={{ marginBottom: '1rem' }} />

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <Skeleton height={20} width={75} />
              <Skeleton height={20} width={90} />
              <Skeleton height={20} width={65} />
            </div>

            <Skeleton count={4} height={16} style={{ marginBottom: '0.5rem' }} />

            <div style={{ marginTop: '1.5rem' }}>
              <Skeleton height={18} width={100} style={{ marginBottom: '0.75rem' }} />
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <Skeleton height={30} width={90} />
                <Skeleton height={30} width={90} />
                <Skeleton height={30} width={90} />
                <Skeleton height={30} width={90} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FilmSharkSkeletonTheme>
  );
}

/**
 * Top 10 Leaderboard List Skeleton
 */
export function TopTenListSkeleton({ count = 10 }) {
  return (
    <FilmSharkSkeletonTheme>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '4rem' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '12px',
              padding: '1rem 1.5rem'
            }}
          >
            <div style={{ width: '50px', textAlign: 'center' }}>
              <Skeleton height={48} width={36} />
            </div>
            <div style={{ width: '80px', height: '110px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
              <Skeleton height="100%" style={{ display: 'block' }} />
            </div>
            <div style={{ flex: 1 }}>
              <Skeleton height={24} width="40%" style={{ marginBottom: '0.6rem' }} />
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.6rem' }}>
                <Skeleton height={16} width={70} />
                <Skeleton height={16} width={60} />
                <Skeleton height={16} width={50} />
              </div>
              <Skeleton height={14} width="80%" />
            </div>
          </div>
        ))}
      </div>
    </FilmSharkSkeletonTheme>
  );
}

/**
 * Search Modal Suggestion Items Skeleton
 */
export function SearchModalSkeleton({ count = 5 }) {
  return (
    <FilmSharkSkeletonTheme>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.2rem 0' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.65rem 0.75rem',
              borderRadius: '10px'
            }}
          >
            {/* Thumbnail */}
            <div style={{ width: '44px', height: '64px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
              <Skeleton height="100%" style={{ display: 'block', borderRadius: '6px' }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <Skeleton height={16} width="55%" style={{ marginBottom: '0.45rem' }} />
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Skeleton height={13} width={50} />
                <Skeleton height={13} width={40} />
                <Skeleton height={13} width={35} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </FilmSharkSkeletonTheme>
  );
}

