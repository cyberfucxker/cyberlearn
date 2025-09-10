
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing your document...",
  "Identifying key concepts...",
  "Crafting insightful quiz questions...",
  "Building your flashcard deck...",
  "Finalizing your learning kit...",
];

const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
      <p className="mt-6 text-lg font-semibold text-slate-300 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
      <p className="mt-2 text-sm text-slate-500">This may take a moment. Please wait.</p>
    </div>
  );
};

export default Loader;
