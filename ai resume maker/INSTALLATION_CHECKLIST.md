# Installation Checklist ✅

Follow this checklist to ensure everything is set up correctly.

## Pre-Installation

- [ ] Node.js installed (v14+)
  ```bash
  node --version
  ```
  Expected: `v14.0.0` or higher

- [ ] npm installed (v6+)
  ```bash
  npm --version
  ```
  Expected: `6.0.0` or higher

- [ ] Internet connection active
  ```bash
  ping google.com
  ```
  Expected: Successful ping

## Installation Steps

- [ ] Navigate to project directory
  ```bash
  cd "ai resume maker"
  ```

- [ ] Install dependencies
  ```bash
  npm install
  ```
  Expected: No errors, `node_modules` folder created

- [ ] Verify dependencies installed
  ```bash
  npm list --depth=0
  ```
  Expected: List of installed packages

## Configuration

- [ ] Create .env file
  ```bash
  copy .env.example .env
  ```
  Expected: `.env` file created

- [ ] OpenAI API key obtained
  - [ ] Account created at platform.openai.com
  - [ ] Payment method added
  - [ ] API key generated
  - [ ] Key copied (starts with `sk-`)

- [ ] Edit .env file
  - [ ] OPENAI_API_KEY set
  - [ ] PORT set (default: 3000)
  - [ ] File saved

## Testing

- [ ] Start server
  ```bash
  npm start
  ```
  Expected: `🚀 AI Resume Maker running on http://localhost:3000`

- [ ] Open browser
  - Navigate to: `http://localhost:3000`
  - Expected: Application loads

- [ ] Test basic features
  - [ ] Type in name field
  - [ ] Preview updates
  - [ ] Score displays

- [ ] Test AI features (with valid API key)
  - [ ] Click "AI Generate" for summary
  - [ ] Provide job title and experience
  - [ ] Summary generated successfully
  - [ ] No errors in console

- [ ] Test template switching
  - [ ] Click different templates
  - [ ] Preview changes
  - [ ] All templates work

- [ ] Test PDF generation
  - [ ] Fill in basic info
  - [ ] Click "Download PDF"
  - [ ] PDF downloads
  - [ ] PDF opens correctly

## Troubleshooting Checklist

If something doesn't work:

### Server Won't Start

- [ ] Check port 3000 is free
  ```bash
  netstat -ano | findstr :3000
  ```
  
- [ ] Try different port
  - Edit `.env`: `PORT=3001`
  - Restart server

- [ ] Check for syntax errors
  - Review server.js
  - Check console output

### AI Features Don't Work

- [ ] Verify .env file exists
  ```bash
  dir .env
  ```

- [ ] Check API key format
  - Open .env
  - Verify starts with `sk-`
  - No extra spaces

- [ ] Test API key
  - Visit platform.openai.com
  - Check API key status
  - Verify not revoked

- [ ] Check API credits
  - Visit platform.openai.com/usage
  - Verify credits available
  - Add payment if needed

- [ ] Restart server after .env changes
  ```bash
  # Stop server (Ctrl+C)
  npm start
  ```

### Dependencies Issues

- [ ] Clear npm cache
  ```bash
  npm cache clean --force
  ```

- [ ] Delete node_modules
  ```bash
  rmdir /s /q node_modules
  ```

- [ ] Reinstall
  ```bash
  npm install
  ```

- [ ] Try legacy peer deps
  ```bash
  npm install --legacy-peer-deps
  ```

### PDF Not Generating

- [ ] Name field filled
- [ ] Browser allows downloads
- [ ] Check browser console for errors
- [ ] Try different browser

## Verification Script

Run this to verify everything:

