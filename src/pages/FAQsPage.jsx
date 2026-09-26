import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

import { SITE_CONFIG } from '../config/siteConfig';

const FAQS_BY_LANG = {
  en: [
    {
      q: "What is FilmShark?",
      a: "FilmShark is a free online catalog for discovering and streaming movies and TV shows directly in your browser. You can browse trending titles, latest releases, and classic films with subtitles on any device."
    },
    {
      q: "Is FilmShark really free?",
      a: "Yes, completely free. There are no subscriptions, memberships, or fees. You never need to enter any payment or card information."
    },
    {
      q: "Do I need to create an account or sign up?",
      a: "No registration is required. You can start watching any title immediately with one click. We never ask for an email, password, or verification code."
    },
    {
      q: "How can I avoid popups and ads while watching?",
      a: "For the cleanest streaming experience, we recommend using Brave Browser or installing a trusted adblock extension such as uBlock Origin on Chrome or Firefox."
    },
    {
      q: "What should I do if a stream is buffering or not playing?",
      a: "We provide multiple fast streaming servers. If one server is slow or under heavy load, click another server button directly above the video player to switch instantly."
    },
    {
      q: "Can I watch on my mobile phone, tablet, or TV?",
      a: "Yes. FilmShark works in any modern web browser across iPhone, iPad, Android, laptops, and Smart TVs without installing additional apps."
    },
    {
      q: "How often is new content added to the catalog?",
      a: "New movie releases and latest TV episodes are indexed continuously as soon as they become available online."
    },
    {
      q: "How do I report a broken title or submit feedback?",
      a: `If a stream is broken or you need assistance, please contact our support team at ${SITE_CONFIG.supportEmail} and include the title name.`
    }
  ],
  es: [
    {
      q: "¿Qué es FilmShark?",
      a: "FilmShark es una plataforma gratuita para descubrir y ver películas y series directamente en tu navegador en calidad HD con subtítulos."
    },
    {
      q: "¿FilmShark es completamente gratuito?",
      a: "Sí, 100% gratis. No hay suscripciones, membresías ni tarifas ocultas."
    },
    {
      q: "¿Necesito registrarme o crear una cuenta?",
      a: "No necesitas registrarte. Haz clic en cualquier título para reproducirlo de inmediato."
    },
    {
      q: "¿Cómo puedo evitar anuncios emergentes?",
      a: "Recomendamos utilizar Brave Browser o la extensión uBlock Origin para una reproducción limpia y sin interrupciones."
    },
    {
      q: "¿Qué hago si una transmisión se congela o no carga?",
      a: "Cambia a otro servidor usando los botones situados sobre el reproductor de video."
    },
    {
      q: "¿Puedo ver contenido en mi teléfono o Smart TV?",
      a: "Sí. Funciona perfectamente en navegadores de iOS, Android, computadoras y televisores inteligentes sin instalar aplicaciones."
    },
    {
      q: "¿Con qué frecuencia se actualiza el catálogo?",
      a: "El catálogo se actualiza a diario con los últimos estrenos cinematográficos y episodios de series."
    }
  ],
  fr: [
    {
      q: "Qu'est-ce que FilmShark ?",
      a: "FilmShark est une plateforme gratuite permettant de regarder des films et séries en streaming directement dans votre navigateur en qualité HD."
    },
    {
      q: "FilmShark est-il vraiment gratuit ?",
      a: "Oui, totalement gratuit, sans inscription ni coordonnées bancaires nécessaires."
    },
    {
      q: "Faut-il créer un compte pour regarder ?",
      a: "Aucune inscription requise. Cliquez simplement sur un film ou un épisode pour lancer la lecture."
    },
    {
      q: "Comment bloquer les publicités ?",
      a: "Nous recommandons d'utiliser le navigateur Brave ou l'extension uBlock Origin pour une expérience fluide."
    },
    {
      q: "Que faire en cas de lenteur ou de coupure ?",
      a: "Basculez simplement vers un autre serveur grâce aux boutons situés au-dessus du lecteur."
    },
    {
      q: "Puis-je regarder sur smartphone ou Smart TV ?",
      a: "Oui, FilmShark fonctionne sur tous les appareils modernes via votre navigateur habituel."
    },
    {
      q: "À quelle fréquence les nouveautés sont-elles ajoutées ?",
      a: "Le catalogue est mis à jour quotidiennement dès la sortie des nouveaux films et épisodes."
    }
  ]
};

export default function FAQsPage() {
  const { i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const currentLang = i18n.language || 'en';
  const faqs = FAQS_BY_LANG[currentLang] || FAQS_BY_LANG.en;

  const titles = {
    en: { title: "Frequently Asked Questions", subtitle: "Everything you need to know about streaming on FilmShark." },
    es: { title: "Preguntas Frecuentes", subtitle: "Todo lo que necesitas saber sobre el streaming en FilmShark." },
    fr: { title: "Foire Aux Questions", subtitle: "Tout ce que vous devez savoir sur le streaming sur FilmShark." },
    de: { title: "Häufig gestellte Fragen", subtitle: "Alles, was Sie über das Streaming auf FilmShark wissen müssen." },
    it: { title: "Domande Frequenti", subtitle: "Tutto quello che c'è da sapere sullo streaming su FilmShark." },
    pt: { title: "Perguntas Frequentes", subtitle: "Tudo o que você precisa saber sobre streaming no FilmShark." },
    ru: { title: "Часто задаваемые вопросы", subtitle: "Всё, что вам нужно знать о просмотре фильмов на FilmShark." },
    hi: { title: "अक्सर पूछे जाने वाले प्रश्न", subtitle: "FilmShark पर स्ट्रीमिंग के बारे में सब कुछ जानें।" },
    ja: { title: "よくあるご質問 (FAQ)", subtitle: "FilmSharkでのストリーミングについて知っておくべきすべての情報。" }
  };

  const pageInfo = titles[currentLang] || titles.en;

  return (
    <div className="container-fluid" style={{ paddingTop: '2rem', maxWidth: '880px', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(101, 255, 187, 0.15)',
          border: '1px solid rgba(101, 255, 187, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          color: '#65FFBB'
        }}>
          <HelpCircle size={28} />
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          {pageInfo.title}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
          {pageInfo.subtitle}
        </p>
      </div>

      <div style={{ paddingBottom: '4rem' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="faq-item">
              <button 
                type="button" 
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp size={20} color="#65FFBB" /> : <ChevronDown size={20} color="#94a3b8" />}
              </button>
              {isOpen && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
