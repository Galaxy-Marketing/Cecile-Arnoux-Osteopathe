import { useEffect, useRef, useState } from 'react';

const avisFR = [
  { name: "Mika D.", stars: 5, text: "Suite a des probl\u00e8me digestif j'ai \u00e9t\u00e9 voir cette ost\u00e9opathe et depuis c'est redevenu comme avant ..merci \u00e0 vous \ud83d\ude0a\ud83d\ude0a\ud83d\ude0a" },
  { name: "Marie France L.", stars: 5, text: "Tr\u00e8s bon ost\u00e9opathe \u00e0 l'\u00e9coute de ses patients. Salle d'attente reposante, musique relaxante." },
  { name: "Cyril B.", stars: 5, text: "En ce qui me concerne 1 s\u00e9ance pour un mal de dos qui me tenait depuis 1 mois." },
  { name: "Lina B.", stars: 5, text: "Je recommande vivement mon ost\u00e9opathe, que je consulte depuis toute petite. Que ce soit pour des entorses, des douleurs musculaires ou autres, elle a toujours su me soulager avec beaucoup de professionnalisme et de douceur. Elle prend le temps d\u2019\u00e9couter, d\u2019expliquer et d\u2019adapter les s\u00e9ances selon les besoins. On se sent tout de suite en confiance. J\u2019ai souvent r\u00e9cup\u00e9r\u00e9 plus rapidement et ressenti du mieux apr\u00e8s chaque consultation. Une praticienne comp\u00e9tente, attentive et humaine que je recommande les yeux ferm\u00e9s." },
  { name: "Alexandra L.", stars: 5, text: "Mme Arnoux me suit depuis plusieurs ann\u00e9es, tr\u00e8s bonne professionnelle, rassurante et \u00e0 l\u2019\u00e9coute. Je recommande vivement." },
  { name: "Sylvie L.", stars: 5, text: "Depuis des ann\u00e9es je suis suivie ainsi que mes enfants par C\u00e9cile. C\u2019est une excellente professionnelle. Je la recommande r\u00e9guli\u00e8rement." },
];

const avisEN = [
  { name: "Mika D.", stars: 5, text: "After experiencing digestive problems, I visited this osteopath and things have been back to normal since... Thank you so much! \ud83d\ude0a" },
  { name: "Marie France L.", stars: 5, text: "Excellent osteopath, very attentive to her patients. Relaxing waiting room with soothing music." },
  { name: "Cyril B.", stars: 5, text: "In my case, just one session resolved a back pain that had been with me for over a month." },
  { name: "Lina B.", stars: 5, text: "I warmly recommend my osteopath, whom I have been consulting since I was very young. Whether for sprains, muscle pain or other issues, she has always relieved me with great professionalism and gentleness. She takes the time to listen, explain and adapt each session to your needs. You immediately feel at ease. I have often recovered more quickly and felt better after every consultation. A skilled, attentive and caring practitioner I recommend without hesitation." },
  { name: "Alexandra L.", stars: 5, text: "Mme Arnoux has been following me for several years. A very good professional, reassuring and attentive. I highly recommend her." },
  { name: "Sylvie L.", stars: 5, text: "For years, my children and I have been cared for by C\u00e9cile. She is an excellent professional. I recommend her regularly." },
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

export default function AvisCarousel({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const avis = lang === 'en' ? avisEN : avisFR;
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
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

  // Mobile: update active dot on scroll
  useEffect(() => {
    if (!isMobile) return;
    const track = mobileTrackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = track.clientWidth;
      const idx = Math.round(track.scrollLeft / (cardWidth + 16));
      setActive(Math.min(Math.max(idx, 0), avis.length - 1));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  const repeated = [...avis, ...avis, ...avis, ...avis, ...avis, ...avis];

  return (
    <div className="avis-outer">
      {/* Desktop carousel */}
      <div className="avis-track-wrap desktop-only">
        <div ref={trackRef} className="avis-track">
          {repeated.map((a, i) => (
            <div key={i} className={`avis-card${a.name === 'Lina B.' ? ' avis-card-wide' : ''}`}>
              <Stars n={a.stars} />
              <p className="avis-text">{a.text}</p>
              <div className="avis-name">{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile snap scroll */}
      <div className="avis-mobile mobile-only">
        <div ref={mobileTrackRef} className="avis-mobile-track">
          {avis.map((a, i) => (
            <div key={i} className={`avis-card mobile-card${a.name === 'Lina B.' ? ' avis-card-wide' : ''}`}>
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
                const track = mobileTrackRef.current;
                if (track && track.clientWidth > 0) {
                  track.scrollTo({ left: i * (track.clientWidth + 16), behavior: 'smooth' });
                }
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
        .avis-card-wide { width: 620px; }
        @media (max-width: 900px) {
          .avis-card-wide { width: calc(85vw); }
          .avis-card-wide .avis-text {
            display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;
          }
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
          display: flex; gap: 0; justify-content: center; margin-top: 16px;
        }
        .dot {
          width: 44px; height: 44px; border-radius: 50%;
          background: transparent; border: none; cursor: pointer; padding: 0;
          position: relative;
        }
        .dot::after {
          content: ''; position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--border);
          transition: background 0.3s, transform 0.3s;
        }
        .dot.active::after { background: var(--sage); transform: translate(-50%, -50%) scale(1.3); }
        @media (max-width: 900px) {
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }
      `}</style>
    </div>
  );
}
