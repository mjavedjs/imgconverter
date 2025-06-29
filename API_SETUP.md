# 🔑 API Key Setup Guide

## Why you're seeing the error:
Your current API key `c0b70261-2bd5-4805-9b33-cdfeb6e7b8eb` is being rejected by DeepAI. This usually means:
- The key has expired
- The key is invalid
- You've exceeded usage limits
- The key doesn't have the right permissions

## 🚀 How to Fix This:

### Step 1: Get a New API Key
1. Go to [DeepAI.org](https://deepai.org/)
2. Sign up for a free account (or log in)
3. Go to your profile/dashboard
4. Look for "API" or "API Key" section
5. Generate a new API key
6. Copy the new key (it will look like: `quickstart-QUdJbmV5IEhlbHBsZXN0IFRva2Vu`)

### Step 2: Add Your API Key
1. Open the `.env` file in your project folder
2. Replace `your_new_api_key_here` with your actual API key:
   ```
   VITE_DEEPAI_API_KEY=your_actual_api_key_here
   ```
3. Save the file

### Step 3: Restart the App
1. Stop the development server (Ctrl+C)
2. Run `npm run dev` again
3. The app should now work with your new API key!

## 💡 Tips:
- Keep your API key private and never share it
- The `.env` file is already in `.gitignore` so it won't be uploaded to git
- DeepAI offers free API calls for new users
- If you get rate limit errors, wait a few minutes and try again

## 🔍 Still having issues?
Check the browser console (F12) for detailed error messages that will help identify the problem. 