```javascript
// verify-setup.js
require('dotenv').config();

console.log('🔍 Verifying Setup...\n');

// Check Node version
const nodeVersion = process.version;
console.log(`✅ Node.js version: ${nodeVersion}`);

// Check environment variables
if (process.env.OPENAI_API_KEY) {
  console.log('✅ OPENAI_API_KEY is set');
  console.log(`   Key format: ${process.env.OPENAI_API_KEY.substring(0, 7)}...`);
} else {
  console.log('❌ OPENAI_API_KEY is not set');
}

if (process.env.PORT) {
  console.log(`✅ PORT is set to ${process.env.PORT}`);
} else {
  console.log('⚠️  PORT not set, will use default 3000');
}

// Check dependencies
console.log('\n📦 Checking Dependencies...');
try {
  require('express');
  console.log('✅ express installed');
} catch (e) {
  console.log('❌ express not installed');
}

try {
  require('openai');
  console.log('✅ openai installed');
} catch (e) {
  console.log('❌ openai not installed');
}

try {
  require('pdfkit');
  console.log('✅ pdfkit installed');
} catch (e) {
  console.log('❌ pdfkit not installed');
}

try {
  require('natural');
  console.log('✅ natural installed');
} catch (e) {
  console.log('❌ natural not installed');
}

console.log('\n✨ Verification complete!\n');
```

Save as `verify-setup.js` and run:
```bash
node verify-setup.js
```

## Success Criteria

Your setup is complete when:

- ✅ Server starts without errors
- ✅ Application loads in browser
- ✅ Forms are interactive
- ✅ Preview updates in real-time
- ✅ AI features work (with API key)
- ✅ Templates can be switched
- ✅ PDF can be downloaded
- ✅ No console errors

## Post-Installation

- [ ] Read README.md for full documentation
- [ ] Review FEATURES.md for capabilities
- [ ] Check SETUP_GUIDE.md for detailed usage
- [ ] Bookmark API_SETUP.md for API help

## Security Checklist

- [ ] .env file is in .gitignore
- [ ] API key is kept secret
- [ ] No API key in source code
- [ ] Spending limit set on OpenAI
- [ ] .env file not shared

## Ready to Use!

If all checkboxes are marked, you're ready to:

1. 🎯 Build your resume
2. 🤖 Use AI features
3. 📊 Optimize for ATS
4. 📥 Download PDF
5. 🚀 Apply for jobs!

## Quick Command Reference

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev

# Test setup
node verify-setup.js

# Check for updates
npm outdated

# Update dependencies
npm update

# Audit security
npm audit
```

## Getting Help

If you're stuck:

1. ✅ Review error messages carefully
2. ✅ Check console logs (browser & server)
3. ✅ Verify environment variables
4. ✅ Test API key separately
5. ✅ Restart server
6. ✅ Clear cache and reinstall
7. ✅ Review documentation
8. ✅ Search for error online

## Common Error Solutions

| Error | Solution |
|-------|----------|
| Port in use | Change PORT in .env |
| Module not found | Run `npm install` |
| Invalid API key | Check .env file |
| ECONNREFUSED | Check internet connection |
| Permission denied | Run as administrator |
| Syntax error | Check for typos in code |

## Support Files

All documentation files in this project:

- 📄 **README.md** - Main documentation
- 🚀 **QUICK_START.md** - 5-minute setup
- ✨ **FEATURES.md** - Complete features list
- 🛠️ **SETUP_GUIDE.md** - Detailed setup & usage
- 🔑 **API_SETUP.md** - OpenAI API guide
- ✅ **INSTALLATION_CHECKLIST.md** - This file

## Final Check

Before considering installation complete:

```bash
# 1. Server starts
npm start
# Expected: "🚀 AI Resume Maker running..."

# 2. Browser loads
# Open: http://localhost:3000
# Expected: Resume builder interface

# 3. AI works (if API key set)
# Click: "AI Generate" button
# Expected: Summary generated

# 4. PDF works
# Click: "Download PDF"
# Expected: PDF downloads
```

---

**Installation Status:**

- [ ] All checks passed
- [ ] Application running
- [ ] AI features working
- [ ] Ready to use

**Date Completed:** _______________

**Notes:**
_______________________________________________________
_______________________________________________________
_______________________________________________________

---

**Congratulations!** 🎉

Your AI Resume Maker is ready to use!

Start building your perfect resume now! 💼✨
