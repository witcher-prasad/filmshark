import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MovieCard from '../components/MovieCard';
import PaginationControls from '../components/PaginationControls';
import { GridSkeleton } from '../components/Skeletons';
import { getTrending } from '../services/tmdb';
import { Flame } from 'lucide-react';

export default function TrendingPage() {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(50);

  useEffect(() => {
    document.title = 'Trending Movies & TV Shows Today | FilmShark';
    return () => {
      document.title = 'FilmShark - Watch Free HD Movies & TV Shows Online (No Sign-Up)';
    };
  }, []);

  useEffect(() => {
    async function loadTrending() {
      setLoading(true);
      setPage(1);
      try {
        const data = await getTrending(1);
        setItems(data);
        if (data.totalPages) {
          setTotalPages(Math.min(data.totalPages, 500));
        }
      } catch (err) {
        console.error('Failed to load trending content:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTrending();
  }, [i18n.language]);

  const handleLoadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const nextData = await getTrending(nextPage);
      if (nextData && nextData.length > 0) {
        setItems((prev) => {
          const seen = new Set(prev.map((i) => `${i.media_type}-${i.id}`));
          const unique = nextData.filter((i) => !seen.has(`${i.media_type}-${i.id}`));
          return [...prev, ...unique];
        });
        setPage(nextPage);
        if (nextData.totalPages) {
          setTotalPages(Math.min(nextData.totalPages, 500));
        }
      }
    } catch (err) {
      console.error('Failed to load more trending:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage === page || newPage < 1 || newPage > totalPages || loadingMore) return;
    setLoading(true);
    try {
      const pageData = await getTrending(newPage);
      setItems(pageData);
      setPage(newPage);
      if (pageData.totalPages) {
        setTotalPages(Math.min(pageData.totalPages, 500));
      }
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to jump to trending page:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Flame size={28} color="#65FFBB" />
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>{t('sections.trendingNow')}</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            {t('sections.trendingDesc')}
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ marginTop: '1.5rem' }}>
          <GridSkeleton count={18} />
        </div>
      ) : (
        <>
          <div className="catalog-grid">
            {items.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
            ))}
          </div>

          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            currentCount={items.length}
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
