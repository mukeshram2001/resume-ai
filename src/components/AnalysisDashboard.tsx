import React from 'react';
import { AnalysisResult } from '@/services/gemini';
import ModernCard from './ui/ModernCard';
import MatchScoreCircular from './ui/MatchScoreCircular';
import ResumeBuilderCTA from './ResumeBuilderCTA';
import { Button } from './ui/button';
import { ArrowLeft, Target, Shield, Star, Zap, Search, User, CheckCircle, AlertTriangle, TrendingUp, Award, Brain } from 'lucide-react';

interface AnalysisDashboardProps {
  results: AnalysisResult;
  onBack: () => void;
  onBuildResume?: () => void;
}

const ScoreCard: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  score: number; 
  max: number; 
  color: string;
  description: string;
}> = ({ icon: Icon, label, score, max, color, description }) => {
  const percentage = (score / max) * 100;
  
  return (
    <div className="group relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50 rounded-xl md:rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
          <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 ${color} rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div className="text-right">
            <div className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-1">{score}</div>
            <div className="text-xs md:text-sm text-gray-500">/{max}</div>
          </div>
        </div>
        
        <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2">{label}</h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">{description}</p>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${color} shadow-lg`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>0</span>
            <span className="font-semibold">{percentage.toFixed(0)}%</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ results, onBack, onBuildResume }) => {
  const handleBuildResume = () => {
    if (onBuildResume) {
      onBuildResume();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 animate-fade-in">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 lg:mb-12 gap-4 md:gap-0">
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-3 rounded-xl md:rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base w-full md:w-auto min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
            <span className="font-semibold text-gray-700">New Analysis</span>
          </Button>
          
          <div className="text-center flex-1 order-first md:order-none">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 md:mb-3">
              Resume Analysis
            </h1>
            <p className="text-sm md:text-base lg:text-xl text-gray-600 font-medium">Comprehensive Performance Breakdown</p>
          </div>
          
          <div className="hidden md:block w-16 lg:w-32"></div>
        </div>

        {/* Hero Score Section */}
        <ModernCard variant="floating" className="mb-8 md:mb-12 lg:mb-16">
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 lg:px-6 py-2 md:py-2 lg:py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-3 md:mb-4 lg:mb-6">
              <Award className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              <span className="font-bold text-blue-900 text-xs md:text-sm lg:text-base">Overall Performance Score</span>
            </div>
            
            <div className="flex justify-center mb-4 md:mb-6 lg:mb-8">
              <MatchScoreCircular score={results.matchScore.total} size={160} strokeWidth={12} />
            </div>
            
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Resume-Job Compatibility Analysis</h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Your resume has been analyzed against the job requirements using advanced AI algorithms
            </p>
          </div>

          {/* Score Breakdown Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
            <ScoreCard 
              icon={Target} 
              label="Technical Skills" 
              score={results.matchScore.hardSkills} 
              max={25} 
              color="bg-gradient-to-br from-blue-500 to-blue-600" 
              description="Technical competencies alignment"
            />
            <ScoreCard 
              icon={Star} 
              label="Soft Skills" 
              score={results.matchScore.softSkills} 
              max={25} 
              color="bg-gradient-to-br from-purple-500 to-purple-600" 
              description="Interpersonal abilities match"
            />
            <ScoreCard 
              icon={Zap} 
              label="Role Alignment" 
              score={results.matchScore.roleAlignment} 
              max={25} 
              color="bg-gradient-to-br from-green-500 to-green-600" 
              description="Position requirements fit"
            />
            <ScoreCard 
              icon={Shield} 
              label="ATS Compatibility" 
              score={results.matchScore.atsCompatibility} 
              max={25} 
              color="bg-gradient-to-br from-indigo-500 to-indigo-600" 
              description="Automated system readiness"
            />
          </div>
        </ModernCard>

        {/* Resume Builder CTA */}
        {onBuildResume && (
          <div className="mb-8 md:mb-12 lg:mb-16">
            <ResumeBuilderCTA 
              currentScore={results.matchScore.total} 
              onBuildResume={handleBuildResume}
            />
          </div>
        )}

        {/* Detailed Analysis Section - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {/* Missing Keywords */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl md:rounded-2xl lg:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 max-h-[500px] md:max-h-[600px] overflow-hidden">
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6 lg:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                  <Search className="h-5 w-5 md:h-6 md:h-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900">Missing Keywords</h3>
                  <p className="text-xs md:text-sm lg:text-base text-gray-600">Critical terms to include</p>
                </div>
              </div>
              
              <div className="space-y-2 md:space-y-3 max-h-60 md:max-h-80 overflow-y-auto custom-scrollbar">
                {results.missingKeywords.slice(0, 15).map((keyword, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 lg:p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg md:rounded-xl lg:rounded-2xl border border-red-100 hover:shadow-md transition-all duration-300">
                    <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-red-500 flex-shrink-0" />
                    <span className="font-semibold text-red-700 text-xs md:text-sm lg:text-base">{keyword}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recruiter Perspective */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl md:rounded-2xl lg:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6 lg:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900">Recruiter View</h3>
                  <p className="text-xs md:text-sm lg:text-base text-gray-600">Professional assessment</p>
                </div>
              </div>
              
              <div className="text-center mb-3 md:mb-4 lg:mb-6">
                <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg md:rounded-xl lg:rounded-2xl mb-2 md:mb-3 lg:mb-4">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-blue-600" />
                  <div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-blue-600">{results.recruiterLens.shortlistProbability}%</div>
                    <div className="text-xs md:text-sm font-semibold text-blue-800">Shortlist Probability</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 md:p-4 lg:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg md:rounded-xl lg:rounded-2xl border border-blue-100">
                <p className="text-gray-700 leading-relaxed font-medium text-xs md:text-sm lg:text-base">{results.recruiterLens.verdict}</p>
              </div>
            </div>
          </div>

          {/* ATS Verdict */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl md:rounded-2xl lg:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6 lg:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900">ATS Decision</h3>
                  <p className="text-xs md:text-sm lg:text-base text-gray-600">System evaluation</p>
                </div>
              </div>
              
              <div className="text-center mb-3 md:mb-4 lg:mb-6">
                <div className={`inline-flex items-center gap-2 md:gap-3 px-3 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl lg:rounded-2xl text-sm md:text-lg lg:text-xl font-black shadow-lg ${
                  results.atsVerdict.willAutoReject 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                }`}>
                  {results.atsVerdict.willAutoReject ? "❌ AUTO-REJECT" : "✅ APPROVED"}
                </div>
              </div>
              
              <div className="p-3 md:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg md:rounded-xl lg:rounded-2xl border border-gray-100">
                <p className="text-gray-700 leading-relaxed font-medium text-xs md:text-sm lg:text-base">{results.atsVerdict.reason}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
