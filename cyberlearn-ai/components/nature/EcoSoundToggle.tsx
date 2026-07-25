import React, { useState } from 'react';
import { ecoSound } from './ecoSound';

const EcoSoundToggle: React.FC = () => {
  const [on, setOn] = useState(false);

  const handleClick = () => {
    setOn((v) => {
      const next = !v;
      ecoSound.setEnabled(next);
      return next;
    });
    ecoSound.droplet();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-emerald-400/40 bg-[#121614]/90 px-4 py-2 text-sm text-linen shadow-lg backdrop-blur transition-colors hover:border-emerald-300"
      aria-pressed={on}
      aria-label="Toggle eco-acoustic UI"
    >
      <span>{on ? '🔊' : '🔈'}</span>
      <span className="hidden sm:inline">{on ? 'Soundscape On' : 'Soundscape Off'}</span>
    </button>
  );
};

export default EcoSoundToggle;
