// Anime & Asian Content Service: powered by TMDB discover APIs
// Uses TMDB keyword IDs and origin-country filters; no additional API key needed.
import { fetchFromTMDB, enrichItem, getActiveLanguage, CURATED_ANIME, CURATED_KDRAMA } from './tmdb';

// ─────────────────────────────────────────────────────────────────────────────
// ANIME KEYWORD / GENRE CONSTANTS (TMDB-native IDs)
// ─────────────────────────────────────────────────────────────────────────────
const ANIME_KEYWORD_ID   = 210024; // "anime" keyword on TMDB
const ANIMATION_GENRE_ID = 16;     // Animation genre

// ─────────────────────────────────────────────────────────────────────────────
// ANIME TV SERIES
// ─────────────────────────────────────────────────────────────────────────────
export async function getAnimeSeries(page = 1) {
  const data = await fetchFromTMDB('/discover/tv', {
    with_keywords: ANIME_KEYWORD_ID,
    with_original_language: 'ja',
    sort_by: 'popularity.desc',
    page,
  });
  if (data?.results?.length > 0) {
    const list = data.results.map((i) => enrichItem(i, 'tv'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = (CURATED_ANIME || []).map((i) => enrichItem(i, 'tv'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIME MOVIES
// ─────────────────────────────────────────────────────────────────────────────
export async function getAnimeMovies(page = 1) {
  const data = await fetchFromTMDB('/discover/movie', {
    with_keywords: ANIME_KEYWORD_ID,
    with_original_language: 'ja',
    sort_by: 'popularity.desc',
    page,
  });
  if (data?.results?.length > 0) {
    const list = data.results.map((i) => enrichItem(i, 'movie'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = (CURATED_ANIME || []).map((i) => enrichItem(i, 'movie'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// TRENDING ANIME (weekly, both movie+tv)
// ─────────────────────────────────────────────────────────────────────────────
export async function getTrendingAnime(page = 1) {
  // TMDB trending doesn't support keyword filter: use animated Japanese TV as proxy
  const data = await fetchFromTMDB('/discover/tv', {
    with_keywords: ANIME_KEYWORD_ID,
    with_original_language: 'ja',
    sort_by: 'vote_count.desc',
    'vote_count.gte': 1000,
    page,
  });
  if (data?.results?.length > 0) {
    const list = data.results.map((i) => enrichItem(i, 'tv'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    return list;
  }
  const fallback = (CURATED_ANIME || []).map((i) => enrichItem(i, 'tv'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP-RATED ANIME
// ─────────────────────────────────────────────────────────────────────────────
export async function getTopRatedAnime(page = 1) {
  const data = await fetchFromTMDB('/discover/tv', {
    with_keywords: ANIME_KEYWORD_ID,
    with_original_language: 'ja',
    sort_by: 'vote_average.desc',
    'vote_count.gte': 200,
    page,
  });
  if (data?.results?.length > 0) {
    const list = data.results.map((i) => enrichItem(i, 'tv'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    return list;
  }
  const fallback = (CURATED_ANIME || []).map((i) => enrichItem(i, 'tv'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// KOREAN DRAMAS (K-Drama TV)
// ─────────────────────────────────────────────────────────────────────────────
export async function getKDramaSeries(page = 1) {
  const data = await fetchFromTMDB('/discover/tv', {
    with_origin_country: 'KR',
    sort_by: 'popularity.desc',
    page,
  });
  if (data?.results?.length > 0) {
    const list = data.results.map((i) => enrichItem(i, 'tv'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = (CURATED_KDRAMA || []).map((i) => enrichItem(i, 'tv'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// KOREAN MOVIES
// ─────────────────────────────────────────────────────────────────────────────
export async function getKoreanMovies(page = 1) {
  const data = await fetchFromTMDB('/discover/movie', {
    with_origin_country: 'KR',
    sort_by: 'popularity.desc',
    page,
  });
  if (data?.results?.length > 0) {
    const list = data.results.map((i) => enrichItem(i, 'movie'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    list.totalResults = data.total_results || list.length;
    return list;
  }
  const fallback = (CURATED_KDRAMA || []).map((i) => enrichItem(i, 'movie'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP-RATED K-DRAMAS
// ─────────────────────────────────────────────────────────────────────────────
export async function getTopRatedKDrama(page = 1) {
  const data = await fetchFromTMDB('/discover/tv', {
    with_origin_country: 'KR',
    sort_by: 'vote_average.desc',
    'vote_count.gte': 200,
    page,
  });
  if (data?.results?.length > 0) {
    const list = data.results.map((i) => enrichItem(i, 'tv'));
    list.page = data.page || page;
    list.totalPages = data.total_pages || 1;
    return list;
  }
  const fallback = (CURATED_KDRAMA || []).map((i) => enrichItem(i, 'tv'));
  fallback.page = 1;
  fallback.totalPages = 1;
  return fallback;
}
