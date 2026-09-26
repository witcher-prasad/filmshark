/**
 * useServerHealth: background-probes each embed server on mount.
 *
 * Strategy: We can't fetch() embed pages (CORS) and can't read iframe content
 * (same-origin policy). Instead we try a lightweight HEAD request to the
 * server's root origin using no-cors mode. If the server is completely
 * unreachable / down the request will fail or timeout quickly, letting us
 * flag it as offline before the user ever tries it.
 *
 * Possible statuses per server:
 *   'checking'  : probe in flight (initial)
 *   'online'    : origin responded (server is reachable)
 *   'offline'   : probe timed-out or hard-failed (server unreachable)
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { EMBED_SERVERS } from './embedProviders';

// How long (ms) to wait for a HEAD probe before marking offline
const PROBE_TIMEOUT_MS = 6000;

// Cache persists for the lifetime of the tab so we don't re-probe on re-render
const statusCache = {};

/**
 * Probe a single server origin.
 * We use a no-cors fetch to the root URL (this won't give us response body
 * but WILL resolve for reachable domains and reject for completely dead ones).
 */
async function probeServer(server) {
  let origin;
  try {
    origin = new URL(server.getUrl('movie', '0')).origin;
  } catch {
    return 'offline';
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

  try {
    await fetch(origin, {
      method: 'GET',
      mode: 'no-cors',       // avoids CORS error; response is opaque but resolves for reachable domains
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timer);
    return 'online';
  } catch {
    clearTimeout(timer);
    return 'offline';
  }
}

/**
 * Hook: returns a statuses map: { [serverId]: 'checking' | 'online' | 'offline' }
 * Probes all servers in parallel on first call; subsequent calls reuse the cache.
 */
export function useServerHealth() {
  // Initialise with cached values (or 'checking' for fresh ones)
  const [statuses, setStatuses] = useState(() => {
    const init = {};
    EMBED_SERVERS.forEach((s) => {
      init[s.id] = statusCache[s.id] || 'checking';
    });
    return init;
  });

  const probing = useRef(false);

  useEffect(() => {
    // If all are already cached, skip re-probe
    const allCached = EMBED_SERVERS.every((s) => statusCache[s.id] !== undefined);
    if (allCached || probing.current) return;

    probing.current = true;

    EMBED_SERVERS.forEach((server) => {
      if (statusCache[server.id]) return; // already cached

      probeServer(server).then((result) => {
        statusCache[server.id] = result;
        setStatuses((prev) => ({ ...prev, [server.id]: result }));
      });
    });
  }, []);

  /**
   * Manually mark a server as failed (called when the iframe watchdog fires).
   * This propagates to cache so other components benefit immediately.
   */
  const markFailed = useCallback((serverId) => {
    statusCache[serverId] = 'offline';
    setStatuses((prev) => ({ ...prev, [serverId]: 'offline' }));
  }, []);

  /** Reset the cache and re-probe everything */
  const reprobe = useCallback(() => {
    EMBED_SERVERS.forEach((s) => delete statusCache[s.id]);
    probing.current = false;
    setStatuses(() => {
      const init = {};
      EMBED_SERVERS.forEach((s) => { init[s.id] = 'checking'; });
      return init;
    });
  }, []);

  return { statuses, markFailed, reprobe };
}
