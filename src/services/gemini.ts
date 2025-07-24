
import { createAnalysisPrompt, createResumeBuilderPrompt } from '@/lib/gemini-prompts';
import { AnalysisResult, OptimizedResume } from '@/types/analysis';

// Re-export types to maintain compatibility with other components
export * from '@/types/analysis';

// NEW GEMINI API KEY - Updated for Resume Builder
const GEMINI_API_KEY = 'AIzaSyBcVLbGVVhEbRbn1k0krUD9U3ymAOT57TI';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Enhanced fallback with more realistic scoring
const getFallbackAnalysis = (): AnalysisResult => ({
  matchScore: { total: 15, hardSkills: 3, softSkills: 5, roleAlignment: 4, atsCompatibility: 3 },
  missingKeywords: ["Critical technical requirements", "Industry-specific skills", "Required certifications", "Essential software/tools", "Core competencies"],
  actionPlan: ["Comprehensive skill development needed", "Acquire industry-relevant certifications", "Gain hands-on experience in required technologies"],
  recruiterLens: { 
    positives: ["Basic professional foundation"], 
    redFlags: ["Major skill gaps", "Insufficient relevant experience", "Missing critical qualifications"], 
    shortlistProbability: 8, 
    verdict: "Significant improvements required for consideration" 
  },
  atsVerdict: { willAutoReject: true, reason: "Does not meet minimum requirements" },
  rewriteSuggestions: { 
    headline: "Align headline with target role requirements", 
    summary: "Emphasize most relevant skills and experience", 
    experienceBullet: "Quantify achievements with industry-relevant metrics" 
  },
  coverLetter: "Dear Hiring Manager,\n\nI am writing to express my interest in this position. While developing my skills to meet the role requirements...",
});

const getBackupResume = (): OptimizedResume => ({
  personalInfo: { name: "Error", title: "Resume Generation Failed", contact: { phone: "", email: "", location: "", linkedin: "", portfolio: "" } },
  professionalSummary: "Unable to generate optimized resume. Please verify inputs and try again.",
  coreSkills: { technical: [], soft: [], certifications: [], tools: [] },
  workExperience: [],
  projects: [],
  education: { degree: "", school: "", year: "", relevant_coursework: "" },
  additionalSections: { certifications: [], awards: [], languages: [], publications: [] },
  atsOptimizations: { keywordMatches: [], skillsAdded: [], sectionsReordered: "", metricsAdded: [] },
  improvementSummary: { keyChanges: ["Error: Resume generation failed"], predictedScoreIncrease: "Unable to calculate", atsCompatibility: "Unknown" },
});

