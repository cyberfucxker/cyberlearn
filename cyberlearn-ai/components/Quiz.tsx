
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };
  
  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = getScore();

  return (
    <div className="space-y-6">
      {isSubmitted && (
        <div className="p-4 rounded-lg bg-slate-700 border border-slate-600 text-center">
          <h3 className="text-xl font-bold">Quiz Complete!</h3>
          <p className="text-2xl font-bold my-2">
            Your Score: <span className={score / questions.length > 0.7 ? 'text-green-400' : 'text-yellow-400'}>{score} / {questions.length}</span>
          </p>
          <button onClick={handleReset} className="mt-2 px-4 py-2 bg-cyan-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-all duration-300">
            Try Again
          </button>
        </div>
      )}

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="font-semibold text-lg text-slate-200">
            {qIndex + 1}. {q.question}
          </p>
          <div className="mt-4 space-y-2">
            {q.options.map((option, oIndex) => {
              const isSelected = selectedAnswers[qIndex] === option;
              let optionClass = 'bg-slate-700 hover:bg-slate-600';
              if (isSubmitted) {
                if (option === q.correctAnswer) {
                  optionClass = 'bg-green-800/50 border-green-500';
                } else if (isSelected && option !== q.correctAnswer) {
                  optionClass = 'bg-red-800/50 border-red-500';
                } else {
                  optionClass = 'bg-slate-700 opacity-60';
                }
              } else if (isSelected) {
                optionClass = 'bg-cyan-700 border-cyan-500';
              }
              
              return (
                <button
                  key={oIndex}
                  onClick={() => handleSelectAnswer(qIndex, option)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3 rounded-md transition-all duration-200 border border-transparent ${optionClass}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!isSubmitted && (
         <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== questions.length}
            className="w-full px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300"
          >
           Submit Answers
         </button>
      )}
    </div>
  );
};

export default Quiz;
