const natural = require('natural');

class ResumeOptimizer {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.TfIdf = natural.TfIdf;
  }

  analyzeATSCompatibility(resumeData, jobDescription = '') {
    const analysis = {
      score: 0,
      issues: [],
      recommendations: [],
      goodPractices: []
    };

    let score = 100;

    // Check for contact information
    if (!resumeData.personalInfo.email) {
      analysis.issues.push('Missing email address');
      score -= 10;
    }
    if (!resumeData.personalInfo.phone) {
      analysis.issues.push('Missing phone number');
      score -= 5;
    }

    // Check for summary
    if (!resumeData.summary || resumeData.summary.length < 50) {
      analysis.issues.push('Professional summary is missing or too short');
      score -= 10;
    } else {
      analysis.goodPractices.push('Includes professional summary');
    }

    // Check for experience
    if (!resumeData.experience || resumeData.experience.length === 0) {
      analysis.issues.push('No work experience listed');
      score -= 20;
    } else {
      analysis.goodPractices.push('Work experience included');
      
      // Check for quantifiable achievements
      const hasNumbers = resumeData.experience.some(job => {
        const desc = Array.isArray(job.description) ? job.description.join(' ') : job.description;
        return /\d+/.test(desc);
      });
      
      if (hasNumbers) {
        analysis.goodPractices.push('Includes quantifiable achievements');
      } else {
        analysis.recommendations.push('Add numbers and metrics to demonstrate impact');
        score -= 5;
      }
    }

    // Check for education
    if (!resumeData.education || resumeData.education.length === 0) {
      analysis.issues.push('No education listed');
      score -= 10;
    } else {
      analysis.goodPractices.push('Education section included');
    }

    // Check for skills
    if (!resumeData.skills || resumeData.skills.length === 0) {
      analysis.issues.push('No skills listed');
      score -= 15;
    } else if (resumeData.skills.length < 5) {
      analysis.recommendations.push('Add more relevant skills (aim for 8-12)');
      score -= 5;
    } else {
      analysis.goodPractices.push('Comprehensive skills section');
    }

    // Check for action verbs
    const actionVerbs = [
      'achieved', 'improved', 'developed', 'managed', 'created', 'led',
      'implemented', 'designed', 'increased', 'reduced', 'optimized'
    ];
    
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const hasActionVerbs = actionVerbs.some(verb => resumeText.includes(verb));
    
    if (hasActionVerbs) {
      analysis.goodPractices.push('Uses strong action verbs');
    } else {
      analysis.recommendations.push('Use more action verbs to start bullet points');
      score -= 5;
    }

    // Keyword matching if job description provided
    if (jobDescription) {
      const keywords = this.extractAndMatchKeywords(resumeData, jobDescription);
      if (keywords.matchRate < 50) {
        analysis.recommendations.push('Increase keyword match with job description');
        score -= 10;
      } else if (keywords.matchRate > 70) {
        analysis.goodPractices.push('Good keyword alignment with job posting');
      }
    }

    analysis.score = Math.max(0, Math.min(100, score));
    
    if (analysis.score >= 80) {
      analysis.overall = 'Excellent - ATS optimized';
    } else if (analysis.score >= 60) {
      analysis.overall = 'Good - Minor improvements needed';
    } else {
      analysis.overall = 'Needs improvement - Address critical issues';
    }

    return analysis;
  }

  extractAndMatchKeywords(resumeData, jobDescription) {
    const tfidf = new this.TfIdf();
    
    // Prepare resume text
    const resumeText = [
      resumeData.summary || '',
      ...resumeData.skills || [],
      ...(resumeData.experience || []).flatMap(exp => 
        Array.isArray(exp.description) ? exp.description : [exp.description]
      )
    ].join(' ');

    tfidf.addDocument(resumeText.toLowerCase());
    tfidf.addDocument(jobDescription.toLowerCase());

    // Extract keywords from job description
    const jobTokens = this.tokenizer.tokenize(jobDescription.toLowerCase());
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']);
    
    const jobKeywords = jobTokens
      .filter(token => token.length > 3 && !stopWords.has(token))
      .filter((token, index, self) => self.indexOf(token) === index);

    // Find matching keywords
    const resumeTokens = this.tokenizer.tokenize(resumeText.toLowerCase());
    const resumeKeywordSet = new Set(resumeTokens);
    
    const matchedKeywords = jobKeywords.filter(kw => resumeKeywordSet.has(kw));
    const missingKeywords = jobKeywords.filter(kw => !resumeKeywordSet.has(kw));

    const matchRate = jobKeywords.length > 0 
      ? (matchedKeywords.length / jobKeywords.length) * 100 
      : 0;

    return {
      matchRate: Math.round(matchRate),
      totalJobKeywords: jobKeywords.length,
      matchedKeywords: matchedKeywords.slice(0, 20),
      missingKeywords: missingKeywords.slice(0, 15),
      suggestions: this.generateKeywordSuggestions(missingKeywords)
    };
  }

  generateKeywordSuggestions(missingKeywords) {
    return missingKeywords.slice(0, 10).map(keyword => ({
      keyword,
      suggestion: `Consider adding "${keyword}" to relevant sections`
    }));
  }

  scoreResume(resumeData) {
    let score = 0;
    const maxScore = 100;
    
    // Completeness (40 points)
    if (resumeData.personalInfo.fullName) score += 5;
    if (resumeData.personalInfo.email) score += 5;
    if (resumeData.personalInfo.phone) score += 5;
    if (resumeData.summary && resumeData.summary.length > 50) score += 10;
    if (resumeData.experience && resumeData.experience.length > 0) score += 10;
    if (resumeData.education && resumeData.education.length > 0) score += 5;
    
    // Skills (20 points)
    if (resumeData.skills) {
      if (resumeData.skills.length >= 8) score += 20;
      else if (resumeData.skills.length >= 5) score += 15;
      else if (resumeData.skills.length >= 3) score += 10;
    }
    
    // Quality indicators (40 points)
    const resumeText = JSON.stringify(resumeData);
    if (/\d+%|\d+\+/.test(resumeText)) score += 10; // Numbers/metrics
    if (/achieved|improved|increased|reduced|led|managed/i.test(resumeText)) score += 10; // Action verbs
    if (resumeData.certifications && resumeData.certifications.length > 0) score += 10;
    if (resumeData.summary && resumeData.summary.length > 100) score += 5;
    if (resumeData.experience && resumeData.experience.length >= 3) score += 5;
    
    return Math.min(score, maxScore);
  }
}

module.exports = new ResumeOptimizer();
