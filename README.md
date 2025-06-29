# 🎨 AI Image Cartoonifier

A modern, beautiful web application that transforms your photos into stunning cartoon-style artwork using advanced AI technology. Built with React, Framer Motion, and Tailwind CSS.

![AI Image Cartoonifier](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-blue?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-green?style=for-the-badge)

## ✨ Features

- 🎯 **Drag & Drop Interface** - Easy image upload with drag and drop functionality
- 🤖 **AI-Powered Transformation** - Uses DeepAI's advanced machine learning algorithms
- ⚡ **Lightning Fast** - Get your cartoonified image in seconds
- 🎨 **Beautiful UI/UX** - Modern glassmorphism design with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 💾 **Easy Download** - Download your transformed images instantly
- 🔄 **Real-time Preview** - See your original and transformed images side by side
- 🎭 **Smooth Animations** - Powered by Framer Motion for delightful interactions

## 🚀 Live Demo

Experience the AI Image Cartoonifier in action! Upload any photo and watch it transform into a beautiful cartoon-style artwork.

## 🛠️ Technologies Used

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful & consistent icon toolkit
- **Axios** - Promise-based HTTP client for API calls
- **DeepAI API** - Advanced AI image processing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd imgconverter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🎯 Usage

1. **Upload Image**: Drag and drop an image or click to browse files
2. **Preview**: See your original image in the preview area
3. **Transform**: Click "Cartoonify Now" to process your image with AI
4. **Download**: Once processing is complete, download your cartoonified image

## 🔧 Configuration

### API Key Setup

The application uses the DeepAI API for image transformation. Make sure you have a valid API key:

1. Sign up at [DeepAI](https://deepai.org/)
2. Get your API key from the dashboard
3. Replace the API key in `src/components/DeepAIImageModifier.jsx`:

```javascript
'Api-Key': 'YOUR_API_KEY_HERE'
```

## 📁 Project Structure

```
imgconverter/
├── public/
├── src/
│   ├── components/
│   │   └── DeepAIImageModifier.jsx    # Main component
│   ├── assets/
│   ├── App.jsx                        # App entry point
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Global styles
├── tailwind.config.js                 # Tailwind configuration
├── postcss.config.js                  # PostCSS configuration
├── package.json                       # Dependencies and scripts
└── README.md                          # This file
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS with custom animations and glassmorphism effects. You can customize:

- Colors in `tailwind.config.js`
- Animations in the config file
- Component styles in `src/index.css`

### Animations
Framer Motion animations can be customized in the component files. The app includes:

- Fade-in animations
- Scale transitions
- Floating background elements
- Loading spinners

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DeepAI](https://deepai.org/) for providing the AI image processing API
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us.

---

**Made with ❤️ using React and AI**
