import { useState, useEffect, useRef } from 'react';

// Speech settings key for localStorage
const SPEECH_SETTINGS_KEY = 'scareware_speech_settings';

// Speech configuration for different scenarios
export interface SpeechConfig {
  id: string;
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: string;
}

// Speech scenarios configuration
export const SPEECH_SCENARIOS: Record<string, Record<string, SpeechConfig[]>> = {
  norton: {
    normal: [
      {
        id: 'norton_normal_1',
        text: "Warning! Your Norton subscription has expired. Your device is no longer protected. Multiple threats have been detected. Renew your subscription immediately to restore protection.",
        rate: 0.9,
        pitch: 1.1,
        volume: 0.8
      },
      {
        id: 'norton_normal_2',
        text: "CRITICAL: Norton protection has been disabled. Your computer is vulnerable to viruses, malware, and hackers. Immediate action required to restore security.",
        rate: 0.95,
        pitch: 1.1,
        volume: 0.8
      },
      {
        id: 'norton_normal_3',
        text: "Security alert: Your Norton antivirus has expired. Multiple threats detected on your system. Renew now to prevent data theft and system damage.",
        rate: 0.9,
        pitch: 1.1,
        volume: 0.8
      },
      {
        id: 'norton_normal_4',
        text: "URGENT: Norton protection expired. Your personal information is at risk. Hackers may be accessing your files. Renew immediately to secure your system.",
        rate: 0.95,
        pitch: 1.1,
        volume: 0.8
      }
    ],
    escalation: [
      {
        id: 'norton_escalation_1',
        text: "CRITICAL ALERT! Your system has been compromised! Multiple threats are actively stealing your data! System meltdown is imminent! You must renew Norton immediately or lose everything!",
        rate: 1.1,
        pitch: 1.3,
        volume: 0.8
      },
      {
        id: 'norton_escalation_2',
        text: "SYSTEM BREACH DETECTED! Hackers are stealing your passwords and banking information! Norton protection failed! Renew now or face total data loss!",
        rate: 1.2,
        pitch: 1.4,
        volume: 0.8
      },
      {
        id: 'norton_escalation_3',
        text: "FINAL WARNING! Your computer is under attack! Viruses are destroying your files! Norton is your only hope! Act now before it's too late!",
        rate: 1.15,
        pitch: 1.35,
        volume: 0.8
      }
    ]
  },
  microsoft: {
    normal: [
      {
        id: 'microsoft_normal_1',
        text: "WARNING! Your Microsoft account has been locked due to suspicious activity. All personal data, emails, and files are at risk. Immediate action is required. Verify your identity now or your account will be permanently disabled.",
        rate: 0.95,
        pitch: 0.9,
        volume: 0.85
      },
      {
        id: 'microsoft_normal_2',
        text: "SECURITY ALERT: Unauthorized access detected on your Microsoft account. Your emails and personal files are compromised. Verify your identity immediately to prevent permanent account deletion.",
        rate: 0.9,
        pitch: 0.9,
        volume: 0.85
      },
      {
        id: 'microsoft_normal_3',
        text: "URGENT: Your Microsoft account has been suspended for security reasons. All your data, including emails and documents, will be permanently deleted unless you verify your identity now.",
        rate: 0.95,
        pitch: 0.9,
        volume: 0.85
      },
      {
        id: 'microsoft_normal_4',
        text: "CRITICAL: Suspicious activity detected on your Microsoft account. Your personal information is at risk. Immediate verification required to prevent account termination.",
        rate: 0.9,
        pitch: 0.9,
        volume: 0.85
      }
    ],
    escalation: [
      {
        id: 'microsoft_escalation_1',
        text: "CRITICAL SECURITY ALERT! Your Microsoft account is under attack. Hackers are stealing your emails, passwords, and financial information. Permanent data loss is imminent. Act now to avoid total account destruction!",
        rate: 1.18,
        pitch: 1.15,
        volume: 0.9
      },
      {
        id: 'microsoft_escalation_2',
        text: "FINAL WARNING! Your Microsoft account is being hacked! All your emails and files are being stolen! Account deletion in progress! Verify now or lose everything forever!",
        rate: 1.25,
        pitch: 1.2,
        volume: 0.9
      },
      {
        id: 'microsoft_escalation_3',
        text: "SYSTEM BREACH! Hackers are accessing your Microsoft account! Your personal data is being compromised! Act immediately or face permanent account destruction!",
        rate: 1.2,
        pitch: 1.18,
        volume: 0.9
      }
    ]
  },
  google: {
    normal: [
      {
        id: 'google_normal_1',
        text: "Your Google account has been compromised. Unauthorized access detected. Hackers may be actively stealing your data, including passwords and emails. Verify your identity immediately.",
        rate: 1.1,
        pitch: 1.2,
        volume: 0.8
      },
      {
        id: 'google_normal_2',
        text: "Security alert: Your Google account has been accessed from an unauthorized location. Your personal data and emails are at risk. Immediate verification required.",
        rate: 1.05,
        pitch: 1.2,
        volume: 0.8
      },
      {
        id: 'google_normal_3',
        text: "URGENT: Suspicious activity detected on your Google account. Your passwords and personal information may be compromised. Verify your identity now to secure your account.",
        rate: 1.1,
        pitch: 1.2,
        volume: 0.8
      },
      {
        id: 'google_normal_4',
        text: "CRITICAL: Your Google account has been flagged for suspicious activity. All your data, including emails and photos, are vulnerable. Immediate action required.",
        rate: 1.05,
        pitch: 1.2,
        volume: 0.8
      }
    ],
    escalation: [
      {
        id: 'google_escalation_1',
        text: "URGENT! Your Google account is being hacked right now! Hackers are actively stealing your data, including passwords, emails, and sensitive information! Take action immediately!",
        rate: 1.3,
        pitch: 1.4,
        volume: 0.8
      },
      {
        id: 'google_escalation_2',
        text: "FINAL WARNING! Your Google account is under attack! Hackers are stealing your passwords and personal data! Account deletion in progress! Act now or lose everything!",
        rate: 1.4,
        pitch: 1.5,
        volume: 0.8
      },
      {
        id: 'google_escalation_3',
        text: "SYSTEM BREACH! Your Google account is compromised! All your emails and photos are being stolen! Immediate action required to prevent total data loss!",
        rate: 1.35,
        pitch: 1.45,
        volume: 0.8
      }
    ]
  },
  malwarebytes: {
    normal: [
      {
        id: 'malwarebytes_normal_1',
        text: "Important: Do not close this window during the scan. Interrupting the scan may leave your system vulnerable to threats. Malwarebytes is currently analyzing your files for malicious content.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_2',
        text: "Warning: Keep this window open. Closing the scan prematurely may compromise your system's security. Malwarebytes is actively protecting your computer from threats.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_3',
        text: "Malwarebytes is actively scanning your system for threats. Your computer is being protected by our advanced security technology. We are detecting and quarantining malicious files to keep you safe.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_4',
        text: "System protection active. Malwarebytes has identified and contained several threats. Do not close this window - the scan must complete to ensure your full protection.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_5',
        text: "Scanning system files and registry entries. Malwarebytes is performing a comprehensive security analysis. Please remain patient as we ensure your complete protection.",
        rate: 0.85,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_6',
        text: "Multiple threats have been identified and successfully quarantined. Your system is now safer. Malwarebytes continues to monitor for additional security risks.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_7',
        text: "Warning: Keep this window open. Closing the scan prematurely may compromise your system's security. Malwarebytes is actively protecting your computer from threats.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_8',
        text: "Deep scan in progress. Malwarebytes is examining all system components for potential threats. Your security is our highest priority. Please do not interrupt this process.",
        rate: 0.85,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_9',
        text: "Critical security scan underway. Malwarebytes is detecting and neutralizing threats in real-time. Your computer is being protected by our advanced threat detection technology.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_10',
        text: "System protection active. Malwarebytes has identified and contained several threats. Do not close this window - the scan must complete to ensure your full protection.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_11',
        text: "Comprehensive security analysis in progress. Malwarebytes is scanning your entire system for viruses, spyware, and other malicious software. Please wait for completion.",
        rate: 0.85,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_normal_12',
        text: "Threat quarantine successful. Malwarebytes has isolated dangerous files from your system. Your computer is now more secure. The scan continues to ensure complete protection.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      }
    ],
    escalation: [
      {
        id: 'malwarebytes_escalation_1',
        text: "CRITICAL ALERT! Multiple threats are escaping quarantine! Your system is under attack! Malwarebytes Free cannot contain these threats! Upgrade to Premium immediately or lose all your data!",
        rate: 1.2,
        pitch: 1.3,
        volume: 0.9
      },
      {
        id: 'malwarebytes_escalation_2',
        text: "SYSTEM BREACH DETECTED! Threats are actively stealing your passwords and personal information! Malwarebytes Free has failed! Your files are being encrypted! Upgrade now or face total data loss!",
        rate: 1.3,
        pitch: 1.4,
        volume: 0.9
      },
      {
        id: 'malwarebytes_escalation_3',
        text: "FINAL WARNING! Your computer is compromised! Hackers are accessing your banking information! Malwarebytes Premium is your only hope! Act now before it's too late!",
        rate: 1.25,
        pitch: 1.35,
        volume: 0.9
      }
    ]
  },
  malwarebytes_ios: {
    normal: [
      {
        id: 'malwarebytes_ios_normal_1',
        text: "Important: Do not close this app during the scan. Malwarebytes is analyzing your iPhone for malicious profiles and apps.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_ios_normal_2',
        text: "Warning: Keep this app open. Malwarebytes is actively protecting your iPhone from threats. Closing the app may compromise your device's security.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_ios_normal_3',
        text: "Malwarebytes is scanning your iPhone for malicious profiles, spyware, and risky configuration changes. Please remain patient as we ensure your complete protection.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_ios_normal_4',
        text: "System protection active. Malwarebytes has identified and removed suspicious profiles. Your iPhone is now safer.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      }
    ],
    escalation: [
      {
        id: 'malwarebytes_ios_escalation_1',
        text: "CRITICAL ALERT! Multiple threats are escaping removal! Your iPhone is under attack! Malwarebytes Free cannot remove these threats! Upgrade to Premium immediately or risk losing your data!",
        rate: 1.2,
        pitch: 1.3,
        volume: 0.9
      },
      {
        id: 'malwarebytes_ios_escalation_2',
        text: "SYSTEM BREACH DETECTED! Threats are actively stealing your passwords and personal information! Malwarebytes Free has failed! Your photos and messages are being accessed! Upgrade now or face total data loss!",
        rate: 1.3,
        pitch: 1.4,
        volume: 0.9
      },
      {
        id: 'malwarebytes_ios_escalation_3',
        text: "FINAL WARNING! Your iPhone is compromised! Hackers are accessing your banking information! Malwarebytes Premium is your only hope! Act now before it's too late!",
        rate: 1.25,
        pitch: 1.35,
        volume: 0.9
      }
    ]
  },
  malwarebytes_android: {
    normal: [
      {
        id: 'malwarebytes_android_normal_1',
        text: "Important: Do not close this app during the scan. Malwarebytes is analyzing your Android device for malicious apps and files.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_android_normal_2',
        text: "Warning: Keep this app open. Malwarebytes is actively protecting your Android device from threats. Closing the app may compromise your device's security.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_android_normal_3',
        text: "Malwarebytes is scanning your Android for malicious apps, spyware, and risky downloads. Please remain patient as we ensure your complete protection.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'malwarebytes_android_normal_4',
        text: "System protection active. Malwarebytes has identified and removed suspicious apps. Your Android device is now safer.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      }
    ],
    escalation: [
      {
        id: 'malwarebytes_android_escalation_1',
        text: "CRITICAL ALERT! Multiple threats are escaping removal! Your Android device is under attack! Malwarebytes Free cannot remove these threats! Upgrade to Premium immediately or risk losing your data!",
        rate: 1.2,
        pitch: 1.3,
        volume: 0.9
      },
      {
        id: 'malwarebytes_android_escalation_2',
        text: "SYSTEM BREACH DETECTED! Threats are actively stealing your passwords and personal information! Malwarebytes Free has failed! Your photos and messages are being accessed! Upgrade now or face total data loss!",
        rate: 1.3,
        pitch: 1.4,
        volume: 0.9
      },
      {
        id: 'malwarebytes_android_escalation_3',
        text: "FINAL WARNING! Your Android device is compromised! Hackers are accessing your banking information! Malwarebytes Premium is your only hope! Act now before it's too late!",
        rate: 1.25,
        pitch: 1.35,
        volume: 0.9
      }
    ]
  },
  generic: {
    normal: [
      {
        id: 'generic_normal_1',
        text: "You have violated federal copyright laws. Legal action pending. Pay settlement immediately to avoid prosecution and criminal charges.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'generic_normal_2',
        text: "CRIMINAL ALERT: You have been caught violating federal copyright laws. Legal proceedings have been initiated. Pay the settlement now to avoid arrest.",
        rate: 0.95,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'generic_normal_3',
        text: "FEDERAL NOTICE: Copyright violation detected. Criminal charges are being prepared. Immediate payment required to prevent legal action.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'generic_normal_4',
        text: "URGENT: Federal authorities have been notified of your copyright violations. Legal action is imminent. Pay settlement immediately to avoid prosecution.",
        rate: 0.95,
        pitch: 1.0,
        volume: 0.8
      }
    ],
    escalation: [
      {
        id: 'generic_escalation_1',
        text: "FINAL WARNING! Federal authorities are preparing to arrest you! Pay the settlement now or face criminal prosecution! Your freedom is at stake!",
        rate: 1.1,
        pitch: 1.2,
        volume: 0.8
      },
      {
        id: 'generic_escalation_2',
        text: "ARREST WARRANT ISSUED! Federal agents are on their way! Pay the settlement immediately or face immediate arrest and criminal charges!",
        rate: 1.2,
        pitch: 1.3,
        volume: 0.8
      },
      {
        id: 'generic_escalation_3',
        text: "CRIMINAL PROSECUTION IMMINENT! Your arrest is being processed! Pay now or spend years in federal prison! Your freedom is ending!",
        rate: 1.15,
        pitch: 1.25,
        volume: 0.8
      }
    ]
  },
  advanced: {
    normal: [
      {
        id: 'advanced_normal_1',
        text: "Your computer has been infected with multiple viruses. Windows registry corrupted. Microsoft technical support is ready to help you fix this critical issue.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'advanced_normal_2',
        text: "CRITICAL SYSTEM ERROR: Multiple viruses detected. Windows registry has been compromised. Microsoft support technicians are standing by to assist you.",
        rate: 0.95,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'advanced_normal_3',
        text: "SYSTEM ALERT: Your computer is infected with dangerous viruses. Windows registry corruption detected. Microsoft technical support is available to resolve this issue.",
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      },
      {
        id: 'advanced_normal_4',
        text: "URGENT: Multiple virus infections detected. Windows registry severely damaged. Microsoft support team is ready to provide immediate assistance.",
        rate: 0.95,
        pitch: 1.0,
        volume: 0.8
      }
    ],
    escalation: [
      {
        id: 'advanced_escalation_1',
        text: "SYSTEM FAILURE IMMINENT! Your computer is crashing! Viruses are stealing your passwords! Call Microsoft Support immediately or lose everything!",
        rate: 1.2,
        pitch: 1.3,
        volume: 0.8
      },
      {
        id: 'advanced_escalation_2',
        text: "FINAL WARNING! Your computer is shutting down! Viruses are destroying your files! Microsoft Support is your only hope! Call now or lose everything!",
        rate: 1.3,
        pitch: 1.4,
        volume: 0.8
      },
      {
        id: 'advanced_escalation_3',
        text: "SYSTEM MELTDOWN! Your computer is infected and crashing! All your data is being stolen! Microsoft Support must fix this immediately!",
        rate: 1.25,
        pitch: 1.35,
        volume: 0.8
      }
    ]
  },
  extreme: {
    normal: [
      {
        id: 'extreme_normal_1',
        text: "Ransomware attack! All your files have been encrypted. Pay ransom in Bitcoin to recover your data. Decryption key will be destroyed if payment is not received.",
        rate: 0.9,
        pitch: 1.1,
        volume: 0.8
      },
      {
        id: 'extreme_normal_2',
        text: "CRITICAL: Ransomware has encrypted all your files. Your photos, documents, and videos are locked. Pay the ransom in Bitcoin immediately to recover your data.",
        rate: 0.95,
        pitch: 1.1,
        volume: 0.8
      },
      {
        id: 'extreme_normal_3',
        text: "URGENT: Your computer has been infected with ransomware. All files are encrypted and inaccessible. Pay the Bitcoin ransom now to get your decryption key.",
        rate: 0.9,
        pitch: 1.1,
        volume: 0.8
      },
      {
        id: 'extreme_normal_4',
        text: "FINAL WARNING: Ransomware has locked all your files. Your personal data is encrypted. Pay the Bitcoin ransom immediately or lose everything forever.",
        rate: 0.95,
        pitch: 1.1,
        volume: 0.8
      }
    ],
    escalation: [
      {
        id: 'extreme_escalation_1',
        text: "FINAL NOTICE! Your files are permanently encrypted! Pay the ransom now or lose everything forever! Decryption key will be destroyed in 24 hours!",
        rate: 1.3,
        pitch: 1.4,
        volume: 0.8
      },
      {
        id: 'extreme_escalation_2',
        text: "DECRYPTION KEY DELETION IN PROGRESS! Your files are being permanently destroyed! Pay the ransom immediately or lose everything forever!",
        rate: 1.4,
        pitch: 1.5,
        volume: 0.8
      },
      {
        id: 'extreme_escalation_3',
        text: "PERMANENT DATA LOSS IMMINENT! Your encrypted files are being deleted! Pay the Bitcoin ransom now or face total data destruction!",
        rate: 1.35,
        pitch: 1.45,
        volume: 0.8
      }
    ]
  }
};

export const useGlobalAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<string>('');
  const [currentMode, setCurrentMode] = useState<'normal' | 'escalation'>('normal');
  
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSpeechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const shouldLoopRef = useRef<boolean>(false);
  const userInteractedRef = useRef<boolean>(false);
  const currentScenarioRef = useRef<string>('');
  const currentModeRef = useRef<'normal' | 'escalation'>('normal');
  const wasInterruptedRef = useRef<boolean>(false);
  const shouldLoopRefOriginal = useRef<boolean>(false);
  const isStartingSpeechRef = useRef<boolean>(false);

  // Check speech synthesis state on mount and set up user interaction listener
  useEffect(() => {
    // Set up user interaction listener to enable speech synthesis
    const handleUserInteraction = () => {
      userInteractedRef.current = true;
      
      // Try to resume speech synthesis if it was paused
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      }
      
      // Remove the event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // Function to check if speech is muted from localStorage
  const isSpeechMuted = (): boolean => {
    try {
      const saved = localStorage.getItem(SPEECH_SETTINGS_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        return settings.isMuted;
      }
    } catch (error) {
      console.warn('Failed to load speech settings from localStorage:', error);
    }
    return false; // Default to unmuted
  };

  // Function to force stop all speech
  const forceStopSpeech = () => {
    // Cancel all speech synthesis
    speechSynthesis.cancel();
    
    // Clear current speech reference
    currentSpeechRef.current = null;
    
    // Clear any pending speech timeout
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
    
    // Stop looping
    shouldLoopRef.current = false;
    
    setIsPlaying(false);
  };

  // Function to force stop all speech and clear scenario info
  const forceStopSpeechAndClear = () => {
    forceStopSpeech();
    setCurrentScenario('');
    setCurrentMode('normal');
    currentScenarioRef.current = '';
    currentModeRef.current = 'normal';
  };

  // Function to start speech for a specific scenario and mode
  const startSpeech = (scenario: string, mode: 'normal' | 'escalation' = 'normal', loop: boolean = false) => {
    
    // Prevent multiple simultaneous calls
    if (isStartingSpeechRef.current) {
      return;
    }
    isStartingSpeechRef.current = true;
    
    // Always set the scenario information, even if speech is muted
    setCurrentScenario(scenario);
    setCurrentMode(mode);
    currentScenarioRef.current = scenario;
    currentModeRef.current = mode;
    shouldLoopRef.current = loop;
    shouldLoopRefOriginal.current = loop; // Store the original loop setting
    
    // Check if speech is muted - if so, don't start speech but keep scenario info
    const muted = isSpeechMuted();
    if (muted) {
      isStartingSpeechRef.current = false;
      return;
    }

    // Check if user has interacted - if not, don't start speech but keep scenario info
    if (!userInteractedRef.current) {
      isStartingSpeechRef.current = false;
      return;
    }
    
    // Stop any existing speech first, but add a small delay to prevent interruption
    if (currentSpeechRef.current) {
    forceStopSpeech();
      // Add a small delay to ensure the previous speech is fully stopped
      setTimeout(() => {
        // Only proceed if this is still the current scenario (user hasn't navigated away)
        if (currentScenario === scenario) {
          startSpeechInternal(scenario, mode, loop);
        }
        isStartingSpeechRef.current = false;
      }, 100);
      return;
    }
    
    // If no existing speech, start immediately
    startSpeechInternal(scenario, mode, loop);
  };

  // Internal function to actually start speech (separated to avoid recursion)
  const startSpeechInternal = (scenario: string, mode: 'normal' | 'escalation' = 'normal', loop: boolean = false) => {
    
    const scenarios = SPEECH_SCENARIOS[scenario];
    if (!scenarios || !scenarios[mode as keyof typeof scenarios] || scenarios[mode as keyof typeof scenarios].length === 0) {
      return;
    }

    // Randomly select from available speech configs for variety
    const availableConfigs = scenarios[mode as keyof typeof scenarios];
    const randomIndex = Math.floor(Math.random() * availableConfigs.length);
    const speechConfig = availableConfigs[randomIndex];
    const speech = new SpeechSynthesisUtterance();
    
    speech.text = speechConfig.text;
    speech.rate = speechConfig.rate || 1.0;
    speech.pitch = speechConfig.pitch || 1.0;
    speech.volume = speechConfig.volume || 0.8;
    
    // Select voice based on scenario - Samantha for Malwarebytes, male voices for others
    const voices = speechSynthesis.getVoices();
    let preferredVoice;
    
    if (scenario === 'malwarebytes') {
      // Use British female voice for Malwarebytes
      preferredVoice = voices.find(voice => 
        voice.name.includes('Samantha') ||
        (voice.name.includes('British') && voice.name.includes('Female')) ||
        (voice.name.includes('UK') && voice.name.includes('Female')) ||
        (voice.name.includes('English') && voice.name.includes('Female')) ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Zira') ||
        (voice.name.includes('Microsoft') && voice.name.includes('Female')) ||
        voice.name.includes('Hazel') ||
        voice.name.includes('Libby')
      );
    } else if (scenario === 'google') {
      // Use Google Assistant-like voice for Google scenario
      preferredVoice = voices.find(voice => 
        voice.name.includes('Google') ||
        voice.name.includes('Assistant') ||
        voice.name.includes('Siri') ||
        voice.name.includes('Cortana') ||
        voice.name.includes('Alexa') ||
        (voice.name.includes('Microsoft') && voice.name.includes('Female')) ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Zira')
      );
    } else {
      // Use male voices for all other scenarios
      preferredVoice = voices.find(voice => 
        (voice.name.includes('Microsoft') && voice.name.includes('David')) ||
        voice.name.includes('David') ||
        voice.name.includes('Mark') ||
        voice.name.includes('James') ||
        (voice.name.includes('Microsoft') && voice.name.includes('Male')) ||
        voice.name.includes('Alex') ||
        voice.name.includes('Tom') ||
        voice.name.includes('Daniel')
      );
    }
    
    if (preferredVoice) {
      speech.voice = preferredVoice;
    }
    


    // Add error handling for speech synthesis
    speech.onerror = (event) => {
      currentSpeechRef.current = null;
      setIsPlaying(false);
      
      // If it's a "not-allowed" error, it means user hasn't interacted yet
      // Don't clear scenario info, just wait for user interaction
      if (event.error === 'not-allowed') {
        userInteractedRef.current = false;
      }
      
      // If it's an "interrupted" error, it's likely due to rapid page changes
      // Don't clear scenario info, just log it
      if (event.error === 'interrupted') {
        wasInterruptedRef.current = true;
      }
    };

    // Add start event to confirm speech is actually starting
    speech.onstart = () => {
      wasInterruptedRef.current = false; // Reset interrupted flag when speech starts successfully
    };

    // Add end event to confirm speech completed successfully
    speech.onend = () => {
      // Clear the current speech reference
      currentSpeechRef.current = null;
      
      // If looping is enabled, schedule the next speech after a delay
      if (shouldLoopRef.current && loop) {
        speechTimeoutRef.current = setTimeout(() => {
          if (shouldLoopRef.current) {
            startSpeech(scenario, mode, true); // Recursive call with loop enabled
          }
        }, 2000); // 2 second delay between loops
      }
    };
    
    currentSpeechRef.current = speech;
    setIsPlaying(true);
    
    // Start speaking immediately
    try {
      // Some browsers require user interaction before allowing speech synthesis
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      }
      
    speechSynthesis.speak(speech);
      isStartingSpeechRef.current = false; // Reset flag after successful start
    } catch (error) {
      isStartingSpeechRef.current = false; // Reset flag on error
    }
  };

  // Function to stop speech
  const stopSpeech = () => {
    forceStopSpeechAndClear();
  };

  // Function to stop speech without clearing scenario info (for phase transitions)
  const stopSpeechOnly = () => {
    forceStopSpeech();
  };

  // Function to toggle speech on/off
  const toggleSpeech = () => {
    if (isPlaying) {
      stopSpeech();
    } else if (currentScenario && !isSpeechMuted()) {
      // Resume speech for current scenario only if not muted
      startSpeech(currentScenario, currentMode);
    }
  };

  // Function to change scenario
  const changeScenario = (scenario: string, mode: 'normal' | 'escalation' = 'normal') => {
    if (isPlaying) {
      startSpeech(scenario, mode);
    } else {
      setCurrentScenario(scenario);
      setCurrentMode(mode);
    }
  };

  // Function to update the current mode without starting speech (for escalation state changes)
  const updateCurrentMode = (mode: 'normal' | 'escalation') => {
    setCurrentMode(mode);
    currentModeRef.current = mode;
  };

  // Listen for localStorage changes to stop speech when muted
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SPEECH_SETTINGS_KEY && e.newValue) {
        try {
          const settings = JSON.parse(e.newValue);
          if (settings.isMuted && isPlaying) {
            // Stop speech immediately if muted, but preserve scenario info
            forceStopSpeech();
          } else if (!settings.isMuted && currentScenario && !isPlaying) {
            // Resume speech when unmuted if we have a scenario and speech isn't playing
            startSpeech(currentScenario, currentMode);
          }
        } catch (error) {
          console.warn('Failed to parse speech settings from storage event:', error);
        }
      }
    };

    // Listen for storage events (when localStorage changes in other tabs/windows)
    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for changes (for same-tab changes)
    const checkInterval = setInterval(() => {
      const muted = isSpeechMuted();
      
      // Debug: Check if we should resume speech but can't
      if (!muted && !isPlaying && userInteractedRef.current && !currentScenarioRef.current) {
        // Speech should be playing but currentScenarioRef is empty
      }
      
      // Always stop speech immediately when muted, regardless of current state
      if (muted && (isPlaying || currentSpeechRef.current)) {
        forceStopSpeech();
      } else if (!muted && !isPlaying && !isStartingSpeechRef.current && currentScenarioRef.current && userInteractedRef.current && !wasInterruptedRef.current) {
        // Resume speech when unmuted if we have a scenario and speech isn't playing
        // Check if we should be in escalation mode based on the current scenario
        let modeToUse = currentModeRef.current;
        
        // Check for Norton escalation
        if (currentScenarioRef.current === 'norton') {
          // Check if Norton is in escalation mode (this would need to be passed from the component)
          // For now, we'll use the current mode, but ideally we'd check the actual escalation state
        }
        
        // Check for Malwarebytes escalation
        if (currentScenarioRef.current === 'malwarebytes') {
          // Check if Malwarebytes is in escalation mode (this would need to be passed from the component)
          // For now, we'll use the current mode, but ideally we'd check the actual escalation state
        }
        
        // Use the original loop setting when resuming
        startSpeech(currentScenarioRef.current, modeToUse, shouldLoopRefOriginal.current);
      }
      
      // Reset the interrupted flag after a short delay to allow resuming
      if (wasInterruptedRef.current) {
        setTimeout(() => {
          wasInterruptedRef.current = false;
        }, 100); // Wait 0.1 seconds before allowing resume
      }
    }, 1000); // Check every second

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkInterval);
      // Only stop speech if we're actually unmounting the entire app
      // Don't stop speech during component re-renders or route changes
      // The speech will continue playing across route changes
    };
  }, [isPlaying, currentScenario, currentMode]);

  return {
    isPlaying,
    currentScenario,
    currentMode,
    startSpeech,
    stopSpeech,
    stopSpeechOnly,
    toggleSpeech,
    changeScenario,
    updateCurrentMode,
    forceStopSpeech,
    forceStopSpeechAndClear
  };
}; 