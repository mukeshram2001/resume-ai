
import React, { useRef } from 'react';
import { Button } from './ui/button';
import ModernCard from './ui/ModernCard';
import ModernButton from './ui/ModernButton';
import { OptimizedResume } from '@/services/gemini';
import { ArrowLeft, User, Briefcase, GraduationCap, Lightbulb, Star, FolderKanban, Sparkles, Download } from 'lucide-react';
import { downloadAsDocx } from '@/lib/resume-exporter';

interface OptimizedResumeDisplayProps {
  resume: OptimizedResume;
  onBack: () => void;
}

const SectionCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; className?: string }> = ({ title, icon: Icon, children, className }) => (
    <div className={`mb-6 bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center text-black">
            <Icon className="mr-3 h-6 w-6 text-black" />
            {title}
        </h3>
        {children}
    </div>
);

const OptimizedResumeDisplay: React.FC<OptimizedResumeDisplayProps> = ({ resume, onBack }) => {
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const handleDownloadDocx = () => {
    downloadAsDocx(resume, `${resume.personalInfo.name.replace(/\s+/g, '_')}_Resume`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
        <ModernButton
          variant="secondary"
          onClick={onBack}
          className="order-2 lg:order-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </ModernButton>
        
        <div className="order-1 lg:order-2 text-center">
          <h1 className="text-3xl lg:text-4xl font-black text-gradient-primary mb-2">Your Professional Resume</h1>
          <p className="text-muted-foreground">Optimized for ATS and human reviewers</p>
        </div>
        
        <ModernButton
          variant="primary"
          onClick={handleDownloadDocx}
          className="order-3 w-full sm:w-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Word
        </ModernButton>
      </div>

      <ModernCard variant="floating" className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
              <SectionCard title="Personal Information" icon={User}>
                  <h2 className="text-3xl font-bold text-black">{resume.personalInfo.name}</h2>
                  <p className="text-xl text-gray-700 font-medium">{resume.personalInfo.title}</p>
                  <div className="text-sm text-gray-600 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <span>{resume.personalInfo.contact.email}</span>
                      <span>{resume.personalInfo.contact.phone}</span>
                      <span>{resume.personalInfo.contact.location}</span>
                      {resume.personalInfo.contact.linkedin && <a href={resume.personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="text-black hover:underline font-medium">LinkedIn</a>}
                      {resume.personalInfo.contact.portfolio && <a href={resume.personalInfo.contact.portfolio} target="_blank" rel="noreferrer" className="text-black hover:underline font-medium">Portfolio</a>}
                  </div>
              </SectionCard>

              <SectionCard title="Professional Summary" icon={Lightbulb}>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{resume.professionalSummary}</p>
              </SectionCard>

              <SectionCard title="Work Experience" icon={Briefcase}>
                  <div className="space-y-6">
                  {resume.workExperience.map((exp, i) => (
                      <div key={i} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <h4 className="font-bold text-lg text-black">{exp.position}</h4>
                          <p className="text-gray-700 font-medium">{exp.company} | {exp.location}</p>
                          <p className="text-sm text-gray-600 mb-3">{exp.duration}</p>
                          <ul className="list-disc list-inside text-gray-700 space-y-1 leading-relaxed">
                              {exp.achievements.map((ach, j) => <li key={j}>{ach.replace(/^•\s*/, '')}</li>)}
                          </ul>
                      </div>
                  ))}
                  </div>
              </SectionCard>
              
              <SectionCard title="Projects" icon={FolderKanban}>
                   <div className="space-y-6">
                      {resume.projects.map((proj, i) => (
                          <div key={i} className="border-b border-gray-100 pb-4 last:border-b-0">
                              <h4 className="font-bold text-lg text-black">{proj.name}</h4>
                              <p className="text-sm text-gray-600 mb-2 font-medium">{proj.technologies.join(', ')}</p>
                              <p className="text-gray-700 mb-3 leading-relaxed">{proj.description}</p>
                              <ul className="list-disc list-inside text-gray-700 space-y-1 leading-relaxed">
                                  {proj.achievements.map((ach, j) => <li key={j}>{ach}</li>)}
                              </ul>
                          </div>
                      ))}
                   </div>
              </SectionCard>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <SectionCard title="Core Skills" icon={Star}>
                 <div className="space-y-4">
                    {resume.coreSkills.technical.length > 0 && <div><h4 className="font-semibold text-black mb-2">Technical Skills</h4><p className="text-sm text-gray-700 leading-relaxed">{resume.coreSkills.technical.join(', ')}</p></div>}
                    {resume.coreSkills.soft.length > 0 && <div><h4 className="font-semibold text-black mb-2">Soft Skills</h4><p className="text-sm text-gray-700 leading-relaxed">{resume.coreSkills.soft.join(', ')}</p></div>}
                    {resume.coreSkills.tools.length > 0 && <div><h4 className="font-semibold text-black mb-2">Tools & Technologies</h4><p className="text-sm text-gray-700 leading-relaxed">{resume.coreSkills.tools.join(', ')}</p></div>}
                 </div>
            </SectionCard>

            <SectionCard title="Education" icon={GraduationCap}>
                <h4 className="font-bold text-black">{resume.education.degree}</h4>
                <p className="text-gray-700 font-medium">{resume.education.school}</p>
                <p className="text-sm text-gray-600 mt-1">{resume.education.year}</p>
                {resume.education.relevant_coursework && <p className="text-sm text-gray-700 mt-2"><span className="font-medium">Relevant Coursework:</span> {resume.education.relevant_coursework}</p>}
            </SectionCard>

            <SectionCard title="AI Enhancement Summary" icon={Sparkles}>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-black mb-2">Key Improvements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 leading-relaxed">
                            {resume.improvementSummary.keyChanges.map((change, i) => <li key={i}>{change}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-black mb-2">Score Improvement:</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{resume.improvementSummary.predictedScoreIncrease}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-black mb-2">ATS Compatibility:</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{resume.improvementSummary.atsCompatibility}</p>
                    </div>
                </div>
            </SectionCard>
          </div>
        </div>
      </ModernCard>
    </div>
  );
};

export default OptimizedResumeDisplay;
