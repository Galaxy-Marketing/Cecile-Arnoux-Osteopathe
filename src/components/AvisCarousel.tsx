import { useEffect, useRef, useState } from 'react';

const avis = [
  { name: "Mika Do", stars: 5, text: "Suite a des probl\u00e8me digestif j\u2019ai \u00e9t\u00e9 voir cette \u00e9thiopathe et depuis c\u2019est redevenu comme avant ..merci \u00e0 vous \ud83d\ude0a\ud83d\ude0a\ud83d\ude0a" },
  { name: "Marie France Leproust", stars: 5, text: "Tr\u00e8s bon ost\u00e9opathe \u00e9thiopathe \u00e0 l\u2019\u00e9coute de ses patients. Salle d\u2019attente reposante, musique relaxante." },
  { name: "Cyril Brosse", stars: 5, text: "En ce qui me concerne 1 s\u00e9ance pour un mal de dos qui me tenait depuis 1 mois." },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function AvisCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 900);
  }, []);

  // Desktop: auto-scroll infinite loop
  useEffect(() => {
    if (isMobile) return;
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    let pos = 0;
    const speed = 0.3;
    const step = () => {
      pos -= speed;
      const half = track.scrollWidth / 2;
      if (Math.abs(pos) >= half) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  const repeated = [...avis, ...avis, ...avis, ...avis, ...avis, ...avis];

  return (
    <div className="avis-outer">
      {/* Desktop carousel */}
      <div className="avis-track-wrap desktop-only">
        <div ref={trackRef} className="avis-track">
          {repeated.map((a, i) => (
            <div key={i} className="avis-card">
              <Stars n={a.stars} />
              <p className="avis-text">{a.text}</p>
              <div className="avis-name">{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile snap scroll */}
      <div className="avis-mobile mobile-only">
        <div className="avis-mobile-track">
          {avis.map((a, i) => (
            <div key={i} className="avis-card mobile-card">
              <Stars n={a.stars} />
              <p className="avis-text">{a.text}</p>
              <div className="avis-name">{a.name}</div>
            </div>
          ))}
        </div>
        <div className="avis-dots">
          {avis.map((_, i) => (
            <button
              key={i}
              className={`dot ${active === i ? 'active' : ''}`}
              onClick={() => {
                setActive(i);
                const track = document.querySelector('.avis-mobile-track') as HTMLElement | null;
                if (track && track.clientWidth > 0) track.scrollLeft = i * (track.clientWidth + 16);
              }}
              aria-label={`Avis ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .avis-outer { overflow: hidden; }
        .avis-track-wrap { overflow: hidden; }
        .avis-track {
          display: flex; gap: 20px; width: max-content;
          will-change: transform;
        }
        .avis-card {
          background: var(--warm-white); border: 1px solid var(--border);
          border-radius: 16px; padding: 28px;
          width: 420px; flex-shrink: 0;
        }
        .avis-text {
          font-size: 14px; color: var(--text-mid); line-height: 1.7;
          margin: 12px 0 16px; font-style: normal;
        }
        .avis-name { font-size: 13px; font-weight: 600; color: var(--sage-dark); }
        .desktop-only { display: block; }
        .mobile-only { display: none; }
        .avis-mobile-track {
          display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory;
          scrollbar-width: none; padding: 0 20px;
        }
        .avis-mobile-track::-webkit-scrollbar { display: none; }
        .mobile-card {
          scroll-snap-align: start; min-width: calc(85vw); width: calc(85vw);
        }
        .avis-dots {
          display: flex; gap: 8px; justify-content: center; margin-top: 20px;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--border); border: none; cursor: pointer; padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .dot.active { background: var(--sage); transform: scale(1.3); }
        @media (max-width: 900px) {
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }
      `}</style>
    </div>
  );
}
