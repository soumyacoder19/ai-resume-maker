// Main entry point

import { resumeData, loadState, saveState, calculateScore, setTemplate, currentTemplate } from './state.js';
import * as api from './api.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check local storage and load state
    // loadState(); // Disabled auto-load based on user request
    
    // Set template selector if exists
    const templateSelector = document.getElementById('templateSelector');
    if (templateSelector) {
        templateSelector.value = currentTemplate;
    }
    
    // Hydrate UI based on loaded data
    ui.hydrateForm();
    ui.updatePreview();
    calculateScore();
    
    // Setup listeners for personal info
    ['fullName', 'email', 'phone', 'location', 'linkedin', 'website'].forEach(field => {
        const el = document.getElementById(field);
        if (el) {
            el.addEventListener('input', (e) => {
                resumeData.personalInfo[field] = e.target.value;
                ui.updatePreview();
                calculateScore();
                saveState();
            });
        }
    });
    
    const summaryEl = document.getElementById('summary');
    if (summaryEl) {
        summaryEl.addEventListener('input', (e) => {
            resumeData.summary = e.target.value;
            ui.updatePreview();
            calculateScore();
            saveState();
        });
    }

    // Initialize Dark Mode based on preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Expose functions to window for inline HTML onclick handlers
window.showSection = ui.showSection;
window.togglePreview = ui.togglePreview;
window.closeModal = ui.closeModal;
window.selectTemplate = (template) => {
    setTemplate(template);
    ui.updatePreview();
};

window.updatePreview = () => {
    ui.updatePreview();
    saveState();
};

window.toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
};

// Data Management
window.clearData = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
        // Reset all resume data properties without changing the object reference entirely
        resumeData.personalInfo = { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '' };
        resumeData.summary = '';
        resumeData.experience = [];
        resumeData.education = [];
        resumeData.skills = [];
        resumeData.certifications = [];
        saveState();
        ui.hydrateForm();
        ui.updatePreview();
        calculateScore();
        ui.showToast('Data cleared successfully.', 'success');
    }
};

window.exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resume_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    ui.showToast('Data exported successfully.', 'success');
};

window.importData = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                if (importedData.personalInfo) {
                    Object.assign(resumeData, importedData);
                    saveState();
                    ui.hydrateForm();
                    ui.updatePreview();
                    calculateScore();
                    ui.showToast('Data imported successfully.', 'success');
                } else {
                    ui.showToast('Invalid JSON file.', 'error');
                }
            } catch (error) {
                ui.showToast('Error parsing JSON file.', 'error');
            }
        };
        reader.readAsText(file);
    }
    // Reset file input
    event.target.value = '';
};

