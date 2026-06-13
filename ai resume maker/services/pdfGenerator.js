const PDFDocument = require('pdfkit');

class PDFGenerator {
  generatePDF(resumeData, template = 'modern') {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        // Generate based on template
        if (template === 'modern') {
          this.generateModernTemplate(doc, resumeData);
        } else if (template === 'professional') {
          this.generateProfessionalTemplate(doc, resumeData);
        } else if (template === 'creative') {
          this.generateCreativeTemplate(doc, resumeData);
        } else {
          this.generateModernTemplate(doc, resumeData);
        }

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  generateModernTemplate(doc, data) {
    const colors = {
      primary: '#2C3E50',
      secondary: '#3498DB',
      text: '#34495E',
      light: '#ECF0F1'
    };

    // Header with name
    doc.fontSize(28)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text(data.personalInfo.fullName, { align: 'center' });

    // Contact info
    doc.fontSize(10)
       .fillColor(colors.text)
       .font('Helvetica')
       .moveDown(0.3);

    const contact = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
      data.personalInfo.linkedin,
      data.personalInfo.website
    ].filter(Boolean).join('  |  ');

    doc.text(contact, { align: 'center' });
    
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke(colors.secondary);
    doc.moveDown(0.5);

    // Professional Summary
    if (data.summary) {
      this.addSection(doc, 'PROFESSIONAL SUMMARY', colors);
      doc.fontSize(10)
         .fillColor(colors.text)
         .font('Helvetica')
         .text(data.summary, { align: 'justify' });
      doc.moveDown(1);
    }

    // Experience
    if (data.experience && data.experience.length > 0) {
      this.addSection(doc, 'PROFESSIONAL EXPERIENCE', colors);
      data.experience.forEach((job, index) => {
        doc.fontSize(12)
           .fillColor(colors.primary)
           .font('Helvetica-Bold')
           .text(job.position);
        
        doc.fontSize(10)
           .fillColor(colors.secondary)
           .font('Helvetica-Oblique')
           .text(`${job.company} | ${job.location} | ${job.startDate} - ${job.endDate || 'Present'}`, { continued: false });
        
        doc.moveDown(0.3);
        doc.fontSize(10)
           .fillColor(colors.text)
           .font('Helvetica');
        
        if (Array.isArray(job.description)) {
          job.description.forEach(bullet => {
            doc.text(`• ${bullet}`, { indent: 10 });
          });
        } else {
          doc.text(job.description);
        }
        
        if (index < data.experience.length - 1) doc.moveDown(0.8);
      });
      doc.moveDown(1);
    }

    // Education
    if (data.education && data.education.length > 0) {
      this.addSection(doc, 'EDUCATION', colors);
      data.education.forEach((edu, index) => {
        doc.fontSize(11)
           .fillColor(colors.primary)
           .font('Helvetica-Bold')
           .text(edu.degree);
        
        doc.fontSize(10)
           .fillColor(colors.text)
           .font('Helvetica')
           .text(`${edu.institution} | ${edu.location} | ${edu.graduationDate}`);
        
        if (edu.gpa) {
          doc.text(`GPA: ${edu.gpa}`);
        }
        
        if (index < data.education.length - 1) doc.moveDown(0.5);
      });
      doc.moveDown(1);
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
      this.addSection(doc, 'SKILLS', colors);
      doc.fontSize(10)
         .fillColor(colors.text)
         .font('Helvetica')
         .text(data.skills.join('  •  '));
      doc.moveDown(1);
    }

    // Certifications
    if (data.certifications && data.certifications.length > 0) {
      this.addSection(doc, 'CERTIFICATIONS', colors);
      data.certifications.forEach(cert => {
        doc.fontSize(10)
           .fillColor(colors.text)
           .font('Helvetica')
           .text(`• ${cert.name} - ${cert.issuer} (${cert.date})`);
      });
    }
  }

