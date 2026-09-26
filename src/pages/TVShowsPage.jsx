import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GenreFilterBar from '../components/GenreFilterBar';
import MovieCard from '../components/MovieCard';
import PaginationControls from '../components/PaginationControls';
import { GridSkeleton } from '../components/Skeletons';
import { getTVByGenre } from '../services/tmdb';

export default function TVShowsPage() {
  const { t, i18n } = useTranslation();
  const [tvShows, setTvShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('tv');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(50);

  useEffect(() => {
    document.title = 'Watch Free TV Shows & Series Online - Full Episodes | FilmShark';
    return () => {
      document.title = 'FilmShark - Watch Free HD Movies & TV Shows Online (No Sign-Up)';
    };
  }, []);

  useEffect(() => {
    async function loadTV() {
      setLoading(true);
      setPage(1);
      try {
        const data = await getTVByGenre(selectedGenre, 1);
        setTvShows(data);
        if (data.totalPages) {
          setTotalPages(Math.min(data.totalPages, 500));
        }
      } catch (err) {
        console.error('Failed to load TV shows:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTV();
  }, [selectedGenre, i18n.language]);

  const handleSelectGenre = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleLoadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const nextData = await getTVByGenre(selectedGenre, nextPage);
      if (nextData && nextData.length > 0) {
        setTvShows((prev) => {
          const seen = new Set(prev.map((s) => s.id));
          const unique = nextData.filter((s) => !seen.has(s.id));
          return [...prev, ...unique];
        });
        setPage(nextPage);
        if (nextData.totalPages) {
          setTotalPages(Math.min(nextData.totalPages, 500));
        }
      }
    } catch (err) {
      console.error('Failed to load more TV shows:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage === page || newPage < 1 || newPage > totalPages || loadingMore) return;
    setLoading(true);
    try {
      const pageData = await getTVByGenre(selectedGenre, newPage);
      setTvShows(pageData);
      setPage(newPage);
      if (pageData.totalPages) {
        setTotalPages(Math.min(pageData.totalPages, 500));
      }
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to jump to TV page:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.4rem' }}>
          {t('sections.exploreTV')}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          {t('sections.exploreTVDesc')}
        </p>
      </div>

      <GenreFilterBar 
        selectedGenre={selectedGenre} 
        onSelectGenre={handleSelectGenre} 
      />

      {loading ? (
        <div style={{ marginTop: '1.5rem' }}>
          <GridSkeleton count={18} />
        </div>
      ) : (
        <>
          <div className="catalog-grid">
            {tvShows.map((show) => (
              <MovieCard key={show.id} item={show} />
            ))}
          </div>

          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            currentCount={tvShows.length}
            loadingMore={loadingMore}
            hasMore={page < totalPages}
            onLoadMore={handleLoadMore}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