// Chatbot functionality
window.toggleChatbot = () => {
    const chatbot = document.getElementById('chatbotContainer');
    const icon = document.getElementById('chatbotToggleIcon');
    chatbot.classList.toggle('open');
    if (chatbot.classList.contains('open')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
};

window.handleChatKeyPress = (event) => {
    if (event.key === 'Enter') {
        window.sendChatMessage();
    }
};

window.sendChatMessage = async () => {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message to UI
    const chatBody = document.getElementById('chatbotBody');
    chatBody.insertAdjacentHTML('beforeend', `<div class="chat-message user"><p>${message}</p></div>`);
    input.value = '';
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Add loading indicator
    const loadingId = 'loading-' + Date.now();
    chatBody.insertAdjacentHTML('beforeend', `<div id="${loadingId}" class="chat-message bot"><p><i class="fas fa-ellipsis-h fa-fade"></i></p></div>`);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    try {
        const data = await api.apiChat([{ role: 'user', content: message }], resumeData);
        document.getElementById(loadingId).remove();
        chatBody.insertAdjacentHTML('beforeend', `<div class="chat-message bot"><p>${data.reply}</p></div>`);
    } catch (e) {
        document.getElementById(loadingId).innerHTML = `<p class="text-error">Sorry, I encountered an error.</p>`;
    }
    chatBody.scrollTop = chatBody.scrollHeight;
};

// Experience functions
window.addExperience = () => {
    resumeData.experience.push({ position:'', company:'', location:'', startDate:'', endDate:'', description:[] });
    ui.renderExperienceItem(resumeData.experience.length - 1, resumeData.experience[resumeData.experience.length - 1]);
    saveState();
};
window.updateExperience = (index, field, value) => {
    if (field === 'description') {
        resumeData.experience[index][field] = value.split('\n').filter(line => line.trim());
    } else {
        resumeData.experience[index][field] = value;
    }
    ui.updatePreview();
    calculateScore();
    saveState();
};
window.removeExperience = (index) => {
    resumeData.experience.splice(index, 1);
    document.getElementById('experienceContainer').innerHTML = '';
    resumeData.experience.forEach((exp, i) => ui.renderExperienceItem(i, exp));
    ui.updatePreview();
    saveState();
};

// Education functions
window.addEducation = () => {
    resumeData.education.push({ degree:'', institution:'', location:'', graduationDate:'', gpa:'' });
    ui.renderEducationItem(resumeData.education.length - 1, resumeData.education[resumeData.education.length - 1]);
    saveState();
};
window.updateEducation = (index, field, value) => {
    resumeData.education[index][field] = value;
    ui.updatePreview();
    calculateScore();
    saveState();
};
window.removeEducation = (index) => {
    resumeData.education.splice(index, 1);
    document.getElementById('educationContainer').innerHTML = '';
    resumeData.education.forEach((edu, i) => ui.renderEducationItem(i, edu));
    ui.updatePreview();
    saveState();
};

// Skills functions
window.addSkill = () => {
    const input = document.getElementById('skillInput');
    const skill = input.value.trim();
    if (skill && !resumeData.skills.includes(skill)) {
        resumeData.skills.push(skill);
        ui.renderSkills();
        input.value = '';
        ui.updatePreview();
        calculateScore();
        saveState();
    }
};
window.addSkillOnEnter = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        window.addSkill();
    }
};
window.removeSkill = (skill) => {
    resumeData.skills = resumeData.skills.filter(s => s !== skill);
    ui.renderSkills();
    ui.updatePreview();
    saveState();
};

// Certification functions
window.addCertification = () => {
    resumeData.certifications.push({ name:'', issuer:'', date:'' });
    ui.renderCertificationItem(resumeData.certifications.length - 1, resumeData.certifications[resumeData.certifications.length - 1]);
    saveState();
};
window.updateCertification = (index, field, value) => {
    resumeData.certifications[index][field] = value;
    ui.updatePreview();
    saveState();
};
window.removeCertification = (index) => {
    resumeData.certifications.splice(index, 1);
    document.getElementById('certificationsContainer').innerHTML = '';
    resumeData.certifications.forEach((cert, i) => ui.renderCertificationItem(i, cert));
    ui.updatePreview();
    saveState();
};

// AI Features

window.generateSummary = async () => {
    const jobTitle = prompt('What is your target job title?');
    const experience = prompt('How many years of experience do you have?');
    if (!jobTitle || !experience) return;
    
    // Find button to set loading
    const btn = document.querySelector('.section-header .btn-ai');
    ui.setButtonLoading(btn, true);
    
    try {
        const data = await api.apiSuggestSummary(jobTitle, experience, resumeData.skills);
        ui.showModal('AI-Generated Summary', `<p>${data.summary}</p>`, () => {
            document.getElementById('summary').value = data.summary;
            resumeData.summary = data.summary;
            ui.updatePreview();
            calculateScore();
            saveState();
            ui.closeModal();
            ui.showToast('Summary applied successfully', 'success');
        });
    } catch (e) {
        // Error handled in API
    } finally {
        ui.setButtonLoading(btn, false);
    }
};

