// Embed stream providers for near-zero cost streaming aggregation
export const EMBED_SERVERS = [
  {
    id: 'server-1',
    name: 'Server 1 (Ultra HD)',
    quality: '4K / 1080p',
    speed: 'Ultra Fast',
    badge: 'Recommended',
    getUrl: (type, id, season = 1, episode = 1) => {
      if (type === 'tv') {
        return `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`;
      }
      return `https://vidsrc.to/embed/movie/${id}`;
    }
  },
  {
    id: 'server-2',
    name: 'Server 2 (Full HD)',
    quality: '1080p HD',
    speed: 'Fast',
    badge: 'Multi-Sub',
    getUrl: (type, id, season = 1, episode = 1) => {
      if (type === 'tv') {
        return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      }
      return `https://vidsrc.me/embed/movie?tmdb=${id}`;
    }
  },
  {
    id: 'server-3',
    name: 'Server 3 (Pro CDN)',
    quality: '1080p HD',
    speed: 'Reliable',
    badge: 'Fast CDN',
    getUrl: (type, id, season = 1, episode = 1) => {
      if (type === 'tv') {
        return `https://vidlink.pro/tv/${id}/${season}/${episode}`;
      }
      return `https://vidlink.pro/movie/${id}`;
    }
  },
  {
    id: 'server-4',
    name: 'Server 4 (Multi-Line)',
    quality: 'HD / 720p',
    speed: 'Backup',
    badge: 'Global',
    getUrl: (type, id, season = 1, episode = 1) => {
      if (type === 'tv') {
        return `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      }
      return `https://multiembed.mov/?video_id=${id}&tmdb=1`;
    }
  },
  {
    id: 'server-5',
    name: 'Server 5 (Mirror HD)',
    quality: '1080p HD',
    speed: 'Standard',
    badge: 'Mirror',
    getUrl: (type, id, season = 1, episode = 1) => {
      if (type === 'tv') {
        return `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
      }
      return `https://www.2embed.cc/embed/${id}`;
    }
  },
  {
    id: 'server-6',
    name: 'Server 6 (Backup HD)',
    quality: '1080p HD',
    speed: 'Backup',
    badge: 'Multi-Stream',
    getUrl: (type, id, season = 1, episode = 1) => {
      if (type === 'tv') {
        return `https://embed.su/embed/tv/${id}/${season}/${episode}`;
      }
      return `https://embed.su/embed/movie/${id}`;
    }
  }
];
