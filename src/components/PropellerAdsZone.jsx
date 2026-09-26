import React, { useEffect, useRef } from 'react';

/**
 * PropellerAdsZone — Drop-in display ad unit for PropellerAds.
 *
 * Usage:
 *   <PropellerAdsZone zoneId="12345678" size="leaderboard" />
 *   <PropellerAdsZone zoneId="87654321" size="rectangle" />
 *
 * Sizes:
 *   leaderboard   -> 728x90  (desktop top/bottom bar)
 *   rectangle     -> 300x250 (sidebar / between-content block)
 *   mobile-banner -> 320x50  (mobile only)
 *
 * IMPORTANT: Replace the zoneId values with real IDs from your
 * PropellerAds dashboard: propellerads.com -> Sites -> Ad Zones
 */
export default function PropellerAdsZone({ zoneId, size = 'rectangle' }) {
  const ref = useRef(null);

  const dimensions = {
    'leaderboard':    { width: '728px',  height: '90px',  maxWidth: '100%' },
    'rectangle':      { width: '300px',  height: '250px', maxWidth: '100%' },
    'mobile-banner':  { width: '320px',  height: '50px',  maxWidth: '100%' },
  };

  const dim = dimensions[size] || dimensions['rectangle'];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.__pa && typeof window.__pa.reinit === 'function') {
      window.__pa.reinit();
    }
  }, [zoneId]);

  if (!zoneId || zoneId === 'ZONE_ID') {
    return (
      <div style={{
        width: dim.width,
        maxWidth: dim.maxWidth,
        height: dim.height,
        background: 'rgba(255,255,255,0.04)',
        border: '1px dashed rgba(255,255,255,0.12)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.25)',
        fontSize: '0.75rem',
        letterSpacing: '0.5px',
        fontFamily: 'monospace',
        margin: '0 auto',
      }}>
        AD ZONE ({size}) — Replace zoneId
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', margin: '0.5rem 0' }}>
      <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        Advertisement
      </span>
      <div
        ref={ref}
        data-zone={zoneId}
        style={{
          width: dim.width,
          maxWidth: dim.maxWidth,
          minHeight: dim.height,
          display: 'block',
          margin: '0 auto',
        }}
      />
    </div>
  );
}
