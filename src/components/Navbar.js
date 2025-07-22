'use client';

import { useState } from 'react';
import { Sparkles, Menu, X, Github, Twitter } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Prompt Enhancer
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-200">
              Home
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-200">
              Features
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-200">
              About
            </button>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200">
                <Github className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200">
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <div className="flex flex-col space-y-2">
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-200 text-left">
                Home
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-200 text-left">
                Features
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-200 text-left">
                About
              </button>
              <div className="flex items-center space-x-2 px-4 pt-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200">
                  <Github className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200">
                  <Twitter className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}