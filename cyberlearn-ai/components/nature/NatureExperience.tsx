import React from 'react';
import BiomeHero from './BiomeHero';
import GrowthTimeline from './GrowthTimeline';
import PhotosynthesisReveal from './PhotosynthesisReveal';
import EcoSoundToggle from './EcoSoundToggle';

interface Props {
  onExit: () => void;
}

const NatureExperience: React.FC<Props> = ({ onExit }) => {
  return (
    <div className="min-h-screen bg-[#0B130E] font-sans text-linen">
      <button
        onClick={onExit}
        className="fixed left-6 top-6 z-50 rounded-full border border-emerald-400/40 bg-[#121614]/90 px-4 py-2 text-sm text-linen shadow-lg backdrop-blur hover:border-emerald-300"
      >
        ← Back to CyberLearn AI
      </button>

      <BiomeHero />
      <GrowthTimeline />
      <PhotosynthesisReveal />

      <footer className="border-t border-emerald-400/10 bg-[#0B130E] px-6 py-10 text-center text-sm text-linen/50">
        <p>Built on a green-energy hosted, low-carbon web architecture concept.</p>
        <p className="mt-1">
          Palette: Deep Forest #0B130E · Bioluminescent Emerald #10B981 · Sunrise Gold #F59E0B ·
          Floral Magenta #EC4899
        </p>
      </footer>

      <EcoSoundToggle />
    </div>
  );
};

export default NatureExperience;
