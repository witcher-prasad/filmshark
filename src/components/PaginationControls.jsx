import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function PaginationControls({
  currentPage = 1,
  totalPages = 1,
  currentCount = 0,
  loadingMore = false,
  hasMore = true,
  onLoadMore,
  onPageChange
}) {
  const { t } = useTranslation();

  // Helper to generate a window of visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-wrapper" style={{ margin: '2.5rem 0 4rem' }}>
      {/* Primary Load More Button */}
      {hasMore && onLoadMore && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
          <button
            type="button"
            className="load-more-btn"
            onClick={onLoadMore}
            disabled={loadingMore}
            aria-label="Load more titles"
          >
            {loadingMore ? (
              <>
                <Loader2 size={18} className="spin-animation" />
                <span>{t('pagination.loadingMore')}</span>
              </>
            ) : (
              <>
                <ChevronDown size={18} />
                <span>{t('pagination.loadMore')}</span>
              </>
            )}
          </button>

          <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            {t('pagination.showingCount', { count: currentCount })}{' '}
            {totalPages > 1 && (
              <span style={{ color: '#64748b' }}>
                • {t('pagination.pageOf', { page: currentPage, total: totalPages })}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Discrete Pagination Navigation Bar */}
      {totalPages > 1 && onPageChange && (
        <nav
          className="pagination-nav"
          aria-label="Catalog pagination navigation"
        >
          {/* Previous Page */}
          <button
            type="button"
            className="pagination-arrow-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1 || loadingMore}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
            <span className="pagination-arrow-text">{t('pagination.prev')}</span>
          </button>

          {/* First page jump if far away */}
          {pageNumbers[0] > 1 && (
            <>
              <button
                type="button"
                className={`pagination-number-btn ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => onPageChange(1)}
              >
                1
              </button>
              {pageNumbers[0] > 2 && <span className="pagination-dots">…</span>}
            </>
          )}

          {/* Dynamic Page Number Pills */}
          {pageNumbers.map((p) => (
            <button
              key={p}
              type="button"
              className={`pagination-number-btn ${currentPage === p ? 'active' : ''}`}
              onClick={() => onPageChange(p)}
              disabled={loadingMore}
              aria-current={currentPage === p ? 'page' : undefined}
            >
              {p}
            </button>
          ))}

          {/* Last page jump if far away */}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="pagination-dots">…</span>
              )}
              <button
                type="button"
                className={`pagination-number-btn ${currentPage === totalPages ? 'active' : ''}`}
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages > 500 ? 500 : totalPages}
              </button>
            </>
          )}

          {/* Next Page */}
          <button
            type="button"
            className="pagination-arrow-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || loadingMore}
            aria-label="Next page"
          >
            <span className="pagination-arrow-text">{t('pagination.next')}</span>
            <ChevronRight size={16} />
          </button>
        </nav>
      )}

      {/* Reached End Indicator */}
      {!hasMore && currentCount > 0 && (
        <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', padding: '1rem' }}>
          ✓ {t('pagination.allLoaded')}
        </div>
      )}
    </div>
  );
}
