# 🎨 AI Image Converter & Avatar Creator

Transform your photos into stunning cartoon-style artwork and create personalized avatars using advanced AI technology powered by DeepAI and DoppelMe.

## ✨ Features

### 🎨 AI Cartoonifier
- 🖼️ **Drag & Drop Upload**: Easy image upload with drag and drop support
- 🎨 **AI-Powered Cartoonification**: Advanced AI technology for high-quality results
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚡ **Fast Processing**: Optimized for quick image processing
- 💾 **Easy Download**: One-click download of your cartoonified images

### 🎭 DoppelMe Avatar Creator
- 🎭 **Personalized Avatars**: Create unique avatars with AI-powered DoppelMe technology
- 🎨 **Multiple Styles**: Choose from 8 different avatar styles (Cartoon, Anime, Pixel Art, etc.)
- 🔧 **Customizable**: Set your own Avatar ID or use the default
- 📥 **Retrieve Avatars**: Get existing avatars by ID
- 💾 **Easy Download**: Download your created avatars instantly

### 🛠️ General Features
- 🛡️ **Error Handling**: Graceful error handling with user-friendly messages
- 🔄 **Retry Logic**: Automatic retry with exponential backoff for better reliability
- 🎯 **Tabbed Interface**: Switch between Cartoonifier and Avatar Creator seamlessly
- 📱 **Responsive Design**: Beautiful UI that works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- DeepAI API key (free)
- RapidAPI key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd imgconverter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API keys**
   - **DeepAI API key**: Go to [DeepAI.org](https://deepai.org/)
   - **RapidAPI key**: Go to [RapidAPI.com](https://rapidapi.com/)
   - Sign up for free accounts and generate API keys

4. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your API keys:
   ```env
   VITE_DEEPAI_API_KEY=your_deepai_api_key_here
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Switch between tabs to use different features!

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Required: Your DeepAI API key (for cartoonification)
VITE_DEEPAI_API_KEY=your_deepai_api_key_here

# Required: Your RapidAPI key (for avatar creation)
VITE_RAPIDAPI_KEY=your_rapidapi_key_here

# Optional: API Configuration
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
```

### API Configuration

- **VITE_DEEPAI_API_KEY**: Your DeepAI API key (required for cartoonification)
- **VITE_RAPIDAPI_KEY**: Your RapidAPI key (required for avatar creation)
- **VITE_API_TIMEOUT**: Request timeout in milliseconds (default: 30000)
- **VITE_MAX_RETRIES**: Maximum retry attempts for failed requests (default: 3)

## 📁 Project Structure

```
imgconverter/
├── src/
│   ├── components/
│   │   ├── DeepAIImageModifier.jsx     # Cartoonifier component
│   │   ├── DoppelMeAvatarCreator.jsx   # Avatar creator component
│   │   └── ErrorBoundary.jsx           # Error handling
│   ├── config/
│   │   └── api.js                      # API configuration
│   ├── utils/
│   │   └── api.js                      # API utilities
│   ├── App.jsx                         # Main app with tabbed interface
│   └── main.jsx                        # Entry point
├── public/                             # Static assets
├── .env.example                        # Environment variables template
├── package.json                        # Dependencies and scripts
└── README.md                           # This file
```

## 🎯 Usage Guide

### 🎨 AI Cartoonifier

1. **Upload Image**
   - Drag and drop an image onto the upload area
   - Or click to browse and select a file
   - Supported formats: JPEG, PNG, GIF, WebP (max 10MB)

2. **Process Image**
   - Click "Cartoonify Now!" to start processing
   - Wait for the AI to transform your image
   - Processing typically takes 10-30 seconds

3. **Download Result**
   - Once processing is complete, click "Download Cartoonified Image"
   - Your cartoonified image will be saved to your device

### 🎭 DoppelMe Avatar Creator

1. **Configure Avatar**
   - Enter a unique Avatar ID or use the default
   - Choose your preferred avatar style from the dropdown
   - Available styles: Classic Cartoon, Anime, Pixel Art, Watercolor, Oil Painting, Sketch, Pop Art, Gothic

2. **Create Avatar**
   - Click "Create Avatar" to generate a new avatar
   - Or click "Get Avatar" to retrieve an existing one
   - Wait for the avatar to be generated

3. **Download Avatar**
   - Once created, click "Download Avatar"
   - Your personalized avatar will be saved to your device

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔍 Troubleshooting

### Common Issues

#### 1. "API Key Required" Error
**Problem**: You see an API key warning message.

**Solution**:
- Make sure you have a `.env` file in the root directory
- Ensure both API keys are correctly formatted
- Restart the development server after adding the API keys

#### 2. "API Key Invalid" Error
**Problem**: API key is rejected by the service.

**Solution**:
- Get new API keys from [DeepAI.org](https://deepai.org/) and [RapidAPI.com](https://rapidapi.com/)
- Make sure you're not using the example keys
- Check if your accounts have available credits

#### 3. "Network Error" or "Timeout Error"
**Problem**: Connection issues with the APIs.

**Solution**:
- Check your internet connection
- Try again in a few minutes
- The app will automatically retry failed requests

#### 4. "File Size Too Large" Error (Cartoonifier)
**Problem**: Image file exceeds the 10MB limit.

**Solution**:
- Compress your image before uploading
- Use a smaller image file
- Convert to a more efficient format (JPEG, WebP)

#### 5. "Invalid File Type" Error (Cartoonifier)
**Problem**: Unsupported image format.

**Solution**:
- Use supported formats: JPEG, PNG, GIF, WebP
- Convert your image to a supported format

### Performance Tips

- **Image Size**: Smaller images process faster in cartoonifier
- **Format**: JPEG and WebP are most efficient
- **Resolution**: Lower resolution images work well for cartoonification
- **Internet**: Stable internet connection improves reliability
- **Avatar ID**: Use unique IDs for different avatar styles

## 🔒 Security

- API keys are stored locally in `.env` files
- `.env` files are automatically ignored by Git
- Never commit your actual API keys to version control
- The app only sends data to secure APIs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [DeepAI](https://deepai.org/) for providing the AI cartoonification API
- [DoppelMe](https://doppelme.com/) for providing the avatar creation API
- [RapidAPI](https://rapidapi.com/) for the API marketplace
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information about your problem

---

**Happy creating! 🎨✨**
