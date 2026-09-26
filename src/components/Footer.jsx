import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Heart, X, Scale, FileText, Lock, Mail } from 'lucide-react';

import { SITE_CONFIG } from '../config/siteConfig';

export default function Footer() {
  const { t } = useTranslation();
  const [legalModal, setLegalModal] = useState(null); // 'dmca' | 'terms' | 'privacy' | 'contact' | null
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Broken Stream', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.message.trim()) return;
    
    // Construct mailto for direct client email or simulated dispatch
    const mailto = `mailto:${SITE_CONFIG.supportEmail}?subject=[${contactForm.subject}] from ${encodeURIComponent(contactForm.name || 'User')}&body=${encodeURIComponent(contactForm.message + '\n\nSender Email: ' + contactForm.email)}`;
    window.open(mailto, '_blank');

    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setLegalModal(null);
      setContactForm({ name: '', email: '', subject: 'Broken Stream', message: '' });
    }, 2500);
  };

  const renderModalContent = () => {
    switch (legalModal) {
      case 'dmca':
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: '#65FFBB' }}>
              <Scale size={24} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>DMCA & Copyright Compliance</h2>
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <p>
                <strong>{SITE_CONFIG.name}</strong> operates exclusively as a content discovery and media indexing catalog. We comply with the Digital Millennium Copyright Act (17 U.S.C. § 512) and applicable copyright regulations.
              </p>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #65FFBB' }}>
                <p style={{ margin: 0, fontWeight: 600, color: '#f8fafc' }}>
                  Notice of Non-Hosting:
                </p>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.88rem', color: '#94a3b8' }}>
                  {SITE_CONFIG.name} does not upload, store, host, encode, or maintain any video files or media streams on its servers or databases. All video playback accessible through this site is delivered through independent, publicly accessible third-party media platforms.
                </p>
              </div>
              <p>
                If you are a copyright owner or an authorized agent and believe that content hosted on third-party servers infringes upon your copyright, please contact the hosting service directly for the fastest removal.
              </p>
              <p>
                To submit an indexing takedown notice to our team, please provide:
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: 0, color: '#94a3b8', fontSize: '0.88rem' }}>
                <li>Specific URL(s) of the page to be de-indexed.</li>
                <li>Identification and proof of copyrighted work owned.</li>
                <li>Your contact information (name, email, telephone).</li>
                <li>A statement made in good faith that the notification is accurate.</li>
              </ul>
              <div style={{ background: 'rgba(101, 255, 187, 0.06)', border: '1px solid rgba(101, 255, 187, 0.2)', padding: '0.75rem 1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1' }}>
                  Direct DMCA notices to: <a href={`mailto:${SITE_CONFIG.dmcaEmail}`} style={{ color: '#65FFBB', fontWeight: 700, textDecoration: 'underline' }}>{SITE_CONFIG.dmcaEmail}</a>
                </p>
              </div>
            </div>
          </>
        );

      case 'terms':
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: '#65FFBB' }}>
              <FileText size={24} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Terms of Service</h2>
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <p>
                By accessing or using <strong>{SITE_CONFIG.name}</strong>, you agree to comply with these terms.
              </p>
              <p>
                <strong>1. Informational & Indexing Purpose:</strong> All catalog descriptions, metadata, posters, and media listings are indexed for personal reference and entertainment discovery.
              </p>
              <p>
                <strong>2. Third-Party Services:</strong> We link to external content providers. We do not endorse, control, or assume liability for third-party websites, players, or services.
              </p>
              <p>
                <strong>3. User Conduct:</strong> You agree not to perform security penetration tests, scraping, or automated abuse against the website.
              </p>
            </div>
          </>
        );

      case 'privacy':
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: '#65FFBB' }}>
              <Lock size={24} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Privacy Policy</h2>
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <p>
                Your privacy is respected. {SITE_CONFIG.name} operates with zero account registration:
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: 0, color: '#94a3b8', fontSize: '0.88rem' }}>
                <li>No account registration: No email, phone number, or password required to browse.</li>
                <li>No payment data: We do not process credit cards, payments, or subscriptions.</li>
                <li>Local storage: Your watchlist and language preferences stay securely in your own browser.</li>
              </ul>
              <p style={{ marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.88rem' }}>
                We recommend using modern browsers such as Brave or Firefox with privacy protections enabled.
              </p>
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: '#65FFBB' }}>
              <Mail size={24} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Contact & Support</h2>
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <p>
                Report a broken player, request missing metadata, or reach our support team:
              </p>

              {contactSubmitted ? (
                <div style={{ background: 'rgba(101, 255, 187, 0.15)', border: '1px solid #65FFBB', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
                  <p style={{ color: '#65FFBB', fontWeight: 800, fontSize: '1.1rem', margin: '0 0 0.5rem' }}>
                    Message Prepared!
                  </p>
                  <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.9rem' }}>
                    Your email client will open to send to <strong>{SITE_CONFIG.supportEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0.55rem 0.75rem', color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="name@email.com"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0.55rem 0.75rem', color: '#fff' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                      Subject
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      style={{ width: '100%', background: '#0e1622', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0.55rem 0.75rem', color: '#fff' }}
                    >
                      <option value="Broken Stream">Broken Stream / Video Issue</option>
                      <option value="Missing Subtitles">Subtitles Not Syncing</option>
                      <option value="Catalog Request">Title Request</option>
                      <option value="DMCA & Copyright">DMCA or Legal Inquiry</option>
                      <option value="Other Support">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                      Message Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe the issue, include movie or series title..."
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0.55rem 0.75rem', color: '#fff', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="player-nav-btn next-highlight"
                    style={{ marginTop: '0.5rem', justifyContent: 'center' }}
                  >
                    <span>Send Message to Support</span>
                  </button>
                </form>
              )}

              <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#64748b' }}>
                Direct email: <span style={{ color: '#65FFBB' }}>{SITE_CONFIG.supportEmail}</span>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Col */}
        <div className="footer-brand">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img src="/Logo.svg" alt="FilmShark" width={150} height={42} style={{ height: '42px', width: 'auto' }} />
          </Link>
          <p>
            {t('footer.tagline')}
          </p>
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
            <ShieldCheck size={16} color="#65FFBB" />
            <span>{t('footer.sslBadge')}</span>
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="footer-col">
          <h4>{t('footer.navHeading')}</h4>
          <ul>
            <li><Link to="/" className="footer-link">{t('nav.home')}</Link></li>
            <li><Link to="/movies" className="footer-link">{t('nav.movies')}</Link></li>
            <li><Link to="/tv" className="footer-link">{t('nav.tvShows')}</Link></li>
            <li><Link to="/trending" className="footer-link">{t('nav.trending')}</Link></li>
            <li><Link to="/top10" className="footer-link">{t('nav.top10')}</Link></li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="footer-col">
          <h4>{t('footer.genresHeading')}</h4>
          <ul>
            <li><Link to="/movies?genre=28" className="footer-link">Action</Link></li>
            <li><Link to="/movies?genre=35" className="footer-link">Comedy</Link></li>
            <li><Link to="/movies?genre=878" className="footer-link">Sci-Fi & Fantasy</Link></li>
            <li><Link to="/movies?genre=27" className="footer-link">Horror</Link></li>
            <li><Link to="/movies?genre=53" className="footer-link">Thriller</Link></li>
          </ul>
        </div>

        {/* Links Col 3 */}
        <div className="footer-col">
          <h4>{t('footer.legalHeading')}</h4>
          <ul>
            <li><Link to="/faqs" className="footer-link">{t('nav.faqs')}</Link></li>
            <li>
              <button
                type="button"
                onClick={() => setLegalModal('dmca')}
                className="footer-link"
              >
                {t('footer.dmca')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="footer-link"
              >
                {t('footer.terms')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="footer-link"
              >
                {t('footer.privacy')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setLegalModal('contact')}
                className="footer-link"
              >
                {t('footer.contact')}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <div className="footer-bottom">
        <p>
          {t('footer.disclaimer')}
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span>© {new Date().getFullYear()} FilmShark. {t('footer.poweredWith')}</span>
          <Heart size={13} fill="#65FFBB" stroke="#65FFBB" />
          <span>{t('footer.forLovers')}</span>
        </p>
      </div>

      {/* ── Professional Legal Modal ────────────────────────────── */}
      {legalModal && (
        <div
          className="search-modal-backdrop"
          onClick={() => setLegalModal(null)}
          style={{ zIndex: 1200 }}
        >
          <div
            className="search-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: '2rem' }}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setLegalModal(null)}
              aria-label="Close modal"
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}
            >
              <X size={18} />
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </footer>
  );
}
