
import React, { useState, useEffect } from 'react';
import { CheckCircle, BrainCircuit, FileSearch, PenSquare, Target, Sparkles, Zap } from 'lucide-react';
import { Progress } from './ui/progress';

const steps = [
  { text: "Analyzing job requirements and keywords...", duration: 3000, icon: FileSearch },
  { text: "Identifying optimization opportunities...", duration: 3500, icon: BrainCircuit },
  { text: "Crafting compelling, ATS-friendly content...", duration: 4500, icon: PenSquare },
  { text: "Adding strategic achievements and metrics...", duration: 3500, icon: Target },
  { text: "Finalizing your perfect resume...", duration: 2500, icon: Sparkles },
];

const BuildingResumeView: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepTimeout: ReturnType<typeof setTimeout>;
    let progressInterval: ReturnType<typeof setInterval>;

    if (currentStepIndex < steps.length) {
      const currentStep = steps[currentStepIndex];
      
      // Progress animation for current step
      progressInterval = setInterval(() => {
        setProgress(prev => {
          const targetProgress = ((currentStepIndex + 1) / steps.length) * 100;
          if (prev >= targetProgress - 1) {
            clearInterval(progressInterval);
            return targetProgress;
          }
          return prev + 2;
        });
      }, 50);

      stepTimeout = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, currentStep.duration);
    }

    return () => {
      clearTimeout(stepTimeout);
      clearInterval(progressInterval);
    };
  }, [currentStepIndex]);

  const CurrentIcon = currentStepIndex < steps.length ? steps[currentStepIndex].icon : CheckCircle;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center animate-fade-in p-4">
        <div className="glass-panel rounded-3xl p-8 lg:p-12 w-full border border-white/20 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Zap className="h-10 w-10 text-blue-600 animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gradient-primary mb-3">Creating Your Perfect Resume</h2>
            <p className="text-lg text-gray-600">AI is crafting your ATS-optimized resume with precision</p>
          </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-foreground">Progress</span>
            <span className="text-2xl font-black text-gradient-primary">{Math.round(progress)}%</span>
          </div>
          <div className="relative">
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out relative shadow-lg"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Current Step */}
        <div className="flex items-center justify-center mb-8 min-h-[80px]">
          <div key={currentStepIndex} className="animate-fade-in flex items-center text-xl font-bold text-gray-800">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
              <CurrentIcon className="h-8 w-8 text-white animate-pulse" />
            </div>
            <span className="text-lg text-gray-700">{currentStepIndex < steps.length ? steps[currentStepIndex].text : "Your resume is ready!"}</span>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div
                key={index}
                className={`flex items-center p-4 rounded-2xl transition-all duration-500 border ${
                  isCompleted ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 shadow-md' : 
                  isCurrent ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg scale-105' : 
                  'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 shadow-md ${
                  isCompleted ? 'bg-gradient-to-br from-emerald-500 to-green-500' :
                  isCurrent ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600' :
                  'bg-gray-300'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <Icon className={`h-6 w-6 ${isCurrent ? 'text-white animate-pulse' : 'text-muted-foreground'}`} />
                  )}
                </div>
                <span className={`text-base font-semibold ${
                  isCompleted ? 'text-emerald-700' :
                  isCurrent ? 'text-blue-700' :
                  'text-gray-500'
                }`}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-muted">
          <p className="text-lg text-muted-foreground font-medium">
            Powered by advanced AI • Typically takes 20-30 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuildingResumeView;
