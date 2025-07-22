# 🚀 AI Prompt Enhancer

A professional Next.js application that transforms your basic AI prompts into powerful, detailed instructions using advanced prompt engineering techniques.

![AI Prompt Enhancer](https://img.shields.io/badge/AI-Prompt%20Enhancer-blue?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-API-green?style=for-the-badge&logo=openai)

## ✨ Features

- **🎯 Advanced Prompt Engineering**: Transform basic prompts into detailed, effective instructions
- **⏰ Session Management**: 24-hour API key sessions with timer and auto-expiry
- **🔄 Flexible API Keys**: Change or extend API keys anytime during the session
- **🔒 Secure & Private**: Client-side storage only, no server-side API key storage
- **🎨 Beautiful UI**: Modern, responsive design with glassmorphism effects
- **📱 Mobile-First**: Fully responsive design that works on all devices
- **🚀 Fast & Efficient**: Built with Next.js 14 and optimized for performance
- **💡 Example Prompts**: Pre-built examples across different categories
- **📋 Copy & Download**: Easy copy-to-clipboard and download functionality
- **🌈 Professional Design**: Gradient backgrounds, rounded borders, and smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (JavaScript)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **AI Integration**: OpenAI API
- **Deployment**: Ready for Vercel, Netlify, or any hosting platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-prompt-enhancer
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
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Enter your OpenAI API Key**: Input your API key - it creates a 24-hour session
2. **Session Management**: Your key is stored securely with timer display
3. **Write your prompt**: Enter the basic prompt you want to enhance
4. **Click "Enhance Prompt"**: Let AI transform your prompt with advanced techniques
5. **Copy or Download**: Use the enhanced prompt in your AI interactions
6. **Manage Sessions**: Change API key anytime or extend your session

### Example Usage

**Original Prompt:**
```
Write a story about a robot
```

**Enhanced Prompt:**
```
Create a compelling short story (800-1200 words) about a robot character. Include the following elements:

- A clear protagonist (the robot) with distinct personality traits
- A specific setting (time and place)
- A central conflict or challenge the robot faces
- Character development showing growth or change
- Vivid descriptions that help readers visualize scenes
- Dialogue that reveals character and advances the plot
- A satisfying resolution

Consider themes such as humanity, technology, acceptance, or self-discovery. Write in third person narrative with a engaging, accessible tone suitable for general audiences.
```

## 🎨 Design Features

- **Glassmorphism Effects**: Beautiful translucent cards with backdrop blur
- **Gradient Backgrounds**: Smooth color transitions throughout the UI
- **Rounded Borders**: All buttons and elements have full border radius
- **Hover Animations**: Smooth scale and color transitions
- **Professional Typography**: Clean, readable fonts with proper hierarchy
- **Responsive Layout**: Perfect on desktop, tablet, and mobile devices

## 📱 Components

- **Navbar**: Professional navigation with logo and social links
- **Footer**: Comprehensive footer with links and branding
- **PromptEnhancer**: Main component with API integration
- **PromptExamples**: Interactive example prompts in various categories
- **Toast Notifications**: User-friendly feedback system

## 🔧 API Routes

### `/api/enhance-prompt`

**Method**: POST

**Body**:
```json
{
  "prompt": "Your original prompt text",
  "apiKey": "Your OpenAI API key"
}
```

**Response**:
```json
{
  "enhancedPrompt": "Enhanced prompt with advanced techniques"
}
```

## 🎯 Prompt Engineering Techniques

The enhancer applies several advanced techniques:

- **Specificity Enhancement**: Makes vague requests more specific
- **Context Addition**: Adds relevant background information
- **Format Specification**: Defines expected output structure
- **Example Integration**: Includes examples when helpful
- **Constraint Definition**: Adds helpful limitations and guidelines
- **Role Assignment**: Assigns specific roles to the AI
- **Output Quality Improvement**: Enhances for better, more useful results

## 🌟 Categories

The application includes examples across various categories:

- 🎨 **Creative Writing**: Stories, poems, creative content
- 💻 **Code Generation**: Programming tasks and solutions
- 💼 **Business Strategy**: Marketing, planning, analysis
- 📚 **Learning & Education**: Explanations, tutorials, guides
- 🧠 **Problem Solving**: Logic, troubleshooting, optimization
- 💡 **Creative Ideas**: Brainstorming, innovation, inspiration

## 🔒 Security & Privacy

- **Session Management**: API keys stored with 24-hour auto-expiry
- **Client-Side Only**: Keys stored in browser localStorage, never on server
- **No Server Storage**: No database or server-side API key storage
- **Session Control**: Change or extend sessions anytime
- **Direct API Calls**: Your requests go directly to OpenAI
- **No Logging**: No user data is logged or tracked
- **Auto-Cleanup**: Expired sessions automatically cleared

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms

The application works on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the powerful API
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- React Hot Toast for smooth notifications

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the example prompts

---

**Made with ❤️ using Next.js & OpenAI**

Transform your prompts, enhance your AI interactions! 🚀