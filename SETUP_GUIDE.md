# 🔧 Complete Setup Guide

## 🎯 Quick Setup (Recommended)

### Step 1: Run the Setup Script
```bash
npm run setup
```
This will guide you through the API key configuration automatically.

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the App
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to `http://localhost:5173`

---

## 📝 Manual Setup

If you prefer to set up manually, follow these steps:

### Step 1: Get Your DeepAI API Key

1. Go to [DeepAI.org](https://deepai.org/)
2. Sign up for a free account (or log in)
3. Navigate to your profile/dashboard
4. Look for "API" or "API Key" section
5. Generate a new API key
6. Copy the key (it looks like: `quickstart-QUdJbmV5IEhlbHBsZXN0IFRva2Vu`)

### Step 2: Create the .env File

1. **Create a new file** in your project root directory (same level as `package.json`)
2. **Name it exactly**: `.env` (with the dot at the beginning)
3. **Add this content**:

```env
# DeepAI API Configuration
# Get your free API key from: https://deepai.org/
VITE_DEEPAI_API_KEY=your_actual_api_key_here

# Optional: API Configuration
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
```

4. **Replace** `your_actual_api_key_here` with your real API key from DeepAI

### Step 3: Example .env File

Here's what your `.env` file should look like:

```env
# DeepAI API Configuration
# Get your free API key from: https://deepai.org/
VITE_DEEPAI_API_KEY=quickstart-QUdJbmV5IEhlbHBsZXN0IFRva2Vu

# Optional: API Configuration
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
```

### Step 4: Install and Run

```bash
npm install
npm run dev
```

---

## 🔍 How the API Key is Imported

The API key is imported in the following flow:

1. **Environment Variable**: `VITE_DEEPAI_API_KEY` in `.env` file
2. **Config File**: `src/config/api.js` reads the environment variable
3. **API Utility**: `src/utils/api.js` uses the config
4. **Component**: `src/components/DeepAIImageModifier.jsx` calls the API

### Code Flow:

```javascript
// 1. Environment variable (in .env file)
VITE_DEEPAI_API_KEY=your_api_key_here

// 2. Config file (src/config/api.js)
DEEPAI_API_KEY: import.meta.env.VITE_DEEPAI_API_KEY || ''

// 3. API utility (src/utils/api.js)
config.headers['Api-Key'] = API_CONFIG.DEEPAI_API_KEY;

// 4. Component validation
if (!isApiKeyValid()) {
  throw new Error('Please add your DeepAI API key to the .env file');
}
```

---

## ✅ Verification Steps

### Check if API Key is Working:

1. **Look at the status bar** in the app - it should show "✅ API key is configured"
2. **Check browser console** (F12) - you should see API key status logs
3. **Try uploading an image** - the "Cartoonify Now!" button should be enabled

### If API Key is Not Working:

1. **Check .env file location** - it must be in the project root (same folder as `package.json`)
2. **Check .env file format** - no spaces around the `=` sign
3. **Restart the dev server** - run `npm run dev` again
4. **Check browser console** - look for error messages

---

## 🚨 Common Issues

### Issue: "API key is missing or invalid"

**Solutions:**
1. Make sure `.env` file exists in project root
2. Check that the API key is correctly formatted
3. Restart the development server
4. Verify the API key is valid on DeepAI.org

### Issue: "Cannot find .env file"

**Solutions:**
1. Create the `.env` file manually
2. Make sure it's named exactly `.env` (with the dot)
3. Place it in the project root directory
4. Use the setup script: `npm run setup`

### Issue: "API key is invalid or expired"

**Solutions:**
1. Get a new API key from DeepAI.org
2. Update your `.env` file with the new key
3. Restart the development server
4. Check your DeepAI account for available credits

---

## 📁 File Structure

Your project should look like this:

```
imgconverter/
├── .env                    ← Your API key goes here
├── package.json
├── src/
│   ├── components/
│   │   └── DeepAIImageModifier.jsx
│   ├── config/
│   │   └── api.js         ← Reads the API key
│   └── utils/
│       └── api.js         ← Uses the API key
└── README.md
```

---

## 🔧 Advanced Configuration

### Custom Timeout and Retries:

```env
# DeepAI API Configuration
VITE_DEEPAI_API_KEY=your_api_key_here

# Custom settings
VITE_API_TIMEOUT=45000    # 45 seconds
VITE_MAX_RETRIES=5        # 5 retry attempts
```

### Environment-Specific Files:

- `.env` - Default environment variables
- `.env.local` - Local overrides (ignored by git)
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables

---

## 🎉 Success!

Once your API key is configured correctly:

1. ✅ The status bar will show "API key is configured"
2. ✅ The "Cartoonify Now!" button will be enabled
3. ✅ You can upload and process images
4. ✅ No more error messages about missing API keys

**Happy Cartoonifying! 🎨✨** 