  generateProfessionalTemplate(doc, data) {
    const colors = {
      primary: '#1A1A1A',
      secondary: '#4A4A4A',
      accent: '#0066CC',
      text: '#333333'
    };

    // Classic professional layout
    doc.fontSize(24)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text(data.personalInfo.fullName.toUpperCase(), { align: 'left' });

    doc.fontSize(9)
       .fillColor(colors.secondary)
       .font('Helvetica')
       .moveDown(0.2);

    doc.text(data.personalInfo.email + '  |  ' + data.personalInfo.phone + '  |  ' + data.personalInfo.location);
    if (data.personalInfo.linkedin) doc.text(data.personalInfo.linkedin);
    
    doc.moveDown(0.8);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).lineWidth(2).stroke(colors.primary);
    doc.moveDown(0.8);

    // Rest of the sections similar to modern but with professional styling
    if (data.summary) {
      this.addSection(doc, 'PROFESSIONAL PROFILE', colors);
      doc.fontSize(10).fillColor(colors.text).font('Helvetica').text(data.summary, { align: 'justify' });
      doc.moveDown(1);
    }

    // Add other sections similar to modern template
    this.addExperienceSection(doc, data.experience, colors);
    this.addEducationSection(doc, data.education, colors);
    this.addSkillsSection(doc, data.skills, colors);
    this.addCertificationsSection(doc, data.certifications, colors);
  }

  generateCreativeTemplate(doc, data) {
    const colors = {
      primary: '#E74C3C',
      secondary: '#9B59B6',
      text: '#2C3E50',
      accent: '#F39C12'
    };

    // Creative layout with color blocks
    doc.rect(0, 0, 200, 842).fill(colors.primary);
    
    // Name and contact in sidebar
    doc.fontSize(20)
       .fillColor('white')
       .font('Helvetica-Bold')
       .text(data.personalInfo.fullName, 20, 50, { width: 160 });

    doc.fontSize(8)
       .font('Helvetica')
       .moveDown(1);

    // Main content area
    doc.fontSize(24)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text(data.personalInfo.fullName, 220, 50);

    // Continue with sections in main area
    let yPos = 120;
    doc.fontSize(10).fillColor(colors.text).font('Helvetica');
    
    // Add sections with creative styling
    if (data.summary) {
      doc.text('ABOUT ME', 220, yPos);
      doc.fontSize(9).text(data.summary, 220, yPos + 20, { width: 325 });
    }
  }

  addSection(doc, title, colors) {
    doc.fontSize(12)
       .fillColor(colors.secondary)
       .font('Helvetica-Bold')
       .text(title);
    doc.moveDown(0.5);
  }

  addExperienceSection(doc, experience, colors) {
    if (!experience || experience.length === 0) return;
    
    this.addSection(doc, 'EXPERIENCE', colors);
    experience.forEach(job => {
      doc.fontSize(11).fillColor(colors.primary).font('Helvetica-Bold').text(job.position);
      doc.fontSize(9).fillColor(colors.secondary).font('Helvetica')
         .text(`${job.company} | ${job.startDate} - ${job.endDate || 'Present'}`);
      doc.moveDown(0.3);
      
      if (Array.isArray(job.description)) {
        job.description.forEach(bullet => {
          doc.fontSize(9).fillColor(colors.text).text(`• ${bullet}`);
        });
      }
      doc.moveDown(0.8);
    });
  }

  addEducationSection(doc, education, colors) {
    if (!education || education.length === 0) return;
    
    this.addSection(doc, 'EDUCATION', colors);
    education.forEach(edu => {
      doc.fontSize(10).fillColor(colors.primary).font('Helvetica-Bold').text(edu.degree);
      doc.fontSize(9).fillColor(colors.text).font('Helvetica')
         .text(`${edu.institution} | ${edu.graduationDate}`);
      doc.moveDown(0.5);
    });
  }

  addSkillsSection(doc, skills, colors) {
    if (!skills || skills.length === 0) return;
    
    this.addSection(doc, 'SKILLS', colors);
    doc.fontSize(9).fillColor(colors.text).font('Helvetica').text(skills.join('  •  '));
    doc.moveDown(0.8);
  }

  addCertificationsSection(doc, certifications, colors) {
    if (!certifications || certifications.length === 0) return;
    
    this.addSection(doc, 'CERTIFICATIONS', colors);
    certifications.forEach(cert => {
      doc.fontSize(9).fillColor(colors.text).font('Helvetica')
         .text(`• ${cert.name} - ${cert.issuer} (${cert.date})`);
    });
  }
}

module.exports = new PDFGenerator();
