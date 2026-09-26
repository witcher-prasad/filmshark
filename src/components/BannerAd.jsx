import React from 'react';
import { ExternalLink, Shield } from 'lucide-react';

/**
 * BannerAd: Highly visible, responsive banner advertisement.
 * Place this above/below the video player or between movie rows.
 * You earn affiliate revenue ($30-$100 per signup) or CPM ad revenue.
 */
export default function BannerAd({ variant = 'horizontal' }) {
  if (variant === 'compact') {
    return (
      <a 
        href="https://nordvpn.com/?ref=YOUR_AFFILIATE_ID"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, #101c38 0%, #172a54 100%)',
          border: '1px solid #2b4580',
          borderRadius: '10px',
          padding: '0.75rem 1.25rem',
          margin: '1.25rem 0',
          textDecoration: 'none',
          color: '#fff',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#4687ff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#2b4580'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4687ff, #2563eb)',
            borderRadius: '8px',
            padding: '0.45rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(70,135,255,0.4)'
          }}>
            <Shield size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#93c5fd', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              SPONSORED • STREAM SAFELY
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>
              Unlock 4K Fast Streaming with NordVPN: 74% OFF + 3 Months Free
            </div>
          </div>
        </div>

        <div style={{
          background: '#4687ff',
          color: '#fff',
          fontWeight: 800,
          fontSize: '0.82rem',
          padding: '0.45rem 1rem',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          whiteSpace: 'nowrap'
        }}>
          <span>Claim Deal</span>
          <ExternalLink size={13} />
        </div>
      </a>
    );
  }

  return (
    <div className="banner-ad-box">
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '20%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(70, 135, 255, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="banner-ad-header">
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #4687ff, #1d4ed8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          flexShrink: 0,
          boxShadow: '0 6px 20px rgba(70,135,255,0.4)'
        }}>
          🛡️
        </div>
        <div>
          <div style={{
            display: 'inline-block',
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#60a5fa',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '0.2rem'
          }}>
            RECOMMENDED PARTNER
          </div>
          <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.35rem 0' }}>
            Streaming is 3x Faster with No ISP Throttling
          </h4>
          <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>
            Stop video buffering and protect your IP address while watching free movies & series online.
          </p>
        </div>
      </div>

      <a
        href="https://nordvpn.com/?ref=YOUR_AFFILIATE_ID"
        target="_blank"
        rel="noopener noreferrer"
        className="banner-ad-cta"
      >
        <span>Get 74% Off Deal</span>
        <ExternalLink size={15} />
      </a>
    </div>
  );
}
