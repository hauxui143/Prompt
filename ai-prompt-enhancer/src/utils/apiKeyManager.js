// API Key Session Manager
// Handles API key storage with 24-hour expiration and change functionality

const API_KEY_STORAGE_KEY = 'ai_prompt_enhancer_api_key';
const SESSION_STORAGE_KEY = 'ai_prompt_enhancer_session';

export class ApiKeyManager {
  // Generate a unique session ID
  static generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Save API key with session and expiration
  static saveApiKey(apiKey) {
    const sessionData = {
      apiKey: apiKey,
      sessionId: this.generateSessionId(),
      createdAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours from now
      isActive: true
    };

    localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(sessionData));
    localStorage.setItem(SESSION_STORAGE_KEY, sessionData.sessionId);
    
    return sessionData;
  }

  // Get current API key session
  static getApiKeySession() {
    try {
      const storedData = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (!storedData) return null;

      const sessionData = JSON.parse(storedData);
      
      // Check if session has expired
      if (Date.now() > sessionData.expiresAt) {
        this.clearApiKey();
        return null;
      }

      return sessionData;
    } catch (error) {
      console.error('Error retrieving API key session:', error);
      this.clearApiKey();
      return null;
    }
  }

  // Get current API key
  static getApiKey() {
    const session = this.getApiKeySession();
    return session ? session.apiKey : null;
  }

  // Check if API key exists and is valid
  static hasValidApiKey() {
    const session = this.getApiKeySession();
    return session && session.isActive && Date.now() < session.expiresAt;
  }

  // Get time remaining until expiration
  static getTimeRemaining() {
    const session = this.getApiKeySession();
    if (!session) return 0;

    const remaining = session.expiresAt - Date.now();
    return Math.max(0, remaining);
  }

  // Format time remaining for display
  static getFormattedTimeRemaining() {
    const remaining = this.getTimeRemaining();
    if (remaining === 0) return 'Expired';

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  }

  // Change/Update API key (can be done anytime)
  static changeApiKey(newApiKey) {
    // Clear existing session
    this.clearApiKey();
    
    // Save new API key with fresh session
    return this.saveApiKey(newApiKey);
  }

  // Clear API key and session
  static clearApiKey() {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  // Get session info for display
  static getSessionInfo() {
    const session = this.getApiKeySession();
    if (!session) return null;

    return {
      sessionId: session.sessionId,
      createdAt: new Date(session.createdAt).toLocaleString(),
      expiresAt: new Date(session.expiresAt).toLocaleString(),
      timeRemaining: this.getFormattedTimeRemaining(),
      isValid: this.hasValidApiKey()
    };
  }

  // Extend session by 24 hours (if user wants to)
  static extendSession() {
    const session = this.getApiKeySession();
    if (!session) return null;

    session.expiresAt = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(session));
    
    return session;
  }
}