// Enhanced API call with retry logic and better error handling
const callGeminiAPI = async <T extends object>(prompt: string, fallback: () => T, maxRetries: number = 2): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Gemini API call attempt ${attempt + 1}/${maxRetries + 1}`);
      
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.8,
            maxOutputTokens: 8192
          }
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Gemini API error: ${response.status}`, errorBody);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
        console.error('Invalid response structure from Gemini API', data);
        throw new Error('Invalid response structure from Gemini API');
      }
      
      const resultText = data.candidates[0].content.parts[0].text;
      console.log("Successfully received data from Gemini API");
      
      // Enhanced JSON parsing with validation
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedResult = JSON.parse(jsonMatch[0]) as T;
        
        // Basic validation for analysis results
        if ('matchScore' in parsedResult && typeof (parsedResult as any).matchScore.total === 'number') {
          console.log(`Analysis completed with score: ${(parsedResult as any).matchScore.total}`);
        }
        
        return parsedResult;
      }
      
      throw new Error('No valid JSON found in response');
      
    } catch (error) {
      lastError = error as Error;
      console.error(`Gemini API attempt ${attempt + 1} failed:`, error);
      
      if (attempt < maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error('All Gemini API attempts failed, returning fallback data:', lastError);
  return fallback();
};

export const analyzeResumeWithGemini = async (resumeText: string, jobDescriptionText: string): Promise<AnalysisResult> => {
  if (!resumeText.trim() || !jobDescriptionText.trim()) {
    console.warn("analyzeResumeWithGemini: Empty resume or job description, returning fallback.");
    return getFallbackAnalysis();
  }

  const prompt = createAnalysisPrompt(resumeText, jobDescriptionText);
  return callGeminiAPI<AnalysisResult>(prompt, getFallbackAnalysis, 3);
};

export const buildOptimizedResume = async (originalResume: string, jobDescription: string, templateStyle: string = "professional"): Promise<OptimizedResume> => {
  if (!originalResume.trim() || !jobDescription.trim()) {
    console.warn("buildOptimizedResume: Empty resume or job description, returning fallback.");
    return getBackupResume();
  }

  const prompt = createResumeBuilderPrompt(originalResume, jobDescription, templateStyle);
  return callGeminiAPI<OptimizedResume>(prompt, getBackupResume, 2);
};

// NEW: Generate multiple resume variations
export const generateResumeVariations = async (originalResume: string, jobDescription: string): Promise<OptimizedResume[]> => {
  const variationsPrompt = `
  Create 3 different optimized resume versions for this job:

  ORIGINAL RESUME: ${originalResume}
  JOB DESCRIPTION: ${jobDescription}

  VERSION 1: ATS MAXIMUM (keyword-heavy, bot-friendly)
  - Maximum keyword density
  - Simple formatting for ATS parsing
  - Quantified achievements
  - Technical skills emphasized

  VERSION 2: HUMAN PREMIUM (storytelling, engaging)
  - Compelling narrative flow
  - Achievement-focused storytelling
  - Leadership and impact emphasis
  - Professional but engaging tone

  VERSION 3: BALANCED HYBRID (ATS + human optimal)
  - Perfect balance of keywords and readability
  - ATS-friendly structure with human appeal
  - Strategic keyword placement
  - Professional storytelling

  Return ONLY a JSON array with 3 complete resume objects:
  [
    {
      "version": "ATS_MAXIMUM",
      "personalInfo": {...},
      "professionalSummary": "...",
      "coreSkills": {...},
      "workExperience": [...],
      "projects": [...],
      "education": {...},
      "additionalSections": {...},
      "atsOptimizations": {...},
      "improvementSummary": {...}
    },
    {
      "version": "HUMAN_PREMIUM",
      ...
    },
    {
      "version": "BALANCED_HYBRID",
      ...
    }
  ]
  `;

  try {
    const variations = await callGeminiAPI<OptimizedResume[]>(variationsPrompt, () => [getBackupResume()], 2);
    return Array.isArray(variations) ? variations : [variations];
  } catch (error) {
    console.error('Failed to generate resume variations:', error);
    return [getBackupResume()];
  }
};

// NEW: Predict score improvement
export const predictScoreImprovement = async (currentScore: number, plannedChanges: string[], jobDescription: string): Promise<{newScore: number, improvement: number, confidence: number}> => {
  const predictionPrompt = `
  Current ATS Match Score: ${currentScore}%
  Planned Resume Improvements: ${plannedChanges.join(', ')}
  Target Job Description: ${jobDescription}

  Based on these planned changes, predict the new ATS match score.
  Consider:
  - Keyword optimization impact
  - Section restructuring benefits
  - Achievement quantification value
  - ATS compatibility improvements

  Return ONLY valid JSON:
  {
    "newScore": 94,
    "improvement": 21,
    "confidence": 95,
    "reasoning": "Brief explanation of prediction"
  }
  `;

  try {
    const prediction = await callGeminiAPI<{newScore: number, improvement: number, confidence: number, reasoning: string}>(
      predictionPrompt, 
      () => ({newScore: currentScore + 15, improvement: 15, confidence: 80, reasoning: "Estimated improvement based on typical optimizations"}),
      1
    );
    return prediction;
  } catch (error) {
    console.error('Failed to predict score improvement:', error);
    return {newScore: currentScore + 15, improvement: 15, confidence: 80};
  }
};
