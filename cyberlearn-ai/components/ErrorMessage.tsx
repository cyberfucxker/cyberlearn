
import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-900/20 border border-red-500/50 rounded-lg">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg>
      <p className="text-lg font-semibold text-red-300">An Error Occurred</p>
      <p className="mt-2 text-sm text-red-400 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
