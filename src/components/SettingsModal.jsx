import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Key, Check, Server, RefreshCw } from 'lucide-react';
import { getApiKey, setApiKey } from '../services/tmdb';

export default function SettingsModal({ isOpen, onClose, onRefreshData }) {
  const { t } = useTranslation();
  const [apiKey, setCustomKey] = useState(getApiKey());
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onRefreshData) onRefreshData();
  };

  const handleReset = () => {
    setApiKey(null);
    setCustomKey(getApiKey());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onRefreshData) onRefreshData();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close settings">
          <X size={22} />
        </button>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Key size={20} color="#65FFBB" />
          <span>{t('settings.title')}</span>
        </h2>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.5rem' }}>
              {t('settings.tmdbKeyLabel')}
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="e.g. 4e44d9029b1270a757cddc766a1bcb63"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '0.65rem 0.9rem',
                color: '#fff',
                fontSize: '0.9rem'
              }}
            />
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.4rem' }}>
              {t('settings.tmdbHint')}{' '}
              <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noreferrer" style={{ color: '#65FFBB', textDecoration: 'underline' }}>
                themoviedb.org
              </a>
            </span>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '10px',
            padding: '1rem',
            border: '1px solid rgba(101, 255, 187, 0.15)',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: '#94a3b8',
            lineHeight: 1.6
          }}>
            <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
              <Server size={14} color="#65FFBB" /> {t('settings.freeEmbeds')}
            </strong>
            {t('settings.freeEmbedsDesc')}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #65FFBB, #009153)',
                color: '#04140b',
                padding: '0.7rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                border: 'none',
                boxShadow: '0 4px 14px rgba(101, 255, 187, 0.35)',
                cursor: 'pointer'
              }}
            >
              {saved ? <Check size={16} /> : <Key size={16} />}
              <span>{saved ? t('settings.saved') : t('settings.saveKey')}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#cbd5e1',
                padding: '0.7rem 1rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <RefreshCw size={14} />
              <span>{t('settings.reset')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
