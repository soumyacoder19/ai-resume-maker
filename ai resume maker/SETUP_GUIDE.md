# Complete Setup & Usage Guide 📚

## 📁 Project Structure

```
ai-resume-maker/
├── 📄 server.js              # Main Express server
├── 📦 package.json           # Dependencies & scripts
├── 🔐 .env.example           # Environment template
├── 📝 README.md              # Full documentation
├── 🚀 QUICK_START.md         # Quick start guide
├── ✨ FEATURES.md            # Complete features list
├── 🛠️ SETUP_GUIDE.md         # This file
├── 🚫 .gitignore             # Git ignore rules
│
├── 📂 services/              # Backend services
│   ├── aiService.js          # OpenAI integration
│   ├── pdfGenerator.js       # PDF creation logic
│   └── resumeOptimizer.js    # ATS optimization
│
└── 📂 public/                # Frontend files
    ├── index.html            # Main HTML page
    ├── styles.css            # All styling
    └── app.js                # Frontend JavaScript
```

## 🔧 Detailed Installation

### Prerequisites Check

1. **Node.js Installation**
   ```bash
   node --version
   # Should show v14.0.0 or higher
   ```

2. **npm Installation**
   ```bash
   npm --version
   # Should show 6.0.0 or higher
   ```

3. **Internet Connection**
   - Required for OpenAI API calls
   - Required for downloading dependencies

### Step-by-Step Setup

#### 1. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web server framework
- `body-parser` - Request body parsing
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `pdfkit` - PDF generation
- `openai` - AI features
- `natural` - Natural language processing

#### 2. Configure Environment

Create `.env` file:
```bash
copy .env.example .env
```

Edit `.env`:
```env
PORT=3000
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Getting OpenAI API Key:**
1. Visit https://platform.openai.com/
2. Create account or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with 'sk-')
6. Paste in `.env` file

**Important:** Keep your API key secret! Never commit `.env` to git.

#### 3. Start the Server

**Production Mode:**
```bash
npm start
```

**Development Mode** (with auto-restart):
```bash
npm run dev
```

You should see:
```
🚀 AI Resume Maker running on http://localhost:3000
```

#### 4. Access the Application

Open browser and navigate to:
```
http://localhost:3000
```

## 🎯 Usage Guide

### Creating Your First Resume

#### Step 1: Personal Information
1. Click on the "Builder" tab (should be active by default)
2. Fill in the Personal Information section:
   - **Full Name** (required)
   - **Email** (required for ATS)
   - **Phone** (required for ATS)
   - **Location** (city, state)
   - **LinkedIn URL** (optional but recommended)
   - **Website/Portfolio** (optional)

#### Step 2: Professional Summary
1. Scroll to Professional Summary section
2. Either:
   - **Write manually**, or
   - **Use AI**: Click "AI Generate"
     - Enter your job title (e.g., "Software Engineer")
     - Enter years of experience
     - Review and apply the generated summary

#### Step 3: Work Experience
1. Click "Add Experience" button
2. Fill in the form:
   - **Job Title** (e.g., "Senior Developer")
   - **Company Name**
   - **Location**
   - **Start Date** (e.g., "Jan 2020")
   - **End Date** (or "Present")
   - **Description** (your responsibilities and achievements)
3. **Enhance with AI**: Click "Enhance with AI" to improve your description
4. Add more experiences as needed

**Pro Tips for Experience:**
- Use bullet points (one per line)
- Start with action verbs (Led, Developed, Managed, etc.)
- Include numbers and metrics
- Focus on achievements, not just duties

#### Step 4: Education
1. Click "Add Education" button
2. Fill in:
   - **Degree** (e.g., "Bachelor of Science in Computer Science")
   - **Institution** (university name)
   - **Location**
   - **Graduation Date**
   - **GPA** (optional, include if 3.5+)

#### Step 5: Skills
1. Type a skill in the input box
2. Press Enter or click the + button
3. Repeat for all skills
4. **Get AI Suggestions**: Click "AI Suggest"
   - Enter your job title
   - Click suggested skills to add them

**Recommended Skills Structure:**
- Technical skills (programming languages, tools)
- Soft skills (leadership, communication)
- Industry-specific skills

#### Step 6: Certifications (Optional)
1. Click "Add Certification"
2. Fill in:
   - **Certification Name**
   - **Issuing Organization**
   - **Date Obtained**

### Using AI Features

#### Generate Professional Summary
```
1. Click "AI Generate" in Summary section
2. Provide:
   - Job title
   - Years of experience
