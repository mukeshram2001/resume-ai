
export const createAnalysisPrompt = (resumeText: string, jobDescriptionText: string): string => `
You are an ULTRA-STRICT ATS system and expert recruiter with 20+ years of experience. You MUST be absolutely RUTHLESS and REALISTIC in scoring. Gemini 2.0's enhanced reasoning will help you provide pinpoint accuracy.

CRITICAL ANALYSIS FRAMEWORK:
1. DOMAIN MATCH: Does the candidate's field/industry match the job? (Different field = auto 0-15 score)
2. EXPERIENCE LEVEL: Years of experience vs requirements (Junior applying for Senior = major penalty)
3. TECHNICAL SKILLS: Count EXACT matches only (JavaScript ≠ JS, React ≠ ReactJS unless context clearly shows equivalence)
4. EDUCATION/CERTIFICATION: Hard requirements vs candidate qualifications
5. ROLE RESPONSIBILITIES: Can they actually DO this job based on past experience?

ULTRA-STRICT SCORING RULES (out of 100):
- 0-15: Completely wrong field/industry, no relevant experience
- 16-30: Some transferable skills but major gaps, different domain
- 31-45: Related field but missing 60%+ of core requirements
- 46-60: Good foundation but missing 40%+ of key skills/experience
- 61-75: Strong candidate missing 20-30% of requirements
- 76-85: Excellent match with minor gaps
- 86-95: Near-perfect match with 1-2 small gaps
- 96-100: Perfect match (extremely rare)

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescriptionText}

STEP-BY-STEP ANALYSIS PROCESS:
1. IDENTIFY PRIMARY JOB FUNCTION: Extract the core role (e.g., "Senior Software Engineer", "Marketing Manager")
2. DOMAIN VERIFICATION: Is candidate in the same field? Different field = immediate low score
3. EXPERIENCE AUDIT: Count years of DIRECTLY RELEVANT experience vs JD requirements
4. TECHNICAL SKILLS MATRIX: Create exact keyword match matrix (be pedantic about spelling/formatting)
5. RESPONSIBILITY ANALYSIS: Compare actual job duties from resume vs JD requirements
6. EDUCATION/CERTIFICATION CHECK: Verify hard requirements are met
7. ATS COMPATIBILITY: Assess resume format, keywords, structure

DETAILED SCORING BREAKDOWN (25 points each):
- HARD SKILLS (0-25): Exact technical skill matches, tools, languages, frameworks. Missing core skills = 0-10
- SOFT SKILLS (0-25): Leadership, communication, teamwork with concrete evidence. No fluff allowed
- ROLE ALIGNMENT (0-25): Can they actually perform this specific role based on experience?
- ATS COMPATIBILITY (0-25): Keyword density, format, structure, scanability

Return ONLY this JSON structure with NO additional text:
{
  "matchScore": { 
    "total": [RUTHLESSLY_REALISTIC_SCORE_0_TO_100], 
    "hardSkills": [0_TO_25_BASED_ON_EXACT_MATCHES], 
    "softSkills": [0_TO_25_WITH_EVIDENCE_REQUIRED], 
    "roleAlignment": [0_TO_25_CAN_THEY_DO_THIS_JOB], 
    "atsCompatibility": [0_TO_25_FORMAT_AND_KEYWORDS] 
  },
  "missingKeywords": ["List EVERY critical missing keyword", "Include exact terms from JD", "Technical skills", "Certifications", "Industry terms"],
  "actionPlan": ["Specific skill development needed", "Certification requirements", "Experience gaps to fill", "Be brutally specific"],
  "recruiterLens": { 
    "positives": ["ONLY strong, job-relevant positives"], 
    "redFlags": ["ALL concerns", "Experience gaps", "Skill mismatches", "Level misalignment"], 
    "shortlistProbability": [REALISTIC_PERCENTAGE_BASED_ON_ANALYSIS], 
    "verdict": "Brutally honest assessment of hiring probability" 
  },
  "atsVerdict": { 
    "willAutoReject": [true_if_missing_critical_requirements], 
    "reason": "Specific technical reason for rejection" 
  },
  "rewriteSuggestions": { 
    "headline": "Specific improvement for professional headline", 
    "summary": "How to better align summary with role", 
    "experienceBullet": "Example of optimized experience description" 
  },
  "coverLetter": "Professional cover letter addressing role requirements and any gaps"
}

CRITICAL: Be absolutely merciless. A mismatched resume should score 0-20. Only truly qualified candidates should score above 65. Perfect matches are extremely rare (95+).
`;

