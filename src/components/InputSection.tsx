import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Loader2, FileText, X, Briefcase, Sparkles, CheckCircle } from 'lucide-react';
import { extractTextFromFile } from '@/lib/parsers';
import ModernCard from './ui/ModernCard';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface InputSectionProps {
  onAnalyze: (resumeText: string, jobDescText: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescText, setJobDescText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      setParseError(null);
      try {
        const text = await extractTextFromFile(file);
        setResumeText(text);
      } catch (error: any) {
        setParseError(error.toString());
        setFileName(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  });
  
  const handleClearResume = () => {
    setResumeText('');
    setFileName(null);
    setParseError(null);
  }

  const isReadyToAnalyze = resumeText.trim() && jobDescText.trim();

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">AI-Powered Analysis</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Perfect Your Resume with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI Intelligence</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get instant feedback on your resume's ATS compatibility and build the perfect version optimized for any job description.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <ModernCard variant="floating" className="p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Resume</h2>
              <p className="text-gray-500">Upload or paste your current resume</p>
            </div>
          </div>

          {fileName ? (
            <div className="relative flex items-center p-4 border border-green-200 rounded-xl bg-green-50 mb-4">
              <CheckCircle className="h-5 w-5 mr-3 text-green-600 flex-shrink-0"/>
              <span className="truncate font-medium text-green-800 flex-1">{fileName}</span>
              <button 
                onClick={handleClearResume} 
                className="ml-2 p-1 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <X className="h-4 w-4"/>
              </button>
            </div>
          ) : (
            <div {...getRootProps()} className={`relative p-8 text-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group mb-4 ${isDragActive ? 'border-blue-400 bg-blue-50 scale-105' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`}>
              <input {...getInputProps()} />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-600 transition-colors duration-300 mb-4"/>
              <p className="font-semibold text-gray-900 mb-1">Drop your resume here</p>
              <p className="text-sm text-gray-500">Supports PDF, DOCX, and TXT files</p>
            </div>
          )}

          <Textarea
            placeholder="Or paste your resume content here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[200px] bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl resize-none"
          />
          {parseError && <p className="text-sm text-red-600 mt-2">{parseError}</p>}
        </ModernCard>

        <ModernCard variant="floating" className="p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Job Description</h2>
              <p className="text-gray-500">Paste the target job posting</p>
            </div>
          </div>
          <Textarea
            placeholder="Paste the complete job description here..."
            value={jobDescText}
            onChange={(e) => setJobDescText(e.target.value)}
            className="min-h-[280px] bg-gray-50 border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 rounded-xl resize-none"
          />
        </ModernCard>
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={() => onAnalyze(resumeText, jobDescText)}
          disabled={isLoading || !isReadyToAnalyze}
          className={`px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300 ${
            isReadyToAnalyze 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin" />
              Analyzing...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6" />
              Analyze Resume Match
            </div>
          )}
        </Button>
        
        {!isReadyToAnalyze && (
          <p className="text-gray-500 mt-4">Please provide both your resume and job description to continue</p>
        )}
      </div>
    </div>
  );
};

export default InputSection;
