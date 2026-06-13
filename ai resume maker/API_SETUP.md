# OpenAI API Setup Guide 🔑

Complete guide to setting up OpenAI API for the AI Resume Maker.

## Why Do You Need This?

The AI features in this resume maker use OpenAI's GPT-3.5 model to:
- Generate professional summaries
- Suggest relevant skills
- Enhance job descriptions
- Review your resume
- Provide optimization tips

## Step-by-Step API Setup

### Step 1: Create OpenAI Account

1. **Visit OpenAI Website**
   - Go to https://platform.openai.com/
   - Click "Sign up" (top right)

2. **Choose Sign-up Method**
   - Google account (easiest)
   - Microsoft account
   - Email and password

3. **Verify Email**
   - Check your email
   - Click verification link
   - Complete account setup

### Step 2: Set Up Billing (Required)

OpenAI requires billing information even for the free tier.

1. **Navigate to Billing**
   - Log in to https://platform.openai.com/
   - Click your profile (top right)
   - Select "Billing"

2. **Add Payment Method**
   - Click "Add payment method"
   - Enter credit/debit card details
   - Click "Add"

3. **Set Spending Limit** (Recommended)
   - Click "Usage limits"
   - Set "Hard limit" to $5 or $10
   - This prevents unexpected charges
   - You'll get notified when reached

4. **Free Credits**
   - New accounts often get $5-18 free credits
   - Valid for 3 months
   - Check "Free trial usage" section

### Step 3: Generate API Key

1. **Go to API Keys Section**
   - Click your profile (top right)
   - Select "API keys"
   - Or visit https://platform.openai.com/api-keys

2. **Create New Key**
   - Click "+ Create new secret key"
   - Give it a name: "Resume Maker"
   - Click "Create secret key"

3. **Copy the Key**
   - **IMPORTANT:** Copy it immediately!
   - You won't be able to see it again
   - Format: `sk-...` (starts with sk-)
   - Click "Copy" button

4. **Store Safely**
   - Never share this key
   - Don't commit to GitHub
   - Keep it secure

### Step 4: Configure Your App

1. **Create .env File**
   ```bash
   copy .env.example .env
   ```

2. **Add Your API Key**
   Open `.env` and add:
   ```env
   PORT=3000
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```

3. **Save and Close**
   - Save the file
   - Don't share or commit this file

### Step 5: Test the Connection

1. **Start Your Server**
   ```bash
   npm start
   ```

2. **Open the App**
   - Go to http://localhost:3000

3. **Test AI Feature**
   - Click "AI Generate" in Summary section
   - Enter test data
   - If it works, you're all set! ✅

## Understanding API Pricing

### Current Pricing (GPT-3.5-turbo)

| Action | Tokens | Cost |
|--------|--------|------|
| Input | 1,000 tokens | $0.001 |
| Output | 1,000 tokens | $0.002 |

### What's a Token?

- Roughly 4 characters or 0.75 words
- "Hello world!" ≈ 3 tokens
- Average sentence ≈ 15-20 tokens

### Cost Per Feature

**In This App:**

| Feature | Avg Tokens | Approx Cost |
|---------|-----------|-------------|
| Generate Summary | 500-800 | $0.002 |
| Suggest Skills | 300-500 | $0.001 |
| Enhance Description | 800-1200 | $0.003 |
| Review Resume | 1500-2000 | $0.005 |
| Tailor Resume | 1000-1500 | $0.004 |
| Match Keywords | 400-600 | $0.002 |

**Building one complete resume:** ~$0.02 - $0.05

**With $5 free credits:** 100-250 resumes! 🎉

### Monitoring Usage

1. **Check Dashboard**
   - Go to https://platform.openai.com/usage
   - View real-time usage
   - See costs by date

2. **Set Up Alerts**
   - Settings → Billing → Usage limits
   - Email threshold: $1, $5, $10
   - Hard limit: $10 (recommended)

3. **Usage Tips**
   - Review after each resume
   - Stay within free tier if possible
   - Monitor daily usage

## Troubleshooting

### Error: "Invalid API Key"

**Causes:**
- Key not set in .env
- Wrong key format
- Key deleted on OpenAI platform
- Typo in key

**Solutions:**
```bash
# 1. Check .env file exists
dir .env

# 2. Verify key format (should start with sk-)
# Open .env and check

# 3. Generate new key if needed
# Go to platform.openai.com/api-keys

# 4. Restart server after changes
npm start
```

### Error: "Insufficient Quota"

**Causes:**
- No free credits left
- Payment method not added
- Spending limit reached

**Solutions:**
1. Check billing at https://platform.openai.com/account/billing
2. Add payment method
3. Increase spending limit
4. Add credits

### Error: "Rate Limit Exceeded"

**Causes:**
- Too many requests in short time
- Free tier limits

**Solutions:**
1. Wait 20-60 seconds
2. Try again
3. Consider upgrading to paid tier

### Error: "Network Error"

**Causes:**
- No internet connection
- Firewall blocking OpenAI
- VPN issues

**Solutions:**
1. Check internet connection
2. Disable VPN temporarily
3. Check firewall settings
4. Try different network

## Security Best Practices

