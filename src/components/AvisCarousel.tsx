import { useEffect, useRef, useState } from 'react';

const avis = [
  { name: "Sophie M.", stars: 5, text: "Cécile est une ostéopathe exceptionnelle. Elle a soulagé mes douleurs lombaires en deux séances là où d\u2019autres avaient échoué pendant des mois. Je recommande vivement." },
  { name: "Thomas B.", stars: 5, text: "Prise en charge rapide et très professionnelle. Mon bébé souffrait de coliques depuis la naissance — après une séance, le changement a été spectaculaire. Merci infiniment !" },
  { name: "Marie-Claire D.", stars: 5, text: "Consultation très complète. Cécile prend le temps d\u2019écouter et d\u2019expliquer chaque geste. Ma sciatique a considérablement diminué dès la première séance." },
  { name: "Laurent P.", stars: 5, text: "Sportif de haut niveau, je vois Cécile en préventif chaque saison. Grâce à elle, je n\u2019ai pas eu de blessure sérieuse depuis deux ans. Indispensable." },
  { name: "Nathalie R.", stars: 5, text: "Ostéopathe sérieuse et bienveillante. Elle a pris en charge mes douleurs pendant la grossesse avec des techniques très douces et rassurantes." },
  { name: "Alexandre V.", stars: 5, text: "Cabinet propre et agréable, rendez-vous facile à obtenir. Cécile a réglé mon lumbago en une séance. Je la recommande sans hésiter à tout mon entourage." },
  { name: "Isabelle F.", stars: 5, text: "J\u2019ai consulté pour des migraines chroniques. Après trois séances, leur fréquence a nettement diminué. Je n\u2019aurais pas cru que l\u2019ostéopathie puisse autant aider." },
  { name: "Nicolas G.", stars: 5, text: "Très bonne expérience. Cécile est à l\u2019écoute, précise dans son diagnostic et ses explications sont claires. Mes cervicales ne m\u2019ont plus autant gêné depuis." },
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
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  // Desktop: auto-scroll infinite loop
  useEffect(() => {
    if (isMobile) return;
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    let pos = 0;
    const speed = 0.5;
    const step = () => {
      pos -= speed;
      const half = track.scrollWidth / 2;
      if (Math.abs(pos) >= half) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const doubled = [...avis, ...avis];

  return (
    <div className="avis-outer">
      {/* Desktop carousel */}
      <div className="avis-track-wrap desktop-only">
        <div ref={trackRef} className="avis-track">
          {doubled.map((a, i) => (
            <div key={i} className="avis-card">
              <Stars n={a.stars} />
              <p className="avis-text">"{a.text}"</p>
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
              <p className="avis-text">"{a.text}"</p>
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
                const track = document.querySelector('.avis-mobile-track');
                if (track) (track as HTMLElement).scrollLeft = i * (track.clientWidth + 16);
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
          width: 300px; flex-shrink: 0;
        }
        .avis-text {
          font-size: 14px; color: var(--text-mid); line-height: 1.7;
          margin: 12px 0 16px; font-style: italic;
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
