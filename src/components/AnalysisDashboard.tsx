import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Lightbulb, Target, FileText } from 'lucide-react';
import { AnalysisResult } from '@/services/gemini';
import ModernButton from './ui/ModernButton';
import MatchScoreCircular from './ui/MatchScoreCircular';

interface AnalysisDashboardProps {
  results: AnalysisResult;
  onBack: () => void;
  onBuildResume: () => void;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ results, onBack, onBuildResume }) => {
  const { match_score, pros, cons, suggestions } = results;

  const getScoreColor = (score: number) => {
    if (score > 80) return 'text-green-400';
    if (score > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Analysis Complete
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Here's how your resume stacks up against the job description.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center justify-center bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Match Score</h2>
          <MatchScoreCircular score={match_score} />
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white">What's Working</h2>
            </div>
            <ul className="space-y-2">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <span className="text-gray-300">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-8 w-8 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Areas for Improvement</h2>
            </div>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-red-400 mt-1" />
                  <span className="text-gray-300">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="h-8 w-8 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Suggestions for Improvement</h2>
        </div>
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400 mt-1" />
              <span className="text-gray-300">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <ModernButton onClick={onBuildResume} size="lg" className="px-12 py-6 text-xl font-bold">
          <Target className="mr-2 h-6 w-6" />
          Build Optimized Resume
        </ModernButton>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
