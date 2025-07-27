import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { OptimizedResume } from '@/services/gemini';
import ModernButton from './ui/ModernButton';

interface OptimizedResumeDisplayProps {
  resume: OptimizedResume;
  onBack: () => void;
}

const OptimizedResumeDisplay: React.FC<OptimizedResumeDisplayProps> = ({ resume, onBack }) => {
  const { title, summary, sections } = resume;

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Your Optimized Resume is Ready
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Download your new resume and start applying for your dream job.
        </p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <ModernButton onClick={() => { /* Implement download functionality */ }}>
            <Download className="mr-2 h-5 w-5" />
            Download
          </ModernButton>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Summary</h3>
            <p className="text-gray-300">{summary}</p>
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <ModernButton onClick={onBack} variant="secondary">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Analysis
        </ModernButton>
      </div>
    </div>
  );
};

export default OptimizedResumeDisplay;
