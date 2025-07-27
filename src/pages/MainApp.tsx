import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Home, BarChart3, Sparkles, Zap, Target, FlaskConical } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import InputSection from '@/components/InputSection';
import AnalysisDashboard from '@/components/AnalysisDashboard';
import OptimizedResumeDisplay from '@/components/OptimizedResumeDisplay';
import BuildingResumeView from '@/components/BuildingResumeView';
import { AnalysisResult, OptimizedResume, analyzeResumeWithGemini, buildOptimizedResume } from '@/services/gemini';
import { toast } from 'sonner';
import ModernButton from '@/components/ui/ModernButton';
import NavigationBar from '@/components/NavigationBar';
import Mascot from '@/components/Mascot';

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

  const renderContent = () => {
    switch (currentState) {
      case 'input':
        return <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />;
      case 'analyzing':
        return <BuildingResumeView />;
      case 'results':
        return <AnalysisDashboard results={analysisResults!} onBack={handleBackToInput} onBuildResume={handleBuildResume} />;
      case 'building-resume':
        return <BuildingResumeView />;
      case 'optimized':
        return <OptimizedResumeDisplay resume={optimizedResume!} onBack={handleBackToResults} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster />
      <Sonner />
      <main className="relative z-10 container mx-auto px-responsive py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <NavigationBar />
      <div className="fixed bottom-20 right-4">
        <Mascot />
      </div>
    </div>
  );
};

export default MainApp;
