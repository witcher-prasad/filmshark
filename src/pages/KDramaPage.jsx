import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MovieCard from '../components/MovieCard';
import PaginationControls from '../components/PaginationControls';
import { GridSkeleton } from '../components/Skeletons';
import {
  getKDramaSeries,
  getKoreanMovies,
  getTopRatedKDrama,
} from '../services/anime';

const TABS = [
  { id: 'series', labelKey: 'kdrama.tabSeries' },
  { id: 'movies', labelKey: 'kdrama.tabMovies' },
  { id: 'toprated', labelKey: 'kdrama.tabTopRated' },
];

const fetchFns = {
  series: getKDramaSeries,
  movies: getKoreanMovies,
  toprated: getTopRatedKDrama,
};

export default function KDramaPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('series');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(50);

  useEffect(() => {
    document.title = 'Watch Free Korean Dramas Online - K-Drama HD | FilmShark';
    return () => {
      document.title = 'FilmShark - Watch Free HD Movies & TV Shows Online (No Sign-Up)';
    };
  }, []);

  const loadTab = useCallback(async (tab, pg = 1) => {
    setLoading(true);
    setPage(1);
    try {
      const data = await fetchFns[tab](pg);
      setItems(data);
      if (data.totalPages) setTotalPages(Math.min(data.totalPages, 500));
    } catch (err) {
      console.error('KDramaPage load error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTab(activeTab, 1);
  }, [activeTab, i18n.language, loadTab]);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  const handleLoadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const nextData = await fetchFns[activeTab](nextPage);
      if (nextData?.length > 0) {
        setItems((prev) => {
          const seen = new Set(prev.map((m) => m.id));
          const unique = nextData.filter((m) => !seen.has(m.id));
          return [...prev, ...unique];
        });
        setPage(nextPage);
        if (nextData.totalPages) setTotalPages(Math.min(nextData.totalPages, 500));
      }
    } catch (err) {
      console.error('KDramaPage load more error:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage === page || newPage < 1 || newPage > totalPages || loadingMore) return;
    setLoading(true);
    try {
      const pageData = await fetchFns[activeTab](newPage);
      setItems(pageData);
      setPage(newPage);
      if (pageData.totalPages) setTotalPages(Math.min(pageData.totalPages, 500));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('KDramaPage page change error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '2rem' }}>🇰🇷</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>
            {t('kdrama.pageTitle')}
          </h1>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          {t('kdrama.pageDesc')}
        </p>
      </div>

      {/* Tab Bar */}
      <div className="content-tab-bar" role="tablist" aria-label="K-Drama content tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`content-tab-btn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ marginTop: '1.5rem' }}>
          <GridSkeleton count={18} />
        </div>
      ) : (
        <>
          <div className="catalog-grid">
            {items.map((item) => (
              <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
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
