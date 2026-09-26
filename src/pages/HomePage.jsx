import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroBanner from '../components/HeroBanner';
import GenreFilterBar from '../components/GenreFilterBar';
import TopTenRow from '../components/TopTenRow';
import ContentRow from '../components/ContentRow';
import PropellerAdsZone from '../components/PropellerAdsZone';
import { HeroSkeleton, RowSkeleton } from '../components/Skeletons';
import {
  getTrending,
  getTop10,
  getPopularTV,
  getNewReleases,
  getMoviesByGenre
} from '../services/tmdb';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [heroItems, setHeroItems] = useState([]);
  const [top10Items, setTop10Items] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [genreFilteredItems, setGenreFilteredItems] = useState([]);
  const [heroReady, setHeroReady] = useState(false);
  const [rowsReady, setRowsReady] = useState(false);

  useEffect(() => {
    setHeroReady(false);
    setRowsReady(false);

    getTrending().then(trending => {
      setHeroItems(trending.slice(0, 5));
      setTrendingItems(trending);
      setHeroReady(true);
    }).catch(err => {
      console.error('Failed to load trending:', err);
      setHeroReady(true);
    });

    Promise.all([
      getTop10(),
      getPopularTV(),
      getNewReleases()
    ]).then(([top10, tv, newRel]) => {
      setTop10Items(top10);
      setPopularTV(tv);
      setNewReleases(newRel);
      setRowsReady(true);
    }).catch(err => {
      console.error('Failed to load rows:', err);
      setRowsReady(true);
    });
  }, [i18n.language]);

  const handleSelectGenre = async (genreId) => {
    setSelectedGenre(genreId);
    if (genreId === 0) {
      setGenreFilteredItems([]);
      return;
    }
    const filtered = await getMoviesByGenre(genreId);
    setGenreFilteredItems(filtered);
  };

  return (
    <div>
      {heroReady && heroItems.length > 0 ? (
        <HeroBanner items={heroItems} />
      ) : (
        <HeroSkeleton />
      )}

      <div className="container-fluid">
        <GenreFilterBar
          selectedGenre={selectedGenre}
          onSelectGenre={handleSelectGenre}
        />

        {selectedGenre !== 0 && genreFilteredItems.length > 0 && (
          <ContentRow
            title={`${t('sections.selectedGenre')} (${genreFilteredItems.length})`}
            items={genreFilteredItems}
          />
        )}

        {rowsReady ? (
          <>
            <TopTenRow items={top10Items} title={t('sections.top10Today')} />
            <ContentRow title={t('sections.trendingNow')} items={trendingItems} />

            {/* Monetag Banner Ad — between rows, minimal disruption */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0 1rem' }}>
              <PropellerAdsZone zoneId="11900789" size="rectangle" />
            </div>

            <ContentRow title={t('sections.newReleases')} items={newReleases} />
            <ContentRow title={t('sections.popularTV')} items={popularTV} />
          </>
        ) : (
          <>
            <RowSkeleton titleWidth={260} />
            <RowSkeleton titleWidth={220} />
            <RowSkeleton titleWidth={280} />
          </>
        )}
      </div>
    </div>
  );
}