3. Review AI-generated summary
4. Click "Apply" to use it
```

#### Get Skill Suggestions
```
1. Click "AI Suggest" in Skills section
2. Enter target job title
3. Review suggested skills
4. Click individual skills to add them
```

#### Enhance Job Descriptions
```
1. Add basic job description
2. Click "Enhance with AI" for that entry
3. Review enhanced version
4. Apply or edit as needed
```

### Optimizing Your Resume

#### Check ATS Score
1. Navigate to "Optimizer" tab
2. Click "Analyze ATS Score"
3. Review:
   - Overall score (aim for 80+)
   - Identified issues
   - Recommendations
4. Go back to Builder and make improvements

#### Match Job Description
1. Copy a job posting
2. Go to "Optimizer" tab
3. Paste in "Job Description Matcher"
4. Click "Match Keywords"
5. Review:
   - Match percentage
   - Missing keywords
6. Add missing keywords to your resume

#### Tailor to Specific Job
1. Paste job posting in Optimizer
2. Click "Tailor Resume"
3. Review AI suggestions
4. Implement recommendations

### Getting AI Review
1. Navigate to "Review" tab
2. Click "Get AI Review"
3. Review feedback:
   - Overall score
   - Detailed analysis
   - Strengths
   - Areas for improvement
4. Implement suggestions

### Choosing a Template
1. Look at left sidebar
2. Under "Templates", choose:
   - **Modern**: Tech/creative roles
   - **Professional**: Corporate positions
   - **Creative**: Design/marketing
3. Live preview updates automatically

### Downloading PDF
1. Ensure all content is complete
2. Select preferred template
3. Click "Download PDF" in header
4. PDF downloads automatically as: `YourName_Resume.pdf`

## 📊 Scoring System Explained

Your resume score (0-100) is calculated as:

| Component | Points | Requirements |
|-----------|--------|--------------|
| Personal Info | 20 | Name, email, phone, location |
| Summary | 15 | 50+ characters, well-written |
| Experience | 30 | 1-3+ positions with details |
| Education | 15 | At least one degree |
| Skills | 15 | 3-8+ relevant skills |
| Certifications | 5 | Any certifications |

**Score Ranges:**
- **80-100**: Excellent - Ready to send!
- **60-79**: Good - Minor improvements needed
- **40-59**: Needs work - Add more content
- **0-39**: Just starting - Fill in basics

## 🎨 Template Comparison

| Feature | Modern | Professional | Creative |
|---------|--------|--------------|----------|
| Style | Contemporary | Traditional | Bold |
| Colors | Blue/Purple | Black/White | Vibrant |
| Layout | Single column | Classic | Sidebar |
| Best for | Tech, Startups | Corporate, Finance | Design, Media |
| ATS-friendly | ✅ Yes | ✅ Yes | ⚠️ Moderate |

## 🔍 ATS Optimization Tips

### What is ATS?
Applicant Tracking System - software that screens resumes before humans see them.

### Key Requirements:
1. **Simple Formatting** ✅
   - Clear sections
   - Standard fonts
   - No images/graphics
   
2. **Keywords** ✅
   - Job-specific terms
   - Industry buzzwords
   - Skills mentioned in job posting
   
3. **Standard Sections** ✅
   - Experience
   - Education
   - Skills
   - Contact info
   
4. **File Format** ✅
   - PDF (from this app)
   - Plain text compatible
   
5. **Action Verbs** ✅
   - Led, Managed, Developed
   - Created, Improved, Achieved
   - Optimized, Streamlined, Delivered

## 🐛 Troubleshooting

### Server Won't Start

**Problem:** Port 3000 already in use
```bash
# Solution 1: Use different port
# Edit .env:
PORT=3001
```

```bash
# Solution 2: Find and kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### AI Features Not Working

