import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Loader2, FileText, X, Briefcase, Sparkles, CheckCircle } from 'lucide-react';
import { extractTextFromFile } from '@/lib/parsers';
import ModernCard from './ui/ModernCard';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Particles } from 'react-tsparticles';

interface InputSectionProps {
  onAnalyze: (resumeText: string, jobDescText: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescText, setJobDescText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setShowParticles(true);
      setFileName(file.name);
      setParseError(null);
      try {
        const text = await extractTextFromFile(file);
        setResumeText(text);
      } catch (error: any) {
        setParseError(error.toString());
        setFileName(null);
      } finally {
        setTimeout(() => {
          setShowParticles(false);
        }, 2000);
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
      {showParticles && (
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-900 border border-indigo-700 rounded-full">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-400">AI-Powered Analysis</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Perfect Your Resume with <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI Intelligence</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Get instant feedback on your resume's ATS compatibility and build the perfect version optimized for any job description.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-900 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Your Resume</h2>
              <p className="text-gray-400">Upload or paste your current resume</p>
            </div>
          </div>

          {fileName ? (
            <div className="relative flex items-center p-4 border border-green-700 rounded-xl bg-green-900 mb-4">
              <CheckCircle className="h-5 w-5 mr-3 text-green-400 flex-shrink-0"/>
              <span className="truncate font-medium text-green-400 flex-1">{fileName}</span>
              <button 
                onClick={handleClearResume} 
                className="ml-2 p-1 rounded-full text-gray-500 hover:bg-red-800 hover:text-red-400 transition-colors"
              >
                <X className="h-4 w-4"/>
              </button>
            </div>
          ) : (
            <div {...getRootProps()} className={`relative p-8 text-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group mb-4 ${isDragActive ? 'border-indigo-600 bg-indigo-900 scale-105' : 'border-gray-700 hover:border-indigo-600 hover:bg-indigo-900'}`}>
              <input {...getInputProps()} />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <UploadCloud className="mx-auto h-12 w-12 text-gray-500 group-hover:text-indigo-400 transition-colors duration-300 mb-4"/>
              <p className="font-semibold text-white mb-1">Drop your resume here</p>
              <p className="text-sm text-gray-400">Supports PDF, DOCX, and TXT files</p>
            </div>
          )}

          <Textarea
            placeholder="Or paste your resume content here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[200px] bg-gray-900 border-gray-700 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-800 rounded-xl resize-none text-white"
          />
          {parseError && <p className="text-sm text-red-500 mt-2">{parseError}</p>}
        </div>

        <div className="bg-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Job Description</h2>
              <p className="text-gray-400">Paste the target job posting</p>
            </div>
          </div>
          <Textarea
            placeholder="Paste the complete job description here..."
            value={jobDescText}
            onChange={(e) => setJobDescText(e.target.value)}
            className="min-h-[280px] bg-gray-900 border-gray-700 focus:border-purple-600 focus:ring-2 focus:ring-purple-800 rounded-xl resize-none text-white"
          />
        </div>
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={() => onAnalyze(resumeText, jobDescText)}
          disabled={isLoading || !isReadyToAnalyze}
          className={`px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300 ${
            isReadyToAnalyze 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
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
          <p className="text-gray-400 mt-4">Please provide both your resume and job description to continue</p>
        )}
      </div>
    </div>
  );
};

export default InputSection;