window.suggestSkills = async () => {
    const jobTitle = prompt('What is your target job title?');
    if (!jobTitle) return;
    
    const btn = document.querySelector('.skills-input-container').previousElementSibling.querySelector('.btn-ai');
    ui.setButtonLoading(btn, true);
    
    try {
        const data = await api.apiSuggestSkills(jobTitle, resumeData.skills);
        const html = `
            <p>Click skills to add them:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                ${data.skills.map(skill => `<button class="skill-suggestion" onclick="window.addSuggestedSkill('${skill}')">${skill}</button>`).join('')}
            </div>
        `;
        ui.showModal('Suggested Skills', html, () => {
            ui.closeModal();
        });
        
        // Hide apply button in modal since skills are clicked individually
        const applyBtn = document.getElementById('modalApplyBtn');
        if(applyBtn) applyBtn.style.display = 'none';
        
    } catch (e) {} finally {
        ui.setButtonLoading(btn, false);
    }
};

window.addSuggestedSkill = (skill) => {
    if (!resumeData.skills.includes(skill)) {
        resumeData.skills.push(skill);
        ui.renderSkills();
        ui.updatePreview();
        calculateScore();
        saveState();
        ui.showToast(`Added ${skill}`, 'success');
    }
};

window.enhanceJobDescription = async (index, btn) => {
    const job = resumeData.experience[index];
    if (!job.description || job.description.length === 0) {
        ui.showToast('Please add a job description first.', 'error');
        return;
    }
    
    ui.setButtonLoading(btn, true);
    const description = Array.isArray(job.description) ? job.description.join(' ') : job.description;
    
    try {
        const data = await api.apiEnhanceDescription(description, job.position);
        ui.showModal('Enhanced Job Description', `<p>${data.enhanced}</p>`, () => {
            const textarea = document.querySelector(`.experience-item[data-index="${index}"] textarea`);
            if (textarea) {
                textarea.value = data.enhanced;
                window.updateExperience(index, 'description', data.enhanced);
            }
            ui.closeModal();
            ui.showToast('Description updated successfully', 'success');
        });
    } catch (e) {} finally {
        ui.setButtonLoading(btn, false);
    }
};

// Optimizer Tools
window.analyzeATS = async () => {
    const btn = document.querySelector('.tool-panel .btn-primary');
    ui.setButtonLoading(btn, true, '<i class="fas fa-search"></i> Analyze ATS Score');
    
    try {
        const data = await api.apiAnalyzeATS(resumeData);
        const { analysis } = data;
        
        document.getElementById('atsScore').querySelector('.score-display').textContent = analysis.score;
        
        let resultsHTML = `<div class="result-card"><h4>Overall Assessment: ${analysis.overall}</h4></div>`;
        if (analysis.goodPractices && analysis.goodPractices.length > 0) {
            resultsHTML += `<div class="result-card success"><h4>✓ Strengths</h4><ul>${analysis.goodPractices.map(p => `<li>${p}</li>`).join('')}</ul></div>`;
        }
        if (analysis.issues && analysis.issues.length > 0) {
            resultsHTML += `<div class="result-card error"><h4>⚠ Issues to Fix</h4><ul>${analysis.issues.map(i => `<li>${i}</li>`).join('')}</ul></div>`;
        }
        
        document.getElementById('atsResults').innerHTML = resultsHTML;
        ui.showToast('ATS Analysis complete', 'success');
    } catch(e){} finally {
        ui.setButtonLoading(btn, false);
    }
};

window.matchJobDescription = async () => {
    const jd = document.getElementById('jobDescription').value;
    if(!jd) { ui.showToast('Please paste a job description first', 'error'); return; }
    
    const btn = document.querySelector('.button-group .btn-primary');
    ui.setButtonLoading(btn, true, '<i class="fas fa-bullseye"></i> Match Keywords');
    
    try {
        const data = await api.apiOptimizeKeywords(resumeData, jd);
        const { keywords } = data;
        
        let resultsHTML = `<div class="result-card"><h4>Match Rate: ${keywords.matchRate}%</h4><p>Matched ${keywords.matchedKeywords.length} of ${keywords.totalJobKeywords}</p></div>`;
        document.getElementById('matchResults').innerHTML = resultsHTML;
        ui.showToast('Keywords matched successfully', 'success');
    } catch(e){} finally {
        ui.setButtonLoading(btn, false);
    }
};

