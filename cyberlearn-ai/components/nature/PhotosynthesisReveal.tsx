import React, { useEffect, useRef, useState } from 'react';
import { ecoSound } from './ecoSound';

interface Metric {
  label: string;
  value: number;
  suffix: string;
}

const METRICS: Metric[] = [
  { label: 'Clean Tech Funding Unlocked', value: 300, suffix: 'M+' },
  { label: 'Organic Reach Generated', value: 48, suffix: 'M' },
  { label: 'Trees Planted via Campaigns', value: 120, suffix: 'K' },
];

const useCountUp = (target: number, active: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let frame: number;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);
  return value;
};

const MetricRow: React.FC<{ metric: Metric; active: boolean }> = ({ metric, active }) => {
  const count = useCountUp(metric.value, active);
  return (
    <div className="flex items-baseline justify-between border-b border-emerald-400/20 py-3">
      <span className="text-linen/80">{metric.label}</span>
      <span className="text-2xl font-bold text-amber-300">
        {count}
        {metric.suffix}
      </span>
    </div>
  );
};

const PhotosynthesisReveal: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const lensRef = useRef<HTMLButtonElement>(null);

  const trigger = () => {
    setRevealed((r) => !r);
    ecoSound.bloom();
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#0B130E] px-6 py-24">
      <h2 className="mb-4 text-center text-3xl font-bold text-linen sm:text-4xl">
        The Sunlight Lens
      </h2>
      <p className="mb-10 max-w-lg text-center text-linen/60">
        Click the lens to simulate photosynthesis and reveal the ecosystem's growth metrics.
      </p>

      <button
        ref={lensRef}
        onClick={trigger}
        aria-label="Trigger photosynthesis reveal"
        className={`relative h-40 w-40 rounded-full border-4 border-amber-300/60 bg-gradient-to-br from-amber-200 via-amber-400 to-emerald-500 shadow-[0_0_60px_20px_rgba(245,158,11,0.35)] transition-transform duration-500 ${
          revealed ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center text-5xl">☀️</span>
        {revealed && (
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/40" />
        )}
      </button>

      <div
        className={`mt-12 w-full max-w-md overflow-hidden rounded-2xl border border-emerald-400/30 bg-[#121614]/80 backdrop-blur transition-all duration-700 ease-out ${
          revealed ? 'max-h-96 opacity-100 p-6' : 'max-h-0 opacity-0 p-0'
        }`}
      >
        {METRICS.map((m) => (
          <MetricRow key={m.label} metric={m} active={revealed} />
        ))}
      </div>
    </section>
  );
};

export default PhotosynthesisReveal;
