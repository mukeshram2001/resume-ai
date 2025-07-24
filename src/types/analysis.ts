
export interface MatchScore {
  total: number;
  hardSkills: number;
  softSkills: number;
  roleAlignment: number;
  atsCompatibility: number;
}

export interface AnalysisResult {
  matchScore: MatchScore;
  missingKeywords: string[];
  actionPlan: string[];
  recruiterLens: {
    positives: string[];
    redFlags: string[];
    shortlistProbability: number;
    verdict: string;
  };
  atsVerdict: {
    willAutoReject: boolean;
    reason: string;
  };
  rewriteSuggestions: {
    headline: string;
    summary: string;
    experienceBullet: string;
  };
  coverLetter: string;
}

export interface OptimizedResume {
  personalInfo: {
    name: string;
    title: string;
    contact: {
      phone: string;
      email: string;
      location: string;
      linkedin: string;
      portfolio: string;
    };
  };
  professionalSummary: string;
  coreSkills: {
    technical: string[];
    soft: string[];
    certifications: string[];
    tools: string[];
  };
  workExperience: Array<{
    company: string;
    position: string;
    duration: string;
    location: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    technologies: string[];
    description: string;
    achievements: string[];
  }>;
  education: {
    degree: string;
    school: string;
    year: string;
    relevant_coursework: string;
  };
  additionalSections: {
    certifications: string[];
    awards: string[];
    languages: string[];
    publications: string[];
  };
  atsOptimizations: {
    keywordMatches: string[];
    skillsAdded: string[];
    sectionsReordered: string;
    metricsAdded: string[];
  };
  improvementSummary: {
    keyChanges: string[];
    predictedScoreIncrease: string;
    atsCompatibility: string;
  };
}
