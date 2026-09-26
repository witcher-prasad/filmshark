import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import MobileBottomNav from './components/MobileBottomNav';
import InstallAppModal from './components/InstallAppModal';

import HomePage from './pages/HomePage';

const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const TVShowsPage = lazy(() => import('./pages/TVShowsPage'));
const TrendingPage = lazy(() => import('./pages/TrendingPage'));
const TopTenPage = lazy(() => import('./pages/TopTenPage'));
const WatchPage = lazy(() => import('./pages/WatchPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const FAQsPage = lazy(() => import('./pages/FAQsPage'));
const AnimePage = lazy(() => import('./pages/AnimePage'));
const KDramaPage = lazy(() => import('./pages/KDramaPage'));

export default function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);

  // Global keyboard shortcut listener: Cmd+K / Ctrl+K and /
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
        return;
      }
      // Slash (/) when not inside an active input or textarea
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setSearchModalOpen(true);
        return;
      }
      // Escape closes modal
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top FilmShark Navigation */}
        <Navbar 
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenInstall={() => setInstallModalOpen(true)}
        />

        {/* Main Content Area */}
        <main style={{ flex: 1 }}>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/tv" element={<TVShowsPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/top10" element={<TopTenPage />} />
              <Route path="/watch/:type/:id" element={<WatchPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/anime" element={<AnimePage />} />
              <Route path="/kdrama" element={<KDramaPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

        {/* Native App-Style Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenInstall={() => setInstallModalOpen(true)}
        />

        {/* Quick Search Spotlight Modal */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />

        {/* Progressive Web App Install Modal */}
        <InstallAppModal
          isOpen={installModalOpen}
          onClose={() => setInstallModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
