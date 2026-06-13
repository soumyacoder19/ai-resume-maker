// State Management with LocalStorage persistence

export let resumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: []
};

export let currentTemplate = 'modern';

export function saveState() {
    try {
        localStorage.setItem('ai_resume_data', JSON.stringify(resumeData));
        localStorage.setItem('ai_resume_template', currentTemplate);
        showSaveIndicator();
    } catch (e) {
        console.error("Failed to save state to localStorage", e);
    }
}

export function loadState() {
    try {
        const savedData = localStorage.getItem('ai_resume_data');
        const savedTemplate = localStorage.getItem('ai_resume_template');
        
        if (savedData) {
            resumeData = JSON.parse(savedData);
        }
        if (savedTemplate) {
            currentTemplate = savedTemplate;
        }
    } catch (e) {
        console.error("Failed to load state from localStorage", e);
    }
}

export function setTemplate(template) {
    currentTemplate = template;
    saveState();
}

let saveTimeout;
function showSaveIndicator() {
    const indicator = document.getElementById('saveIndicator');
    if (!indicator) return;
    
    indicator.classList.remove('hidden');
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        indicator.classList.add('hidden');
    }, 2000);
}

export function calculateScore() {
    let score = 0;
    
    // Personal Info (20 points)
    if (resumeData.personalInfo.fullName) score += 5;
    if (resumeData.personalInfo.email) score += 5;
    if (resumeData.personalInfo.phone) score += 5;
    if (resumeData.personalInfo.location) score += 5;
    
    // Summary (15 points)
    if (resumeData.summary && resumeData.summary.length > 50) score += 15;
    else if (resumeData.summary) score += 8;
    
    // Experience (30 points)
    if (resumeData.experience.length >= 3) score += 30;
    else if (resumeData.experience.length >= 2) score += 20;
    else if (resumeData.experience.length >= 1) score += 10;
    
    // Education (15 points)
    if (resumeData.education.length >= 1) score += 15;
    
    // Skills (15 points)
    if (resumeData.skills.length >= 8) score += 15;
    else if (resumeData.skills.length >= 5) score += 10;
    else if (resumeData.skills.length >= 3) score += 5;
    
    // Certifications (5 points)
    if (resumeData.certifications.length > 0) score += 5;
    
    const scoreValueHeader = document.getElementById('scoreValueHeader');
    if (scoreValueHeader) {
        scoreValueHeader.textContent = score;
    }
    
    return score;
}
