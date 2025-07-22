import { Sparkles, Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Prompt Enhancer
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Transform your AI prompts with advanced prompt engineering techniques. 
              Make your interactions with AI more effective, detailed, and specific.
            </p>
            <div className="flex space-x-3">
              <button className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200">
                <Github className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
                  Home
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
                  Features
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
                  About
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
                  Documentation
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
                  Prompt Guide
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
                  API Reference
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
                  Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 text-gray-600 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>using Next.js & OpenAI</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600">
            <button className="hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
              Privacy Policy
            </button>
            <button className="hover:text-blue-600 transition-colors duration-200 rounded-full px-2 py-1 hover:bg-blue-50">
              Terms of Service
            </button>
            <span>© 2024 AI Prompt Enhancer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}