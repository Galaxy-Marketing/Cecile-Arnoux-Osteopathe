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
  const patients = useCounter(2000, 1800, visible);
  const satis = useCounter(98, 1400, visible);

  return (
    <div ref={ref} className="stats-bar">
      <div className="stat-item">
        <div className="stat-number">{exp}+</div>
        <div className="stat-label">ans d'expérience</div>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <div className="stat-number">{patients.toLocaleString('fr-FR')}+</div>
        <div className="stat-label">patients accompagnés</div>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <div className="stat-number">{satis}%</div>
        <div className="stat-label">patients satisfaits</div>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <div className="stat-number stars">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          4,5
        </div>
        <div className="stat-label">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-label="Google" style={{marginRight:'4px',verticalAlign:'middle'}}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Avis Google
        </div>
      </div>
      <style>{`
        .stats-bar {
          background: var(--sage-dark); padding: 36px 60px;
          display: flex; justify-content: center; align-items: center; gap: 0;
        }
        .stat-item { text-align: center; flex: 1; max-width: 200px; }
        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 36px; font-weight: 700; color: white;
          line-height: 1; margin-bottom: 6px;
          display: flex; align-items: center; justify-content: center; gap: 4px;
        }
        .stat-label {
          font-size: 12px; color: rgba(255,255,255,0.6);
          text-transform: uppercase; letter-spacing: 0.08em;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-divider {
          width: 1px; height: 48px;
          background: rgba(255,255,255,0.15); margin: 0 20px; flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .stats-bar { padding: 28px 20px; gap: 0; flex-wrap: wrap; }
          .stat-item { min-width: 45%; margin-bottom: 24px; }
          .stat-divider:nth-child(4) { display: none; }
          .stat-divider { display: none; }
        }
        @media (max-width: 480px) {
          .stat-number { font-size: 28px; }
          .stat-item { min-width: 48%; }
        }
      `}</style>
    </div>
  );
}
