import { useState, useEffect } from 'react';

interface NavProps {
  activePage?: 'home' | 'blog';
  lang?: 'fr' | 'en';
}

const frToEn: Record<string, string> = {
  '/': '/en/',
  '/blog/': '/en/blog/',
  '/mentions-legales/': '/en/legal/',
  '/blog/mal-de-dos/': '/en/blog/back-pain/',
  '/blog/nourrisson/': '/en/blog/infant/',
  '/blog/grossesse/': '/en/blog/pregnancy/',
  '/blog/sportif/': '/en/blog/sports/',
  '/blog/osteopathe-vendome/': '/en/blog/osteopath-vendome/',
};

const enToFr: Record<string, string> = Object.fromEntries(
  Object.entries(frToEn).map(([fr, en]) => [en, fr])
);
export default function Nav({ activePage, lang = 'fr' }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setMenuOpen(false);

  const switchTo = (target: 'fr' | 'en') => {
    if (target === lang) return;
    const path = window.location.pathname;
    const normalised = path.endsWith('/') ? path : path + '/';
    if (target === 'en') {
      window.location.href = frToEn[normalised] ?? '/en/';
    } else {
      window.location.href = enToFr[normalised] ?? '/';
    }
  };

  const base = lang === 'en' ? '/en' : '';
  const blogHref = lang === 'en' ? '/en/blog/' : '/blog/';

  const t = lang === 'en'
    ? { about: 'About', consult: 'Consultations', reviews: 'Reviews', firstVisit: 'First visit', rdv: 'Book Appointment' }
    : { about: 'À propos', consult: 'Consultations', reviews: 'Avis', firstVisit: 'Première visite', rdv: 'Prendre RDV' };

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href={base + '/'} className="nav-logo">Cécile Arnoux</a>
        <ul className="nav-links">
          <li><a href={base + '/#about'}>{t.about}</a></li>
          <li><a href={base + '/#consultations'}>{t.consult}</a></li>
          <li><a href={base + '/#avis'}>{t.reviews}</a></li>
          <li><a href={blogHref} className={activePage === 'blog' ? 'active' : ''}>Blog</a></li>
          <li><a href={base + '/#contact'} className="nav-cta">{t.rdv}</a></li>
        </ul>
        <div className="nav-right">
          <div className="lang-switcher" role="group" aria-label="Language">
            <button
              className={`lang-btn${lang === 'fr' ? ' active' : ''}`}
              onClick={() => switchTo('fr')}
              aria-pressed={lang === 'fr'}
              aria-label="Français"
            >FR</button>
            <button
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => switchTo('en')}
              aria-pressed={lang === 'en'}
              aria-label="English"
            >EN</button>
          </div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} onClick={close}>
        <div className="mobile-menu-inner" onClick={e => e.stopPropagation()}>
          <button className="mobile-close" onClick={close} aria-label={lang === 'en' ? 'Close' : 'Fermer'}>✕</button>
          <ul>
            <li><a href={base + '/#about'} onClick={close}>{t.about}</a></li>
            <li><a href={base + '/#consultations'} onClick={close}>{t.consult}</a></li>
            <li><a href={base + '/#avis'} onClick={close}>{t.reviews}</a></li>
            <li><a href={blogHref} onClick={close}>Blog</a></li>
            <li><a href="tel:0254670326" onClick={close} className="mobile-cta">{t.rdv}</a></li>
          </ul>
          <div className="lang-switcher-mobile" role="group" aria-label="Language">
            <button
              className={`lang-btn-mobile${lang === 'fr' ? ' active' : ''}`}
              onClick={() => { close(); switchTo('fr'); }}
              aria-pressed={lang === 'fr'}
            >Français</button>
            <button
              className={`lang-btn-mobile${lang === 'en' ? ' active' : ''}`}
              onClick={() => { close(); switchTo('en'); }}
              aria-pressed={lang === 'en'}
            >English</button>
          </div>
        </div>
      </div>

      <style>{`
        .nav-right {
          display: flex; align-items: center; gap: 12px;
        }
        .lang-switcher {
          display: flex; border: 1.5px solid rgba(122,158,126,0.35);
          border-radius: 50px; overflow: hidden; flex-shrink: 0;
        }
        .lang-btn {
          background: none; border: none; cursor: pointer;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          padding: 6px 13px; font-family: inherit; color: var(--sage-dark);
          transition: background 0.2s, color 0.2s;
          line-height: 1;
        }
        .lang-btn.active {
          background: var(--sage); color: white; cursor: default;
        }
        .lang-btn:not(.active):hover {
          background: rgba(122,158,126,0.12);
        }
        .lang-switcher-mobile {
          margin-top: 20px; display: flex; gap: 8px;
        }
        .lang-btn-mobile {
          flex: 1; padding: 12px 8px; border-radius: 50px; font-family: inherit;
          font-size: 13px; font-weight: 600; cursor: pointer;
          background: rgba(122,158,126,0.08);
          border: 1.5px solid rgba(122,158,126,0.25);
          color: var(--sage-dark); transition: all 0.2s;
        }
        .lang-btn-mobile.active {
          background: var(--sage); color: white;
          border-color: var(--sage); cursor: default;
        }
        .lang-btn-mobile:not(.active):hover {
          background: rgba(122,158,126,0.15);
        }
        .hamburger {
          display: none; flex-direction: column; justify-content: center; align-items: center;
          gap: 5px; background: none; border: none; cursor: pointer;
          width: 44px; height: 44px; padding: 10px;
          position: relative; z-index: 250; touch-action: manipulation;
        }
        .bar {
          display: block; width: 22px; height: 2px;
          background: var(--text-dark); border-radius: 2px;
          transition: all 0.3s; flex-shrink: 0;
        }
        .bar.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .bar.open:nth-child(2) { opacity: 0; }
        .bar.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          display: none; position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.5); opacity: 0; visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
        }
        .mobile-menu.open { opacity: 1; visibility: visible; }
        .mobile-menu-inner {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: min(320px, 85vw);
          background: var(--warm-white); padding: 80px 32px 40px;
          display: flex; flex-direction: column; gap: 8px;
          overflow-y: auto;
        }
        .mobile-close {
          position: absolute; top: 20px; right: 20px;
          background: none; border: none; font-size: 20px;
          cursor: pointer; color: var(--text-dark);
        }
        .mobile-menu-inner ul { list-style: none; }
        .mobile-menu-inner ul li { border-bottom: 1px solid var(--border); }
        .mobile-menu-inner ul li a {
          display: block; padding: 16px 0;
          font-size: 17px; color: var(--text-dark); text-decoration: none;
        }
        .mobile-cta {
          margin-top: 8px; background: var(--sage);
          color: white !important; text-align: center;
          border-radius: 50px; padding: 14px 24px;
        }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .lang-switcher { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }
      `}</style>
    </>
  );
}
