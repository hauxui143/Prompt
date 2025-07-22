'use client';

import { useState, useEffect } from 'react';
import { Key, Clock, RefreshCw, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { ApiKeyManager } from '@/utils/apiKeyManager';
import toast from 'react-hot-toast';

export default function ApiKeyInput({ onApiKeyChange }) {
  const [apiKey, setApiKey] = useState('');
  const [sessionInfo, setSessionInfo] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const [showFullKey, setShowFullKey] = useState(false);

  // Load existing session on component mount
  useEffect(() => {
    const existingSession = ApiKeyManager.getSessionInfo();
    if (existingSession && existingSession.isValid) {
      setSessionInfo(existingSession);
      const storedKey = ApiKeyManager.getApiKey();
      if (storedKey) {
        setApiKey('');
        onApiKeyChange(storedKey);
      }
    }
  }, [onApiKeyChange]);

  // Update timer every minute
  useEffect(() => {
    if (!sessionInfo?.isValid) return;

    const interval = setInterval(() => {
      const updatedSession = ApiKeyManager.getSessionInfo();
      if (!updatedSession || !updatedSession.isValid) {
        // Session expired
        setSessionInfo(null);
        setApiKey('');
        onApiKeyChange('');
        toast.error('API key session expired. Please enter a new key.');
      } else {
        setSessionInfo(updatedSession);
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [sessionInfo, onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your OpenAI API key');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      toast.error('Invalid API key format. OpenAI keys start with "sk-"');
      return;
    }

    try {
      const session = ApiKeyManager.saveApiKey(apiKey.trim());
      setSessionInfo(ApiKeyManager.getSessionInfo());
      onApiKeyChange(apiKey.trim());
      setIsChanging(false);
      setApiKey('');
      toast.success('API key saved! Session valid for 24 hours.');
    } catch (error) {
      toast.error('Failed to save API key');
    }
  };

  const handleChangeApiKey = () => {
    setIsChanging(true);
    setApiKey('');
    setSessionInfo(null);
    ApiKeyManager.clearApiKey();
    onApiKeyChange('');
    toast.success('Ready to enter new API key');
  };

  const handleExtendSession = () => {
    try {
      ApiKeyManager.extendSession();
      setSessionInfo(ApiKeyManager.getSessionInfo());
      toast.success('Session extended for another 24 hours!');
    } catch (error) {
      toast.error('Failed to extend session');
    }
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    return `${key.substring(0, 7)}${'*'.repeat(20)}${key.substring(key.length - 4)}`;
  };

  // If we have a valid session, show session info
  if (sessionInfo?.isValid && !isChanging) {
    return (
      <div className="mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">API Key Active</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                {sessionInfo.timeRemaining}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">API Key:</span>
                <button
                  onClick={() => setShowFullKey(!showFullKey)}
                  className="text-xs text-blue-600 hover:text-blue-800 rounded-full px-2 py-1 hover:bg-blue-50"
                >
                  {showFullKey ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl font-mono text-sm">
                {showFullKey ? ApiKeyManager.getApiKey() : maskApiKey(ApiKeyManager.getApiKey())}
              </div>
            </div>
            
            <div className="space-y-3">
              <span className="text-sm font-medium text-gray-600">Session Info:</span>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Session ID: <span className="font-mono">{sessionInfo.sessionId.substring(0, 12)}...</span></div>
                <div>Created: {sessionInfo.createdAt}</div>
                <div>Expires: {sessionInfo.expiresAt}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleChangeApiKey}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Settings className="h-5 w-5" />
              <span>Change API Key</span>
            </button>
            
            <button
              onClick={handleExtendSession}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Extend Session</span>
            </button>
          </div>

          <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-green-700">
                Your API key is securely stored in your browser for this session. 
                You can change it anytime or extend the session before it expires.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show input form for new API key
  return (
    <div className="mb-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
        <div className="flex items-center mb-4">
          <Key className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            {isChanging ? 'Enter New API Key' : 'OpenAI API Key'}
          </h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          {isChanging 
            ? 'Enter your new OpenAI API key. This will create a fresh 24-hour session.'
            : 'Enter your OpenAI API key to start enhancing prompts. Your key will be stored securely for 24 hours.'
          }
        </p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white/80"
              onKeyPress={(e) => e.key === 'Enter' && handleSaveApiKey()}
            />
            <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
              <Key className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button
            onClick={handleSaveApiKey}
            disabled={!apiKey.trim()}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Key className="h-5 w-5" />
            <span>{isChanging ? 'Save New API Key' : 'Save API Key'}</span>
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Session Management:</p>
                <ul className="space-y-1 text-xs">
                  <li>• API key valid for 24 hours from save time</li>
                  <li>• Can change or extend session anytime</li>
                  <li>• Stored securely in your browser only</li>
                  <li>• Auto-expires after 24 hours for security</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            🔒 Your API key is secure and only used for this session. Get your key from{' '}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline rounded-full px-1 hover:bg-blue-50"
            >
              OpenAI Platform
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}