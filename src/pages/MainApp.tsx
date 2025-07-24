
import React, { useState } from 'react';
import HeaderLogo from '@/components/HeaderLogo';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import InputSection from '@/components/InputSection';
import AnalysisDashboard from '@/components/AnalysisDashboard';
import OptimizedResumeDisplay from '@/components/OptimizedResumeDisplay';
import BuildingResumeView from '@/components/BuildingResumeView';
import { AnalysisResult, OptimizedResume, analyzeResumeWithGemini, buildOptimizedResume } from '@/services/gemini';
import { toast } from 'sonner';
import { ArrowLeft, Home, BarChart3, Sparkles, Zap, Target } from 'lucide-react';
import ModernButton from '@/components/ui/ModernButton';

type AppState = 'input' | 'analyzing' | 'results' | 'building-resume' | 'optimized';

const MainApp = () => {
  const [currentState, setCurrentState] = useState<AppState>('input');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [optimizedResume, setOptimizedResume] = useState<OptimizedResume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [originalResumeText, setOriginalResumeText] = useState<string>('');
  const [jobDescriptionText, setJobDescriptionText] = useState<string>('');

  const handleAnalyze = async (resumeText: string, jobDescText: string) => {
    if (!resumeText.trim() || !jobDescText.trim()) {
      toast.error('Please provide both resume and job description');
      return;
    }

    setOriginalResumeText(resumeText);
    setJobDescriptionText(jobDescText);

    setIsLoading(true);
    setCurrentState('analyzing');
    
    try {
      console.log('Starting resume analysis with Gemini AI...');
      
      const results = await analyzeResumeWithGemini(resumeText, jobDescText);
      
      console.log('Analysis completed:', results);
      setAnalysisResults(results);
      setCurrentState('results');
      
      toast.success('Analysis completed successfully!');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Analysis failed. Please try again.');
      setCurrentState('input');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToInput = () => {
    setCurrentState('input');
    setAnalysisResults(null);
    setOptimizedResume(null);
    setOriginalResumeText('');
    setJobDescriptionText('');
  };

  const handleBackToResults = () => {
    setCurrentState('results');
  };

  const handleBuildResume = async () => {
    if (!originalResumeText || !jobDescriptionText) {
      toast.error('Original resume and job description are required');
      return;
    }

    console.log('Building ATS-optimized resume...');
    setCurrentState('building-resume');
    
    try {
      const optimizedResumeResult = await buildOptimizedResume(
        originalResumeText, 
        jobDescriptionText, 
        'ATS Optimized'
      );
      
      console.log('Resume building completed:', optimizedResumeResult);
      setOptimizedResume(optimizedResumeResult);
      setCurrentState('optimized');
      
      toast.success('🎉 Your perfect ATS-optimized resume is ready!');
    } catch (error) {
      console.error('Resume building failed:', error);
      toast.error('Resume building failed. Please try again.');
      setCurrentState('results');
    }
  };

  const getPageTitle = () => {
    switch (currentState) {
      case 'input': return 'Upload & Analyze';
      case 'analyzing': return 'AI Analysis in Progress';
      case 'results': return 'Resume Analysis Results';
      case 'building-resume': return 'Building Perfect Resume';
      case 'optimized': return 'Your Optimized Resume';
      default: return 'Resume Analyzer';
    }
  };

  const getPageIcon = () => {
    switch (currentState) {
      case 'input': return Home;
      case 'analyzing': case 'building-resume': return Sparkles;
      case 'results': return BarChart3;
      case 'optimized': return Target;
      default: return Home;
    }
  };

  const PageIcon = getPageIcon();

  return (
    <div className="min-h-screen relative overflow-hidden hero-mesh">
      <Toaster />
      <Sonner />
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-float" />
        <div className="absolute w-64 h-64 top-1/4 -right-32 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-80 h-80 -bottom-40 -left-40 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Premium Navbar */}
      <header className="navbar-sticky">
        <div className="container mx-auto px-responsive">
          <div className="flex h-20 items-center justify-between">
            {/* Logo/Brand */}
            <HeaderLogo size={56} />

            {/* Navigation Status */}
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white rounded-2xl shadow-xl px-8 py-4 border border-gray-100">
                <span className="text-lg font-bold text-gray-800">{getPageTitle()}</span>
              </div>
            </div>

            {/* Mobile Title */}
            <div className="sm:hidden text-center flex-1 mx-4">
              <h1 className="text-xl font-black text-gradient-primary truncate">
                {getPageTitle()}
              </h1>
            </div>

            {/* Action Button */}
            <div className="flex items-center">
              {currentState !== 'input' && (
                <ModernButton
                  variant="secondary"
                  onClick={handleBackToInput}
                  className="group"
                >
                  <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                  <span className="hidden sm:inline font-bold">New Analysis</span>
                </ModernButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-responsive py-12">
        <div className="max-w-7xl mx-auto">
          {currentState === 'input' && (
            <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
          )}

          {currentState === 'analyzing' && (
            <BuildingResumeView />
          )}

          {currentState === 'results' && analysisResults && (
            <AnalysisDashboard 
              results={analysisResults} 
              onBack={handleBackToInput}
              onBuildResume={handleBuildResume}
            />
          )}

          {currentState === 'building-resume' && (
            <BuildingResumeView />
          )}

          {currentState === 'optimized' && optimizedResume && (
            <OptimizedResumeDisplay 
              resume={optimizedResume} 
              onBack={handleBackToResults} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default MainApp;
