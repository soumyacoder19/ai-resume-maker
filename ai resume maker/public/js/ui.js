// UI manipulation and rendering

import { resumeData, calculateScore, saveState } from './state.js';

let currentAISuggestion = null;

export function showSection(section) {
    document.querySelectorAll('.editor, .tools-dashboard').forEach(el => {
        el.classList.add('hidden');
    });
    
    if (section === 'builder') {
        document.getElementById('builderSection').classList.remove('hidden');
    } else if (section === 'aiTools') {
        document.getElementById('aiToolsSection').classList.remove('hidden');
    }
}

export function togglePreview() {
    const preview = document.querySelector('.preview-panel');
    preview.classList.toggle('expanded');
    
    // Toggle the expand icon
    const icon = document.querySelector('.preview-header .btn-icon i');
    if (icon) {
        if (preview.classList.contains('expanded')) {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
        } else {
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
        }
    }
    
    // For mobile
    if (window.innerWidth <= 992) {
        preview.classList.toggle('mobile-open');
    }
}

export function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

export function setButtonLoading(buttonEl, isLoading, originalText = '') {
    if (!buttonEl) return;
    if (isLoading) {
        buttonEl.disabled = true;
        buttonEl.dataset.originalText = buttonEl.innerHTML;
        buttonEl.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Loading...`;
    } else {
        buttonEl.disabled = false;
        buttonEl.innerHTML = originalText || buttonEl.dataset.originalText;
    }
}

export function updatePreview() {
    const preview = document.getElementById('resumePreview');
    
    if (!resumeData.personalInfo.fullName) {
        preview.innerHTML = '<p class="preview-placeholder">Start filling out your information to see a live preview</p>';
        return;
    }
    
    let html = `
        <div class="resume-header">
            <h1 class="resume-name">${resumeData.personalInfo.fullName}</h1>
            <p class="resume-contact">
                ${[resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location]
                    .filter(Boolean).join(' | ')}
            </p>
            <p class="resume-contact">
                ${[resumeData.personalInfo.linkedin, resumeData.personalInfo.website]
                    .filter(Boolean).join(' | ')}
            </p>
        </div>
    `;
    
    if (resumeData.summary) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Professional Summary</h2>
                <p class="resume-text">${resumeData.summary}</p>
            </div>
        `;
    }
    
    if (resumeData.experience.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Experience</h2>
                ${resumeData.experience.map(exp => `
                    <div class="resume-item">
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <h3 class="resume-item-title">${exp.position}</h3>
                            <span class="resume-date">${exp.startDate} - ${exp.endDate || 'Present'}</span>
                        </div>
                        <p class="resume-subtitle">${exp.company} | ${exp.location}</p>
                        <ul class="resume-list">
                            ${(Array.isArray(exp.description) ? exp.description : [exp.description])
                                .map(desc => `<li>${desc}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (resumeData.education.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Education</h2>
                ${resumeData.education.map(edu => `
                    <div class="resume-item">
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <h3 class="resume-item-title">${edu.degree}</h3>
                            <span class="resume-date">${edu.graduationDate}</span>
                        </div>
                        <p class="resume-subtitle">${edu.institution} | ${edu.location}</p>
                        ${edu.gpa ? `<p class="resume-text">GPA: ${edu.gpa}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (resumeData.skills.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Skills</h2>
                <p class="resume-text">${resumeData.skills.join(' • ')}</p>
            </div>
        `;
    }
    
    if (resumeData.certifications.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Certifications</h2>
                ${resumeData.certifications.map(cert => `
                    <p class="resume-text">• ${cert.name} - ${cert.issuer} (${cert.date})</p>
                `).join('')}
            </div>
        `;
    }
    
    preview.innerHTML = html;
}

// Re-renders forms based on state
export function hydrateForm() {
    document.getElementById('fullName').value = resumeData.personalInfo.fullName || '';
    document.getElementById('email').value = resumeData.personalInfo.email || '';
    document.getElementById('phone').value = resumeData.personalInfo.phone || '';
    document.getElementById('location').value = resumeData.personalInfo.location || '';
    document.getElementById('linkedin').value = resumeData.personalInfo.linkedin || '';
    document.getElementById('website').value = resumeData.personalInfo.website || '';
    
    document.getElementById('summary').value = resumeData.summary || '';
    
    document.getElementById('experienceContainer').innerHTML = '';
    resumeData.experience.forEach((exp, i) => renderExperienceItem(i, exp));
    
    document.getElementById('educationContainer').innerHTML = '';
    resumeData.education.forEach((edu, i) => renderEducationItem(i, edu));
    
    renderSkills();
    
    document.getElementById('certificationsContainer').innerHTML = '';
    resumeData.certifications.forEach((cert, i) => renderCertificationItem(i, cert));
}

// Experience rendering
export function renderExperienceItem(index, exp = {position:'', company:'', location:'', startDate:'', endDate:'', description:[]}) {
    const container = document.getElementById('experienceContainer');
    const descText = Array.isArray(exp.description) ? exp.description.join('\n') : exp.description;
    
    const expHtml = `
        <div class="experience-item" data-index="${index}">
            <button class="btn-remove" onclick="window.removeExperience(${index})">
                <i class="fas fa-times"></i> Remove
            </button>
            <div class="form-grid">
                <input type="text" placeholder="Job Title" class="form-input" value="${exp.position}"
                       onchange="window.updateExperience(${index}, 'position', this.value)">
                <input type="text" placeholder="Company" class="form-input" value="${exp.company}"
                       onchange="window.updateExperience(${index}, 'company', this.value)">
                <input type="text" placeholder="Location" class="form-input" value="${exp.location}"
                       onchange="window.updateExperience(${index}, 'location', this.value)">
                <input type="text" placeholder="Start Date" class="form-input" value="${exp.startDate}"
                       onchange="window.updateExperience(${index}, 'startDate', this.value)">
                <input type="text" placeholder="End Date (or Present)" class="form-input" value="${exp.endDate}"
                       onchange="window.updateExperience(${index}, 'endDate', this.value)">
                <div class="full-width">
                    <textarea placeholder="Describe your achievements and responsibilities..." 
                              class="form-textarea" rows="4"
                              onchange="window.updateExperience(${index}, 'description', this.value)">${descText}</textarea>
                    <button class="btn-ai" style="margin-top: 0.5rem;" 
                            onclick="window.enhanceJobDescription(${index}, this)">
                        <i class="fas fa-magic"></i> Enhance with AI
                    </button>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', expHtml);
}

export function renderEducationItem(index, edu = {degree:'', institution:'', location:'', graduationDate:'', gpa:''}) {
    const container = document.getElementById('educationContainer');
    const eduHtml = `
        <div class="education-item" data-index="${index}">
            <button class="btn-remove" onclick="window.removeEducation(${index})">
                <i class="fas fa-times"></i> Remove
            </button>
            <div class="form-grid">
                <input type="text" placeholder="Degree" class="form-input" value="${edu.degree}"
                       onchange="window.updateEducation(${index}, 'degree', this.value)">
                <input type="text" placeholder="Institution" class="form-input" value="${edu.institution}"
                       onchange="window.updateEducation(${index}, 'institution', this.value)">
                <input type="text" placeholder="Location" class="form-input" value="${edu.location}"
                       onchange="window.updateEducation(${index}, 'location', this.value)">
                <input type="text" placeholder="Graduation Date" class="form-input" value="${edu.graduationDate}"
                       onchange="window.updateEducation(${index}, 'graduationDate', this.value)">
                <input type="text" placeholder="GPA (optional)" class="form-input" value="${edu.gpa}"
                       onchange="window.updateEducation(${index}, 'gpa', this.value)">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', eduHtml);
}

export function renderSkills() {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = resumeData.skills.map(skill => `
        <div class="skill-tag">
            ${skill}
            <i class="fas fa-times" onclick="window.removeSkill('${skill}')"></i>
        </div>
    `).join('');
}

export function renderCertificationItem(index, cert = {name:'', issuer:'', date:''}) {
    const container = document.getElementById('certificationsContainer');
    const certHtml = `
        <div class="certification-item" data-index="${index}">
            <button class="btn-remove" onclick="window.removeCertification(${index})">
                <i class="fas fa-times"></i> Remove
            </button>
            <div class="form-grid">
                <input type="text" placeholder="Certification Name" class="form-input" value="${cert.name}"
                       onchange="window.updateCertification(${index}, 'name', this.value)">
                <input type="text" placeholder="Issuing Organization" class="form-input" value="${cert.issuer}"
                       onchange="window.updateCertification(${index}, 'issuer', this.value)">
                <input type="text" placeholder="Date Obtained" class="form-input" value="${cert.date}"
                       onchange="window.updateCertification(${index}, 'date', this.value)">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', certHtml);
}

// Modal handling
export function showModal(title, bodyHtml, onApply) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    
    // Setup apply button
    const applyBtn = document.getElementById('modalApplyBtn');
    if (applyBtn) {
        // Remove old listeners
        const newBtn = applyBtn.cloneNode(true);
        applyBtn.parentNode.replaceChild(newBtn, applyBtn);
        newBtn.addEventListener('click', onApply);
    }
    
    document.getElementById('aiModal').style.display = 'block';
}

export function closeModal() {
    document.getElementById('aiModal').style.display = 'none';
}
