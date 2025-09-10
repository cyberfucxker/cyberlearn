
import React, { useState } from 'react';
import type { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
}

const Flashcard: React.FC<FlashcardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-slate-700 rounded-lg border border-slate-600 shadow-lg text-center">
          <h3 className="text-xl font-bold text-slate-200">{card.term}</h3>
        </div>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-cyan-800/70 rounded-lg border border-cyan-600 shadow-lg">
          <p className="text-slate-200">{card.definition}</p>
        </div>
      </div>
    </div>
  );
};

interface FlashcardDeckProps {
  cards: FlashcardType[];
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Flashcard key={index} card={card} />
      ))}
    </div>
  );
};

export default FlashcardDeck;
