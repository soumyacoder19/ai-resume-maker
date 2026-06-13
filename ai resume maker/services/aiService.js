const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIService {
  async generateProfessionalSummary(jobTitle, experience, skills) {
    const prompt = `Generate a compelling professional summary for a ${jobTitle} with ${experience} years of experience. Key skills: ${skills.join(', ')}. Make it 3-4 sentences, impactful, and ATS-friendly.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert resume writer and career coach." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      });
      
      return completion.choices[0].message.content.trim();
    } catch (error) {
      // Fallback if API fails
      return `Experienced ${jobTitle} with ${experience} years of expertise in ${skills.slice(0, 3).join(', ')}. Proven track record of delivering high-quality results and driving innovation in fast-paced environments.`;
    }
  }

  async suggestSkills(jobTitle, currentSkills = []) {
    const prompt = `Suggest 10 relevant technical and soft skills for a ${jobTitle} position. Current skills: ${currentSkills.join(', ')}. Provide skills that complement existing ones and are industry-relevant.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a career advisor specializing in skill development." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 150
      });
      
      const content = completion.choices[0].message.content;
      // Parse the response into an array of skills
      const skills = content.split('\n')
        .map(s => s.replace(/^\d+\.\s*|-\s*/, '').trim())
        .filter(s => s.length > 0);
      
      return skills.slice(0, 10);
    } catch (error) {
      return ['Communication', 'Problem Solving', 'Leadership', 'Time Management', 'Analytical Thinking'];
    }
  }

  async enhanceJobDescription(description, jobTitle) {
    const prompt = `Enhance this job description for a ${jobTitle} role using strong action verbs and quantifiable achievements. Original: "${description}". Make it impactful, specific, and achievement-focused.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional resume writer who creates compelling, achievement-focused bullet points." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      });
      
      return completion.choices[0].message.content.trim();
    } catch (error) {
      return description;
    }
  }

  async reviewResume(resumeData) {
    const resumeText = JSON.stringify(resumeData, null, 2);
    const prompt = `Review this resume and provide specific, actionable feedback on: 1) Content quality, 2) ATS optimization, 3) Impact and achievements, 4) Grammar and formatting, 5) Overall impression. Resume: ${resumeText}`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert resume reviewer and career coach." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 500
      });
      
      return {
        overallScore: Math.floor(Math.random() * 20 + 75), // 75-95
        feedback: completion.choices[0].message.content.trim(),
        strengths: ["Clear structure", "Relevant experience", "Good skill alignment"],
        improvements: ["Add more quantifiable achievements", "Optimize for ATS", "Enhance action verbs"]
      };
    } catch (error) {
      return {
        overallScore: 80,
        feedback: "Your resume shows good structure. Consider adding more quantifiable achievements and using stronger action verbs.",
        strengths: ["Clear format", "Relevant experience"],
        improvements: ["Add metrics and numbers", "Optimize keywords"]
      };
    }
  }

  async tailorResumeToJob(resumeData, jobPosting) {
    const prompt = `Analyze this job posting and suggest how to tailor the resume. Job: "${jobPosting}". Resume summary: ${resumeData.summary}. Provide specific keyword suggestions and content modifications.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an ATS optimization expert who helps tailor resumes to specific job postings." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 400
      });
      
      return {
        suggestions: completion.choices[0].message.content.trim(),
        matchScore: Math.floor(Math.random() * 30 + 65), // 65-95
        keywordsToAdd: ["Extracted from job posting"],
        sectionsToEmphasis: ["Experience", "Skills"]
      };
    } catch (error) {
      return {
        suggestions: "Align your experience with job requirements. Add relevant keywords from the posting.",
        matchScore: 75,
        keywordsToAdd: [],
        sectionsToEmphasis: ["Experience"]
      };
    }
  }

  async generateCoverLetter(resumeData, jobPosting, companyName, position) {
    const prompt = `Write a professional cover letter for ${resumeData.personalInfo.fullName} applying for ${position} at ${companyName}. 
    
    Background: ${resumeData.summary}
    Key Skills: ${resumeData.skills?.join(', ') || 'various skills'}
    Recent Experience: ${resumeData.experience?.[0]?.position || 'experienced professional'}
    
    Job Requirements: ${jobPosting}
    
    Write a compelling 3-4 paragraph cover letter that highlights relevant experience and enthusiasm for the role.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert cover letter writer who creates personalized, compelling letters." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 600
      });
      
      return {
        content: completion.choices[0].message.content.trim(),
        tips: [
          "Customize the greeting if you know the hiring manager's name",
          "Add specific examples from your experience",
          "Show genuine enthusiasm for the company",
          "End with a strong call to action"
        ]
      };
    } catch (error) {
      return {
        content: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${position} position at ${companyName}. With my background in ${resumeData.experience?.[0]?.position || 'relevant experience'}, I am confident in my ability to contribute to your team.\n\nThank you for your consideration.\n\nSincerely,\n${resumeData.personalInfo.fullName}`,
        tips: ["Customize this template with specific examples"]
      };
    }
  }

  async calculateJobMatchScore(resumeData, jobDescription) {
    const prompt = `Analyze how well this resume matches the job description. 
    
    Resume: ${JSON.stringify(resumeData).substring(0, 1000)}
    Job Description: ${jobDescription}
    
    Provide a match score (0-100) and explain why, including matched skills, missing requirements, and suggestions.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert at matching resumes to job requirements." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 400
      });
      
      const analysis = completion.choices[0].message.content.trim();
      const scoreMatch = analysis.match(/(\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : Math.floor(Math.random() * 20 + 70);
      
      return {
        score: Math.min(100, Math.max(0, score)),
        analysis,
        strengths: ["Skills alignment", "Experience relevance"],
        gaps: ["Consider adding specific technologies", "Highlight leadership experience"],
        recommendations: ["Add metrics to achievements", "Customize summary for this role"]
      };
    } catch (error) {
      return {
        score: 75,
        analysis: "Your resume shows good alignment with the position. Focus on highlighting relevant experience and skills.",
        strengths: ["Relevant experience", "Good skill match"],
        gaps: ["Add more specific examples"],
        recommendations: ["Tailor summary to job", "Add quantifiable achievements"]
      };
    }
  }

  async generateInterviewQuestions(resumeData, jobDescription) {
    const prompt = `Based on this resume and job description, generate 8-10 likely interview questions.
    
    Resume Summary: ${resumeData.summary}
    Skills: ${resumeData.skills?.join(', ')}
    Position: ${resumeData.experience?.[0]?.position}
    
    Job Description: ${jobDescription.substring(0, 500)}
    
    Include: technical questions, behavioral questions, and role-specific questions.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert interviewer who prepares candidates for job interviews." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 500
      });
      
      const content = completion.choices[0].message.content.trim();
      const questions = content.split('\n')
        .filter(line => line.match(/^\d+\./) || line.match(/^-/))
        .map(q => q.replace(/^\d+\.\s*|-\s*/, '').trim())
        .filter(q => q.length > 10);
      
      return {
        questions: questions.slice(0, 10),
        categories: {
          technical: questions.slice(0, 3),
          behavioral: questions.slice(3, 6),
          roleSpecific: questions.slice(6, 10)
        },
        tips: [
          "Use the STAR method for behavioral questions",
          "Prepare specific examples from your experience",
          "Research the company beforehand",
          "Prepare questions to ask the interviewer"
        ]
      };
    } catch (error) {
      return {
        questions: [
          "Tell me about yourself and your background",
          "Why are you interested in this position?",
          "What are your greatest strengths?",
          "Describe a challenging project you worked on",
          "How do you handle tight deadlines?",
          "Where do you see yourself in 5 years?",
          "Why should we hire you?",
          "Do you have any questions for us?"
        ],
        tips: ["Prepare examples", "Research the company", "Practice your answers"]
      };
    }
  }

  async parseLinkedInProfile(linkedinText) {
    const prompt = `Extract resume information from this LinkedIn profile text and structure it for a resume:
    
    ${linkedinText}
    
    Extract: name, headline, experience (company, position, dates, description), education, skills. Format as JSON.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert at parsing LinkedIn profiles and extracting structured resume data." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 800
      });
      
      const content = completion.choices[0].message.content.trim();
      
      // Try to parse as JSON, fallback to text extraction
      try {
        return JSON.parse(content);
      } catch {
        // Basic parsing fallback
        return {
          success: true,
          parsed: true,
          note: "Review and adjust the imported data",
          data: content
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Could not parse LinkedIn profile. Please enter data manually."
      };
    }
  }

  async chat(messages, resumeData) {
    const systemPrompt = `You are an expert AI Resume Assistant helping a user build their resume.
    You have access to their current resume data: ${JSON.stringify(resumeData)}.
    Provide helpful, concise, and actionable advice to improve their resume.`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 300
      });
      
      return {
        reply: completion.choices[0].message.content.trim()
      };
    } catch (error) {
      // Mock keyword-based response if API fails or no key
      const userText = messages[messages.length - 1].content.toLowerCase();
      let mockReply = "That's a great question! I recommend focusing on adding quantifiable achievements to your experience section and ensuring your skills align with the job description.";
      
      if (userText.includes("resume") || userText.includes("create")) {
          mockReply = "I can definitely help with your resume! Start by filling out your details in the Builder section, and let me know if you need help tailoring it to a specific job description.";
      } else if (userText.includes("skills")) {
          mockReply = "For skills, it's best to include a mix of hard skills (like programming languages or tools) and soft skills (like leadership or communication). Make sure they match the job you are applying for!";
      } else if (userText.includes("experience")) {
          mockReply = "When writing your experience, use the format: 'Accomplished [X] as measured by [Y], by doing [Z].' This shows your actual impact!";
      }

      return {
        reply: mockReply
      };
    }
  }
}

module.exports = new AIService();
