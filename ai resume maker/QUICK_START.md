# Quick Start Guide 🚀

Get your AI Resume Maker up and running in 5 minutes!

## Step 1: Install Node.js
If you don't have Node.js installed:
- Download from [nodejs.org](https://nodejs.org/)
- Install version 14 or higher
- Verify installation: Open terminal and run `node --version`

## Step 2: Get OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you'll need it in Step 4)

## Step 3: Install Dependencies
Open terminal in the project folder and run:

```bash
npm install
```

This will install all required packages.

## Step 4: Configure Environment
1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
   
2. Open `.env` file in a text editor

3. Replace `your_openai_api_key_here` with your actual API key:
   ```
   PORT=3000
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

## Step 5: Start the Server

```bash
npm start
```

You should see:
```
🚀 AI Resume Maker running on http://localhost:3000
```

## Step 6: Open in Browser
1. Open your web browser
2. Go to `http://localhost:3000`
3. Start building your resume!

## First Time Using?

### Try These Features First:

1. **Fill in Personal Info** - Add your name, email, phone
2. **Add Work Experience** - Click "Add Experience"
3. **Try AI Summary** - Click "AI Generate" in the summary section
4. **Get Skill Suggestions** - Click "AI Suggest" in the skills section
5. **Download PDF** - Click "Download PDF" in the header

### Pro Tips:
- Use the live preview on the right to see changes in real-time
- Check your resume score in the left sidebar
- Try the ATS Optimizer to improve your score
- Paste job descriptions to match keywords

## Troubleshooting

### "Cannot find module" error
Run `npm install` again

### AI features not working
- Check your OpenAI API key in `.env`
- Ensure you have API credits
- Check internet connection

### Port 3000 already in use
Change the PORT in `.env` to another number like 3001

### PDF not downloading
- Ensure you've filled in your name
- Try a different browser
- Check browser's download settings

## Need Help?

1. Check the full [README.md](README.md) for detailed documentation
2. Verify all dependencies are installed: `npm list`
3. Make sure Node.js version is 14+: `node --version`

## Development Mode

For auto-reload during development:

```bash
npm run dev
```

This uses nodemon to restart the server when files change.

---

Happy resume building! 🎉
