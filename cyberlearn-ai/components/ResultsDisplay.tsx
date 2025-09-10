
import React, { useState } from 'react';
import { GeneratedContent } from '../types';
import Quiz from './Quiz';
import FlashcardDeck from './FlashcardDeck';

interface ResultsDisplayProps {
  content: GeneratedContent;
  onReset: () => void;
  fileName: string;
}

type ActiveTab = 'quiz' | 'flashcards';

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ content, onReset, fileName }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quiz');

  const TabButton: React.FC<{ tabName: ActiveTab; label: string; count: number }> = ({ tabName, label, count }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm sm:text-base font-bold rounded-t-lg transition-colors duration-300 ${
        activeTab === tabName
          ? 'bg-slate-700 text-cyan-400 border-b-2 border-cyan-400'
          : 'bg-transparent text-slate-400 hover:bg-slate-700/50'
      }`}
    >
      {label} <span className="text-xs bg-slate-600 rounded-full px-2 py-0.5">{count}</span>
    </button>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-200">Learning Kit for <span className="text-cyan-400">{fileName}</span></h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-violet-700 transition-all duration-300"
        >
          Start Over
        </button>
      </div>

      <div className="border-b border-slate-700">
        <TabButton tabName="quiz" label="Quiz" count={content.quizzes.length} />
        <TabButton tabName="flashcards" label="Flashcards" count={content.flashcards.length} />
      </div>

      <div className="mt-4">
        {activeTab === 'quiz' && <Quiz questions={content.quizzes} />}
        {activeTab === 'flashcards' && <FlashcardDeck cards={content.flashcards} />}
      </div>
    </div>
  );
};

export default ResultsDisplay;
