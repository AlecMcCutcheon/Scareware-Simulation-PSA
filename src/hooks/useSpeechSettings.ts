import { useState, useEffect } from 'react';

const SPEECH_SETTINGS_KEY = 'scareware_speech_settings';

interface SpeechSettings {
  isMuted: boolean;
}

export const useSpeechSettings = () => {
  // Initialize state from localStorage or default to unmuted
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SPEECH_SETTINGS_KEY);
      if (saved) {
        const settings: SpeechSettings = JSON.parse(saved);
        return settings.isMuted;
      }
    } catch (error) {
      console.warn('Failed to load speech settings from localStorage:', error);
    }
    return false; // Default to unmuted
  });

  // Save to localStorage whenever the setting changes
  useEffect(() => {
    try {
      const settings: SpeechSettings = { isMuted };
      localStorage.setItem(SPEECH_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save speech settings to localStorage:', error);
    }
  }, [isMuted]);

  const toggleMuted = () => {
    setIsMuted(prev => {
      const newState = !prev;
      return newState;
    });
  };

  const setMuted = (muted: boolean) => {
    setIsMuted(muted);
  };

  return {
    isMuted,
    toggleMuted,
    setMuted
  };
}; 