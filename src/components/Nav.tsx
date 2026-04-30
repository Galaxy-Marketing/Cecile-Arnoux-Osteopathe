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

  const handleLangSwitch = () => {
    const path = window.location.pathname;
    const normalised = path.endsWith('/') ? path : path + '/';
    if (lang === 'fr') {
      window.location.href = frToEn[normalised] ?? '/en/';
    } else {
      window.location.href = enToFr[normalised] ?? '/';
    }
  };

  const base = lang === 'en' ? '/en' : '';
  const blogHref = lang === 'en' ? '/en/blog/' : '/blog/';

  const t = lang === 'en'
    ? { about: 'About', consult: 'Consultations', reviews: 'Reviews', rdv: 'Book Appointment' }
    : { about: 'À propos', consult: 'Consultations', reviews: 'Avis', rdv: 'Prendre RDV' };

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
          <button className="lang-switch" onClick={handleLangSwitch} aria-label="Switch language">
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
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
          <button className="mobile-close" onClick={close} aria-label="Fermer">✕</button>
          <ul>
            <li><a href={base + '/#about'} onClick={close}>{t.about}</a></li>
            <li><a href={base + '/#consultations'} onClick={close}>{t.consult}</a></li>
            <li><a href={base + '/#avis'} onClick={close}>{t.reviews}</a></li>
            <li><a href={blogHref} onClick={close}>Blog</a></li>
            <li><a href={`tel:0254670326`} onClick={close} className="mobile-cta">{t.rdv}</a></li>
          </ul>
          <button className="lang-switch-mobile" onClick={handleLangSwitch}>
            {lang === 'fr' ? '🌐 English' : '🌐 Français'}
          </button>
        </div>
      </div>

      <style>{`
        .nav-right {
          display: flex; align-items: center; gap: 8px;
        }
        .lang-switch {
          background: rgba(122,158,126,0.12); border: 1px solid rgba(122,158,126,0.3);
          color: var(--sage-dark); font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; padding: 6px 14px; border-radius: 50px;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
          font-family: inherit;
        }
        .lang-switch:hover { background: var(--sage); color: white; border-color: var(--sage); }
        .lang-switch-mobile {
          margin-top: 20px; background: rgba(122,158,126,0.1);
          border: 1px solid rgba(122,158,126,0.3); color: var(--sage-dark);
          font-size: 14px; padding: 12px 20px; border-radius: 50px;
          cursor: pointer; width: 100%; font-family: inherit; transition: all 0.2s;
        }
        .lang-switch-mobile:hover { background: var(--sage); color: white; }
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
          background: rgba(0,0,0,0.5); opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
        }
        .mobile-menu.open { opacity: 1; visibility: visible; }
        .mobile-menu-inner {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: min(320px, 85vw);
          background: var(--warm-white); padding: 80px 32px 40px;
          display: flex; flex-direction: column; gap: 8px;
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
          .lang-switch { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }
      `}</style>
    </>
  );
}
