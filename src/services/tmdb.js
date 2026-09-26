// TMDB Service with rich live API support and built-in fallback catalog
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Default TMDB API key (can be overridden via localStorage or env)
const DEFAULT_API_KEY = '4e44d9029b1270a757cddc766a1bcb63'; // standard public demo TMDB key

export const getApiKey = () => {
  return localStorage.getItem('filmshark_tmdb_key') || localStorage.getItem('flixbaba_tmdb_key') || import.meta.env.VITE_TMDB_API_KEY || DEFAULT_API_KEY;
};

export const setApiKey = (key) => {
  if (key) {
    localStorage.setItem('filmshark_tmdb_key', key.trim());
  } else {
    localStorage.removeItem('filmshark_tmdb_key');
    localStorage.removeItem('flixbaba_tmdb_key');
  }
};

export const getImageUrl = (path, size = 'w342') => {
  if (!path) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=60';
  if (path.startsWith('http')) return path;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'w1280') => {
  if (!path) return 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1280&auto=format&fit=crop&q=70';
  if (path.startsWith('http')) return path;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Rich curated mock items matching Flixbaba's live showcase
export const CURATED_MOVIES = [
  {
    id: 1022789,
    title: 'UNABOMBER',
    name: 'UNABOMBER',
    media_type: 'movie',
    overview: 'Follow Ted Kaczynski\'s transformation from Harvard prodigy into the infamous Unabomber. Subjected to controversial psychological experiments by Professor Henry Murray, Kaczynski\'s troubled past manifests in deadly parcels mailed across America over seventeen years.',
    poster_path: '/q6n82782zMvVl92k14oFmG1q2n4.jpg',
    backdrop_path: '/xOmLqO47c61iPzU5J8mN4A9qY.jpg',
    custom_poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=60',
    custom_backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&auto=format&fit=crop&q=70',
    vote_average: 7.2,
    match_score: 84,
    release_date: '2026-02-14',
    certification: '13+',
    quality: 'ULTRA HD 4K',
    audio: 'Spatial Audio',
    is_exclusive: true,
    genres: [{ id: 80, name: 'Crime' }, { id: 18, name: 'Drama' }, { id: 53, name: 'Thriller' }]
  },
  {
    id: 823464,
    title: 'Resident Evil: The Beginning',
    name: 'Resident Evil: The Beginning',
    media_type: 'movie',
    overview: 'A deadly virus outbreak sweeps through the subterranean research facility of the Umbrella Corporation, releasing genetically mutated bioweapons.',
    custom_poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=60',
    custom_backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1280&auto=format&fit=crop&q=70',
    vote_average: 7.5,
    match_score: 85,
    release_date: '2026-01-20',
    certification: 'PG-13',
    quality: '4K',
    genres: [{ id: 27, name: 'Horror' }, { id: 28, name: 'Action' }, { id: 878, name: 'Sci-Fi' }]
  },
  {
    id: 1114513,
    title: 'The Love Hypothesis',
    name: 'The Love Hypothesis',
    media_type: 'movie',
    overview: 'As a third-year Ph.D. candidate, Olive Smith doesn\'t believe in lasting romantic relationships--but her best friend does, and that\'s what got her into this situation.',
    custom_poster: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&auto=format&fit=crop&q=60',
    custom_backdrop: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1280&auto=format&fit=crop&q=70',
    vote_average: 8.4,
    match_score: 96,
    release_date: '2026-03-01',
    certification: 'PG-13',
    quality: '4K',
    genres: [{ id: 10749, name: 'Romance' }, { id: 35, name: 'Comedy' }]
  },
  {
    id: 93405,
    title: 'Primetime',
    name: 'Primetime',
    media_type: 'movie',
    overview: 'A television news host finds himself held hostage live on national TV by an armed gunman demanding a televised public trial for corporate corruption.',
    custom_poster: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&auto=format&fit=crop&q=60',
    custom_backdrop: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1280&auto=format&fit=crop&q=70',
    vote_average: 7.1,
    match_score: 84,
    release_date: '2026-02-10',
    certification: 'PG-13',
    quality: 'HD',
    genres: [{ id: 53, name: 'Thriller' }, { id: 18, name: 'Drama' }]
  },
  {
    id: 1084199,
    title: 'Toy Story 5',
    name: 'Toy Story 5',
    media_type: 'movie',
    overview: 'Woody, Buzz and the rest of the gang face an unprecedented modern threat when kids become entirely obsessed with smart devices and digital electronics.',
    custom_poster: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=400&auto=format&fit=crop&q=60',
    custom_backdrop: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=1280&auto=format&fit=crop&q=70',
    vote_average: 8.2,
    match_score: 95,
    release_date: '2026-06-19',
    certification: 'PG',
    quality: '4K',
    genres: [{ id: 16, name: 'Animation' }, { id: 10751, name: 'Family' }, { id: 35, name: 'Comedy' }]
  },
  {
    id: 945961,
    title: 'One Last Shot',
    name: 'One Last Shot',
    media_type: 'movie',
    overview: 'An elite tactical sniper is pulled out of retirement to eliminate a rogue syndicate that has taken control of an offshore defense installation.',
    custom_poster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=60',
    custom_backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1280&auto=format&fit=crop&q=70',
    vote_average: 7.4,
    match_score: 88,
    release_date: '2026-01-15',
    certification: 'PG-13',
    quality: '4K',
    genres: [{ id: 28, name: 'Action' }, { id: 53, name: 'Thriller' }]
  },
  {
    id: 872585,
    title: 'Forgotten Island',
    name: 'Forgotten Island',
    media_type: 'movie',
    overview: 'A charter flight crash-lands on an unmapped Pacific island guarded by primordial anomalies and temporal shifts that defy the laws of physics.',
    custom_poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=60',
    custom_backdrop: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1280&auto=format&fit=crop&q=70',
    vote_average: 7.6,
    match_score: 90,
    release_date: '2026-02-28',
    certification: 'PG-13',
    quality: '4K',
    genres: [{ id: 12, name: 'Adventure' }, { id: 878, name: 'Sci-Fi' }]
  },
  {
    id: 693134,
    title: 'Dune: Part Two',
    name: 'Dune: Part Two',
    media_type: 'movie',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s520Wio.jpg',
    vote_average: 8.3,
    match_score: 97,
    release_date: '2024-03-01',
    certification: 'PG-13',
    quality: '4K',
    genres: [{ id: 878, name: 'Sci-Fi' }, { id: 12, name: 'Adventure' }]
  },
  {
    id: 533535,
    title: 'Deadpool & Wolverine',
    name: 'Deadpool & Wolverine',
    media_type: 'movie',
    overview: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, he must suit up again.',
    poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop_path: '/yD39vY9Z8mY9U62C7F78rVwO3h9.jpg',
    vote_average: 7.8,
    match_score: 92,
    release_date: '2024-07-26',
    certification: '18+',
    quality: '4K',
    genres: [{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }, { id: 878, name: 'Sci-Fi' }]
  },
  {
    id: 933260,
    title: 'The Substance',
    name: 'The Substance',
    media_type: 'movie',
    overview: 'A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.',
    poster_path: '/lqoMzCcZYEFK729Fc6rwhHGNOzZ.jpg',
    backdrop_path: '/7h6r93ooEjGStIOahv9FEy62G59.jpg',
    vote_average: 7.3,
    match_score: 87,
    release_date: '2024-09-20',
    certification: '18+',
    quality: 'HD',
    genres: [{ id: 27, name: 'Horror' }, { id: 878, name: 'Sci-Fi' }]
  }
];

export const CURATED_TV = [
  {
    id: 94605,
    name: 'Arcane',
    title: 'Arcane',
    media_type: 'tv',
    overview: 'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and incompatible convictions.',
    poster_path: '/fqldf2t8ztc9aiwn39DbGQilnmM.jpg',
    backdrop_path: '/272p4nKqjD2z2mG1ZkL9nQ8b9z.jpg',
    vote_average: 8.8,
    match_score: 99,
    first_air_date: '2021-11-06',
    certification: '16+',
    quality: '4K',
    number_of_seasons: 2,
    genres: [{ id: 16, name: 'Animation' }, { id: 10765, name: 'Sci-Fi & Fantasy' }, { id: 28, name: 'Action' }]
  },
  {
    id: 106379,
    name: 'Fallout',
    title: 'Fallout',
    media_type: 'tv',
    overview: 'The story of haves and have-nots in a world in which there\'s almost nothing left to have. 200 years after the apocalypse, the gentle denizens of luxury fallout shelters are forced to return to the irradiated hellscape.',
    poster_path: '/ansAkg7tXJvG9h9rE4L1m3n8x5k.jpg',
    backdrop_path: '/h4i6G6E7L9oQ1Z4m3n8x5k.jpg',
    vote_average: 8.4,
    match_score: 94,
    first_air_date: '2024-04-10',
    certification: '18+',
    quality: '4K',
    number_of_seasons: 1,
    genres: [{ id: 10765, name: 'Sci-Fi & Fantasy' }, { id: 28, name: 'Action' }, { id: 18, name: 'Drama' }]
  },
  {
    id: 126308,
    name: 'Shōgun',
    title: 'Shōgun',
    media_type: 'tv',
    overview: 'In Japan in the year 1600, Lord Yoshii Toranaga discovers the secrets of a mysterious European ship marooned in a nearby fishing village.',
    poster_path: '/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
    backdrop_path: '/5zMw3kPq7F9z0vJ1E7L8M9oQ.jpg',
    vote_average: 8.6,
    match_score: 96,
    first_air_date: '2024-02-27',
    certification: '18+',
    quality: '4K',
    number_of_seasons: 1,
    genres: [{ id: 18, name: 'Drama' }, { id: 10768, name: 'War & Politics' }]
  },
  {
    id: 93405,
    name: 'Squid Game',
    title: 'Squid Game',
    media_type: 'tv',
    overview: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
    poster_path: '/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    backdrop_path: '/2meX1nMdScFOoV4370rqHWFDxZ9.jpg',
    vote_average: 7.9,
    match_score: 89,
    first_air_date: '2021-09-17',
    certification: '18+',
    quality: '4K',
    number_of_seasons: 2,
    genres: [{ id: 10759, name: 'Action & Adventure' }, { id: 9648, name: 'Mystery' }, { id: 18, name: 'Drama' }]
  },
  {
    id: 114472,
    name: 'Severance',
    title: 'Severance',
    media_type: 'tv',
    overview: 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.',
    poster_path: '/1x9zL8iFmJ9z0vJ1E7L8M9oQ.jpg',
    backdrop_path: '/4bL8iFmJ9z0vJ1E7L8M9oQ.jpg',
    vote_average: 8.5,
    match_score: 95,
    first_air_date: '2022-02-18',
    certification: '16+',
    quality: '4K',
    number_of_seasons: 2,
    genres: [{ id: 18, name: 'Drama' }, { id: 9648, name: 'Mystery' }, { id: 878, name: 'Sci-Fi' }]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// CURATED ANIME FALLBACK
// ─────────────────────────────────────────────────────────────────────────────
export const CURATED_ANIME = [
  {
    id: 31911,
    name: 'Fullmetal Alchemist: Brotherhood',
    title: 'Fullmetal Alchemist: Brotherhood',
    media_type: 'tv',
    overview: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes wrong, leaving them in damaged physical forms.',
    poster_path: '/1AaECmCfLY9F8FpazOBa1MwJUfY.jpg',
    backdrop_path: '/ypbmPMGw4xc0ouBMH6WuMVLjLn9.jpg',
    vote_average: 9.1,
    first_air_date: '2009-04-05',
    certification: '13+',
    quality: '4K',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }, { id: 18, name: 'Drama' }]
  },
  {
    id: 37854,
    name: 'One Piece',
    title: 'One Piece',
    media_type: 'tv',
    overview: 'Monkey D. Luffy sets sail on a journey to find the legendary One Piece treasure and become the Pirate King.',
    poster_path: '/e3NBGiAifW9Xt8xD5tpARskjccO.jpg',
    backdrop_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
    vote_average: 8.7,
    first_air_date: '1999-10-20',
    certification: '13+',
    quality: '4K',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }, { id: 35, name: 'Comedy' }]
  },
  {
    id: 46298,
    name: 'Attack on Titan',
    title: 'Attack on Titan',
    media_type: 'tv',
    overview: 'Humanity lives inside walled cities to protect themselves from Titans, gigantic humanoid beings who devour humans.',
    poster_path: '/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    backdrop_path: '/lUoBRBOsKJGp9x9HcW6cikC0SpK.jpg',
    vote_average: 8.9,
    first_air_date: '2013-04-07',
    certification: '18+',
    quality: '4K',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }, { id: 18, name: 'Drama' }]
  },
  {
    id: 85937,
    name: 'Demon Slayer: Kimetsu no Yaiba',
    title: 'Demon Slayer',
    media_type: 'tv',
    overview: 'A young man becomes a demon slayer after his family is slaughtered and his sister is transformed into a demon.',
    poster_path: '/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
    backdrop_path: '/tTOEMdK8a9HiyMC0s2sxYMcIaRr.jpg',
    vote_average: 8.7,
    first_air_date: '2019-04-06',
    certification: '16+',
    quality: '4K',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }, { id: 14, name: 'Fantasy' }]
  },
  {
    id: 95479,
    name: 'Jujutsu Kaisen',
    title: 'Jujutsu Kaisen',
    media_type: 'tv',
    overview: 'A high school student joins a secret organization to battle cursed spirits after he swallows a cursed talisman.',
    poster_path: '/jdzaI9iiHylHbIpMoAHZpPxA9lZ.jpg',
    backdrop_path: '/sRLC052ieEzkQLd2Rlm5n5v2LmL.jpg',
    vote_average: 8.7,
    first_air_date: '2020-10-03',
    certification: '18+',
    quality: '4K',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }, { id: 14, name: 'Fantasy' }]
  },
  {
    id: 129,
    name: 'Spirited Away',
    title: 'Spirited Away',
    media_type: 'movie',
    overview: 'A 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.',
    poster_path: '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    backdrop_path: '/bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg',
    vote_average: 8.5,
    release_date: '2001-07-20',
    certification: 'PG',
    quality: '4K',
    genres: [{ id: 16, name: 'Animation' }, { id: 12, name: 'Adventure' }, { id: 14, name: 'Fantasy' }]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// CURATED K-DRAMA FALLBACK
// ─────────────────────────────────────────────────────────────────────────────
export const CURATED_KDRAMA = [
  {
    id: 93405,
    name: 'Squid Game',
    title: 'Squid Game',
    media_type: 'tv',
    overview: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
    poster_path: '/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    backdrop_path: '/2meX1nMdScFOoV4370rqHWFDxZ9.jpg',
    vote_average: 7.9,
    first_air_date: '2021-09-17',
    certification: '18+',
    quality: '4K',
    genres: [{ id: 10759, name: 'Action & Adventure' }, { id: 9648, name: 'Mystery' }, { id: 18, name: 'Drama' }]
  },
  {
    id: 89140,
    name: 'Crash Landing on You',
    title: 'Crash Landing on You',
    media_type: 'tv',
    overview: 'A South Korean heiress accidentally crash-lands in North Korea and falls in love with an army officer who tries to protect her.',
    poster_path: '/3CCC1MdTWBZFbTuFqTHJLMXXPk5.jpg',
    backdrop_path: '/8zKhG65gDmqCWj9s3FDVJ8rNFJT.jpg',
    vote_average: 8.6,
    first_air_date: '2019-12-14',
    certification: '13+',
    quality: '4K',
    genres: [{ id: 18, name: 'Drama' }, { id: 10749, name: 'Romance' }]
  },
  {
    id: 70160,
    name: 'Kingdom',
    title: 'Kingdom',
    media_type: 'tv',
    overview: 'A crown prince investigates a mysterious plague that is turning people into zombies while uncovering a deadly conspiracy in feudal Korea.',
    poster_path: '/mX1zOeRBuYDrHlB5PFWuqL4QYOC.jpg',
    backdrop_path: '/8mZ6KXjKsJOHlHBjXmN5HkEj7S2.jpg',
    vote_average: 8.3,
    first_air_date: '2019-01-25',
    certification: '18+',
    quality: '4K',
    genres: [{ id: 18, name: 'Drama' }, { id: 27, name: 'Horror' }, { id: 10768, name: 'War & Politics' }]
  },
  {
    id: 44371,
    name: 'My Love from the Star',
    title: 'My Love from the Star',
    media_type: 'tv',
    overview: 'An alien who came to Earth 400 years ago falls in love with a top actress in modern-day South Korea.',
    poster_path: '/4MQ7BzxkdNxiFRKQrk1ZSnPEbkx.jpg',
    backdrop_path: '/5sJzMoEjLGQp7T0OGxaU9EyJGb4.jpg',
    vote_average: 8.5,
    first_air_date: '2013-12-18',
    certification: '13+',
    quality: 'HD',
    genres: [{ id: 18, name: 'Drama' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Sci-Fi' }]
  },
  {
    id: 496243,
    name: 'Parasite',
    title: 'Parasite',
    media_type: 'movie',
    overview: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    backdrop_path: '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
    vote_average: 8.5,
    release_date: '2019-05-30',
    certification: '18+',
    quality: '4K',
    genres: [{ id: 35, name: 'Comedy' }, { id: 53, name: 'Thriller' }, { id: 18, name: 'Drama' }]
  }
];

export const GENRES = [
  { id: 0, name: 'All' },
  { id: 'movie', name: 'Movies' },
  { id: 'tv', name: 'TV Series' },
  { id: '4k', name: '4K Ultra HD' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 10749, name: 'Romance' },
  { id: 9648, name: 'Mystery' }
];

const TMDB_LANG_MAP = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-BR',
  ru: 'ru-RU',
  hi: 'hi-IN',
  ja: 'ja-JP'
};

export const getActiveLanguage = () => {
  const current = localStorage.getItem('filmshark_lang') || 'en';
  return TMDB_LANG_MAP[current] || 'en-US';
};

// Generic safe TMDB fetch with fallback
export async function fetchFromTMDB(endpoint, params = {}) {
  const apiKey = getApiKey();
  const queryParams = new URLSearchParams({
    api_key: apiKey,
    language: getActiveLanguage(),
    ...params
  });

  try {
    const res = await fetch(`${BASE_URL}${endpoint}?${queryParams.toString()}`);
    if (!res.ok) {
      throw new Error(`TMDB HTTP error ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`TMDB fetch failed for ${endpoint}, using curated fallback:`, err.message);
    return null;
  }
}

// Format item with match score, year, quality badge
export function enrichItem(item, forcedType) {
  const mediaType = forcedType || item.media_type || (item.title ? 'movie' : 'tv');
  const releaseYear = (item.release_date || item.first_air_date || '2025').slice(0, 4);
  const rating = Number(item.vote_average || 7.5).toFixed(1);
  const match = item.match_score || Math.min(99, Math.max(78, Math.round(Number(rating) * 10 + Math.random() * 5)));
  
  return {
    ...item,
    id: item.id,
    title: item.title || item.name || 'Untitled',
    media_type: mediaType,
    year: releaseYear,
    rating: rating,
    match_score: match,
    certification: item.certification || (item.adult ? '18+' : 'PG-13'),
    quality: item.quality || (Math.random() > 0.3 ? '4K' : 'HD'),
    audio: item.audio || 'Spatial Audio',
    posterUrl: item.custom_poster || getImageUrl(item.poster_path, 'w342'),
    backdropUrl: item.custom_backdrop || getBackdropUrl(item.backdrop_path, 'w1280')
  };
}

// High level API methods
export async function getTrending(page = 1) {
  const data = await fetchFromTMDB('/trending/all/week', { page });
  if (data && data.results && data.results.length > 0) {
    const list = data.results.map(i => enrichItem(i));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = [...CURATED_MOVIES, ...CURATED_TV].map(i => enrichItem(i));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

export async function getTop10() {
  const data = await fetchFromTMDB('/trending/all/day');
  if (data && data.results && data.results.length >= 10) {
    return data.results.slice(0, 10).map((item, idx) => ({
      ...enrichItem(item),
      rank: idx + 1
    }));
  }
  return CURATED_MOVIES.slice(0, 10).map((item, idx) => ({
    ...enrichItem(item, 'movie'),
    rank: idx + 1
  }));
}

export async function getPopularMovies(page = 1) {
  const data = await fetchFromTMDB('/movie/popular', { page });
  if (data && data.results && data.results.length > 0) {
    const list = data.results.map(i => enrichItem(i, 'movie'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = CURATED_MOVIES.map(i => enrichItem(i, 'movie'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

export async function getPopularTV(page = 1) {
  const data = await fetchFromTMDB('/tv/popular', { page });
  if (data && data.results && data.results.length > 0) {
    const list = data.results.map(i => enrichItem(i, 'tv'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = CURATED_TV.map(i => enrichItem(i, 'tv'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

export async function getNewReleases(page = 1) {
  const data = await fetchFromTMDB('/movie/now_playing', { page });
  if (data && data.results && data.results.length > 0) {
    const list = data.results.map(i => enrichItem(i, 'movie'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = CURATED_MOVIES.slice().reverse().map(i => enrichItem(i, 'movie'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

export async function getMoviesByGenre(genreId, page = 1) {
  if (genreId === 'movie') return getPopularMovies(page);
  if (genreId === 'tv') return getPopularTV(page);
  if (genreId === '4k' || genreId === 0) return getTrending(page);

  const data = await fetchFromTMDB('/discover/movie', { with_genres: genreId, sort_by: 'popularity.desc', page });
  if (data && data.results && data.results.length > 0) {
    const list = data.results.map(i => enrichItem(i, 'movie'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = CURATED_MOVIES.filter(m => m.genres?.some(g => g.id === Number(genreId))).map(i => enrichItem(i, 'movie'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

export async function getTVByGenre(genreId, page = 1) {
  if (genreId === 'tv') return getPopularTV(page);
  if (genreId === 'movie') return getPopularMovies(page);
  if (genreId === '4k' || genreId === 0) return getTrending(page);

  const data = await fetchFromTMDB('/discover/tv', { with_genres: genreId, sort_by: 'popularity.desc', page });
  if (data && data.results && data.results.length > 0) {
    const list = data.results.map(i => enrichItem(i, 'tv'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = CURATED_TV.filter(s => s.genres?.some(g => g.id === Number(genreId))).map(i => enrichItem(i, 'tv'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

export async function searchContent(query, page = 1) {
  if (!query || !query.trim()) return [];
  const data = await fetchFromTMDB('/search/multi', { query: query.trim(), page });
  if (data && data.results && data.results.length > 0) {
    const list = data.results
      .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
      .map(i => enrichItem(i));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const q = query.toLowerCase();
  const allCurated = [...CURATED_MOVIES, ...CURATED_TV];
  const fallback = allCurated
    .filter(item => (item.title || item.name || '').toLowerCase().includes(q) || (item.overview || '').toLowerCase().includes(q))
    .map(i => enrichItem(i));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

export async function getItemDetails(type, id) {
  const data = await fetchFromTMDB(`/${type}/${id}`, { append_to_response: 'credits,videos,similar' });
  if (data) {
    return {
      ...enrichItem(data, type),
      cast: data.credits?.cast?.slice(0, 10) || [],
      trailer: data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key || null,
      similar: data.similar?.results?.slice(0, 10).map(i => enrichItem(i, type)) || []
    };
  }

  // Look up in curated
  const list = type === 'tv' ? CURATED_TV : CURATED_MOVIES;
  const found = list.find(m => String(m.id) === String(id)) || list[0];
  return {
    ...enrichItem(found, type),
    cast: [
      { id: 1, name: 'Alex Sterling', character: 'Lead Role', profile_path: null },
      { id: 2, name: 'Elena Rostova', character: 'Co-Star', profile_path: null },
      { id: 3, name: 'Marcus Vance', character: 'Antagonist', profile_path: null },
      { id: 4, name: 'Sarah Lin', character: 'Special Agent', profile_path: null }
    ],
    trailer: 'dQw4w9WgXcQ',
    similar: list.filter(m => String(m.id) !== String(id)).slice(0, 6).map(i => enrichItem(i, type))
  };
}
