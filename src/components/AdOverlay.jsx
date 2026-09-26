import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';

/**
 * AdOverlay: promotional banner system that shows before video iframe loads.
 * Revenue comes from affiliate links, ad networks,
 * or direct sponsor deals.
 * 
 * Props:
 *  - ads         : Array of ad objects to rotate through
 *  - skipAfter   : Seconds before "Skip" button appears (default: 8)
 *  - onComplete  : Called when ad is closed/skipped -> iframe loads
 */
export default function AdOverlay({ ads = DEFAULT_ADS, skipAfter = 8, onComplete }) {
  const [currentAdIndex] = useState(0);
  const [countdown, setCountdown] = useState(skipAfter);
  const [canSkip, setCanSkip] = useState(false);
  const [closed, setClosed] = useState(false);
  const intervalRef = useRef(null);

  const currentAd = ads[currentAdIndex % ads.length];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleSkip = () => {
    setClosed(true);
    if (onComplete) {
      onComplete();
    }
  };

  const handleAdClick = () => {
    // Track click: in production replace with your affiliate or ad network click tracker
    if (currentAd.url) window.open(currentAd.url, '_blank', 'noopener,noreferrer');
  };

  if (closed) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 50,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'inherit',
      overflow: 'hidden',
    }}>
      {/* Ad Background / Creative */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          cursor: 'pointer',
          background: currentAd.bgColor || 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
        }}
        onClick={handleAdClick}
      >
        {/* Background gradient pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, ${currentAd.accentColor || '#65FFBB'}22 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, ${currentAd.accentColor || '#65FFBB'}11 0%, transparent 50%)
          `
        }} />

        {/* Ad Label */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          background: 'rgba(0,0,0,0.7)',
          color: '#94a3b8',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          zIndex: 10
        }}>
          Advertisement
        </div>

        {/* Countdown / Skip - Top Right */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          zIndex: 10,
        }}>
          {canSkip ? (
            <button
              onClick={(e) => { e.stopPropagation(); handleSkip(); }}
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                padding: '0.4rem 0.9rem',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              <span>Skip Ad</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <div style={{
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              borderRadius: '6px',
              padding: '0.4rem 0.9rem',
              fontWeight: 700,
              fontSize: '0.82rem',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              Skip in {countdown}s
            </div>
          )}
        </div>

        {/* Ad Content Area */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          flexDirection: 'column',
          gap: '1.5rem',
          textAlign: 'center'
        }}>
          {/* Brand Logo / Icon */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '18px',
            background: currentAd.logoBackground || 'linear-gradient(135deg, #65FFBB, #009153)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: `0 8px 30px ${currentAd.accentColor || '#65FFBB'}66`,
            flexShrink: 0
          }}>
            {currentAd.logoEmoji || '🛡️'}
          </div>

          {/* Headline */}
          <div>
            <p style={{
              color: '#94a3b8',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              {currentAd.brand}
            </p>
            <h3 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.9rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.25,
              marginBottom: '0.75rem',
              maxWidth: '600px'
            }}>
              {currentAd.headline}
            </h3>
            <p style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {currentAd.description}
            </p>
          </div>

          {/* CTA Button */}
          <div style={{
            background: currentAd.ctaBackground || 'linear-gradient(135deg, #65FFBB, #009153)',
            color: currentAd.ctaTextColor || '#04140b',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: `0 6px 20px ${currentAd.accentColor || '#65FFBB'}55`,
            pointerEvents: 'none' // Parent div handles click
          }}>
            <span>{currentAd.ctaLabel || 'Learn More'}</span>
            <ExternalLink size={15} />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
        <div style={{
          height: '100%',
          background: currentAd.accentColor || '#65FFBB',
          width: `${((skipAfter - countdown) / skipAfter) * 100}%`,
          transition: 'width 1s linear',
          boxShadow: `0 0 8px ${currentAd.accentColor || '#65FFBB'}`,
        }} />
      </div>
    </div>
  );
}

// DEFAULT ADS: Replace URLs with your actual affiliate links or ad network tags
const DEFAULT_ADS = [
  {
    brand: 'NordVPN (Official Partner)',
    headline: 'Stream with Total Privacy and No Throttling',
    description: 'Unlock geo-restricted content, bypass ISP throttling, and stream at full speed on any server globally.',
    ctaLabel: 'Get 70% Off + 3 Months Free',
    logoEmoji: '🛡️',
    logoBackground: 'linear-gradient(135deg, #4687ff, #2c5dde)',
    accentColor: '#4687ff',
    ctaBackground: 'linear-gradient(135deg, #4687ff, #2c5dde)',
    bgColor: 'linear-gradient(135deg, #080d1a 0%, #0d1a35 100%)',
    url: 'https://nordvpn.com/?ref=YOUR_AFFILIATE_ID'
  },
  {
    brand: 'ExpressVPN',
    headline: 'Watch Anything, Anywhere in HD',
    description: 'The world fastest VPN trusted by 35 million users. No buffering, no restrictions. Access every streaming library worldwide.',
    ctaLabel: 'Try Free for 30 Days',
    logoEmoji: '⚡',
    logoBackground: 'linear-gradient(135deg, #da3c2d, #ff6b35)',
    accentColor: '#da3c2d',
    ctaBackground: 'linear-gradient(135deg, #da3c2d, #ff6b35)',
    bgColor: 'linear-gradient(135deg, #1a0808 0%, #2d1010 100%)',
    url: 'https://expressvpn.com/?ref=YOUR_AFFILIATE_ID'
  },
  {
    brand: 'Surfshark',
    headline: 'Stream on Unlimited Devices',
    description: 'One subscription covers all your devices: phone, tablet, TV, and laptop. No device limits, ever.',
    ctaLabel: 'Get 82% Off Today',
    logoEmoji: '🦈',
    logoBackground: 'linear-gradient(135deg, #1dbf8b, #0ea271)',
    accentColor: '#1dbf8b',
    ctaBackground: 'linear-gradient(135deg, #1dbf8b, #0ea271)',
    bgColor: 'linear-gradient(135deg, #071a14 0%, #0d2a20 100%)',
    url: 'https://surfshark.com/?ref=YOUR_AFFILIATE_ID'
  },
  {
    brand: 'AdGuard (Ad Blocker)',
    headline: 'Watch Without Any Popups or Ads',
    description: 'AdGuard blocks intrusive ads and popups for the ultimate clean streaming experience.',
    ctaLabel: 'Get AdGuard Free',
    logoEmoji: '🧹',
    logoBackground: 'linear-gradient(135deg, #67b346, #4a8d2a)',
    accentColor: '#67b346',
    ctaBackground: 'linear-gradient(135deg, #67b346, #4a8d2a)',
    bgColor: 'linear-gradient(135deg, #0a1a07 0%, #132a0d 100%)',
    url: 'https://adguard.com/?ref=YOUR_AFFILIATE_ID'
  }
];
