import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MovieCard from '../components/MovieCard';
import PaginationControls from '../components/PaginationControls';
import { GridSkeleton } from '../components/Skeletons';
import { searchContent } from '../services/tmdb';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [prevQuery, setPrevQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  if (prevQuery !== query) {
    setPrevQuery(query);
    setInputValue(query);
  }

  useEffect(() => {
    async function doSearch() {
      if (!query.trim()) {
        setResults([]);
        setPage(1);
        setTotalPages(1);
        setTotalResults(0);
        return;
      }
      setLoading(true);
      setPage(1);
      try {
        const data = await searchContent(query, 1);
        setResults(data);
        if (data.totalPages) {
          setTotalPages(Math.min(data.totalPages, 500));
        }
        setTotalResults(data.totalResults || data.length);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }
    doSearch();
  }, [query, i18n.language]);

  // Dynamic SEO title for search queries
  useEffect(() => {
    document.title = query
      ? `Search results for "${query.slice(0, 40)}" - FilmShark`
      : 'Search Movies & TV Series Online Free - FilmShark';
    return () => {
      document.title = 'FilmShark - Watch Free HD Movies & TV Shows Online (No Sign-Up)';
    };
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = inputValue.trim().slice(0, 80);
    if (clean) {
      setSearchParams({ q: clean });
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const nextData = await searchContent(query, nextPage);
      if (nextData && nextData.length > 0) {
        setResults((prev) => {
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
      console.error('Failed to load more search results:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage === page || newPage < 1 || newPage > totalPages || loadingMore) return;
    setLoading(true);
    try {
      const pageData = await searchContent(query, newPage);
      setResults(pageData);
      setPage(newPage);
      if (pageData.totalPages) {
        setTotalPages(Math.min(pageData.totalPages, 500));
      }
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to jump search page:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto 2.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, textAlign: 'center', marginBottom: '1.25rem' }}>
          {t('search.title')}
        </h1>

        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('search.placeholder')}
            style={{
              width: '100%',
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '9999px',
              padding: '0.85rem 1.25rem 0.85rem 3rem',
              fontSize: '1rem',
              color: '#fff',
              outline: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
            }}
          />
        </form>
      </div>

      {query && (
        <div style={{ marginBottom: '1.5rem', color: '#94a3b8' }}>
          {(totalResults || results.length) === 1 
            ? t('search.foundResults', { count: totalResults || results.length }) 
            : t('search.foundResultsPlural', { count: totalResults || results.length })} <strong style={{ color: '#fff' }}>"{query}"</strong>:
        </div>
      )}

      {loading ? (
        <GridSkeleton count={12} />
      ) : results.length > 0 ? (
        <>
          <div className="catalog-grid">
            {results.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
            ))}
          </div>

          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            currentCount={results.length}
            loadingMore={loadingMore}
            hasMore={page < totalPages}
            onLoadMore={handleLoadMore}
            onPageChange={handlePageChange}
          />
        </>
      ) : query ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748b' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>{t('search.noResults')}</p>
          <p style={{ fontSize: '0.9rem' }}>{t('search.noResultsDesc')}</p>
        </div>
      ) : null}
    </div>
  );
}
