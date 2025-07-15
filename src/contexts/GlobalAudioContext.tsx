import React, { createContext, useContext, ReactNode } from 'react';
import { useGlobalAudio } from '../hooks/useGlobalAudio';

interface GlobalAudioContextType {
  isPlaying: boolean;
  currentScenario: string;
  currentMode: 'normal' | 'escalation';
  startSpeech: (scenario: string, mode?: 'normal' | 'escalation', loop?: boolean) => void;
  stopSpeech: () => void;
  stopSpeechOnly: () => void;
  toggleSpeech: () => void;
  changeScenario: (scenario: string, mode?: 'normal' | 'escalation') => void;
  updateCurrentMode: (mode: 'normal' | 'escalation') => void;
  forceStopSpeech: () => void;
  forceStopSpeechAndClear: () => void;
}

const GlobalAudioContext = createContext<GlobalAudioContextType | undefined>(undefined);

interface GlobalAudioProviderProps {
  children: ReactNode;
}

export const GlobalAudioProvider: React.FC<GlobalAudioProviderProps> = ({ children }) => {
  const audioHook = useGlobalAudio();

  return (
    <GlobalAudioContext.Provider value={audioHook}>
      {children}
    </GlobalAudioContext.Provider>
  );
};

export const useGlobalAudioContext = () => {
  const context = useContext(GlobalAudioContext);
  if (context === undefined) {
    throw new Error('useGlobalAudioContext must be used within a GlobalAudioProvider');
  }
  return context;
}; 