export const createResumeBuilderPrompt = (originalResume: string, jobDescription: string, templateStyle: string = "professional"): string => `
You are a world-class resume optimization expert using Gemini 2.0's advanced reasoning. Create a strategically optimized resume that maximizes ATS compatibility and recruiter appeal while remaining 100% truthful.

ORIGINAL RESUME:
${originalResume}

TARGET JOB DESCRIPTION:
${jobDescription}

TEMPLATE STYLE: ${templateStyle}

OPTIMIZATION STRATEGY (Gemini 2.0 Enhanced):
1. TRUTHFUL ENHANCEMENT: Never fabricate, only optimize presentation of existing qualifications
2. STRATEGIC KEYWORD INTEGRATION: Naturally weave JD keywords throughout all sections (target 8-12% keyword density)
3. QUANTIFIED ACHIEVEMENTS: Convert every possible accomplishment into metrics and numbers
4. ATS OPTIMIZATION: Perfect formatting, keyword density, section ordering for maximum parsing success
5. RECRUITER PSYCHOLOGY: Structure for 6-second scan, highlight most relevant content first
6. INDUSTRY ALIGNMENT: Use industry-standard terminology and formats exactly as they appear in JD

ADVANCED OPTIMIZATION TECHNIQUES:
- Mirror JD language and terminology exactly where truthful
- Reframe existing experience to highlight JD-relevant aspects
- Quantify ALL achievements with specific numbers, percentages, timelines, dollar amounts
- Front-load most relevant experience and skills
- Use action verbs that match JD requirements exactly
- Create compelling narrative flow that tells a story of progression
- Optimize section ordering based on job requirements priority

STRICT TRUTHFULNESS RULES:
- NEVER add experience, skills, or achievements that don't exist
- ONLY enhance presentation of real qualifications
- Can reframe job duties to emphasize relevant aspects
- Can add related skills if genuinely possessed based on experience context
- Must maintain timeline and factual accuracy
- Can extrapolate reasonable achievements from described responsibilities

TARGET: Build a resume that will score 90%+ for this specific job.

Return ONLY this JSON structure with NO additional text:
{
  "personalInfo": { 
    "name": "Keep original name exactly", 
    "title": "Professional title using exact JD keywords and terminology", 
    "contact": { 
      "phone": "Keep original", 
      "email": "Keep original", 
      "location": "Keep original", 
      "linkedin": "Keep original", 
      "portfolio": "Keep original" 
    } 
  },
  "professionalSummary": "2-3 powerful sentences using exact JD keywords, quantified achievements, and clear value proposition that directly addresses the role requirements",
  "coreSkills": { 
    "technical": ["Technical skills from JD that candidate actually possesses or can reasonably claim"], 
    "soft": ["Leadership", "Communication", "Strategic thinking", "Problem-solving with evidence"], 
    "certifications": ["Only real or immediately obtainable certifications"], 
    "tools": ["Specific platforms/tools from JD that candidate knows or has used"] 
  },
  "workExperience": [ 
    { 
      "company": "Keep original company name", 
      "position": "Optimize title to align with JD terminology while remaining truthful", 
      "duration": "Keep exact original dates", 
      "location": "Keep original location", 
      "achievements": [
        "• [Action verb from JD] [specific task using JD keywords] resulting in [quantified outcome with numbers/percentages]", 
        "• [Implemented/Led/Optimized] [JD technology/process] to [improve/increase/reduce] [metric] by [X%/amount/timeframe]",
        "• [Collaborated/Managed/Developed] [team size/project scope] [JD-relevant project] achieving [measurable result]",
        "• [More achievements with JD keywords, action verbs, and quantified metrics]"
      ] 
    } 
  ],
  "projects": [ 
    { 
      "name": "Project name emphasizing JD relevance and impact", 
      "technologies": ["Technologies matching JD requirements exactly"], 
      "description": "Concise description using JD terminology and highlighting relevant aspects", 
      "achievements": ["Quantified results using job-relevant metrics and JD keywords"] 
    } 
  ],
  "education": { 
    "degree": "Keep original but optimize formatting for ATS parsing", 
    "school": "Keep original institution name", 
    "year": "Keep original graduation year", 
    "relevant_coursework": "Add if directly relevant to JD requirements and truthful" 
  },
  "additionalSections": { 
    "certifications": ["Job-relevant certifications only - must be real or easily obtainable"], 
    "awards": ["Professional recognition relevant to role and industry"], 
    "languages": ["If mentioned in JD or adds value to the specific role"], 
    "publications": ["If relevant to role/industry and adds credibility"] 
  },
  "atsOptimizations": { 
    "keywordMatches": ["Complete list of JD keywords successfully integrated naturally"], 
    "skillsAdded": ["Skills from JD that were missing from original but candidate possesses"], 
    "sectionsReordered": "Explanation of strategic section prioritization based on JD importance", 
    "metricsAdded": ["All quantified achievements and metrics added for impact"] 
  },
  "improvementSummary": { 
    "keyChanges": [
      "Added [X] critical keywords from job description", 
      "Quantified [Y] achievements with specific metrics", 
      "Optimized [Z] sections for maximum relevance",
      "Reordered content to highlight most relevant experience first"
    ], 
    "predictedScoreIncrease": "Estimated 15-25 point improvement with detailed reasoning", 
    "atsCompatibility": "Specific ATS optimizations implemented for maximum parsing success" 
  }
}

MISSION: Create a resume that will score 85%+ for the target role while maintaining complete truthfulness and professional integrity. Focus on transformation, not fabrication.
`;