window.tailorResume = async () => {
    const jd = document.getElementById('jobDescription').value;
    if(!jd) { ui.showToast('Please paste a job description first', 'error'); return; }
    
    const btn = document.querySelector('.button-group .btn-ai');
    ui.setButtonLoading(btn, true, '<i class="fas fa-magic"></i> Auto-Tailor');
    
    try {
        const data = await api.apiTailorResume(resumeData, jd);
        const { tailored } = data;
        
        let resultsHTML = `
            <div class="result-card"><h4>Match Score: ${tailored.matchScore}%</h4></div>
            <div class="result-card"><h4>💡 Tailoring Suggestions</h4><p style="white-space: pre-wrap;">${tailored.suggestions}</p></div>
        `;
        document.getElementById('tailorResults').innerHTML = resultsHTML;
        ui.showToast('Resume tailored based on description', 'success');
    } catch(e){} finally {
        ui.setButtonLoading(btn, false);
    }
};

window.reviewResume = async () => {
    const btn = document.querySelector('#reviewResults').previousElementSibling;
    ui.setButtonLoading(btn, true, '<i class="fas fa-robot"></i> Get AI Review');
    
    try {
        const data = await api.apiReviewResume(resumeData);
        const { review } = data;
        
        document.getElementById('reviewResults').innerHTML = `
            <div class="result-card"><h4>Overall Score: ${review.overallScore}/100</h4></div>
            <div class="result-card"><h4>📝 Detailed Feedback</h4><p style="white-space: pre-wrap;">${review.feedback}</p></div>
        `;
        ui.showToast('Resume review completed', 'success');
    } catch(e){} finally {
        ui.setButtonLoading(btn, false);
    }
};

window.getInterviewQuestions = async () => {
    const jd = document.getElementById('jobDescription').value;
    
    const btn = document.querySelector('#interviewQuestions').previousElementSibling;
    ui.setButtonLoading(btn, true, '<i class="fas fa-lightbulb"></i> Generate Questions');
    
    try {
        const data = await api.apiGenerateInterviewQuestions(resumeData, jd || 'General Role');
        document.getElementById('interviewQuestions').innerHTML = `
            <div class="result-card">
                <h4>Questions</h4>
                <ul>${data.questions.map(q => `<li><strong>Q:</strong> ${q.question}<br><em>Tip: ${q.tip}</em></li>`).join('')}</ul>
            </div>
        `;
        ui.showToast('Interview questions generated', 'success');
    } catch(e){} finally {
        ui.setButtonLoading(btn, false);
    }
};

window.generateCoverLetter = async () => {
    const company = document.getElementById('coverCompany').value;
    const position = document.getElementById('coverPosition').value;
    const jd = document.getElementById('coverJobDesc').value;
    
    if(!company || !position) { ui.showToast('Please provide company and position', 'error'); return; }
    
    const btn = document.querySelector('#coverLetterResult').previousElementSibling;
    ui.setButtonLoading(btn, true, '<i class="fas fa-magic"></i> Generate Cover Letter');
    
    try {
        const data = await api.apiGenerateCoverLetter(resumeData, jd, company, position);
        document.getElementById('coverLetterResult').innerHTML = `
            <div class="cover-letter-output">
                <p style="white-space: pre-wrap;">${data.coverLetter}</p>
            </div>
        `;
        ui.showToast('Cover letter generated', 'success');
    } catch(e){} finally {
        ui.setButtonLoading(btn, false);
    }
};

window.generatePDF = async () => {
    if (!resumeData.personalInfo.fullName) {
        ui.showToast('Please fill in your name first', 'error');
        return;
    }
    
    const btn = document.querySelector('.header .btn-primary');
    ui.setButtonLoading(btn, true, '<i class="fas fa-download"></i> Downloading...');
    
    try {
        const blob = await api.apiGeneratePDF(resumeData, currentTemplate);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        ui.showToast('PDF Downloaded successfully', 'success');
    } catch (e) {
        // Error toast already shown in API
    } finally {
        ui.setButtonLoading(btn, false);
    }
};
