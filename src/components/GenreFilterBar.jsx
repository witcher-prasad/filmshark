import React from 'react';
import { useTranslation } from 'react-i18next';
import { GENRES } from '../services/tmdb';

const GENRE_I18N = {
  0: { en: 'All', es: 'Todos', fr: 'Tous', de: 'Alle', it: 'Tutti', pt: 'Todos', ru: 'Все', hi: 'सभी', ja: 'すべて' },
  movie: { en: 'Movies', es: 'Películas', fr: 'Films', de: 'Filme', it: 'Film', pt: 'Filmes', ru: 'Фильмы', hi: 'फ़िल्में', ja: '映画' },
  tv: { en: 'TV Series', es: 'Series TV', fr: 'Séries', de: 'Serien', it: 'Serie TV', pt: 'Séries', ru: 'Сериалы', hi: 'टीवी शो', ja: 'テレビ番組' },
  '4k': { en: '4K Ultra HD', es: '4K Ultra HD', fr: '4K Ultra HD', de: '4K Ultra HD', it: '4K Ultra HD', pt: '4K Ultra HD', ru: '4K Ultra HD', hi: '4K अल्ट्रा HD', ja: '4KウルトラHD' },
  28: { en: 'Action', es: 'Acción', fr: 'Action', de: 'Action', it: 'Azione', pt: 'Ação', ru: 'Боевик', hi: 'एक्शन', ja: 'アクション' },
  12: { en: 'Adventure', es: 'Aventura', fr: 'Aventure', de: 'Abenteuer', it: 'Avventura', pt: 'Aventura', ru: 'Приключения', hi: 'रोमांच', ja: 'アドベンチャー' },
  16: { en: 'Animation', es: 'Animación', fr: 'Animation', de: 'Animation', it: 'Animazione', pt: 'Animação', ru: 'Мультфильм', hi: 'एनिमेशन', ja: 'アニメーション' },
  35: { en: 'Comedy', es: 'Comedia', fr: 'Comédie', de: 'Komödie', it: 'Commedia', pt: 'Comédia', ru: 'Комедия', hi: 'कॉमेडी', ja: 'コメディ' },
  80: { en: 'Crime', es: 'Crimen', fr: 'Crime', de: 'Krimi', it: 'Crime', pt: 'Crime', ru: 'Криминал', hi: 'क्राइम', ja: 'クライム' },
  18: { en: 'Drama', es: 'Drama', fr: 'Drame', de: 'Drama', it: 'Dramma', pt: 'Drama', ru: 'Драма', hi: 'ड्रामा', ja: 'ドラマ' },
  27: { en: 'Horror', es: 'Terror', fr: 'Horreur', de: 'Horror', it: 'Horror', pt: 'Terror', ru: 'Ужасы', hi: 'हॉरर', ja: 'ホラー' },
  878: { en: 'Sci-Fi', es: 'Ciencia Ficción', fr: 'Science-Fiction', de: 'Sci-Fi', it: 'Fantascienza', pt: 'Ficção Científica', ru: 'Фантастика', hi: 'साइंस फिक्शन', ja: 'SF' },
  53: { en: 'Thriller', es: 'Suspense', fr: 'Thriller', de: 'Thriller', it: 'Thriller', pt: 'Suspense', ru: 'Триллер', hi: 'थ्रिलर', ja: 'スリラー' },
  10749: { en: 'Romance', es: 'Romance', fr: 'Romance', de: 'Romanze', it: 'Romantico', pt: 'Romance', ru: 'Мелодрама', hi: 'रोमांस', ja: 'ロマンス' },
  9648: { en: 'Mystery', es: 'Misterio', fr: 'Mystère', de: 'Mystery', it: 'Mistero', pt: 'Mistério', ru: 'Детектив', hi: 'रहस्य', ja: 'ミステリー' }
};

export default function GenreFilterBar({ selectedGenre, onSelectGenre }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const getGenreName = (genre) => {
    const translations = GENRE_I18N[genre.id];
    if (translations) {
      return translations[currentLang] || translations.en || genre.name;
    }
    return genre.name;
  };

  return (
    <div className="filter-bar" role="toolbar" aria-label="Genre filters">
      {GENRES.map((genre) => (
        <button
          key={genre.id}
          type="button"
          className={`filter-pill ${selectedGenre === genre.id ? 'active' : ''}`}
          onClick={() => onSelectGenre(genre.id)}
        >
          {getGenreName(genre)}
        </button>
      ))}
    </div>
  );
}
