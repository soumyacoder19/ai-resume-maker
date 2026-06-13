const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const aiService = require('./services/aiService');
const pdfGenerator = require('./services/pdfGenerator');
const resumeOptimizer = require('./services/resumeOptimizer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// AI-powered content suggestions
app.post('/api/suggest-summary', async (req, res) => {
  try {
    const { jobTitle, experience, skills } = req.body;
    const summary = await aiService.generateProfessionalSummary(jobTitle, experience, skills);
    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI-powered skill suggestions
app.post('/api/suggest-skills', async (req, res) => {
  try {
    const { jobTitle, currentSkills } = req.body;
    const skills = await aiService.suggestSkills(jobTitle, currentSkills);
    res.json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Enhance job descriptions
app.post('/api/enhance-description', async (req, res) => {
  try {
    const { description, jobTitle } = req.body;
    const enhanced = await aiService.enhanceJobDescription(description, jobTitle);
    res.json({ success: true, enhanced });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ATS optimization analysis
app.post('/api/analyze-ats', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    const analysis = await resumeOptimizer.analyzeATSCompatibility(resumeData, jobDescription);
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Keyword optimization
app.post('/api/optimize-keywords', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    const keywords = await resumeOptimizer.extractAndMatchKeywords(resumeData, jobDescription);
    res.json({ success: true, keywords });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate PDF resume
app.post('/api/generate-pdf', async (req, res) => {
  try {
    const { resumeData, template } = req.body;
    const pdfBuffer = await pdfGenerator.generatePDF(resumeData, template);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI-powered resume review
app.post('/api/review-resume', async (req, res) => {
  try {
    const { resumeData } = req.body;
    const review = await aiService.reviewResume(resumeData);
    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Tailor resume to job posting
app.post('/api/tailor-resume', async (req, res) => {
  try {
    const { resumeData, jobPosting } = req.body;
    const tailored = await aiService.tailorResumeToJob(resumeData, jobPosting);
    res.json({ success: true, tailored });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// NEW: Generate AI Cover Letter
app.post('/api/generate-cover-letter', async (req, res) => {
  try {
    const { resumeData, jobPosting, companyName, position } = req.body;
    const coverLetter = await aiService.generateCoverLetter(resumeData, jobPosting, companyName, position);
    res.json({ success: true, coverLetter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// NEW: Calculate Job Match Score
app.post('/api/job-match-score', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    const matchScore = await aiService.calculateJobMatchScore(resumeData, jobDescription);
    res.json({ success: true, matchScore });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// NEW: Get Interview Questions
app.post('/api/interview-prep', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    const questions = await aiService.generateInterviewQuestions(resumeData, jobDescription);
    res.json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// NEW: Parse LinkedIn Profile
app.post('/api/parse-linkedin', async (req, res) => {
  try {
    const { linkedinText } = req.body;
    const parsedData = await aiService.parseLinkedInProfile(linkedinText);
    res.json({ success: true, parsedData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// NEW: Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, resumeData } = req.body;
    const response = await aiService.chat(messages, resumeData);
    res.json({ success: true, reply: response.reply });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Resume Maker running on http://localhost:${PORT}`);
});
