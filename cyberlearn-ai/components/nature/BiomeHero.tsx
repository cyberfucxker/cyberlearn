import React from 'react';
import FloraNode, { FloraNodeData } from './FloraNode';

const NODES: FloraNodeData[] = [
  { id: 'fern', name: 'Rare Fern Collective', emoji: '🌿', stat: '+120K', statLabel: 'Trees Planted', top: '10%', left: '14%', delay: 0 },
  { id: 'moss', name: 'Bioluminescent Moss', emoji: '🍀', stat: '$300M+', statLabel: 'Clean Tech Funding', top: '55%', left: '8%', delay: 300 },
  { id: 'orchid', name: 'Blossoming Orchid', emoji: '🌸', stat: '48M', statLabel: 'Organic Reach', top: '20%', left: '68%', delay: 600 },
  { id: 'tree', name: 'Ancient Canopy Tree', emoji: '🌳', stat: 'Featured', statLabel: 'Forbes Sustainability', top: '58%', left: '76%', delay: 900 },
  { id: 'bud', name: 'Sprouting Sapling', emoji: '🌱', stat: '30 Days', statLabel: 'Avg. Launch Time', top: '38%', left: '42%', delay: 1200 },
];

const BiomeHero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B130E]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.10),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center pt-24 text-center px-6">
        <span className="mb-4 rounded-full border border-emerald-400/40 px-4 py-1 text-xs uppercase tracking-widest text-emerald-300/90">
          The Digital Ecosystem
        </span>
        <h1 className="text-4xl font-extrabold text-linen sm:text-6xl">
          An Interactive <span className="text-emerald-400">Living Biome</span>
        </h1>
        <p className="mt-4 max-w-xl text-linen/60">
          Hover the flora to watch each specimen bloom, revealing the growth metrics behind
          every campaign in the canopy.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-8 h-[60vh] max-w-5xl">
        {NODES.map((node) => (
          <FloraNode key={node.id} node={node} />
        ))}
      </div>
    </section>
  );
};

export default BiomeHero;
