import React, { useState } from 'react';
import { ecoSound } from './ecoSound';

export interface FloraNodeData {
  id: string;
  name: string;
  emoji: string;
  stat: string;
  statLabel: string;
  top: string;
  left: string;
  delay: number;
}

interface Props {
  node: FloraNodeData;
}

const FloraNode: React.FC<Props> = ({ node }) => {
  const [bloomed, setBloomed] = useState(false);

  return (
    <div
      className="absolute flex flex-col items-center select-none"
      style={{ top: node.top, left: node.left, animationDelay: `${node.delay}ms` }}
      onMouseEnter={() => {
        setBloomed(true);
        ecoSound.rustle();
      }}
      onMouseLeave={() => setBloomed(false)}
    >
      <div
        className={`transition-transform duration-700 ease-out text-5xl sm:text-6xl drop-shadow-[0_0_18px_rgba(16,185,129,0.55)] cursor-pointer ${
          bloomed ? 'scale-125 -translate-y-2' : 'scale-100 animate-sway'
        }`}
      >
        {node.emoji}
      </div>
      <div
        className={`mt-2 rounded-xl border border-emerald-400/40 bg-[#0B130E]/90 px-4 py-2 text-center shadow-lg shadow-emerald-500/10 transition-all duration-500 ease-out ${
          bloomed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <p className="text-xs uppercase tracking-wide text-emerald-300/80">{node.statLabel}</p>
        <p className="text-lg font-bold text-amber-300">{node.stat}</p>
        <p className="text-sm text-linen/80">{node.name}</p>
      </div>
    </div>
  );
};

export default FloraNode;
