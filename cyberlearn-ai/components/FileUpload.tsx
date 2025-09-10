
import React from 'react';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  onGenerate: () => void;
  file: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, onGenerate, file }) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    onFileChange(selectedFile || null);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <label
        htmlFor="pdf-upload"
        className="cursor-pointer bg-slate-700 hover:bg-slate-600 border-2 border-dashed border-slate-500 rounded-lg p-8 w-full text-center transition-colors duration-300"
      >
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center text-slate-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
           </svg>
          <p className="font-semibold text-slate-300">
            {file ? 'File Selected:' : 'Click to upload a PDF'}
          </p>
          <p className="text-sm">{file ? file.name : 'or drag and drop'}</p>
        </div>
      </label>

      <button
        onClick={onGenerate}
        disabled={!file}
        className="w-full sm:w-auto px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        Generate Learning Kit
      </button>
    </div>
  );
};

export default FileUpload;