### 🔐 Protecting Your API Key

**DO:**
- ✅ Keep it in .env file
- ✅ Add .env to .gitignore
- ✅ Use environment variables
- ✅ Rotate keys monthly
- ✅ Set spending limits
- ✅ Monitor usage regularly

**DON'T:**
- ❌ Commit to GitHub
- ❌ Share on Discord/Slack
- ❌ Hardcode in source files
- ❌ Email to others
- ❌ Post in screenshots
- ❌ Store in plain text docs

### If Key is Compromised

1. **Revoke Immediately**
   - Go to https://platform.openai.com/api-keys
   - Find the compromised key
   - Click "Revoke"
   - Confirm

2. **Generate New Key**
   - Create new key
   - Update .env file
   - Restart server

3. **Check Usage**
   - Review recent activity
   - Look for unauthorized usage
   - Contact OpenAI if needed

4. **Reset Spending Limit**
   - Temporarily set to $0
   - Increase after new key working

## Alternative: Free Tier Limitations

### OpenAI Free Tier

**Includes:**
- $5-18 in free credits (varies by region)
- Valid for 3 months
- Access to GPT-3.5-turbo
- Same features as paid

**Limitations:**
- Expires after 3 months
- Lower rate limits
- May have queuing during peak times

### After Free Credits

**Options:**

1. **Pay-as-you-go**
   - Only pay for what you use
   - ~$0.02-0.05 per resume
   - No monthly fees

2. **Prepaid Credits**
   - Add $10, $20, $50
   - Use over time
   - Never expires

3. **Use Alternatives**
   - Manual content entry
   - Other AI services
   - Copy from templates

## API Key Management

### Creating Multiple Keys

You can create separate keys for:
- Development
- Production
- Testing
- Different apps

**Benefits:**
- Easy to revoke one without affecting others
- Track usage per key
- Separate limits per key

### Key Naming Convention

Example names:
- `Resume_Maker_Development`
- `Resume_Maker_Production`
- `Resume_Maker_Testing_2024`

## Environment Variables Explained

### .env File Structure

```env
# Server Configuration
PORT=3000                    # Port for local server

# OpenAI Configuration
OPENAI_API_KEY=sk-...       # Your API key from platform.openai.com

# Optional: Model Selection
OPENAI_MODEL=gpt-3.5-turbo  # AI model to use

# Optional: Temperature (creativity)
OPENAI_TEMPERATURE=0.7       # 0.0-1.0 (lower=consistent, higher=creative)

# Optional: Max Tokens
OPENAI_MAX_TOKENS=500        # Maximum response length
```

### Loading Environment Variables

The app uses `dotenv` package:

```javascript
require('dotenv').config();

// Access variables
const apiKey = process.env.OPENAI_API_KEY;
const port = process.env.PORT || 3000;
```

## Testing Your Setup

### Quick Test Script

Create `test-api.js`:

```javascript
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function test() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello!" }],
      max_tokens: 10
    });
    console.log('✅ API Key is working!');
    console.log('Response:', completion.choices[0].message.content);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
```

Run:
```bash
node test-api.js
```

Expected output:
```
✅ API Key is working!
Response: Hello! How can I assist you today?
```

## Additional Resources

### Official Documentation
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [GPT-3.5 Guide](https://platform.openai.com/docs/guides/gpt)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)

### Pricing Information
- [Pricing Page](https://openai.com/pricing)
- [Usage Dashboard](https://platform.openai.com/usage)

### Community
- [OpenAI Community Forum](https://community.openai.com/)
- [OpenAI Discord](https://discord.gg/openai)

### Tutorials
- [OpenAI Cookbook](https://github.com/openai/openai-cookbook)
- [Example Applications](https://platform.openai.com/examples)

## FAQ

### Q: Do I need to pay immediately?
**A:** No, OpenAI provides free credits for new accounts. Add a payment method but set a low spending limit ($5-10).

### Q: What happens if I exceed my limit?
**A:** API calls will fail. The app has fallback options, so it won't break completely.

### Q: Can I use a different AI service?
**A:** Yes, but you'd need to modify the code. The app is designed for OpenAI's API.

### Q: Is my data sent to OpenAI?
**A:** Yes, your resume content is sent to generate suggestions. Read [OpenAI's privacy policy](https://openai.com/policies/privacy-policy).

### Q: Can I run this offline?
**A:** No, AI features require internet. But you can still build resumes manually.

### Q: What's the minimum credit needed?
**A:** $5 is enough for 100-250 resumes with AI features.

## Need Help?

1. **Check OpenAI Status**
   - Visit https://status.openai.com/
   - See if there are any outages

2. **Read Error Messages**
   - Check server console
   - Check browser console
   - Error messages are usually clear

3. **Test API Key**
   - Use the test script above
   - Verify on OpenAI dashboard

4. **Community Support**
   - OpenAI Community Forum
   - Stack Overflow
   - GitHub Issues

---

**Ready to start?**

1. ✅ Create OpenAI account
2. ✅ Add payment method
3. ✅ Generate API key
4. ✅ Add to .env file
5. ✅ Run `npm start`
6. ✅ Test AI features

**Happy resume building!** 🚀
