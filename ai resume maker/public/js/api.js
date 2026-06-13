// API interactions

import { showToast } from './ui.js';

async function fetchAPI(endpoint, body) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Unknown API error');
        }
        
        return data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        showToast(`Operation failed: ${error.message}`, 'error');
        throw error;
    }
}

export async function apiSuggestSummary(jobTitle, experience, skills) {
    return await fetchAPI('/api/suggest-summary', { jobTitle, experience, skills });
}

export async function apiSuggestSkills(jobTitle, currentSkills) {
    return await fetchAPI('/api/suggest-skills', { jobTitle, currentSkills });
}

export async function apiEnhanceDescription(description, jobTitle) {
    return await fetchAPI('/api/enhance-description', { description, jobTitle });
}

export async function apiAnalyzeATS(resumeData) {
    return await fetchAPI('/api/analyze-ats', { resumeData });
}

export async function apiOptimizeKeywords(resumeData, jobDescription) {
    return await fetchAPI('/api/optimize-keywords', { resumeData, jobDescription });
}

export async function apiTailorResume(resumeData, jobPosting) {
    return await fetchAPI('/api/tailor-resume', { resumeData, jobPosting });
}

export async function apiReviewResume(resumeData) {
    return await fetchAPI('/api/review-resume', { resumeData });
}

export async function apiGenerateCoverLetter(resumeData, jobPosting, companyName, position) {
    return await fetchAPI('/api/generate-cover-letter', { resumeData, jobPosting, companyName, position });
}

export async function apiGenerateInterviewQuestions(resumeData, jobDescription) {
    return await fetchAPI('/api/interview-prep', { resumeData, jobDescription });
}

export async function apiChat(messages, resumeData) {
    return await fetchAPI('/api/chat', { messages, resumeData });
}

export async function apiGeneratePDF(resumeData, template) {
    try {
        const response = await fetch('/api/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeData, template })
        });
        
        if (!response.ok) throw new Error('PDF Generation failed');
        
        return await response.blob();
    } catch (error) {
        console.error('Error generating PDF:', error);
        showToast(`PDF Generation failed: ${error.message}`, 'error');
        throw error;
    }
}
