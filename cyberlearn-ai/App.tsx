
import React, { useState, useCallback } from 'react';
import { GeneratedContent, QuizQuestion, Flashcard } from './types';
import { generateContentFromPdf } from './services/geminiService';
import FileUpload from './components/FileUpload';
import Loader from './components/Loader';
import ResultsDisplay from './components/ResultsDisplay';
import ErrorMessage from './components/ErrorMessage';
import Hero from './components/Hero';

type AppState = 'idle' | 'loading' | 'results' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (generatedContent) {
      setGeneratedContent(null);
      setAppState('idle');
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!file) return;

    setAppState('loading');
    setError(null);
    try {
      const content = await generateContentFromPdf(file);
      if (!content || !content.quizzes || !content.flashcards) {
        throw new Error("The generated content is not in the expected format.");
      }
      setGeneratedContent(content);
      setAppState('results');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      console.error(errorMessage);
      setError(`Failed to generate content. ${errorMessage}`);
      setAppState('error');
    }
  }, [file]);

  const handleReset = () => {
    setFile(null);
    setGeneratedContent(null);
    setError(null);
    setAppState('idle');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
            CyberLearn AI
          </h1>
          <p className="mt-2 text-slate-400">
            Transforming Cyberpsychology PDFs into Interactive Learning Experiences
          </p>
        </header>

        <main className="bg-slate-800/50 rounded-xl shadow-2xl shadow-cyan-500/10 backdrop-blur-sm border border-slate-700 p-6">
          {appState === 'idle' && (
            <>
              <Hero />
              <FileUpload onFileChange={handleFileChange} onGenerate={handleGenerate} file={file} />
            </>
          )}

          {appState === 'loading' && <Loader />}
          
          {appState === 'error' && (
             <ErrorMessage message={error || 'An unknown error occurred.'} onRetry={handleGenerate} />
          )}

          {appState === 'results' && generatedContent && (
            <ResultsDisplay content={generatedContent} onReset={handleReset} fileName={file?.name || 'document'} />
          )}
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
