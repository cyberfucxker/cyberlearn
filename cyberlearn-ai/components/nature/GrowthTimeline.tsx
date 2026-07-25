import React, { useEffect, useRef, useState } from 'react';

interface Milestone {
  id: string;
  title: string;
  kpi: string;
  detail: string;
}

const MILESTONES: Milestone[] = [
  { id: 'root', title: 'Root Zone', kpi: '4 Continents', detail: 'Foundation research & discovery, planted deep in client data.' },
  { id: 'sprout', title: 'First Sprout', kpi: '30 Days to Launch', detail: 'Rapid prototyping, brand seeds breaking soil.' },
  { id: 'canopy', title: 'Sunlit Canopy', kpi: '+120K Trees Funded', detail: 'Full campaign bloom, measurable ecological & business impact.' },
];

const GrowthTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport * 0.5;
      const scrolled = viewport - rect.top;
      const pct = Math.min(1, Math.max(0, scrolled / total));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lightBg =
    progress < 0.33
      ? 'from-[#0B130E] to-[#121614]'
      : progress < 0.66
      ? 'from-[#121614] to-[#173323]'
      : 'from-[#173323] to-[#1f4a30]';

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[150vh] bg-gradient-to-b ${lightBg} transition-colors duration-1000 px-6 py-24`}
    >
      <div className="mx-auto flex max-w-3xl gap-8">
        <div className="relative w-2 flex-shrink-0 rounded-full bg-emerald-900/40">
          <div
            className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-emerald-300 via-emerald-500 to-amber-400 transition-all duration-300 ease-out"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <div className="flex flex-col gap-24 py-8">
          {MILESTONES.map((m, i) => {
            const threshold = i / MILESTONES.length;
            const active = progress >= threshold;
            return (
              <div
                key={m.id}
                className={`transition-all duration-700 ease-out ${
                  active ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4'
                }`}
              >
                <span className="text-3xl">{active ? '🍃' : '🌱'}</span>
                <h3 className="mt-2 text-2xl font-bold text-linen">{m.title}</h3>
                <p className="text-amber-300 font-semibold">{m.kpi}</p>
                <p className="mt-1 max-w-md text-sm text-linen/70">{m.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GrowthTimeline;
