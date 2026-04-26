import { useState, useEffect, useRef } from 'react';

function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function StatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const exp = useCounter(24, 1600, visible);
  const satis = useCounter(98, 1400, visible);

  return (
    <div ref={ref} className="stats-bar">
      <div className="stat-item">
        <div className="stat-number">{exp}+</div>
        <div className="stat-label">ans d'expérience</div>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <div className="stat-number">{satis}%</div>
        <div className="stat-label">patients satisfaits</div>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <div className="stat-stars-row">
          {[1,2,3,4].map(i => (
            <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ))}
          <svg width="28" height="28" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#FBBF24"/>
                <stop offset="50%" stopColor="rgba(255,255,255,0.25)"/>
              </linearGradient>
            </defs>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half)"/>
          </svg>
        </div>
        <div className="stat-label" style={{marginTop:'6px'}}>Avis Google</div>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <div className="stat-icon-wrap">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="stat-label" style={{marginTop:'8px'}}>Approche personnalisée</div>
      </div>
      <style>{`
        .stats-bar {
          background: var(--sage-dark); padding: 48px 80px;
          display: flex; justify-content: center; align-items: center; gap: 0;
        }
        .stat-item { text-align: center; flex: 1; max-width: 260px; }
        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 42px; font-weight: 700; color: white;
          line-height: 1; margin-bottom: 8px;
          display: flex; align-items: center; justify-content: center; gap: 4px;
        }
        .stat-icon-wrap {
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0;
        }
        .stat-stars-row {
          display: flex; align-items: center; justify-content: center; gap: 2px;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 12px; color: rgba(255,255,255,0.6);
          text-transform: uppercase; letter-spacing: 0.08em;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-divider {
          width: 1px; height: 56px;
          background: rgba(255,255,255,0.15); margin: 0 40px; flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .stats-bar { padding: 28px 20px; gap: 0; flex-wrap: wrap; }
          .stat-item { min-width: 45%; margin-bottom: 24px; }
          .stat-divider { display: none; }
        }
        @media (max-width: 480px) {
          .stat-number { font-size: 30px; }
          .stat-item { min-width: 48%; }
        }
      `}</style>
    </div>
  );
}
