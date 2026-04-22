import { useState, useEffect } from 'react';

interface NavProps {
  activePage?: 'home' | 'blog';
}

export default function Nav({ activePage }: NavProps) {
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

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="/" className="nav-logo">Cécile Arnoux</a>
        <ul className="nav-links">
          <li><a href="/#about">À propos</a></li>
          <li><a href="/#consultations">Consultations</a></li>
          <li><a href="/#avis">Avis</a></li>
          <li><a href="/blog/" className={activePage === 'blog' ? 'active' : ''}>Blog</a></li>
          <li><a href="/#contact" className="nav-cta">Prendre RDV</a></li>
        </ul>
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
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} onClick={close}>
        <div className="mobile-menu-inner" onClick={e => e.stopPropagation()}>
          <button className="mobile-close" onClick={close} aria-label="Fermer">✕</button>
          <ul>
            <li><a href="/#about" onClick={close}>À propos</a></li>
            <li><a href="/#consultations" onClick={close}>Consultations</a></li>
            <li><a href="/#avis" onClick={close}>Avis</a></li>
            <li><a href="/blog/" onClick={close}>Blog</a></li>
            <li><a href="/#contact" onClick={close} className="mobile-cta">Prendre RDV</a></li>
          </ul>
        </div>
      </div>

      <style>{`
        .hamburger {
          display: none; flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none; cursor: pointer; padding: 4px;
        }
        .bar {
          display: block; width: 24px; height: 2px;
          background: var(--text-dark); border-radius: 2px;
          transition: all 0.3s;
        }
        .bar.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .bar.open:nth-child(2) { opacity: 0; }
        .bar.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          display: none; position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.5); opacity: 0;
          transition: opacity 0.3s;
        }
        .mobile-menu.open { opacity: 1; }
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
          color: white; text-align: center;
          border-radius: 50px; padding: 14px 24px;
        }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }
      `}</style>
    </>
  );
}
