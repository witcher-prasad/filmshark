import React from 'react';
import { X, Download, Smartphone, Monitor, Share, PlusSquare, CheckCircle2 } from 'lucide-react';
import { usePwaInstall } from '../services/usePwaInstall';

export default function InstallAppModal({ isOpen, onClose }) {
  const { isInstalled, isIos, promptInstall } = usePwaInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const res = await promptInstall();
    if (res.success) {
      onClose();
    }
  };

  return (
    <div className="pwa-modal-backdrop" onClick={onClose}>
      <div
        className="pwa-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{ maxWidth: '520px' }}
      >
        {/* Header */}
        <div className="pwa-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src="/logo icon.svg"
              alt="FilmShark App Icon"
              style={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                background: 'rgba(101, 255, 187, 0.1)',
                padding: '4px',
                border: '1px solid rgba(101, 255, 187, 0.3)'
              }}
            />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Install FilmShark App
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#65FFBB', fontWeight: 600 }}>
                Progressive Web Application (PWA)
              </span>
            </div>
          </div>

          <button
            type="button"
            className="pwa-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Benefits list */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
            Install FilmShark directly to your device for an app-like streaming experience. No App Store or Play Store account required.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#e2e8f0', fontSize: '0.84rem' }}>
              <CheckCircle2 size={16} color="#65FFBB" />
              <span>Full screen streaming with zero browser address bar distractions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#e2e8f0', fontSize: '0.84rem' }}>
              <CheckCircle2 size={16} color="#65FFBB" />
              <span>Instant launching from your home screen or desktop dock</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#e2e8f0', fontSize: '0.84rem' }}>
              <CheckCircle2 size={16} color="#65FFBB" />
              <span>Faster loading with offline app shell caching</span>
            </div>
          </div>
        </div>

        {/* Direct Action or iOS Instructions */}
        {isInstalled ? (
          <div style={{
            background: 'rgba(101, 255, 187, 0.1)',
            border: '1px solid #65FFBB',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#65FFBB',
            fontWeight: 700
          }}>
            FilmShark is already installed on your device! You can open it from your Home Screen or Applications.
          </div>
        ) : isIos ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(101, 255, 187, 0.25)',
            borderRadius: '10px',
            padding: '1.1rem'
          }}>
            <strong style={{ color: '#65FFBB', display: 'block', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              How to Install on iPhone / iPad:
            </strong>
            <ol style={{ paddingLeft: '1.25rem', margin: 0, color: '#cbd5e1', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>1. Tap the</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#fff' }}>
                  <Share size={13} /> Share
                </span>
                <span>button in Safari navigation.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>2. Scroll down and tap</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#fff' }}>
                  <PlusSquare size={13} /> Add to Home Screen
                </span>
              </li>
              <li>
                <span>3. Tap <strong>Add</strong> in the top right corner.</span>
              </li>
            </ol>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              type="button"
              className="player-nav-btn next-highlight"
              onClick={handleInstallClick}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.8rem 1.25rem',
                fontSize: '0.95rem'
              }}
            >
              <Download size={18} />
              <span>Install FilmShark Now</span>
            </button>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
              Works on Android Chrome, Windows Chrome/Edge, and macOS Chrome/Brave.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