**Problem:** "Error generating summary"
```
Checklist:
□ Is OPENAI_API_KEY set in .env?
□ Is the API key valid?
□ Do you have API credits?
□ Is internet connected?
□ Check server console for errors
```

**Solution:**
1. Verify API key at https://platform.openai.com/
2. Check API usage/billing
3. Restart server after changing .env

### PDF Not Generating

**Problem:** PDF download fails
```
Possible causes:
- Missing name field
- Browser blocking download
- Server error
```

**Solutions:**
1. Fill in at least your name
2. Check browser download settings
3. Try different browser
4. Check server console logs

### Preview Not Updating

**Problem:** Changes don't show in preview
```
Solutions:
- Refresh the page
- Clear browser cache
- Check browser console for errors
```

### Installation Errors

**Problem:** npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s node_modules
npm install

# Try with legacy peer deps
npm install --legacy-peer-deps
```

## 💰 Cost Estimation

### OpenAI API Costs

With GPT-3.5-turbo (used in this app):
- **$0.001 per 1,000 tokens** (input)
- **$0.002 per 1,000 tokens** (output)

**Average costs per action:**
- Generate summary: ~$0.002
- Suggest skills: ~$0.001
- Enhance description: ~$0.003
- Full resume review: ~$0.005
- Tailor resume: ~$0.004

**Estimated total cost per resume:** $0.02 - $0.05

**Free tier:** OpenAI often provides $5-18 in free credits for new users.

## 🔐 Security Best Practices

1. **Never commit .env**
   - Already in .gitignore
   - Contains sensitive API keys
   
2. **Rotate API keys regularly**
   - Create new keys monthly
   - Delete old keys
   
3. **Monitor API usage**
   - Check OpenAI dashboard
   - Set spending limits
   
4. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

## 🚀 Deployment Options

### Option 1: Local Use (Current)
- Run on your computer
- Access via localhost
- No hosting costs
- Data stays local

### Option 2: Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-resume-maker
heroku config:set OPENAI_API_KEY=your_key
git push heroku main
```

### Option 3: Vercel/Netlify
- Serverless deployment
- Free tier available
- Auto HTTPS
- CDN included

### Option 4: VPS (DigitalOcean, AWS, etc.)
- Full control
- Custom domain
- Scalable
- More configuration

## 📚 Additional Resources

### Learning Resources
- [Resume Writing Guide](https://www.indeed.com/career-advice/resumes-cover-letters/how-to-make-a-resume)
- [ATS Best Practices](https://www.jobscan.co/blog/8-things-you-need-to-know-about-applicant-tracking-systems/)
- [OpenAI API Docs](https://platform.openai.com/docs)

### Tools & Extensions
- Grammarly (for proofreading)
- Hemingway Editor (for readability)
- LinkedIn Profile (for content ideas)

## 🆘 Getting Help

1. **Check Documentation**
   - README.md
   - FEATURES.md
   - This file

2. **Review Code**
   - All code is commented
   - Check console logs

3. **Test API**
   - Use Postman to test endpoints
   - Check network tab in browser

4. **Community**
   - Stack Overflow
   - OpenAI Community
   - GitHub Issues

## 🎯 Next Steps

After setup:
1. ✅ Create your first resume
2. ✅ Try all AI features
3. ✅ Optimize for ATS
4. ✅ Download as PDF
5. ✅ Test with real job postings

Advanced:
- Customize templates
- Add more AI features
- Integrate with LinkedIn
- Add cloud storage
- Create cover letter generator

---

**Need Quick Help?**
- Quick start: See `QUICK_START.md`
- All features: See `FEATURES.md`
- Full docs: See `README.md`

**Ready to build your resume?**
```bash
npm start
```
Then open http://localhost:3000

Good luck with your job search! 🎉
