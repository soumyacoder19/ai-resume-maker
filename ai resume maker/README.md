# AI Resume Maker 🤖📄

An advanced, AI-powered resume builder with intelligent suggestions, ATS optimization, and professional templates.

## ✨ Features

### Core Features
- **Real-time Preview** - See your resume as you build it
- **Multiple Templates** - Modern, Professional, and Creative designs
- **PDF Export** - Download your resume as a high-quality PDF

### AI-Powered Features
- **AI Summary Generation** - Create compelling professional summaries
- **Skill Suggestions** - Get relevant skill recommendations for your role
- **Job Description Enhancement** - Improve your experience descriptions with AI
- **Resume Review** - Get comprehensive AI feedback on your resume
- **ATS Optimization** - Analyze and optimize for Applicant Tracking Systems
- **Keyword Matching** - Match your resume to job descriptions
- **Resume Tailoring** - Customize your resume for specific job postings

### Advanced Features
- **Smart Score System** - Real-time resume completeness scoring
- **ATS Compatibility Analysis** - Identify and fix ATS issues
- **Keyword Extraction** - Find missing keywords from job postings
- **Professional Templates** - Multiple design options
- **Drag-and-Drop Interface** - Easy to use builder
- **Export Options** - PDF generation with custom templates

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (for AI features)

### Setup

1. **Clone or extract the project**
   ```bash
   cd ai-resume-maker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Building Your Resume

1. **Personal Information** - Fill in your contact details
2. **Professional Summary** - Write or use AI to generate a summary
3. **Work Experience** - Add your work history with AI-enhanced descriptions
4. **Education** - List your educational background
5. **Skills** - Add skills manually or get AI suggestions
6. **Certifications** - Include relevant certifications

### Using AI Features

#### Generate Professional Summary
1. Click "AI Generate" in the summary section
2. Enter your job title and years of experience
3. Review and apply the AI-generated summary

#### Get Skill Suggestions
1. Click "AI Suggest" in the skills section
2. Enter your target job title
3. Select suggested skills to add to your resume

#### Enhance Job Descriptions
1. Add a job experience entry
2. Write a basic description
3. Click "Enhance with AI"
4. Review and apply the enhanced version

#### ATS Optimization
1. Navigate to the "Optimizer" tab
2. Click "Analyze ATS Score"
3. Review issues and recommendations
4. Make suggested improvements

#### Match Job Description
1. Go to the "Optimizer" tab
2. Paste a job description
3. Click "Match Keywords"
4. Add missing keywords to your resume

#### AI Resume Review
1. Go to the "Review" tab
2. Click "Get AI Review"
3. Read comprehensive feedback
4. Implement suggestions

### Downloading Your Resume

1. Select your preferred template (Modern, Professional, or Creative)
2. Click "Download PDF" in the header
3. Your resume will download as a PDF

## 🎨 Templates

### Modern Template
- Clean, contemporary design
- Gradient color scheme
- Perfect for tech and creative roles

### Professional Template
- Classic, traditional layout
- Professional typography
- Ideal for corporate positions

### Creative Template
- Bold, eye-catching design
- Sidebar layout
- Great for creative industries

## 🔧 API Endpoints

### AI Services
- `POST /api/suggest-summary` - Generate professional summary
- `POST /api/suggest-skills` - Get skill suggestions
- `POST /api/enhance-description` - Enhance job descriptions
- `POST /api/review-resume` - Get AI resume review
- `POST /api/tailor-resume` - Tailor resume to job posting

### Optimization Services
- `POST /api/analyze-ats` - Analyze ATS compatibility
- `POST /api/optimize-keywords` - Extract and match keywords

### PDF Generation
- `POST /api/generate-pdf` - Generate PDF resume

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- OpenAI API
- PDFKit
- Natural (NLP)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome Icons

## 📁 Project Structure

```
ai-resume-maker/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment template
├── services/
│   ├── aiService.js         # AI integration
│   ├── pdfGenerator.js      # PDF creation
│   └── resumeOptimizer.js   # ATS optimization
└── public/
    ├── index.html           # Main HTML
    ├── styles.css           # Styles
    └── app.js               # Frontend logic
```

## 🔒 Environment Variables

```
PORT=3000                    # Server port
OPENAI_API_KEY=sk-...        # OpenAI API key
```

## 💡 Tips for Best Results

1. **Be Specific** - Provide detailed information for better AI suggestions
2. **Use Numbers** - Include metrics and quantifiable achievements
3. **Keywords Matter** - Use industry-specific terminology
4. **Tailor for Each Job** - Customize your resume for each application
5. **Check ATS Score** - Aim for 80+ for best results
6. **Use Action Verbs** - Start bullet points with strong verbs
7. **Keep It Concise** - 1-2 pages is ideal

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🐛 Troubleshooting

### AI Features Not Working
- Verify your OpenAI API key is correct in `.env`
- Check you have API credits available
- Ensure you have internet connection

### PDF Not Generating
- Check all required fields are filled
- Try a different template
- Check browser console for errors

### Slow Performance
- AI requests may take 3-5 seconds
- Consider caching responses
- Use smaller job descriptions for matching

## 🎯 Future Enhancements

- [ ] Multiple resume versions
- [ ] LinkedIn import
- [ ] Cover letter generation
- [ ] Interview preparation tips
- [ ] Salary insights
- [ ] Job board integration
- [ ] Resume analytics
- [ ] Cloud storage
- [ ] Team collaboration

## 📞 Support

For issues or questions, please open an issue on the project repository.

---

Built with ❤️ using AI
