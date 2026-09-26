import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { EMBED_SERVERS } from '../services/embedProviders';
import { useServerHealth } from '../services/useServerHealth';
import { Server, RefreshCw, ShieldAlert, FastForward, Rewind, AlertTriangle, RotateCcw, Tv, ChevronLeft, ChevronRight } from 'lucide-react';

// How many seconds to wait before treating the iframe as "failed/no content"
const IFRAME_LOAD_TIMEOUT_MS = 14000;

// Status indicator dot component
function StatusDot({ status }) {
  const colors = {
    checking: '#f59e0b',  // amber
    online:   '#65FFBB',  // green
    offline:  '#ef4444',  // red
  };
  const labels = {
    checking: 'Checking…',
    online:   'Online',
    offline:  'Unavailable',
  };
  return (
    <span
      title={labels[status] || 'Unknown'}
      style={{
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: colors[status] || '#64748b',
        boxShadow: status === 'online'
          ? '0 0 5px rgba(101,255,187,0.8)'
          : status === 'offline'
            ? '0 0 4px rgba(239,68,68,0.7)'
            : '0 0 4px rgba(245,158,11,0.7)',
        flexShrink: 0,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    />
  );
}

export default function VideoPlayer({
  type = 'movie',
  id,
  title,
  season = 1,
  episode = 1,
  onSeasonChange,
  onEpisodeChange,
  totalSeasons = 1,
  totalEpisodes = 10,
}) {
  const { t } = useTranslation();
  const { statuses, markFailed, reprobe } = useServerHealth();

  const [activeServer, setActiveServer] = useState(EMBED_SERVERS[0].id);
  const [iframeKey, setIframeKey] = useState(0);
  const [loadState, setLoadState] = useState('loading'); // 'loading' | 'loaded' | 'failed' | 'timeout'
  const [autoSwitched, setAutoSwitched] = useState(false);
  const [autoSwitchMsg, setAutoSwitchMsg] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ─── Episode Range Pagination for High-Episode Anime / Series ──────────────
  const EPISODES_PER_BATCH = 40;
  const totalEpCount = totalEpisodes || 12;
  const hasBatches = totalEpCount > EPISODES_PER_BATCH;
  const [selectedBatch, setSelectedBatch] = useState(() => Math.floor((episode - 1) / EPISODES_PER_BATCH));

  useEffect(() => {
    setSelectedBatch(Math.floor((episode - 1) / EPISODES_PER_BATCH));
  }, [episode, season]);

  const batchCount = Math.ceil(totalEpCount / EPISODES_PER_BATCH);
  const startEp = selectedBatch * EPISODES_PER_BATCH + 1;
  const endEp = Math.min(startEp + EPISODES_PER_BATCH - 1, totalEpCount);
  const visibleEpisodeNumbers = Array.from(
    { length: Math.max(0, endEp - startEp + 1) },
    (_, i) => startEp + i
  );

  const playerWrapperRef = useRef(null);
  const watchdogRef = useRef(null);
  const prevKeyRef = useRef(iframeKey);

  // ─── Fullscreen Controller ───────────────────────────────────────────────────

  const toggleFullscreen = useCallback(() => {
    const el = playerWrapperRef.current;
    if (!el) return;

    const isCurrent = Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    if (!isCurrent) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }, []);

  // Listen to browser fullscreen change events
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ));
    };

    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    document.addEventListener('mozfullscreenchange', onFsChange);
    document.addEventListener('MSFullscreenChange', onFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
      document.removeEventListener('mozfullscreenchange', onFsChange);
      document.removeEventListener('MSFullscreenChange', onFsChange);
    };
  }, []);

  // Fullscreen Keyboard Shortcut: Press 'F' to toggle fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullscreen]);

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  /** Get next available server id (skipping the current one and offline ones) */
  const getNextServer = useCallback((currentId) => {
    const currentIdx = EMBED_SERVERS.findIndex((s) => s.id === currentId);
    for (let i = 1; i <= EMBED_SERVERS.length; i++) {
      const candidate = EMBED_SERVERS[(currentIdx + i) % EMBED_SERVERS.length];
      if (statuses[candidate.id] !== 'offline') return candidate.id;
    }
    return null; // all offline
  }, [statuses]);

  /** Start iframe watchdog: if iframe doesn't call onLoad within timeout, auto-switch */
  const startWatchdog = useCallback(() => {
    clearTimeout(watchdogRef.current);
    watchdogRef.current = setTimeout(() => {
      setLoadState('timeout');
      markFailed(activeServer);

      const nextId = getNextServer(activeServer);
      if (nextId) {
        const nextName = EMBED_SERVERS.find((s) => s.id === nextId)?.name || 'next server';
        setAutoSwitchMsg(`Server timed out. Auto-switching to ${nextName}…`);
        setAutoSwitched(true);
        setActiveServer(nextId);
        setIframeKey((k) => k + 1);
        setLoadState('loading');
        setTimeout(() => setAutoSwitched(false), 4000);
      } else {
        setAutoSwitchMsg('All servers appear unavailable. Try reloading or check your connection.');
      }
    }, IFRAME_LOAD_TIMEOUT_MS);
  }, [activeServer, getNextServer, markFailed]);

  // ─── Effects ─────────────────────────────────────────────────────────────────

  // Auto-switch away if the active server gets flagged offline
  useEffect(() => {
    if (statuses[activeServer] === 'offline') {
      const nextAvailable = EMBED_SERVERS.find((s) => statuses[s.id] !== 'offline');
      if (nextAvailable && nextAvailable.id !== activeServer) {
        setActiveServer(nextAvailable.id);
        setIframeKey((k) => k + 1);
      }
    }
  }, [statuses, activeServer]);

  // Start watchdog whenever iframeKey changes (new src loaded)
  useEffect(() => {
    if (iframeKey !== prevKeyRef.current || prevKeyRef.current === 0) {
      prevKeyRef.current = iframeKey;
      setLoadState('loading');
      startWatchdog();
    }
    return () => clearTimeout(watchdogRef.current);
  }, [iframeKey, startWatchdog]);

  // Also restart watchdog when season/episode changes
  useEffect(() => {
    setLoadState('loading');
    setIframeKey((k) => k + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season, episode]);

  // ─── Event Handlers ──────────────────────────────────────────────────────────

  const handleIframeLoad = () => {
    clearTimeout(watchdogRef.current);
    setLoadState('loaded');
  };

  const handleIframeError = () => {
    clearTimeout(watchdogRef.current);
    setLoadState('failed');
    markFailed(activeServer);
  };

  const handleServerClick = (serverId) => {
    if (serverId === activeServer) {
      // Re-clicking the same server reloads it
      setIframeKey((k) => k + 1);
      return;
    }
    setActiveServer(serverId);
    setIframeKey((k) => k + 1);
    setAutoSwitched(false);
    setAutoSwitchMsg('');
  };

  const handleRefresh = () => {
    setIframeKey((k) => k + 1);
    setAutoSwitchMsg('');
    setAutoSwitched(false);
  };

  const handleTryNextServer = () => {
    const nextId = getNextServer(activeServer);
    if (nextId) {
      markFailed(activeServer);
      setActiveServer(nextId);
      setIframeKey((k) => k + 1);
      setAutoSwitchMsg('');
      setAutoSwitched(false);
    }
  };

  const handleReprobeAll = () => {
    reprobe();
  };

  // ─── Episode Navigation Handlers ─────────────────────────────────────────────

  const canGoPrev = episode > 1 || season > 1;
  const canGoNext = episode < totalEpisodes || season < totalSeasons;

  const handlePrevEpisode = () => {
    if (episode > 1) {
      if (onEpisodeChange) onEpisodeChange(episode - 1);
    } else if (season > 1) {
      if (onSeasonChange) onSeasonChange(season - 1);
    }
  };

  const handleNextEpisode = () => {
    if (episode < totalEpisodes) {
      if (onEpisodeChange) onEpisodeChange(episode + 1);
    } else if (season < totalSeasons) {
      if (onSeasonChange) onSeasonChange(season + 1);
    }
  };

  // ─── Computed ────────────────────────────────────────────────────────────────

  const currentServer = EMBED_SERVERS.find((s) => s.id === activeServer) || EMBED_SERVERS[0];
  const streamUrl = currentServer.getUrl(type, id, season, episode);
  const allOffline = EMBED_SERVERS.every((s) => statuses[s.id] === 'offline');

  // Filter out offline / unavailable servers so only working servers are shown
  const visibleServers = EMBED_SERVERS.filter((s) => statuses[s.id] !== 'offline');
  const displayedServers = visibleServers.length > 0 ? visibleServers : EMBED_SERVERS;
  const hiddenCount = EMBED_SERVERS.length - displayedServers.length;

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* ── Player Frame ─────────────────────────────────────── */}
      <div ref={playerWrapperRef} className={`player-wrapper ${isFullscreen ? 'fullscreen-active' : ''}`} style={{ position: 'relative' }}>
        {/* Loading state: non-blocking spinner (pointer-events:none so iframe stays clickable) */}
        {loadState === 'loading' && (
          <div className="player-state-overlay" style={{ pointerEvents: 'none' }}>
            <div className="player-state-content">
              <div className="player-spinner" />
              <p>Loading stream from <strong>{currentServer.name}</strong>…</p>
              <span className="player-state-hint">Checking server availability in background</span>
            </div>
          </div>
        )}

        {/* Timeout / Failed state: blocking overlay with action buttons */}
        {(loadState === 'timeout' || loadState === 'failed') && (
          <div className="player-state-overlay">
            <div className="player-state-content">
              <AlertTriangle size={40} color="#f59e0b" strokeWidth={1.5} />
              <p style={{ margin: '0.75rem 0 0.25rem', fontWeight: 700 }}>
                {loadState === 'timeout' ? 'Stream timed out' : 'Failed to load stream'}
              </p>
              <span className="player-state-hint" style={{ marginBottom: '1.25rem' }}>
                {currentServer.name} didn&apos;t respond in time
              </span>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="player-state-btn primary" onClick={handleTryNextServer}>
                  Try Next Server
                </button>
                <button className="player-state-btn" onClick={handleRefresh}>
                  <RefreshCw size={14} /> Retry
                </button>
              </div>
            </div>
          </div>
        )}

        <iframe
          key={`${iframeKey}-${activeServer}-${season}-${episode}`}
          src={streamUrl}
          title={`${title || 'Video'} - ${currentServer.name}`}
          className="player-iframe"
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="no-referrer"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>

      {/* ── TV Quick Episode Navigation Bar (Directly beneath Player) ── */}
      {type === 'tv' && (
        <div className="player-episode-bar">
          <div className="player-episode-info">
            <span className="player-episode-badge">
              <Tv size={14} />
              <span>S{season} : E{episode}</span>
            </span>
            <div className="player-episode-title">
              <span>{t('watch.season')} {season}, {t('watch.episode')} {episode}</span>
              <span className="player-episode-total"> • {totalEpisodes} {t('watch.episode')}s</span>
            </div>
          </div>

          <div className="player-episode-nav-btns">
            <button
              type="button"
              className="player-nav-btn prev"
              disabled={!canGoPrev}
              onClick={handlePrevEpisode}
              title={
                episode > 1
                  ? `${t('watch.prevEpisode')} (EP ${episode - 1})`
                  : season > 1
                    ? `Previous Season (S${season - 1})`
                    : 'First episode'
              }
            >
              <ChevronLeft size={18} />
              <span>{episode > 1 ? `EP ${episode - 1}` : t('watch.prevEpisode')}</span>
            </button>

            <button
              type="button"
              className="player-nav-btn next next-highlight"
              disabled={!canGoNext}
              onClick={handleNextEpisode}
              title={
                episode < totalEpisodes
                  ? `${t('watch.nextEpisode')} (EP ${episode + 1})`
                  : season < totalSeasons
                    ? `Next Season (S${season + 1})`
                    : 'Latest episode'
              }
            >
              <span>{episode < totalEpisodes ? `EP ${episode + 1}` : t('watch.nextEpisode')}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Auto-switch notification ──────────────────────────── */}
      {autoSwitched && autoSwitchMsg && (
        <div className="auto-switch-toast">
          <span className="auto-switch-dot" />
          {autoSwitchMsg}
        </div>
      )}

      {/* ── All-offline warning ───────────────────────────────── */}
      {allOffline && (
        <div className="all-offline-banner">
          <AlertTriangle size={16} color="#f59e0b" />
          <span>All servers appear unreachable from your network.</span>
          <button className="player-state-btn" onClick={handleReprobeAll}>
            <RotateCcw size={13} /> Re-check servers
          </button>
        </div>
      )}

      {/* ── Server Selector Bar ───────────────────────────────── */}
      <div className="server-selector-bar">
        <div className="server-buttons">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <Server size={16} />
            <span>{t('watch.selectServer')}</span>
          </div>

          {displayedServers.map((server) => {
            const status = statuses[server.id] || 'checking';
            const isActive = activeServer === server.id;

            return (
              <button
                key={server.id}
                className={`server-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleServerClick(server.id)}
                title={server.name}
              >
                <StatusDot status={status} />
                <span>{server.name}</span>
                <span style={{
                  fontSize: '0.68rem',
                  opacity: 0.8,
                  background: 'rgba(0,0,0,0.3)',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '3px',
                }}>
                  {server.quality}
                </span>
              </button>
            );
          })}

          {hiddenCount > 0 && (
            <button
              type="button"
              className="server-btn"
              onClick={handleReprobeAll}
              title={`${hiddenCount} unavailable server${hiddenCount > 1 ? 's' : ''} hidden. Click to re-check all servers.`}
              style={{ opacity: 0.75, fontSize: '0.78rem' }}
            >
              <RotateCcw size={13} />
              <span>{hiddenCount} hidden • Re-check</span>
            </button>
          )}

          <button
            type="button"
            className="server-btn"
            onClick={handleRefresh}
            title={t('watch.reload')}
          >
            <RefreshCw size={14} />
            <span>{t('watch.reload')}</span>
          </button>
        </div>

        <div className="adblock-tip">
          <ShieldAlert size={15} color="#65FFBB" />
          <span>{t('watch.adblockTip')}</span>
        </div>
      </div>

      {/* ── TV Series Episode & Season Controls ───────────────── */}
      {type === 'tv' && (
        <div className="series-controls">
          <div className="series-controls-header">
            <h3 className="series-controls-title">
              {t('watch.season')} {season} • {t('watch.episode')} {episode}
            </h3>

            <div className="series-controls-nav">
              <button
                type="button"
                className="server-btn"
                disabled={!canGoPrev}
                onClick={handlePrevEpisode}
                style={{ opacity: !canGoPrev ? 0.4 : 1 }}
              >
                <Rewind size={14} />
                <span>{t('watch.prevEpisode')}</span>
              </button>
              <button
                type="button"
                className="server-btn"
                disabled={!canGoNext}
                onClick={handleNextEpisode}
                style={{ opacity: !canGoNext ? 0.4 : 1 }}
              >
                <span>{t('watch.nextEpisode')}</span>
                <FastForward size={14} />
              </button>
            </div>
          </div>

          {/* Season Pills */}
          <div className="seasons-pills">
            {Array.from({ length: totalSeasons || 1 }, (_, i) => i + 1).map((sNum) => (
              <button
                key={sNum}
                className={`filter-pill ${season === sNum ? 'active' : ''}`}
                onClick={() => onSeasonChange && onSeasonChange(sNum)}
              >
                {t('watch.season')} {sNum}
              </button>
            ))}
          </div>

          {/* Episode Batch Selector for High-Episode Series (Anime, etc.) */}
          {hasBatches && (
            <div style={{ margin: '0.85rem 0' }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                Episode Range ({totalEpCount} total):
              </span>
              <div className="seasons-pills" style={{ marginBottom: '0.5rem' }}>
                {Array.from({ length: batchCount }, (_, bIdx) => {
                  const bStart = bIdx * EPISODES_PER_BATCH + 1;
                  const bEnd = Math.min((bIdx + 1) * EPISODES_PER_BATCH, totalEpCount);
                  return (
                    <button
                      key={bIdx}
                      type="button"
                      className={`filter-pill ${selectedBatch === bIdx ? 'active' : ''}`}
                      onClick={() => setSelectedBatch(bIdx)}
                      style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                    >
                      EP {bStart} - {bEnd}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Episodes Grid */}
          <div className="episodes-grid">
            {visibleEpisodeNumbers.map((epNum) => (
              <button
                key={epNum}
                className={`episode-btn ${episode === epNum ? 'active' : ''}`}
                onClick={() => onEpisodeChange && onEpisodeChange(epNum)}
              >
                EP {epNum}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
