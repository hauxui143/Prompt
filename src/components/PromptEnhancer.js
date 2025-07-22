'use client';

import { useState } from 'react';
import { Sparkles, Copy, Download, Wand2, RefreshCw, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import PromptExamples from './PromptExamples';
import ApiKeyInput from './ApiKeyInput';

export default function PromptEnhancer() {
  const [apiKey, setApiKey] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEnhancePrompt = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your OpenAI API key');
      return;
    }

    if (!originalPrompt.trim()) {
      toast.error('Please enter a prompt to enhance');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: originalPrompt,
          apiKey: apiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enhance prompt');
      }

      setEnhancedPrompt(data.enhancedPrompt);
      toast.success('Prompt enhanced successfully!');
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      toast.error(error.message || 'Failed to enhance prompt');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadText = (text, filename) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Download started!');
  };

  const clearAll = () => {
    setOriginalPrompt('');
    setEnhancedPrompt('');
    toast.success('All fields cleared!');
  };

  const handleSelectExample = (prompt) => {
    setOriginalPrompt(prompt);
    setEnhancedPrompt('');
    toast.success('Example prompt loaded!');
  };

  const handleApiKeyChange = (newApiKey) => {
    setApiKey(newApiKey);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
            <Wand2 className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          AI Prompt Enhancer
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Transform your basic prompts into powerful, detailed instructions that get better results from AI models. 
          Our advanced prompt engineering techniques will make your AI interactions more effective.
        </p>
      </div>

      {/* Examples Section */}
      <PromptExamples onSelectExample={handleSelectExample} />

      {/* API Key Section */}
      <ApiKeyInput onApiKeyChange={handleApiKeyChange} />

      {/* Main Enhancement Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Original Prompt */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Original Prompt</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(originalPrompt)}
                disabled={!originalPrompt}
                className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>
          <textarea
            value={originalPrompt}
            onChange={(e) => setOriginalPrompt(e.target.value)}
            placeholder="Enter your prompt here to enhance it with AI..."
            className="w-full h-64 px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none bg-white/80"
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {originalPrompt.length} characters
            </span>
          </div>
        </div>

        {/* Enhanced Prompt */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Enhanced Prompt</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(enhancedPrompt)}
                disabled={!enhancedPrompt}
                className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="h-5 w-5" />
              </button>
              <button
                onClick={() => downloadText(enhancedPrompt, 'enhanced-prompt.txt')}
                disabled={!enhancedPrompt}
                className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <textarea
              value={enhancedPrompt}
              readOnly
              placeholder="Your enhanced prompt will appear here..."
              className="w-full h-64 px-6 py-4 text-lg border border-gray-300 rounded-2xl bg-gray-50/80 resize-none"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                  <span className="text-lg font-medium text-gray-700">Enhancing prompt...</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {enhancedPrompt.length} characters
            </span>
            {enhancedPrompt && (
              <span className="text-sm text-green-600 font-medium">
                ✨ Enhanced by AI
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleEnhancePrompt}
          disabled={isLoading || !apiKey || !originalPrompt}
          className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span>Enhancing...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-6 w-6" />
              <span>Enhance Prompt</span>
              <ArrowRight className="h-6 w-6" />
            </>
          )}
        </button>
        
        <button
          onClick={clearAll}
          className="flex items-center justify-center space-x-3 px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <RefreshCw className="h-6 w-6" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Features Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Use Our Prompt Enhancer?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl text-center">
            <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Advanced Engineering</h3>
            <p className="text-gray-600">
              Uses proven prompt engineering techniques to make your prompts more specific, detailed, and effective.
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl text-center">
            <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-6">
              <Wand2 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Better Results</h3>
            <p className="text-gray-600">
              Get more accurate, relevant, and useful responses from AI models with enhanced prompts.
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl text-center">
            <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-6">
              <Key className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Secure & Private</h3>
            <p className="text-gray-600">
              Your API key and prompts are only used for the current session and never stored or logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}