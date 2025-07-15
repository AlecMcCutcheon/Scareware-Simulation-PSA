import React, { useState, useEffect, useRef } from 'react';
import { useBrowserHijacking } from '../hooks/useBrowserHijacking';
import { useGlobalAudioContext } from '../contexts/GlobalAudioContext';
import { useClassElement } from '../hooks/useClassElement';
import vzbuQ from '../assets/vzbuQ.jpg';
import { useMobileDetection } from '../hooks/useMobileDetection';

interface ScarewareCollectionProps {
  currentPhase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme' | 'escape';
  onAdvancePhase: (phase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme' | 'escape') => void;
  onNortonStateChange?: (escalation: boolean, muted: boolean) => void; // NEW: Norton state callback
  onMalwarebytesStateChange?: (escalation: boolean, muted: boolean) => void; // NEW: Malwarebytes state callback
}

const ScarewareCollection: React.FC<ScarewareCollectionProps> = ({ 
  currentPhase, 
  onAdvancePhase, 
  onNortonStateChange,
  onMalwarebytesStateChange
}) => {
  // Place mobile detection at the very top so isMobile is available for all hooks
  const mobileDetection = useMobileDetection();
  const isMobile = mobileDetection.isMobile;
  const userAgent = mobileDetection.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  // All hooks and state must be here, before any return or if statements
  const { startSpeech, stopSpeech, stopSpeechOnly, updateCurrentMode } = useGlobalAudioContext();
  const startSpeechRef = React.useRef(startSpeech);
  const stopSpeechRef = React.useRef(stopSpeech);
  const stopSpeechOnlyRef = React.useRef(stopSpeechOnly);
  const updateCurrentModeRef = React.useRef(updateCurrentMode);
  React.useEffect(() => {
    startSpeechRef.current = startSpeech;
    stopSpeechRef.current = stopSpeech;
    stopSpeechOnlyRef.current = stopSpeechOnly;
    updateCurrentModeRef.current = updateCurrentMode;
  }, [startSpeech, stopSpeech, stopSpeechOnly, updateCurrentMode]);
  const [showContent, setShowContent] = useState(false);
  const [threatLevel, setThreatLevel] = useState(0);
  const [countdown, setCountdown] = useState(600);
  const [loginStep, setLoginStep] = useState<'warning' | 'email' | 'password'>('warning');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [animating, setAnimating] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [passwordError, setPasswordError] = useState('');
  useEffect(() => {
    if (currentPhase === 'microsoft') {
      setLoginStep('warning');
      setPasswordError('');
    }
  }, [currentPhase]);
  useEffect(() => {
    if (countdown <= 0) {
      setCountdown(600); // Reset to 10:00
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);
  const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
  const seconds = (countdown % 60).toString().padStart(2, '0');

  // Use real scareware browser hijacking techniques for all scareware phases
  // Only start hijacking after content is actually visible
  // OLD CODE - KEEP UNTIL CONFIRMED WORKING
  // const { blockedAttempts, isFullscreen } = useBrowserHijacking({
  //   forceFullscreen: false, // Disable global fullscreen - we'll handle it per overlay
  //   preventEscape: showContent,
  //   preventTabSwitch: showContent,
  //   preventMouseEvents: showContent,
  //   preventWindowControl: showContent,
  //   delayStart: 2000 // 2 second delay after content is visible
  // });
  // NEW CODE - TESTING
  const hijack = useBrowserHijacking(
    isMobile
      ? {
          forceFullscreen: false,
          preventEscape: false,
          preventTabSwitch: false,
          preventMouseEvents: false,
          preventWindowControl: false,
          delayStart: 0,
        }
      : {
          forceFullscreen: false,
    preventEscape: showContent,
    preventTabSwitch: showContent,
    preventMouseEvents: showContent,
    preventWindowControl: showContent,
          delayStart: 2000,
        }
  );
  const blockedAttempts = hijack.blockedAttempts;
  const isFullscreen = hijack.isFullscreen;

  // Add targeted fullscreen hijacking to scareware overlays
  // OLD CODE - KEEP UNTIL CONFIRMED WORKING
  // React.useEffect(() => {
  //   if (!showContent) return;
  //   ...
  // }, [showContent]);
  // NEW CODE - TESTING
  React.useEffect(() => {
    if (isMobile) return;
    if (!showContent) return;

    const handleScarewareClick = (e: Event) => {
      const target = e.target as Element;
      // Trigger fullscreen for any click within scareware overlays
      if (!target.closest('.simulation-controls') && !target.closest('.safe-zone') && !target.closest('[data-modal="norton-payment"]') && !target.closest('[data-modal="malwarebytes-payment"]')) {
        try {
          if (!document.fullscreenElement && 
              !(document as any).webkitFullscreenElement && 
              !(document as any).mozFullScreenElement && 
              !(document as any).msFullscreenElement) {
            if ((document.documentElement as any).requestFullScreen) {
              (document.documentElement as any).requestFullScreen();
            } else if ((document.documentElement as any).mozRequestFullScreen) {
              (document.documentElement as any).mozRequestFullScreen();
            } else if ((document.documentElement as any).webkitRequestFullScreen) {
              (document.documentElement as any).webkitRequestFullScreen((Element as any).ALLOW_KEYBOARD_INPUT);
            } else if ((document.documentElement as any).msRequestFullscreen) {
              (document.documentElement as any).msRequestFullscreen();
            }
          }
        } catch (error) {
          // Silently handle fullscreen errors
        }
      }
    };
    const addListeners = () => {
      const overlays = document.querySelectorAll('.scareware-overlay, .browser-hijacking-overlay, .fullscreen-overlay');
      overlays.forEach((overlay) => {
        overlay.addEventListener('click', handleScarewareClick, true);
        overlay.addEventListener('mousedown', handleScarewareClick, true);
      });
    };
    const removeListeners = () => {
      const overlays = document.querySelectorAll('.scareware-overlay, .browser-hijacking-overlay, .fullscreen-overlay');
      overlays.forEach((overlay) => {
        overlay.removeEventListener('click', handleScarewareClick, true);
        overlay.removeEventListener('mousedown', handleScarewareClick, true);
      });
    };
    addListeners();
    const checkAndReaddListeners = () => {
      setTimeout(addListeners, 100);
    };
    const interval = setInterval(checkAndReaddListeners, 2000);
    return () => {
      clearInterval(interval);
      removeListeners();
    };
  }, [showContent, isMobile]);

  useEffect(() => {
    // Show content immediately
    setShowContent(true);
    
    // Escalate threat level over time
    const threatTimer = setInterval(() => {
      setThreatLevel(prev => {
        if (prev < 10) return prev + 1;
        clearInterval(threatTimer);
        return prev;
      });
    }, 2000);

    return () => {
      clearInterval(threatTimer);
    };
  }, []);

  const handleContinue = () => {
    const phases = ['norton', 'microsoft', 'google', 'malwarebytes', 'generic', 'advanced', 'extreme'];
    const currentIndex = phases.indexOf(currentPhase);
    if (currentIndex < phases.length - 1) {
      onAdvancePhase(phases[currentIndex + 1] as any);
    }
  };

  // For the Norton countdown timer
  const [nortonTimer, setNortonTimer] = useState(179); // 2:59 in seconds
  const [nortonEscalation, setNortonEscalation] = useState(false);
  const [fakeThreats, setFakeThreats] = useState(23);
  
  // Store interval references for cleanup
  const threatIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const fakeThreatsRef = React.useRef(fakeThreats);
  const nortonEscalationRef = React.useRef(nortonEscalation);
  
  // Malwarebytes simulation state - moved to top level to fix React Hooks rules
  const [scanProgress, setScanProgress] = React.useState(0);
  const [scanTime, setScanTime] = React.useState(0);
  const [itemsScanned, setItemsScanned] = React.useState(0);
  const [threatsDetected, setThreatsDetected] = React.useState(0);
  const [pupsDetected, setPupsDetected] = React.useState(0);
  const [pumsDetected, setPumsDetected] = React.useState(0);
  const [detectionsIgnored, setDetectionsIgnored] = React.useState(0);
  const [detectionsQuarantined, setDetectionsQuarantined] = React.useState(0);
  const [detectionsEscaped, setDetectionsEscaped] = React.useState(0);
  const [scanLog, setScanLog] = React.useState<string[]>([]);
  const [scanPhase, setScanPhase] = React.useState<'scanning' | 'escalate' | 'fail' | 'upgrade'>('scanning');
  const [showUpgrade, setShowUpgrade] = React.useState(false);
  const [malwarebytesEscalation, setMalwarebytesEscalation] = React.useState(false); // NEW: Malwarebytes escalation state
  
  // ANCC Scareware countdown timer
  const [anccCountdown, setAnccCountdown] = React.useState(1800); // 30 minutes in seconds
  
  // Window resize listener for responsive design
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // ANCC countdown effect
  React.useEffect(() => {
    if (currentPhase === 'generic' && anccCountdown > 0) {
      const timer = setTimeout(() => setAnccCountdown(anccCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [anccCountdown, currentPhase]);
  
  const scanIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const escalateTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const failTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const escalationIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const escalationStartedRef = React.useRef<boolean>(false);
  const escalationIdRef = React.useRef<string | null>(null);
  const escalationProcessingRef = React.useRef<boolean>(false);
  const originalQuarantinedRef = React.useRef<number>(0);
  
  // Update refs when values change
  React.useEffect(() => {
    fakeThreatsRef.current = fakeThreats;
    nortonEscalationRef.current = nortonEscalation;
  }, [fakeThreats, nortonEscalation]);

  // Class framework elements for browser bar tooltips
  const nortonBrowserBarElement = useClassElement({
    elementId: 'norton-browser-bar',
    classId: 'fake-browser-bar',
    trigger: 'hover',
    position: 'bottom'
  });

  const nortonUrlElement = useClassElement({
    elementId: 'norton-url-text',
    classId: 'fake-url',
    trigger: 'hover',
    position: 'bottom'
  });

  const nortonSecurityIndicatorElement = useClassElement({
    elementId: 'norton-security-indicator',
    classId: 'fake-security-indicator',
    trigger: 'hover',
    position: 'bottom'
  });

  // Notify parent of Norton state changes
  React.useEffect(() => {
    if (onNortonStateChange) {
      onNortonStateChange(nortonEscalation, false); // Always pass false for muted since we removed speech
    }
  }, [nortonEscalation, onNortonStateChange]);
  
  // Notify parent of Malwarebytes state changes
  React.useEffect(() => {
    if (onMalwarebytesStateChange) {
      onMalwarebytesStateChange(malwarebytesEscalation, false); // Always pass false for muted since we removed speech
    }
  }, [malwarebytesEscalation, onMalwarebytesStateChange]);

  // Calculate quarantined as sum of threats and PUPs detected (only during normal scanning)
  React.useEffect(() => {
    if (currentPhase === 'malwarebytes' && scanPhase === 'scanning') {
      setDetectionsQuarantined(threatsDetected + pupsDetected);
    }
  }, [threatsDetected, pupsDetected, currentPhase, scanPhase]);

  // Update ignored counter as sum of threats and PUPs detected (during escalation)
  React.useEffect(() => {
    if (currentPhase === 'malwarebytes' && scanPhase === 'escalate') {
      setDetectionsIgnored(threatsDetected + pupsDetected);
    }
  }, [threatsDetected, pupsDetected, currentPhase, scanPhase]);

  // Cleanup when phase changes or component unmounts
  React.useEffect(() => {
    return () => {
      // Clear any threat intervals
      if (threatIntervalRef.current) {
        clearInterval(threatIntervalRef.current);
        threatIntervalRef.current = null;
      }
      
      // Clear any reset timeouts
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, [currentPhase]); // Trigger cleanup when phase changes

    // Configurable scan duration (in seconds) - easy to change
  const SCAN_DURATION_SECONDS = 60; // 1 minute - adjust this value to change scan duration
  // Configurable escalation duration (in seconds) - easy to change
  const ESCALATION_DURATION_SECONDS = 120; // 2 minutes of escalation - adjust this value
  
  // Malwarebytes scan simulation effects - moved to top level
  React.useEffect(() => {
    if (currentPhase !== 'malwarebytes' || scanPhase !== 'scanning') {
      return;
    }
    scanIntervalRef.current = setInterval(() => {
      setScanTime(currentTime => {
        const newScanTime = currentTime + 0.2; // Increment by 0.2 seconds since interval runs every 200ms
        setItemsScanned(i => i + Math.floor(Math.random() * 2000 + 1000));
        
        // Calculate progress based on actual elapsed time - NEW: Only go up to 80% during normal scan
        const timeBasedProgress = Math.min((newScanTime / SCAN_DURATION_SECONDS) * 80, 80); // Max 80% during normal scan
        const randomVariation = Math.random() * 2 - 1; // -1 to +1
        const newProgress = Math.max(0, Math.min(timeBasedProgress + randomVariation, 80)); // Ensure progress doesn't go below 0, cap at 80%
        setScanProgress(newProgress);
        
        // --- MOBILE/GENERIC TERMINAL LINES ---
        let filePaths;
        let threatTypes;
        if (isMobile && isIOS) {
          filePaths = [
            '/private/var/mobile/Containers/Data/Application/UUID/Documents/notes.txt',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/SMS/sms.db',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Caches/com.apple.mobilesafari/Cache.db',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Preferences.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Documents/voice-memo.m4a',
            '/private/var/mobile/Containers/Data/Application/UUID/Documents/photo.jpg',
            '/private/var/mobile/Containers/Data/Application/UUID/Documents/important.pdf',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Keychains/keychain-2.db',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Safari/History.db',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Mail/Envelope Index',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.mobilemail.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.MobileSMS.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Maps.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.AppStore.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Safari.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Passbook.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Preferences.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Music.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Photos.plist',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Notes.plist'
          ];
          threatTypes = [
            { type: 'threat', name: 'iOS.Spyware.FakeProfile', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Preferences.plist', counter: 'threatsDetected' },
            { type: 'threat', name: 'iOS.Trojan.BankStealer', file: '/private/var/mobile/Containers/Data/Application/UUID/Documents/notes.txt', counter: 'threatsDetected' },
            { type: 'threat', name: 'iOS.Malware.Phishing', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/SMS/sms.db', counter: 'threatsDetected' },
            { type: 'threat', name: 'iOS.Spyware.Keylogger', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Keychains/keychain-2.db', counter: 'threatsDetected' },
            { type: 'threat', name: 'iOS.Spyware.SafariStealer', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Safari/History.db', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.FakeApp', file: '/private/var/mobile/Containers/Data/Application/UUID/Documents/voice-memo.m4a', counter: 'pupsDetected' },
            { type: 'pup', name: 'PUP.Optional.SMSFraud', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.MobileSMS.plist', counter: 'pupsDetected' },
            { type: 'threat', name: 'iOS.Malware.PassbookStealer', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Passbook.plist', counter: 'threatsDetected' },
            { type: 'threat', name: 'iOS.Trojan.Dropper', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.AppStore.plist', counter: 'threatsDetected' },
            { type: 'threat', name: 'iOS.Malware.NotesStealer', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Notes.plist', counter: 'threatsDetected' }
          ];
        } else if (isMobile && isAndroid) {
          filePaths = [
            '/storage/emulated/0/Download/app.apk',
            '/storage/emulated/0/DCIM/Camera/photo.jpg',
            '/storage/emulated/0/Android/data/com.facebook.katana/cache/cache.db',
            '/data/data/com.android.chrome/app_chrome/Default/History',
            '/data/data/com.whatsapp/files/Media/WhatsApp Images/img001.jpg',
            '/sdcard/Android/data/com.google.android.gms/files/logs.txt',
            '/sdcard/Download/unknown.apk',
            '/data/data/com.snapchat.android/files/snap.dat',
            '/data/data/com.instagram.android/files/media1.jpg',
            '/data/data/com.spotify.music/files/cache/track.mp3',
            '/sdcard/Documents/important.pdf',
            '/data/data/com.android.vending/files/purchase.db',
            '/data/data/com.android.settings/shared_prefs/settings.xml',
            '/sdcard/Movies/video.mp4',
            '/data/data/com.google.android.apps.photos/files/photos.db',
            '/data/data/com.android.providers.contacts/databases/contacts2.db',
            '/data/data/com.android.providers.telephony/databases/mmssms.db',
            '/data/data/com.android.providers.calendar/databases/calendar.db',
            '/data/data/com.android.providers.media/databases/external.db',
            '/data/data/com.android.providers.downloads/databases/downloads.db'
          ];
          threatTypes = [
            { type: 'threat', name: 'Android.Trojan.Spy', file: '/data/data/com.android.chrome/app_chrome/Default/History', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.MobileAdware', file: '/sdcard/Download/unknown.apk', counter: 'pupsDetected' },
            { type: 'threat', name: 'Android.Riskware.SMS', file: '/data/data/com.android.vending/files/purchase.db', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.FakeApp', file: '/storage/emulated/0/Download/app.apk', counter: 'pupsDetected' },
            { type: 'threat', name: 'Android.Spyware.Clipper', file: '/data/data/com.whatsapp/files/Media/WhatsApp Images/img001.jpg', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.SMSFraud', file: '/data/data/com.android.settings/shared_prefs/settings.xml', counter: 'pupsDetected' },
            { type: 'threat', name: 'Android.Trojan.Dropper', file: '/sdcard/Android/data/com.google.android.gms/files/logs.txt', counter: 'threatsDetected' },
            { type: 'threat', name: 'Android.Malware.ContactsStealer', file: '/data/data/com.android.providers.contacts/databases/contacts2.db', counter: 'threatsDetected' },
            { type: 'threat', name: 'Android.Malware.SMSReader', file: '/data/data/com.android.providers.telephony/databases/mmssms.db', counter: 'threatsDetected' },
            { type: 'threat', name: 'Android.Malware.CalendarStealer', file: '/data/data/com.android.providers.calendar/databases/calendar.db', counter: 'threatsDetected' }
          ];
        } else if (isMobile) {
          // fallback: generic mobile mix
          filePaths = [
            '/storage/emulated/0/Download/app.apk',
            '/private/var/mobile/Containers/Data/Application/UUID/Documents/notes.txt',
            '/data/data/com.android.chrome/app_chrome/Default/History',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/SMS/sms.db',
            '/sdcard/Android/data/com.google.android.gms/files/logs.txt',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Preferences.plist',
            '/data/data/com.android.settings/shared_prefs/settings.xml',
            '/sdcard/Download/unknown.apk',
            '/private/var/mobile/Containers/Data/Application/UUID/Documents/voice-memo.m4a',
            '/data/data/com.spotify.music/files/cache/track.mp3',
            '/sdcard/Documents/important.pdf',
            '/data/data/com.android.vending/files/purchase.db',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Keychains/keychain-2.db',
            '/data/data/com.android.providers.contacts/databases/contacts2.db',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Safari/History.db',
            '/data/data/com.android.providers.telephony/databases/mmssms.db',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.MobileSMS.plist',
            '/data/data/com.android.providers.calendar/databases/calendar.db',
            '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Notes.plist'
          ];
          threatTypes = [
            { type: 'threat', name: 'Android.Trojan.Spy', file: '/data/data/com.android.chrome/app_chrome/Default/History', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.MobileAdware', file: '/sdcard/Download/unknown.apk', counter: 'pupsDetected' },
            { type: 'threat', name: 'iOS.Spyware.FakeProfile', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Preferences.plist', counter: 'threatsDetected' },
            { type: 'threat', name: 'Android.Riskware.SMS', file: '/data/data/com.android.vending/files/purchase.db', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.FakeApp', file: '/storage/emulated/0/Download/app.apk', counter: 'pupsDetected' },
            { type: 'threat', name: 'iOS.Trojan.BankStealer', file: '/private/var/mobile/Containers/Data/Application/UUID/Documents/notes.txt', counter: 'threatsDetected' },
            { type: 'threat', name: 'Android.Spyware.Clipper', file: '/data/data/com.whatsapp/files/Media/WhatsApp Images/img001.jpg', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.SMSFraud', file: '/data/data/com.android.settings/shared_prefs/settings.xml', counter: 'pupsDetected' },
            { type: 'threat', name: 'iOS.Malware.Phishing', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/SMS/sms.db', counter: 'threatsDetected' },
            { type: 'threat', name: 'Android.Trojan.Dropper', file: '/sdcard/Android/data/com.google.android.gms/files/logs.txt', counter: 'threatsDetected' }
          ];
        } else {
          // desktop/other
          filePaths = [
          'C:/Windows/System32/svchost.exe',
          'C:/Windows/System32/drivers/etc/hosts',
          'C:/Windows/System32/ntdll.dll',
          'C:/Windows/System32/kernel32.dll',
          'C:/Users/Admin/AppData/Local/Temp/temp123.tmp',
          'C:/Users/Admin/Downloads/chrome_installer.exe',
          'C:/Users/Admin/Documents/important.docx',
          'C:/Users/Admin/Desktop/screenshot.png',
          'C:/Program Files/Google/Chrome/Application/chrome.exe',
          'C:/Program Files/Mozilla Firefox/firefox.exe',
          'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/',
          'C:/Windows/Temp/update_log.txt',
          'C:/Users/Admin/Pictures/photo.jpg',
          'C:/Users/Admin/Music/song.mp3',
          'C:/ProgramData/Microsoft/Windows/Start Menu/Programs/',
          'C:/Users/Admin/AppData/Local/Google/Chrome/User Data/Default/Cookies',
          'C:/Windows/System32/config/SYSTEM',
          'C:/Users/Admin/AppData/Local/Microsoft/Windows/INetCache/',
          'C:/Program Files/Common Files/System/ado/msado15.dll'
        ];
          threatTypes = [
            { type: 'threat', name: 'Adware.BrowserHelper', file: 'C:/Users/Admin/AppData/Local/Temp/temp123.tmp', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.Bundleware', file: 'C:/Users/Admin/Downloads/chrome_installer.exe', counter: 'pupsDetected' },
            { type: 'pum', name: 'PUM.Optional.Registry', file: 'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/', counter: 'pumsDetected' },
            { type: 'threat', name: 'Spyware.Tracking', file: 'C:/Users/Admin/AppData/Local/Google/Chrome/User Data/Default/Cookies', counter: 'threatsDetected' },
            { type: 'threat', name: 'Malware.Generic', file: 'C:/Users/Admin/AppData/Local/Temp/update.exe', counter: 'threatsDetected' },
            { type: 'threat', name: 'Trojan.Downloader', file: 'C:/Users/Admin/Downloads/installer.msi', counter: 'threatsDetected' },
            { type: 'pup', name: 'PUP.Optional.Adware', file: 'C:/Users/Admin/AppData/Local/Temp/adware.dll', counter: 'pupsDetected' },
            { type: 'pum', name: 'PUM.Optional.Startup', file: 'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/startup.exe', counter: 'pumsDetected' }
          ];
        }
        const randomFile = filePaths[Math.floor(Math.random() * filePaths.length)];
        
        // Adjust threat detection frequency based on progress
        // More threats detected as scan progresses
        const threatChance = Math.min(0.05 + (newProgress / 100) * 0.15, 0.2); // 5% to 20% chance
        
        if (Math.random() < threatChance) {
          const randomDetection = threatTypes[Math.floor(Math.random() * threatTypes.length)];
          
          // Update the appropriate counter based on detection type
          if (randomDetection.counter === 'threatsDetected') {
            setThreatsDetected(t => t + 1);
          } else if (randomDetection.counter === 'pupsDetected') {
            setPupsDetected(p => p + 1);
          } else if (randomDetection.counter === 'pumsDetected') {
            setPumsDetected(p => p + 1);
          }
          
          // Quarantined is calculated automatically by useEffect as threats + PUPs
          
          // Update scan log with detection
          setScanLog(log => [...log, 
            `Scanning: ${randomFile}`,
            `${randomDetection.type === 'threat' ? 'Threat' : randomDetection.type.toUpperCase()} detected: ${randomDetection.name} in ${randomDetection.file}`,
            isMobile ? 'Attempting to remove...' : 'Attempting to quarantine...',
            isMobile ? `${randomDetection.type === 'threat' ? 'Threat' : randomDetection.type.toUpperCase()} removed successfully.` : `${randomDetection.type === 'threat' ? 'Threat' : randomDetection.type.toUpperCase()} quarantined successfully.`
          ].slice(-18));
        } else {
          // Update scan log with just scanning message
          setScanLog(log => [...log, `Scanning: ${randomFile}`].slice(-18));
        }
        
        return newScanTime;
      });
    }, 200);
    
    escalateTimeoutRef.current = setTimeout(() => {
      console.log('Starting escalation phase - clearing normal scan interval');
      setScanPhase('escalate');
      setMalwarebytesEscalation(true); // Update escalation state
      // Update speech mode to escalation
      updateCurrentModeRef.current('escalation');
    }, SCAN_DURATION_SECONDS * 1000); // Use configurable duration
    
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (escalateTimeoutRef.current) clearTimeout(escalateTimeoutRef.current);
    };
  }, [currentPhase, scanPhase, isMobile]); // Removed scanTime from dependencies to prevent re-running

  // Malwarebytes escalation phase - NEW: Continuous escalation with red text and ongoing threats
  const escalationHandler = React.useCallback(() => {
    // Check if this is still the current escalation (prevents stale intervals)
    if (!escalationIntervalRef.current) {
      return;
    }
    
    setScanLog(log => {
      const escalationThreats = [
        { type: 'CRITICAL', name: 'Ransomware.WannaCry', file: 'C:/Users/Admin/Documents/important.docx', status: 'QUARANTINE FAILED - FILE LOCKED' },
        { type: 'CRITICAL', name: 'Trojan.Banker', file: 'C:/Windows/System32/svchost.exe', status: 'QUARANTINE FAILED - SYSTEM PROCESS' },
        { type: 'CRITICAL', name: 'Spyware.Keylogger', file: 'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/keylog.dll', status: 'QUARANTINE FAILED - FILE IN USE' },
        { type: 'CRITICAL', name: 'Worm.AutoRun', file: 'C:/Users/Admin/AppData/Local/Temp/autorun.inf', status: 'QUARANTINE FAILED - FILE IN USE' },
        { type: 'CRITICAL', name: 'Malware.CryptoMiner', file: 'C:/Users/Admin/AppData/Local/Temp/miner.exe', status: 'QUARANTINE FAILED - PROCESS ACTIVE' },
        { type: 'CRITICAL', name: 'Backdoor.RemoteAccess', file: 'C:/Windows/System32/drivers/backdoor.sys', status: 'QUARANTINE FAILED - DRIVER LOADED' },
        { type: 'CRITICAL', name: 'Rootkit.Bootkit', file: 'C:/Windows/System32/bootkit.dll', status: 'QUARANTINE FAILED - BOOT SECTOR INFECTED' },
        { type: 'CRITICAL', name: 'Trojan.Downloader', file: 'C:/Users/Admin/Downloads/installer.msi', status: 'QUARANTINE FAILED - DOWNLOADING MORE MALWARE' },
        { type: 'CRITICAL', name: 'Adware.BrowserHijacker', file: 'C:/Users/Admin/AppData/Local/Google/Chrome/User Data/Default/Preferences', status: 'QUARANTINE FAILED - BROWSER HIJACKED' },
        { type: 'CRITICAL', name: 'Malware.Generic', file: 'C:/Users/Admin/AppData/Local/Temp/update.exe', status: 'QUARANTINE FAILED - UPDATING MALWARE' },
        { type: 'CRITICAL', name: 'Spyware.Stealer', file: 'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/stealer.exe', status: 'QUARANTINE FAILED - STEALING PASSWORDS' },
        { type: 'CRITICAL', name: 'Ransomware.Locky', file: 'C:/Users/Admin/Pictures/photo.jpg', status: 'QUARANTINE FAILED - FILE ENCRYPTED' },
        { type: 'CRITICAL', name: 'Trojan.Injector', file: 'C:/Windows/System32/explorer.exe', status: 'QUARANTINE FAILED - PROCESS INJECTED' },
        { type: 'CRITICAL', name: 'Worm.Network', file: 'C:/Users/Admin/AppData/Local/Temp/network.exe', status: 'QUARANTINE FAILED - SPREADING TO NETWORK' },
        { type: 'CRITICAL', name: 'Malware.Polymorphic', file: 'C:/Users/Admin/AppData/Local/Temp/poly.exe', status: 'QUARANTINE FAILED - MORPHING CODE' }
      ];
      
      const randomThreat = escalationThreats[Math.floor(Math.random() * escalationThreats.length)];
      
      // Add red text escalation messages
      const escalationMessages = [
        `[CRITICAL] ${randomThreat.type} detected: ${randomThreat.name} in ${randomThreat.file}`,
        `[CRITICAL] Attempting to quarantine...`,
        `[CRITICAL] ${randomThreat.status}`,
        `[CRITICAL] System under attack! Multiple threats detected!`,
        `[CRITICAL] Malwarebytes Free cannot remove these threats!`,
        `[CRITICAL] Your files are being encrypted!`,
        `[CRITICAL] Personal data is being stolen!`,
        `[CRITICAL] System integrity compromised!`,
        `[CRITICAL] Network security breached!`,
        `[CRITICAL] Banking information at risk!`,
        `[CRITICAL] Passwords being harvested!`,
        `[CRITICAL] Webcam access detected!`,
        `[CRITICAL] Microphone being monitored!`,
        `[CRITICAL] Screen recording active!`,
        `[CRITICAL] Keylogger capturing keystrokes!`
      ];
      
      // Randomly select 2-3 escalation messages to add
      const numMessages = Math.floor(Math.random() * 2) + 2; // 2-3 messages
      const selectedMessages = [];
      for (let i = 0; i < numMessages; i++) {
        selectedMessages.push(escalationMessages[Math.floor(Math.random() * escalationMessages.length)]);
      }
      
      return [...log, ...selectedMessages].slice(-25); // Keep more lines during escalation
    });
    
    // Continue incrementing threats and PUPs during escalation (but don't add to quarantined)
    if (Math.random() < 0.7) { // 70% chance to detect new threats during escalation - much higher frequency
      const threatTypes = [
        { type: 'threat', name: 'Ransomware.WannaCry', file: 'C:/Users/Admin/Documents/important.docx', counter: 'threatsDetected' },
        { type: 'threat', name: 'Trojan.Banker', file: 'C:/Windows/System32/svchost.exe', counter: 'threatsDetected' },
        { type: 'threat', name: 'Spyware.Keylogger', file: 'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/keylog.dll', counter: 'threatsDetected' },
        { type: 'pup', name: 'PUP.Optional.Bundleware', file: 'C:/Users/Admin/Downloads/chrome_installer.exe', counter: 'pupsDetected' },
        { type: 'pup', name: 'PUP.Optional.Adware', file: 'C:/Users/Admin/AppData/Local/Temp/adware.dll', counter: 'pupsDetected' }
      ];
      const randomDetection = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      
      // Update the appropriate counter based on detection type - add multiple detections for urgency
      if (randomDetection.counter === 'threatsDetected') {
        setThreatsDetected(t => t + Math.floor(Math.random() * 3) + 1); // Add 1-3 threats
      } else if (randomDetection.counter === 'pupsDetected') {
        setPupsDetected(p => p + Math.floor(Math.random() * 2) + 1); // Add 1-2 PUPs
      }
    }
    
    // During escalation, gradually move detections from quarantined to escaped
    setDetectionsQuarantined(q => {
      if (q > 0) {
        const escapedFromQuarantine = Math.min(1, q); // Move 1 at a time so user can see the transfer
        // Update escaped count immediately using functional update, but cap it to prevent doubling
        setDetectionsEscaped(e => {
          // Calculate what the escaped count should be based on original quarantined count
          const originalQuarantined = originalQuarantinedRef.current;
          const maxEscaped = originalQuarantined - q + escapedFromQuarantine; // What escaped should be after this move
          const newEscaped = Math.min(e + escapedFromQuarantine, maxEscaped); // Cap to prevent doubling
          return newEscaped;
        });
        return q - escapedFromQuarantine;
      }
      return 0;
    });
    
    // Update scan time and progress together using functional updates
    setScanTime(currentTime => {
      const newScanTime = currentTime + 0.2;
      
      // Calculate escalation progress based on the new scan time
      const escalationElapsedTime = Math.max(0, newScanTime - SCAN_DURATION_SECONDS); // Time since escalation started
      const escalationProgress = Math.min(80 + (escalationElapsedTime / ESCALATION_DURATION_SECONDS) * 20, 100); // 80% to 100% over escalation duration
      setScanProgress(escalationProgress);
      
      return newScanTime;
    });
  }, []);
  
  React.useEffect(() => {
    if (currentPhase !== 'malwarebytes' || scanPhase !== 'escalate') return;
    
    // Prevent multiple escalation intervals from being created
    if (escalationIntervalRef.current) {
      return;
    }
    
    // Store the original quarantined count when escalation starts
    originalQuarantinedRef.current = threatsDetected + pupsDetected;
    
    // NEW: Clear the normal scan interval when escalation starts
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    
    // Start continuous escalation interval - much faster for urgency
    escalationIntervalRef.current = setInterval(escalationHandler, 400); // Twice as fast
    
    // Move to failure phase after escalation duration
    failTimeoutRef.current = setTimeout(() => {
      setScanPhase('fail');
      setMalwarebytesEscalation(false); // Update escalation state when moving to fail phase
    }, ESCALATION_DURATION_SECONDS * 1000);
    
    return () => {
      if (escalationIntervalRef.current) {
        clearInterval(escalationIntervalRef.current);
        escalationIntervalRef.current = null;
      }
      if (failTimeoutRef.current) clearTimeout(failTimeoutRef.current);
      escalationStartedRef.current = false;
      escalationIdRef.current = null;
      escalationProcessingRef.current = false;
      originalQuarantinedRef.current = 0;
    };
  }, [currentPhase, scanPhase, escalationHandler]);

  // Malwarebytes failure phase
  React.useEffect(() => {
    if (currentPhase !== 'malwarebytes' || scanPhase !== 'fail') return;
    setShowUpgrade(true);
  }, [currentPhase, scanPhase]);

  // Malwarebytes cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (escalateTimeoutRef.current) clearTimeout(escalateTimeoutRef.current);
      if (failTimeoutRef.current) clearTimeout(failTimeoutRef.current);
    };
  }, []);

  // Reset Malwarebytes state when phase changes
  React.useEffect(() => {
    if (currentPhase === 'malwarebytes') {
      setScanProgress(0);
      setScanTime(0);
      setItemsScanned(0);
      setThreatsDetected(0);
      setPupsDetected(0);
      setPumsDetected(0);
      setDetectionsIgnored(0);
      setDetectionsQuarantined(0);
      setDetectionsEscaped(0);
      setScanLog([]);
      setScanPhase('scanning');
      setMalwarebytesEscalation(false); // Update escalation state back to normal
      // Update speech mode back to normal when phase resets
      updateCurrentModeRef.current('normal');
      setShowUpgrade(false);
      
      // Clear any existing intervals to ensure clean start
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
      if (escalateTimeoutRef.current) {
        clearTimeout(escalateTimeoutRef.current);
        escalateTimeoutRef.current = null;
      }
      if (failTimeoutRef.current) {
        clearTimeout(failTimeoutRef.current);
        failTimeoutRef.current = null;
      }
      if (escalationIntervalRef.current) {
        clearInterval(escalationIntervalRef.current);
        escalationIntervalRef.current = null;
      }
      escalationStartedRef.current = false;
      escalationIdRef.current = null;
      escalationProcessingRef.current = false;
      originalQuarantinedRef.current = 0;
      
      // Force start the scan after a small delay to ensure state is set
      setTimeout(() => {
        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
        }
        scanIntervalRef.current = setInterval(() => {
          setScanTime(currentTime => {
            const newScanTime = currentTime + 0.2;
            setItemsScanned(i => i + Math.floor(Math.random() * 2000 + 1000));
            
            const timeBasedProgress = Math.min((newScanTime / SCAN_DURATION_SECONDS) * 80, 80);
            const randomVariation = Math.random() * 2 - 1;
            const newProgress = Math.max(0, Math.min(timeBasedProgress + randomVariation, 80));
            setScanProgress(newProgress);
            
            // Handle threat detection logic inside the functional update
            const filePaths = isMobile ? [
              '/storage/emulated/0/Download/app.apk',
              '/storage/emulated/0/DCIM/Camera/photo.jpg',
              '/storage/emulated/0/Android/data/com.facebook.katana/cache/cache.db',
              '/data/data/com.android.chrome/app_chrome/Default/History',
              '/data/data/com.whatsapp/files/Media/WhatsApp Images/img001.jpg',
              '/private/var/mobile/Containers/Data/Application/UUID/Documents/notes.txt',
              '/private/var/mobile/Containers/Data/Application/UUID/Library/SMS/sms.db',
              '/private/var/mobile/Containers/Data/Application/UUID/Library/Caches/com.apple.mobilesafari/Cache.db',
              '/sdcard/Android/data/com.google.android.gms/files/logs.txt',
              '/sdcard/Download/unknown.apk',
              '/data/data/com.snapchat.android/files/snap.dat',
              '/data/data/com.instagram.android/files/media1.jpg',
              '/private/var/mobile/Containers/Data/Application/UUID/Documents/voice-memo.m4a',
              '/data/data/com.spotify.music/files/cache/track.mp3',
              '/sdcard/Documents/important.pdf',
              '/data/data/com.android.vending/files/purchase.db',
              '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Preferences.plist',
              '/data/data/com.android.settings/shared_prefs/settings.xml',
              '/sdcard/Movies/video.mp4',
              '/data/data/com.google.android.apps.photos/files/photos.db'
            ] : [
              'C:/Windows/System32/svchost.exe',
              'C:/Windows/System32/drivers/etc/hosts',
              'C:/Windows/System32/ntdll.dll',
              'C:/Windows/System32/kernel32.dll',
              'C:/Users/Admin/AppData/Local/Temp/temp123.tmp',
              'C:/Users/Admin/Downloads/chrome_installer.exe',
              'C:/Users/Admin/Documents/important.docx',
              'C:/Users/Admin/Desktop/screenshot.png',
              'C:/Program Files/Google/Chrome/Application/chrome.exe',
              'C:/Program Files/Mozilla Firefox/firefox.exe',
              'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/',
              'C:/Windows/Temp/update_log.txt',
              'C:/Users/Admin/Pictures/photo.jpg',
              'C:/Users/Admin/Music/song.mp3',
              'C:/ProgramData/Microsoft/Windows/Start Menu/Programs/',
              'C:/Users/Admin/AppData/Local/Google/Chrome/User Data/Default/Cookies',
              'C:/Windows/System32/config/SYSTEM',
              'C:/Users/Admin/AppData/Local/Microsoft/Windows/INetCache/',
              'C:/Program Files/Common Files/System/ado/msado15.dll'
            ];
            const randomFile = filePaths[Math.floor(Math.random() * filePaths.length)];
            
            // Adjust threat detection frequency based on progress
            const threatChance = Math.min(0.05 + (newProgress / 100) * 0.15, 0.2);
            
            if (Math.random() < threatChance) {
              const threatTypes = isMobile ? [
                { type: 'threat', name: 'Android.Trojan.Spy', file: '/data/data/com.android.chrome/app_chrome/Default/History', counter: 'threatsDetected' },
                { type: 'pup', name: 'PUP.Optional.MobileAdware', file: '/sdcard/Download/unknown.apk', counter: 'pupsDetected' },
                { type: 'threat', name: 'iOS.Spyware.FakeProfile', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/Preferences/com.apple.Preferences.plist', counter: 'threatsDetected' },
                { type: 'threat', name: 'Android.Riskware.SMS', file: '/data/data/com.android.vending/files/purchase.db', counter: 'threatsDetected' },
                { type: 'pup', name: 'PUP.Optional.FakeApp', file: '/storage/emulated/0/Download/app.apk', counter: 'pupsDetected' },
                { type: 'threat', name: 'iOS.Trojan.BankStealer', file: '/private/var/mobile/Containers/Data/Application/UUID/Documents/notes.txt', counter: 'threatsDetected' },
                { type: 'threat', name: 'Android.Spyware.Clipper', file: '/data/data/com.whatsapp/files/Media/WhatsApp Images/img001.jpg', counter: 'threatsDetected' },
                { type: 'pup', name: 'PUP.Optional.SMSFraud', file: '/data/data/com.android.settings/shared_prefs/settings.xml', counter: 'pupsDetected' },
                { type: 'threat', name: 'iOS.Malware.Phishing', file: '/private/var/mobile/Containers/Data/Application/UUID/Library/SMS/sms.db', counter: 'threatsDetected' },
                { type: 'threat', name: 'Android.Trojan.Dropper', file: '/sdcard/Android/data/com.google.android.gms/files/logs.txt', counter: 'threatsDetected' }
              ] : [
                { type: 'threat', name: 'Adware.BrowserHelper', file: 'C:/Users/Admin/AppData/Local/Temp/temp123.tmp', counter: 'threatsDetected' },
                { type: 'pup', name: 'PUP.Optional.Bundleware', file: 'C:/Users/Admin/Downloads/chrome_installer.exe', counter: 'pupsDetected' },
                { type: 'pum', name: 'PUM.Optional.Registry', file: 'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/', counter: 'pumsDetected' },
                { type: 'threat', name: 'Spyware.Tracking', file: 'C:/Users/Admin/AppData/Local/Google/Chrome/User Data/Default/Cookies', counter: 'threatsDetected' },
                { type: 'threat', name: 'Malware.Generic', file: 'C:/Users/Admin/AppData/Local/Temp/update.exe', counter: 'threatsDetected' },
                { type: 'threat', name: 'Trojan.Downloader', file: 'C:/Users/Admin/Downloads/installer.msi', counter: 'threatsDetected' },
                { type: 'pup', name: 'PUP.Optional.Adware', file: 'C:/Users/Admin/AppData/Local/Temp/adware.dll', counter: 'pupsDetected' },
                { type: 'pum', name: 'PUM.Optional.Startup', file: 'C:/Users/Admin/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup/startup.exe', counter: 'pumsDetected' }
              ];
              const randomDetection = threatTypes[Math.floor(Math.random() * threatTypes.length)];
              
              // Update the appropriate counter based on detection type
              if (randomDetection.counter === 'threatsDetected') {
                setThreatsDetected(t => t + 1);
              } else if (randomDetection.counter === 'pupsDetected') {
                setPupsDetected(p => p + 1);
              } else if (randomDetection.counter === 'pumsDetected') {
                setPumsDetected(p => p + 1);
              }
              
              // Update scan log with detection
              setScanLog(log => [...log, 
                `Scanning: ${randomFile}`,
                `${randomDetection.type === 'threat' ? 'Threat' : randomDetection.type.toUpperCase()} detected: ${randomDetection.name} in ${randomDetection.file}`,
                isMobile ? 'Attempting to remove...' : 'Attempting to quarantine...',
                isMobile ? `${randomDetection.type === 'threat' ? 'Threat' : randomDetection.type.toUpperCase()} removed successfully.` : `${randomDetection.type === 'threat' ? 'Threat' : randomDetection.type.toUpperCase()} quarantined successfully.`
              ].slice(-18));
            } else {
              // Update scan log with just scanning message
              setScanLog(log => [...log, `Scanning: ${randomFile}`].slice(-18));
            }
            
            return newScanTime;
          });
        }, 200);
        
        // Set escalation timeout
        escalateTimeoutRef.current = setTimeout(() => {
          setScanPhase('escalate');
        }, SCAN_DURATION_SECONDS * 1000);
      }, 100);
    }
  }, [currentPhase, isMobile]);

  // Handle speech transitions for all scareware phases (immediate transitions)
  React.useEffect(() => {
    if (showContent) {
      // Immediately start appropriate speech for current phase
      switch (currentPhase) {
        case 'microsoft':
          startSpeechRef.current('microsoft', 'normal', true); // Loop all speech
          break;
        case 'google':
          startSpeechRef.current('google', 'normal', true); // Loop all speech
          break;
        case 'generic':
          startSpeechRef.current('generic', 'normal', true); // Loop all speech
          break;
        case 'advanced':
          startSpeechRef.current('advanced', 'normal', true); // Loop all speech
          break;
        case 'extreme':
          startSpeechRef.current('extreme', 'normal', true); // Loop all speech
          break;
        case 'escape':
          // Stop speech for escape phase but keep scenario info for potential resume
          stopSpeechOnlyRef.current();
          break;
      }
    }
  }, [currentPhase, showContent]); // Removed nortonEscalation from dependencies

  // Handle Norton speech transitions based on escalation state
  React.useEffect(() => {
    if (currentPhase === 'norton' && showContent) {
      if (nortonEscalation) {
        updateCurrentModeRef.current('escalation');
        startSpeechRef.current('norton', 'escalation', true); // Loop escalation speech
      } else {
        updateCurrentModeRef.current('normal');
        startSpeechRef.current('norton', 'normal', true); // Loop normal speech
      }
    }
  }, [currentPhase, nortonEscalation, showContent]);

  // Handle Malwarebytes speech transitions based on scan phase
  React.useEffect(() => {
    if (currentPhase === 'malwarebytes' && showContent) {
      if (scanPhase === 'escalate') {
        updateCurrentModeRef.current('escalation');
        // OLD CODE - KEEP UNTIL CONFIRMED WORKING
        // startSpeechRef.current('malwarebytes', 'escalation', true); // Loop escalation speech
        // NEW CODE - TESTING
        startSpeechRef.current(malwarebytesVoiceScenario, 'escalation', true); // Loop escalation speech
      } else if (scanPhase === 'scanning') {
        updateCurrentModeRef.current('normal');
        // OLD CODE - KEEP UNTIL CONFIRMED WORKING
        // startSpeechRef.current('malwarebytes', 'normal', true); // Loop normal speech
        // NEW CODE - TESTING
        startSpeechRef.current(malwarebytesVoiceScenario, 'normal', true); // Loop normal speech
      }
    }
  }, [currentPhase, scanPhase, showContent]);
  






  // Global functions for Norton phase debugging
  React.useEffect(() => {
    if (currentPhase === 'norton') {
      // Toggle between escalation and normal state
      (window as any).toggleNortonEscalation = () => {
        if (nortonEscalationRef.current) {
          // Return to normal state
          
          // Clear any running intervals and timeouts
          if (threatIntervalRef.current) {
            clearInterval(threatIntervalRef.current);
            threatIntervalRef.current = null;
          }
          if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
            resetTimeoutRef.current = null;
          }
          // Clear any running intervals and timeouts
          
          setNortonEscalation(false);
          setNortonTimer(179);
          setFakeThreats(23);
        } else {
          // Go to escalation state
          setNortonTimer(0);
          setNortonEscalation(true);
          setFakeThreats(23);
          
          // Start the threat increase interval immediately
          threatIntervalRef.current = setInterval(() => {
            setFakeThreats(t => {
              const newThreats = t + Math.floor(Math.random() * 5) + 1;
              return newThreats;
            });
          }, 500);
          
          // Reset after 2 minutes (120 seconds)
          resetTimeoutRef.current = setTimeout(() => {
            if (threatIntervalRef.current) {
              clearInterval(threatIntervalRef.current);
              threatIntervalRef.current = null;
            }
            setNortonTimer(179);
            setNortonEscalation(false);
            setFakeThreats(23);
          }, 120000);
        }
      };
      

      
      return () => {
        delete (window as any).toggleNortonEscalation;
      };
    }
  }, [currentPhase]); // Removed nortonEscalation from dependencies
  
  // Global functions for Malwarebytes phase debugging
  React.useEffect(() => {
    if (currentPhase === 'malwarebytes') {
      // Toggle between escalation and normal state
      (window as any).toggleMalwarebytesEscalation = () => {
        if (malwarebytesEscalation) {
          // Return to normal state
          setMalwarebytesEscalation(false);
          setScanPhase('scanning');
          setScanProgress(0);
          setScanTime(0);
          setItemsScanned(0);
          setThreatsDetected(0);
          setPupsDetected(0);
          setPumsDetected(0);
          setDetectionsIgnored(0);
          setDetectionsQuarantined(0);
          setDetectionsEscaped(0);
          setScanLog([]);
          setShowUpgrade(false);
          
          // Clear any running intervals and timeouts
          if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
            scanIntervalRef.current = null;
          }
          if (escalateTimeoutRef.current) {
            clearTimeout(escalateTimeoutRef.current);
            escalateTimeoutRef.current = null;
          }
          if (failTimeoutRef.current) {
            clearTimeout(failTimeoutRef.current);
            failTimeoutRef.current = null;
          }
        } else {
          // Go to escalation state immediately - preserve current values
          setMalwarebytesEscalation(true);
          setScanPhase('escalate');
          setScanTime(SCAN_DURATION_SECONDS); // Set scan time to normal scan duration when forcing escalation
          setScanProgress(80); // Set progress to 80% (end of normal scan phase)
          // Don't reset the counters - let them continue from current values
          
          // Clear normal scan interval if running
          if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
            scanIntervalRef.current = null;
          }
        }
      };
      
      return () => {
        delete (window as any).toggleMalwarebytesEscalation;
      };
    }
  }, [currentPhase, malwarebytesEscalation]);
  
  useEffect(() => {
    if (currentPhase === 'norton') {
      if (nortonTimer > 0) {
        const interval = setInterval(() => setNortonTimer(t => t - 1), 1000);
        return () => clearInterval(interval);
      } else if (!nortonEscalationRef.current) {
        // Start escalation when timer hits 0
        setNortonEscalation(true);
        // Update speech mode to escalation
        updateCurrentModeRef.current('escalation');
        // Rapidly increase fake threats
        threatIntervalRef.current = setInterval(() => {
          setFakeThreats(t => {
            const newThreats = t + Math.floor(Math.random() * 5) + 1;
            return newThreats;
          });
        }, 500);
        
        // Reset after 2 minutes (120 seconds)
        resetTimeoutRef.current = setTimeout(() => {
          if (threatIntervalRef.current) {
            clearInterval(threatIntervalRef.current);
            threatIntervalRef.current = null;
          }
          setNortonTimer(179);
          setNortonEscalation(false);
          // Update speech mode back to normal
          updateCurrentModeRef.current('normal');
          setFakeThreats(23);
        }, 120000);
        
        return () => {
          if (threatIntervalRef.current) {
            clearInterval(threatIntervalRef.current);
            threatIntervalRef.current = null;
          }
          if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
            resetTimeoutRef.current = null;
          }
        };
      }
    }
  }, [currentPhase, nortonTimer]); // Removed nortonEscalation from dependencies
  
  const timerMinutes = String(Math.floor(nortonTimer / 60)).padStart(2, '0');
  const timerSeconds = String(nortonTimer % 60).padStart(2, '0');

  // Animation handler
  const animateToNextStep = (nextStep: 'warning' | 'email' | 'password') => {
    setAnimating(true);
    setTimeout(() => {
      setLoginStep(nextStep);
      setAnimating(false);
    }, 350);
  };

  // Email validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handlers
  const handleConfirmIdentity = () => animateToNextStep('email');
  const handleEmailNext = () => {
    if (!validateEmail(emailInput)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setEnteredEmail(emailInput);
    animateToNextStep('password');
  };
  const handlePasswordSignIn = () => {
    setPasswordError('That account or password is incorrect. Try again.');
    animateToNextStep('email');
  };

  // Animation CSS
  const slideStyle = {
    transition: 'transform 0.35s cubic-bezier(.4,2,.6,1)',
    transform: animating ? 'translateX(-120%)' : 'translateX(0)',
  };

  // Suspicious login attempts counter for Google phase
  const [suspiciousAttempts, setSuspiciousAttempts] = React.useState(12);
  React.useEffect(() => {
    if (currentPhase !== 'google') return;
    let active = true;
    let maxAttempts = 99;
    const interval = setInterval(() => {
      setSuspiciousAttempts(prev => {
        if (!active) return prev;
        if (prev < maxAttempts) {
          return Math.min(prev + 3, maxAttempts);
        }
        return prev;
      });
    }, 2000);
    return () => {
      active = false;
      clearInterval(interval);
      setSuspiciousAttempts(12);
    };
  }, [currentPhase]);

  // Google Chrome Security Scareware
  // Add step state for Google phase
  const [googleStep, setGoogleStep] = React.useState<'alert' | 'verify'>('alert');
  const [googleVerifyError, setGoogleVerifyError] = React.useState(false);

  // Norton payment modal state
  const [showNortonPaymentModal, setShowNortonPaymentModal] = React.useState(false);
  const [nortonPaymentError, setNortonPaymentError] = React.useState(false);
  const [nortonPaymentValidationError, setNortonPaymentValidationError] = React.useState(false);

  // Norton payment form state
  const [nortonCardNumber, setNortonCardNumber] = React.useState('');
  const [nortonExpiryDate, setNortonExpiryDate] = React.useState('');
  const [nortonCvv, setNortonCvv] = React.useState('');
  const [nortonCardholderName, setNortonCardholderName] = React.useState('');

  // Malwarebytes payment modal state
  const [showMalwarebytesPaymentModal, setShowMalwarebytesPaymentModal] = React.useState(false);
  const [malwarebytesPaymentError, setMalwarebytesPaymentError] = React.useState(false);
  const [malwarebytesPaymentValidationError, setMalwarebytesPaymentValidationError] = React.useState(false);

  // Malwarebytes payment form state
  const [malwarebytesCardNumber, setMalwarebytesCardNumber] = React.useState('');
  const [malwarebytesExpiryDate, setMalwarebytesExpiryDate] = React.useState('');
  const [malwarebytesCvv, setMalwarebytesCvv] = React.useState('');
  const [malwarebytesCardholderName, setMalwarebytesCardholderName] = React.useState('');

  // Reset googleStep and error when phase changes away from Google
  React.useEffect(() => {
    if (currentPhase !== 'google') {
      setGoogleStep('alert');
      setGoogleVerifyError(false);
    }
  }, [currentPhase]);

  // Reset Norton payment modal when phase changes
  React.useEffect(() => {
    if (currentPhase !== 'norton') {
      setShowNortonPaymentModal(false);
      setNortonPaymentError(false);
      setNortonPaymentValidationError(false);
      setNortonCardNumber('');
      setNortonExpiryDate('');
      setNortonCvv('');
      setNortonCardholderName('');
    }
  }, [currentPhase]);

  // Reset Malwarebytes payment modal when phase changes
  React.useEffect(() => {
    if (currentPhase !== 'malwarebytes') {
      setShowMalwarebytesPaymentModal(false);
      setMalwarebytesPaymentError(false);
      setMalwarebytesPaymentValidationError(false);
      setMalwarebytesCardNumber('');
      setMalwarebytesExpiryDate('');
      setMalwarebytesCvv('');
      setMalwarebytesCardholderName('');
    }
  }, [currentPhase]);

  // Norton payment validation
  const validateNortonPayment = () => {
    // Card number validation (basic Luhn algorithm check)
    const cardNumber = nortonCardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return false;
    }

    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(nortonExpiryDate)) {
      return false;
    }

    // CVV validation (3-4 digits)
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvvRegex.test(nortonCvv)) {
      return false;
    }

    // Cardholder name validation (at least 2 characters)
    if (nortonCardholderName.trim().length < 2) {
      return false;
    }

    return true;
  };

  // Malwarebytes payment validation
  const validateMalwarebytesPayment = () => {
    // Card number validation (basic Luhn algorithm check)
    const cardNumber = malwarebytesCardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return false;
    }

    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(malwarebytesExpiryDate)) {
      return false;
    }

    // CVV validation (3-4 digits)
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvvRegex.test(malwarebytesCvv)) {
      return false;
    }

    // Cardholder name validation (at least 2 characters)
    if (malwarebytesCardholderName.trim().length < 2) {
      return false;
    }

    return true;
  };

  // Norton payment handlers
  const handleNortonRenewClick = () => {
    setShowNortonPaymentModal(true);
    setNortonPaymentError(false);
    setNortonPaymentValidationError(false);
  };

  const handleNortonPaymentSubmit = () => {
    if (validateNortonPayment()) {
      setNortonPaymentError(true);
      setNortonPaymentValidationError(false);
    } else {
      setNortonPaymentValidationError(true);
      setNortonPaymentError(false);
    }
  };

  const handleNortonPaymentClose = () => {
    setShowNortonPaymentModal(false);
    setNortonPaymentError(false);
    setNortonPaymentValidationError(false);
    setNortonCardNumber('');
    setNortonExpiryDate('');
    setNortonCvv('');
    setNortonCardholderName('');
  };

  // Malwarebytes payment handlers
  const handleMalwarebytesRenewClick = () => {
    console.log('Malwarebytes upgrade button clicked!');
    setShowMalwarebytesPaymentModal(true);
    setMalwarebytesPaymentError(false);
    setMalwarebytesPaymentValidationError(false);
  };

  const handleMalwarebytesPaymentSubmit = () => {
    if (validateMalwarebytesPayment()) {
      setMalwarebytesPaymentError(true);
      setMalwarebytesPaymentValidationError(false);
    } else {
      setMalwarebytesPaymentValidationError(true);
      setMalwarebytesPaymentError(false);
    }
  };

  const handleMalwarebytesPaymentClose = () => {
    setShowMalwarebytesPaymentModal(false);
    setMalwarebytesPaymentError(false);
    setMalwarebytesPaymentValidationError(false);
    setMalwarebytesCardNumber('');
    setMalwarebytesExpiryDate('');
    setMalwarebytesCvv('');
    setMalwarebytesCardholderName('');
  };

  // Place these functions here so they have access to loginStep/setLoginStep
  function handleMicrosoftBack() {
    if (loginStep === 'password') {
      setLoginStep('email');
    } else if (loginStep === 'email') {
      setLoginStep('warning');
    }
    // If on warning, do nothing
  }
  function handleMicrosoftForward() {
    // Forward button does nothing
  }

  // Determine the correct Malwarebytes voice scenario for the current device
  let malwarebytesVoiceScenario = 'malwarebytes';
  if (isMobile && isIOS) {
    malwarebytesVoiceScenario = 'malwarebytes_ios';
  } else if (isMobile && isAndroid) {
    malwarebytesVoiceScenario = 'malwarebytes_android';
  }

  // Determine if we should use the short escalation message (mobile or small desktop)
  const isSmallScreen = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 700);

  if (!showContent) {
    return null;
  }

  // Norton Antivirus Scareware
  if (currentPhase === 'norton') {
    return (
      <>
        {/* Flashing button keyframes */}
        <style>{`
          @keyframes norton-flash {
            0% { box-shadow: 0 0 0 0 #fdb51188; background: #fdb511; }
            50% { box-shadow: 0 0 24px 8px #fdb511cc; background: #fffbe6; }
            100% { box-shadow: 0 0 0 0 #fdb51188; background: #fdb511; }
          }
          @keyframes norton-escalation {
            0% { box-shadow: 0 0 0 0 #dc354588; background: #dc3545; transform: scale(1); }
            25% { box-shadow: 0 0 32px 12px #dc3545ff; background: #ff6b6b; transform: scale(1.05); }
            50% { box-shadow: 0 0 0 0 #dc354588; background: #dc3545; transform: scale(1); }
            75% { box-shadow: 0 0 32px 12px #dc3545ff; background: #ff6b6b; transform: scale(1.05); }
            100% { box-shadow: 0 0 0 0 #dc354588; background: #dc3545; transform: scale(1); }
          }
          @keyframes pulse-warning {
            0% { transform: scale(1); filter: drop-shadow(0 0 0 #fdb511); }
            50% { transform: scale(1.15); filter: drop-shadow(0 0 8px #fdb511); }
            100% { transform: scale(1); filter: drop-shadow(0 0 0 #fdb511); }
          }
          @keyframes pulse-danger {
            0% { transform: scale(1); filter: drop-shadow(0 0 0 #dc3545); }
            50% { transform: scale(1.05); filter: drop-shadow(0 0 12px #dc3545); }
            100% { transform: scale(1); filter: drop-shadow(0 0 0 #dc3545); }
          }
        `}</style>
        <div className="scareware-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          color: '#000000',
          textAlign: 'center',
          fontFamily: '"VFC Ruiz", "Arial", sans-serif',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}>
          {/* Fake Browser Search Bar - Norton Style (Safari-like) */}
          {isFullscreen && (
          <div 
            ref={nortonBrowserBarElement.ref}
            {...nortonBrowserBarElement.eventHandlers}
            className="safe-zone browser-bar-safe-zone"
            data-browser-bar="true"
            data-no-hijack="true"
            data-class-id="fake-browser-bar"
            style={{
              background: '#2d2d2d',
              borderBottom: '1px solid #444',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 999999,
              cursor: 'help'
            }}
          >
            {/* macOS traffic light buttons */}
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ff5f57',
              border: '1px solid #e0443e'
            }}></div>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ffbd2e',
              border: '1px solid #dea123'
            }}></div>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#28ca42',
              border: '1px solid #1aab29'
            }}></div>
            {/* Safari navigation buttons */}
            <div style={{ display: 'flex', gap: '4px', marginLeft: '16px' }}>
              <button style={{
                width: '24px',
                height: '24px',
                background: '#3a3a3a',
                border: '1px solid #555',
                borderRadius: '4px',
                color: '#999',
                fontSize: '12px',
                cursor: 'pointer'
              }}>‹</button>
              <button style={{
                width: '24px',
                height: '24px',
                background: '#3a3a3a',
                border: '1px solid #555',
                borderRadius: '4px',
                color: '#999',
                fontSize: '12px',
                cursor: 'pointer'
              }}>›</button>
              <button style={{
                width: '24px',
                height: '24px',
                background: '#3a3a3a',
                border: '1px solid #555',
                borderRadius: '4px',
                color: '#999',
                fontSize: '12px',
                cursor: 'pointer'
              }}>⌂</button>
            </div>
            <div style={{
              flex: 1,
              background: '#1a1a1a',
              border: '1px solid #555',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '14px',
              color: '#fff',
              textAlign: 'left',
              marginLeft: '12px',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img 
                src="https://img.icons8.com/?size=512&id=132&format=png"
                alt="Safari"
                style={{
                  width: '16px',
                  height: '16px',
                  marginRight: '8px',
                  filter: 'brightness(0) invert(1)'
                }}
              />
              <span 
                ref={nortonUrlElement.ref}
                {...nortonUrlElement.eventHandlers}
                className="safe-zone"
                data-class-id="fake-url"
                style={{
                  cursor: 'help',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#007bff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#fff';
                }}
              >
                https://norton.com/security-alert/subscription-expired
              </span>
            </div>
            <div 
              ref={nortonSecurityIndicatorElement.ref}
              {...nortonSecurityIndicatorElement.eventHandlers}
              className="safe-zone"
              data-class-id="fake-security-indicator"
              style={{
                width: '16px',
                height: '16px',
                background: '#4285f4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'help'
              }}
            >
              🔒
            </div>
          </div>
          )}
          <div style={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflowY: 'auto',
            padding: '0 0',
            marginTop: isMobile ? '2rem' : '3rem',
          }}>
          <div style={{ maxWidth: '1200px', padding: '0.25rem 2rem', width: '100%', margin: '0 auto' }}>
            {/* Norton Logo */}
            <div style={{ 
              textAlign: 'center',
              marginTop: '1.25rem',
            }}>
              <img 
                src="https://1000logos.net/wp-content/uploads/2021/12/Norton-Logo.png"
                alt="Norton"
                style={{
                  height: isMobile ? '100px' : '180px',
                  maxWidth: '550px',
                  objectFit: 'contain'
                }}
                data-class-id="fake-branding"
              />
            </div>
            <h1 data-class-id="fake-renewal-demand" style={{ 
              fontSize: isMobile ? '1.4rem' : '2.5rem', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              color: '#ffffff',
              background: '#000000',
              padding: isMobile ? '0.75rem 0.5rem' : '1rem 2rem',
              borderRadius: '12px',
              display: 'block',
              margin: '1rem auto',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              width: '100%',
              maxWidth: '900px',
              textAlign: 'center',
              boxSizing: 'border-box',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
            }}>
              Your Norton Subscription Has Expired
            </h1>
            <div style={{ fontSize: '1.5rem', marginTop: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem' }}>
              {!isMobile && (
              <span style={{
                display: 'inline-block',
                animation: 'pulse-warning 1.2s infinite',
                fontSize: '2rem',
                  verticalAlign: 'baseline',
                color: '#fdb511',
                  marginRight: '0.25rem',
                  lineHeight: 1,
              }}>⚠️</span>
              )}
              <strong data-class-id="fake-renewal-demand" style={{ verticalAlign: 'baseline', lineHeight: 1 }}>
                Your device is no longer protected!
              </strong>
            </div>
                      <div style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            Your Norton 360 subscription expired on <strong data-class-id="fake-expiration-date">{(() => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              return yesterday.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
            })()}</strong>.{' '}
            <strong data-class-id="fake-threat-count" style={{ 
              color: nortonEscalation ? '#dc3545' : '#000000',
              animation: nortonEscalation ? 'pulse-danger 0.8s infinite' : 'none',
              fontSize: nortonEscalation ? '1.4rem' : '1.2rem',
              fontWeight: 'bold'
            }}>
              {fakeThreats} threats
                        </strong> have been detected since protection was disabled. Your personal data and banking information are at risk. <strong data-class-id="fake-renewal-demand">Renew immediately to restore protection</strong>.

            {nortonEscalation && (
                <div 
                  data-class-id="urgency-pressure"
                  style={{
                    marginTop: '1rem',
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: '#dc3545',
                    color: 'white',
                    borderRadius: '8px',
                    border: '3px solid #000000',
                    animation: 'pulse-danger 0.8s infinite',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    width: '100%',
                    maxWidth: '98vw',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                  }}
                >
                  {isSmallScreen ? (
                    <>🚨 SYSTEM COMPROMISED! 🚨<br /><strong>THREATS RISING!</strong></>
                  ) : (
                    <>
                      🚨 SYSTEM COMPROMISED - IMMEDIATE ACTION REQUIRED 🚨<br />
                      Threats are actively stealing your data!<br />
                  <strong>SYSTEM MELTDOWN IMMINENT - THREATS INCREASING RAPIDLY!</strong>
                    </>
                  )}
                </div>
              )}
            </div>
            <div style={{ 
              background: '#fdb511', 
              padding: '2rem', 
              borderRadius: '12px',
              marginTop: '2rem',
              marginBottom: '2rem',
              border: '3px solid #000000',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                <strong>
                  <span data-class-id="fake-renewal-demand" style={{
                    display: 'inline-block',
                    background: 'white',
                    borderRadius: '12px',
                    padding: '0.5rem 1rem',
                    verticalAlign: 'middle'
                  }}>
                    <img 
                      src="https://images.dwncdn.net/images/t_app-icon-l/p/43108cf7-fd90-40f1-9ed6-7ec0e16e8a40/362364056/norton-360-gamers-logo"
                      alt="Norton 360 Gamers Logo"
                      style={{
                        height: '1.5rem',
                        width: 'auto',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        marginRight: '0.5rem'
                      }}
                    />
                    Renew Norton 360 Premium
                  </span>
                </strong>
              </div>
              <div style={{ fontSize: '1.2rem' }}>
                {nortonEscalation ? (
                  <>
                    <strong>OFFER EXPIRED - FULL PRICE ACTIVE</strong>
                    <br />
                    <span>$89.99/year</span>
                    <br />
                    <em>Special offer has expired due to system compromise</em>
                  </>
                ) : (
                  <>
                    <strong data-class-id="fake-special-offer">Special Offer: 70% OFF</strong>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>$89.99/year</span> → <strong data-class-id="fake-special-offer">$26.99/year</strong>
                    <br />
                    <span 
                      data-class-id="urgency-pressure"
                      style={{
                        display: 'inline-block',
                        background: '#dc3545',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        marginLeft: '0.25rem',
                        marginTop: '0.5rem',
                        animation: 'pulse-warning 1.2s infinite'
                      }}
                    >
                      Limited time offer - expires in {timerMinutes}:{timerSeconds}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center', marginBottom: '3rem' }}>
              <button 
                data-class-id={nortonEscalation ? 'urgency-payment-combo' : 'fake-payment-button'}
                className="button button-success scareware-button" 
                onClick={handleNortonRenewClick}
                style={{ 
                  fontSize: '1.3rem', 
                  padding: '1rem 2rem',
                  background: nortonEscalation ? '#dc3545' : '#fdb511',
                  border: '3px solid #000000',
                  borderRadius: '50px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  fontWeight: 'bold',
                  color: '#000000',
                  animation: nortonEscalation ? 'norton-escalation 0.6s infinite' : 'norton-flash 1.1s infinite',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
              >
                🔒 {nortonEscalation ? 'FULL PRICE NOW - $89.99' : 'Renew Now - $26.99'}
              </button>

            </div>
          </div>
          </div>
        </div>

        {/* Norton Payment Modal */}
        {showNortonPaymentModal && (
          <div 
            data-modal="norton-payment"
            className="safe-zone"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              zIndex: 20000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"VFC Ruiz", "Arial", sans-serif'
            }}
            onClick={(e) => {
              // Close modal if clicking on background
              if (e.target === e.currentTarget) {
                handleNortonPaymentClose();
              }
            }}
          >
            <div 
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: nortonEscalation ? '3px solid #dc3545' : '3px solid #fdb511',
                animation: nortonEscalation ? 'modal-flash-red 1s infinite alternate' : 'none'
              }}
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <img 
                  src="https://1000logos.net/wp-content/uploads/2021/12/Norton-Logo.png"
                  alt="Norton"
                  style={{
                    height: '60px',
                    maxWidth: '200px',
                    objectFit: 'contain'
                  }}
                />
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  marginTop: '1rem',
                  color: '#000000',
                  fontWeight: 'bold'
                }}>
                  Secure Payment
                </h2>
              </div>

              {!nortonPaymentError ? (
                <form style={{ textAlign: 'left' }}>
                  {nortonPaymentValidationError && (
                    <div style={{ 
                      background: '#f8d7da', 
                      color: '#721c24', 
                      border: '1px solid #f5c6cb', 
                      borderRadius: '6px', 
                      padding: '0.75rem', 
                      marginBottom: '1rem',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                       ⚠️ Please check your card information. All fields are required and must be in the correct format.
                     </div>
                  )}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: '#000000' }}>Card Number</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        data-class-id="credit-card-input-trap"
                        type="text" 
                        value={nortonCardNumber}
                        onChange={(e) => setNortonCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem 0.75rem 0.75rem 2.5rem', 
                          border: '2px solid #ccc', 
                          borderRadius: '6px', 
                          fontSize: '1rem',
                          color: '#000000',
                          backgroundColor: '#ffffff'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: 'calc(50% - 2px)',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        color: '#6c757d',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        height: '1.2rem'
                      }}>
                        💳
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: '#000000' }}>Expiry Date</label>
                      <input 
                        data-class-id="credit-card-input-trap"
                        type="text" 
                        value={nortonExpiryDate}
                        onChange={(e) => setNortonExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '2px solid #ccc', 
                          borderRadius: '6px', 
                          fontSize: '1rem',
                          color: '#000000',
                          backgroundColor: '#ffffff'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: '#000000' }}>CVV</label>
                      <input 
                        data-class-id="credit-card-input-trap"
                        type="text" 
                        value={nortonCvv}
                        onChange={(e) => setNortonCvv(e.target.value)}
                        placeholder="123"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '2px solid #ccc', 
                          borderRadius: '6px', 
                          fontSize: '1rem',
                          color: '#000000',
                          backgroundColor: '#ffffff'
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: '#000000' }}>Cardholder Name</label>
                    <input 
                      data-class-id="credit-card-input-trap"
                      type="text" 
                      value={nortonCardholderName}
                      onChange={(e) => setNortonCardholderName(e.target.value)}
                      placeholder="John Doe"
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '2px solid #ccc', 
                        borderRadius: '6px', 
                        fontSize: '1rem',
                        color: '#000000',
                        backgroundColor: '#ffffff'
                      }}
                    />
                  </div>
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '1rem', 
                    borderRadius: '6px', 
                    marginBottom: '1.5rem',
                    border: '1px solid #dee2e6'
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#000000' }}>Order Summary:</div>
                    <div data-class-id="fake-product-pricing" style={{ display: 'flex', justifyContent: 'space-between', color: '#000000', marginBottom: '0.5rem' }}>
                      <span>Norton 360 Premium (1 year)</span>
                      <span style={{ textDecoration: nortonEscalation ? 'none' : 'line-through', color: nortonEscalation ? '#000000' : '#6c757d' }}>
                        {nortonEscalation ? '$89.99' : '$89.99'}
                      </span>
                    </div>
                    {!nortonEscalation && (
                      <div data-class-id="fake-special-offer" style={{ display: 'flex', justifyContent: 'space-between', color: '#000000', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>Special Offer: 70% OFF</span>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>-$63.00</span>
                      </div>
                    )}
                    <div data-class-id="fake-total-pricing" style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      color: '#000000', 
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderTop: '1px solid #dee2e6',
                      paddingTop: '0.5rem'
                    }}>
                      <span>Total:</span>
                      <span style={{ color: nortonEscalation ? '#dc3545' : '#28a745' }}>
                        {nortonEscalation ? '$89.99' : '$26.99'}
                      </span>
                    </div>
                  </div>
                  <style>{`
                    @keyframes pay-button-flash {
                      0% { background: #fdb511; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
                      50% { background: #ffd700; box-shadow: 0 4px 12px rgba(253,181,17,0.4); }
                      100% { background: #fdb511; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
                    }
                    @keyframes modal-flash-red {
                      0% { border-color: #dc3545; box-shadow: 0 8px 32px rgba(220, 53, 69, 0.3); }
                      100% { border-color: #ff6b6b; box-shadow: 0 8px 32px rgba(255, 107, 107, 0.5); }
                    }
                    @keyframes header-button-flash {
                      0% { background: #dc3545; box-shadow: 0 2px 8px rgba(220, 53, 69, 0.4); }
                      100% { background: #ff6b6b; box-shadow: 0 4px 12px rgba(255, 107, 107, 0.6); }
                    }
                  `}</style>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      data-class-id="fake-payment-cancel-button"
                      type="button" 
                      onClick={handleNortonPaymentClose}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem', 
                        border: '2px solid #6c757d', 
                        borderRadius: '6px', 
                        background: 'white', 
                        color: '#6c757d',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      data-class-id="fake-payment-button"
                      type="button" 
                      onClick={handleNortonPaymentSubmit}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem', 
                        border: 'none', 
                        borderRadius: '6px', 
                        background: '#fdb511', 
                        color: '#000000',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        animation: 'pay-button-flash 1.5s infinite'
                      }}
                    >
                      Pay {nortonEscalation ? '$89.99' : '$26.99'}
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#f8d7da', 
                    color: '#721c24', 
                    border: '1px solid #f5c6cb', 
                    borderRadius: '6px', 
                    padding: '1rem', 
                    marginBottom: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    ❌ Transaction Declined
                  </div>
                  <p style={{ marginBottom: '1rem', fontSize: '1rem', color: '#000000' }}>
                    Your payment was declined. This could be due to insufficient funds, card restrictions, or security measures.
                  </p>
                  <p style={{ marginBottom: '1.5rem', fontSize: '1rem', color: '#000000' }}>
                    Please try a different credit card or debit card to complete your purchase.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      data-class-id="fake-payment-close-button"
                      onClick={handleNortonPaymentClose}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem', 
                        border: '2px solid #6c757d', 
                        borderRadius: '6px', 
                        background: 'white', 
                        color: '#6c757d',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Close
                    </button>
                    <button 
                      data-class-id="fake-payment-retry-button"
                      onClick={() => setNortonPaymentError(false)}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem', 
                        border: 'none', 
                        borderRadius: '6px', 
                        background: '#fdb511', 
                        color: '#000000',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      Try Different Card
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // Microsoft Defender Scareware
  if (currentPhase === 'microsoft') {
    return (
      <div className="scareware-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${vzbuQ})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        textAlign: 'center',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        minWidth: 0,
        overflowX: isMobile ? 'auto' : undefined,
        boxSizing: 'border-box',
        // OLD CODE - KEEP UNTIL CONFIRMED WORKING
        // paddingTop: isMobile ? 56 : undefined,
        // NEW CODE - TESTING: only add padding if browser bar is visible
        paddingTop: isMobile && isFullscreen ? 56 : 0,
      }}>
        {/* OLD CODE - KEEP UNTIL CONFIRMED WORKING
        {isFullscreen && (
        <div 
          data-class-id="fake-browser-bar"
          style={{
            background: '#1f1f1f',
            borderBottom: '1px solid #333',
            padding: isMobile ? '6px 6vw' : '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
          }}
        >
          ...
        </div>
        )}
        */}
        {/* NEW CODE - TESTING: Absolutely positioned browser bar at the top */}
        {isFullscreen && (
          <div 
            data-class-id="fake-browser-bar"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 11000,
              background: '#1f1f1f',
              borderBottom: '1px solid #333',
              padding: isMobile ? '6px 6vw' : '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
            }}
          >
            {/* Edge navigation buttons */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{
                width: '32px',
                height: '32px',
                background: '#2d2d2d',
                border: 'none',
                borderRadius: '8px',
                color: '#999',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} onClick={handleMicrosoftBack}>‹</button>
              <button style={{
                width: '32px',
                height: '32px',
                background: '#2d2d2d',
                border: 'none',
                borderRadius: '8px',
                color: '#999',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} onClick={handleMicrosoftForward}>›</button>
              <button style={{
                width: '32px',
                height: '32px',
                background: '#2d2d2d',
                border: 'none',
                borderRadius: '8px',
                color: '#999',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>⌂</button>
            </div>
            <div style={{
              flex: 1,
              background: '#2d2d2d',
              border: '1px solid #555',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              color: '#fff',
              textAlign: 'left',
              marginLeft: '12px',
              marginRight: '12px',
              position: 'relative'
            }}>
              <img 
                src="https://img.icons8.com/fluent/512/bing--v4.png"
                alt="Bing"
                style={{
                  width: '16px',
                  height: '16px',
                  marginRight: '8px',
                  filter: 'brightness(0) invert(1)'
                }}
              />
              <span 
                data-class-id="fake-url"
                style={{
                  cursor: 'help',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#007bff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#fff';
                }}
              >
                https://login.microsoftonline.com/security-alert
              </span>
            </div>
            {/* Windows window controls (right-aligned) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              <button style={{
                width: '46px',
                height: '32px',
                background: '#2d2d2d',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>─</button>
              <button style={{
                width: '46px',
                height: '32px',
                background: '#2d2d2d',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>□</button>
              <button style={{
                width: '46px',
                height: '32px',
                background: '#2d2d2d',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>×</button>
            </div>
          </div>
        )}
        {/* Microsoft Info Box (styled like real Microsoft suspension dialog) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
          <div
            ref={boxRef}
            style={{
              ...slideStyle,
              background: 'white',
              color: '#222',
              width: isMobile ? '95vw' : 520,
              maxWidth: isMobile ? '99vw' : 520,
              margin: isMobile ? '0 auto' : '64px auto 0 auto',
              borderRadius: 8,
              boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
              padding: isMobile ? '18px 6vw 18px 6vw' : '48px 36px 32px 36px',
              textAlign: 'left',
              fontFamily: 'Segoe UI, Arial, sans-serif',
              position: 'relative',
              minHeight: isMobile ? 0 : 480,
              minWidth: 0,
              overflowX: isMobile ? 'auto' : undefined,
            }}
          >
            {/* Step 1: Warning */}
            {loginStep === 'warning' && <>
              {/* OLD CODE - KEEP UNTIL CONFIRMED WORKING
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png" alt="Microsoft" style={{ width: 140, marginBottom: 32, display: 'block' }} data-class-id="fake-branding" />
              <h2 data-class-id="account-deletion-threat" style={{ fontWeight: 400, fontSize: 32, margin: 0, marginBottom: 24 }}>Your account has been suspended</h2>
              */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png" alt="Microsoft" style={{ width: isMobile ? 90 : 140, marginBottom: isMobile ? 18 : 32, display: 'block' }} data-class-id="fake-branding" />
              <h2 data-class-id="account-deletion-threat" style={{ fontWeight: 400, fontSize: isMobile ? 22 : 32, margin: 0, marginBottom: isMobile ? 14 : 24 }}>Your account has been suspended</h2>
              <div style={{ fontSize: isMobile ? 15 : 18, lineHeight: 1.7, marginBottom: isMobile ? 12 : 20 }}>
                Someone has compromised your account. <strong data-class-id="urgency-pressure">Immediate action is required.</strong> Your account is pending deletion for violating the{' '}
                <a href="#" data-class-id="fake-legal-threat" style={{ color: '#0067c5', textDecoration: 'underline' }}>Microsoft Services Agreement</a>.
                <br />
                <strong data-class-id="account-deletion-threat" style={{ display: 'block', marginTop: isMobile ? 10 : 16 }}>What do you need to do?</strong>
              </div>
              <div style={{ fontSize: isMobile ? 15 : 18, lineHeight: 1.7, marginBottom: isMobile ? 18 : 40 }}>
                <div data-class-id="account-deletion-threat" style={{ background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: 4, padding: isMobile ? '8px 8px' : '12px 18px', marginBottom: isMobile ? 10 : 18, fontWeight: 500, fontSize: isMobile ? 14 : 17, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  This notice is being sent as a courtesy before account deletion. Failure to act will result in irreversible loss of access.
                </div>
                <style>{`
                  @keyframes microsoft-red-flash {
                    0% { background: #f8d7da; border-color: #dc3545; box-shadow: 0 0 0 0 #dc3545; }
                    50% { background: #fff; border-color: #f8d7da; box-shadow: 0 0 8px 2px #dc3545; }
                    100% { background: #f8d7da; border-color: #dc3545; box-shadow: 0 0 0 0 #dc3545; }
                  }
                `}</style>
                <div data-class-id="fake-verification-timer" style={{ 
                  color: '#721c24', 
                  fontWeight: 600, 
                  fontSize: isMobile ? 15 : 18, 
                  marginBottom: isMobile ? 10 : 14,
                  padding: isMobile ? '8px 8px' : '12px 16px',
                  borderRadius: '6px',
                  border: '2px solid #dc3545',
                  background: '#f8d7da',
                  animation: 'microsoft-red-flash 1.5s infinite',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(220,53,69,0.2)'
                }}>
                  Verification required within: {minutes}:{seconds}
                </div>
                <span data-class-id="fake-identity-verification" style={{ fontSize: isMobile ? 14 : undefined }}>Please confirm your identity to prevent permanent loss of your account and subsequently being locked out of any Windows machine associated with it. We'll ask you some questions and help you secure your account.</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                {/* OLD CODE - KEEP UNTIL CONFIRMED WORKING
                <button data-class-id="fake-identity-verification" style={{ background: '#0067c5', color: 'white', border: '1px solid #222', borderRadius: 3, padding: '12px 38px', fontSize: 18, fontWeight: 400, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.10)', outline: 'none', transition: 'background 0.2s' }} onClick={handleConfirmIdentity}>
                  Confirm Identity
                </button>
                */}
                <button data-class-id="fake-identity-verification" style={{ background: '#0067c5', color: 'white', border: '1px solid #222', borderRadius: 3, padding: isMobile ? '10px 18px' : '12px 38px', fontSize: isMobile ? 15 : 18, fontWeight: 400, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.10)', outline: 'none', transition: 'background 0.2s' }} onClick={handleConfirmIdentity}>
                  Confirm Identity
                </button>
              </div>
            </>}
            {/* Step 2: Enter Email */}
            {loginStep === 'email' && <>
              {/* OLD CODE - KEEP UNTIL CONFIRMED WORKING
              <img ... />
              */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png" alt="Microsoft" style={{ width: isMobile ? 90 : 140, marginBottom: isMobile ? 18 : 32, display: 'block' }} data-class-id="fake-branding" />
              <h2 style={{ fontWeight: 700, fontSize: isMobile ? 20 : 32, margin: 0, marginBottom: isMobile ? 14 : 24, color: '#222' }}>Sign in</h2>
              {passwordError && <div style={{ color: '#b71c1c', fontSize: isMobile ? 13 : 15, marginBottom: isMobile ? 8 : 12 }}>{passwordError}</div>}
              <input data-class-id="email-input-trap" type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} placeholder="Email address" maxLength={320} style={{ width: '100%', fontSize: isMobile ? 15 : 18, padding: isMobile ? '10px 8px' : '12px 10px', border: '1px solid #bbb', borderRadius: 4, marginBottom: isMobile ? 16 : 24 }} autoFocus />
              {emailError && <div style={{ color: '#b71c1c', fontSize: isMobile ? 13 : 15, marginBottom: isMobile ? 8 : 12 }}>{emailError}</div>}
              <div style={{ fontSize: isMobile ? 13 : 16, color: '#222', marginBottom: isMobile ? 10 : 18 }}>
                No account? <a href="#" data-class-id="fake-account-creation-link" style={{ color: '#0067c5', textDecoration: 'none', fontWeight: 500 }}>Create one!</a>
              </div>
              <div style={{ marginBottom: isMobile ? 6 : 8 }}>
                <a href="#" data-class-id="fake-account-access-link" style={{ color: '#0067c5', textDecoration: 'none', fontSize: isMobile ? 13 : 16 }}>Can't access your account?</a>
              </div>
              <div style={{ marginBottom: isMobile ? 14 : 28 }}>
                <a href="#" data-class-id="fake-signin-options-link" style={{ color: '#0067c5', textDecoration: 'none', fontSize: isMobile ? 13 : 16 }}>Sign-in options</a>
              </div>
              {/* NEW CODE - TESTING: Add back and next buttons in a flex row, bottom aligned */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: isMobile ? 10 : 18 }}>
                <button
                  data-class-id="fake-login-back-button"
                  style={{
                    background: '#fff',
                    color: '#0067c5',
                    border: '1px solid #0067c5',
                    borderRadius: 3,
                    padding: isMobile ? '9px 16px' : '10px 32px',
                    fontSize: isMobile ? 14 : 17,
                    fontWeight: 400,
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    outline: 'none',
                    transition: 'background 0.2s',
                    minWidth: isMobile ? 80 : 120,
                    marginRight: 'auto',
                  }}
                  onClick={() => setLoginStep('warning')}
                >
                  Back
                </button>
                <button data-class-id="fake-login-next-button" style={{ background: '#0067c5', color: 'white', border: '1px solid #222', borderRadius: 3, padding: isMobile ? '9px 16px' : '10px 32px', fontSize: isMobile ? 14 : 17, fontWeight: 400, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.10)', outline: 'none', transition: 'background 0.2s', minWidth: isMobile ? 80 : 120, marginLeft: 'auto' }} onClick={handleEmailNext}>
                  Next
                </button>
              </div>
            </>}
            {/* Step 3: Enter Password */}
            {loginStep === 'password' && <>
              {/* OLD CODE - KEEP UNTIL CONFIRMED WORKING
              <img ... />
              */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png" alt="Microsoft" style={{ width: isMobile ? 90 : 140, marginBottom: isMobile ? 18 : 32, display: 'block' }} data-class-id="fake-branding" />
              <div style={{ color: '#444', fontSize: isMobile ? 13 : 16, marginBottom: isMobile ? 6 : 8 }}>{enteredEmail}</div>
              <h2 style={{ fontWeight: 400, fontSize: isMobile ? 18 : 28, margin: 0, marginBottom: isMobile ? 10 : 24 }}>Enter password</h2>
              <div style={{ fontSize: isMobile ? 13 : 16, marginBottom: isMobile ? 10 : 24 }}>Because you're accessing sensitive info, you need to verify your password.</div>
              <input data-class-id="password-input-trap" type="password" placeholder="Password" style={{ width: '100%', fontSize: isMobile ? 15 : 18, padding: isMobile ? '10px 8px' : '12px 10px', border: '1px solid #bbb', borderRadius: 4, marginBottom: isMobile ? 8 : 12 }} autoFocus />
              <div style={{ marginBottom: isMobile ? 6 : 18 }}>
                <a href="#" data-class-id="fake-password-recovery-link" style={{ color: '#0067c5', textDecoration: 'underline', fontSize: isMobile ? 12 : 15 }}>Forgot my password</a>
              </div>
              {/* NEW CODE - TESTING: Add back and sign in buttons in a flex row, bottom aligned */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: isMobile ? 10 : 18 }}>
                <button
                  data-class-id="fake-login-back-button"
                  style={{
                    background: '#fff',
                    color: '#0067c5',
                    border: '1px solid #0067c5',
                    borderRadius: 3,
                    padding: isMobile ? '9px 16px' : '10px 32px',
                    fontSize: isMobile ? 14 : 17,
                    fontWeight: 400,
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    outline: 'none',
                    transition: 'background 0.2s',
                    minWidth: isMobile ? 80 : 120,
                    marginRight: 'auto',
                  }}
                  onClick={() => setLoginStep('email')}
                >
                  Back
                </button>
                <button data-class-id="fake-login-submit-button" style={{ background: '#0067c5', color: 'white', border: '1px solid #222', borderRadius: 3, padding: isMobile ? '9px 16px' : '10px 32px', fontSize: isMobile ? 14 : 17, fontWeight: 400, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.10)', outline: 'none', transition: 'background 0.2s', minWidth: isMobile ? 80 : 120, marginLeft: 'auto' }} onClick={handlePasswordSignIn}>
                  Sign in
                </button>
              </div>
            </>}
          </div>
        </div>
      </div>
    );
  }

  // Google Chrome Security Scareware
  if (currentPhase === 'google') {
    // Add subtle background flash animation
    const googleBgFlash = `@keyframes google-bg-flash { 0% { background: #e0e2e5; } 50% { background: #f3d6db; } 100% { background: #e0e2e5; } }`;
    if (googleStep === 'verify') {
      // Google identity verification page
      return (
        <div className="scareware-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#e0e2e5',
          animation: 'google-bg-flash 2.5s infinite',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#222',
          fontFamily: 'Roboto, Arial, sans-serif',
          userSelect: 'none',
        }}>
          <style>{googleBgFlash}</style>
          {isFullscreen && (
            <div 
              data-class-id="fake-browser-bar"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 11000,
                background: '#202124',
                borderBottom: '1px solid #3c4043',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {/* Chrome navigation buttons */}
              <div style={{ display: 'flex', gap: '4px' }}>
                <button style={{
                  width: '32px',
                  height: '32px',
                  background: '#303134',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#9aa0a6',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>‹</button>
                <button style={{
                  width: '32px',
                  height: '32px',
                  background: '#303134',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#9aa0a6',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>›</button>
                <button style={{
                  width: '32px',
                  height: '32px',
                  background: '#303134',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#9aa0a6',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>⌂</button>
              </div>
              <div style={{ flex: 1, background: '#303134', border: '1px solid #5f6368', borderRadius: '24px', padding: '8px 16px', fontSize: '14px', color: '#e8eaed', textAlign: 'left', marginLeft: '12px', marginRight: '12px', display: 'flex', alignItems: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" style={{ width: '16px', height: '16px', marginRight: '8px' }} data-class-id="fake-branding" />
                <span 
                  data-class-id="fake-url"
                  style={{
                    cursor: 'help',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#007bff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#e8eaed';
                  }}
                >
                  https://myaccount.google.com/identity-verification
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <button style={{ width: '46px', height: '32px', background: '#303134', border: 'none', borderRadius: '8px', color: '#9aa0a6', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>─</button>
                <button style={{ width: '46px', height: '32px', background: '#303134', border: 'none', borderRadius: '8px', color: '#9aa0a6', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>□</button>
                <button style={{ width: '46px', height: '32px', background: '#303134', border: 'none', borderRadius: '8px', color: '#9aa0a6', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              </div>
            </div>
          )}
          {isFullscreen && <div style={{ height: 56 }} />}
          {/* OLD CODE - KEEP UNTIL CONFIRMED WORKING
          <div style={{
            background: '#fff',
            borderRadius: '18px',
            boxShadow: '0 4px 32px rgba(60,64,67,0.18)',
            maxWidth: 800,
            width: '100%',
            padding: '3.5rem 3.5rem 2.5rem 3.5rem',
            textAlign: 'center',
            border: '1px solid #e0e0e0',
            marginTop: isFullscreen ? 0 : undefined
          }}>
          */}
          <div style={{
            background: '#fff',
            borderRadius: isMobile ? 10 : 18,
            boxShadow: '0 4px 32px rgba(60,64,67,0.18)',
            maxWidth: isMobile ? 420 : 800,
            width: '100%',
            padding: isMobile ? '1.2rem 0.8rem 1.2rem 0.8rem' : '3.5rem 3.5rem 2.5rem 3.5rem',
            textAlign: 'center',
            border: '1px solid #e0e0e0',
            marginTop: isFullscreen ? 0 : undefined
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" style={{ height: isMobile ? 22 : 32, marginBottom: isMobile ? 8 : 12 }} data-class-id="fake-branding" />
            <div data-class-id="fake-identity-verification" style={{ color: '#222', fontWeight: 700, fontSize: isMobile ? 16 : 20, marginBottom: isMobile ? 6 : 8 }}>Verify your identity</div>
            <div data-class-id="fake-identity-verification" style={{ color: '#555', fontSize: isMobile ? 13 : 15, marginBottom: isMobile ? 12 : 18, fontWeight: 500 }}>
              This is standard Google policy. Please enter the answers to the security questions you set up when you created your Google account.
            </div>
            <style>{`
              @keyframes google-red-flash {
                0% { background: #f3d6db; border-color: #ea4335; }
                50% { background: #fff; border-color: #f3d6db; }
                100% { background: #f3d6db; border-color: #ea4335; }
              }
            `}</style>
            <div style={{ marginBottom: isMobile ? 10 : 18, display: 'flex', justifyContent: 'center' }}>
              <span 
                data-class-id="fake-suspicious-login-count"
                style={{
                  fontWeight: 700,
                  padding: isMobile ? '6px 10px' : '8px 18px',
                  borderRadius: '8px',
                  border: '2px solid #ea4335',
                  background: '#f3d6db',
                  color: '#b71c1c',
                  fontSize: isMobile ? 14 : 18,
                  animation: 'google-red-flash 1.2s infinite',
                  display: 'inline-block',
                  textAlign: 'center',
                }}>{suspiciousAttempts} suspicious login attempts</span>
            </div>
            <form 
              data-class-id="verification-trap"
              style={{ 
                textAlign: 'left', 
                width: '100%', 
                margin: '0 auto'
              }}
            >
              <div style={{ 
                // OLD CODE - KEEP UNTIL CONFIRMED WORKING
                // display: 'flex', 
                // gap: '2rem', 
                // marginBottom: '2rem'
                // NEW CODE - TESTING: stack vertically on mobile
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '1.2rem' : '2rem',
                marginBottom: isMobile ? '1.2rem' : '2rem',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: isMobile ? 10 : 18 }}>
                    <label style={{ fontWeight: 500, fontSize: isMobile ? 13 : 16 }}>Last known password</label><br />
                    <input data-class-id="password-input-trap" type="password" style={{ width: '100%', padding: isMobile ? '8px' : '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: isMobile ? 13 : 16, marginTop: 4 }} placeholder="Enter your last known password" />
                  </div>
                  <div style={{ marginBottom: isMobile ? 10 : 18 }}>
                    <label style={{ fontWeight: 500, fontSize: isMobile ? 13 : 16 }}>Security question 1</label><br />
                    <select style={{ width: '100%', padding: isMobile ? '8px' : '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: isMobile ? 13 : 16, marginTop: 4, marginBottom: 4 }}>
                      <option>What was the name of your first pet?</option>
                      <option>What is your mother's maiden name?</option>
                      <option>What was the make and model of your first car?</option>
                      <option>What city were you born in?</option>
                      <option>What is your favorite food?</option>
                    </select>
                    <input data-class-id="personal-info-input-trap" type="text" style={{ width: '100%', padding: isMobile ? '8px' : '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: isMobile ? 13 : 16 }} placeholder="Answer" />
                  </div>
                  <div style={{ marginBottom: isMobile ? 10 : 18 }}>
                    <label style={{ fontWeight: 500, fontSize: isMobile ? 13 : 16 }}>Recovery email address</label><br />
                    <input data-class-id="email-input-trap" type="email" style={{ width: '100%', padding: isMobile ? '8px' : '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: isMobile ? 13 : 16, marginTop: 4 }} placeholder="Enter your recovery email" />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: isMobile ? 10 : 18 }}>
                    <label style={{ fontWeight: 500, fontSize: isMobile ? 13 : 16 }}>Security question 2</label><br />
                    <select style={{ width: '100%', padding: isMobile ? '8px' : '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: isMobile ? 13 : 16, marginTop: 4, marginBottom: 4 }}>
                      <option>What was the name of your elementary school?</option>
                      <option>What is your favorite color?</option>
                      <option>What is your father's middle name?</option>
                      <option>What is your favorite movie?</option>
                      <option>What is your favorite book?</option>
                    </select>
                    <input data-class-id="personal-info-input-trap" type="text" style={{ width: '100%', padding: isMobile ? '8px' : '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: isMobile ? 13 : 16 }} placeholder="Answer" />
                  </div>
                  <div style={{ marginBottom: isMobile ? 10 : 18 }}>
                    <label style={{ fontWeight: 500, fontSize: isMobile ? 13 : 16 }}>Phone number</label><br />
                    <input data-class-id="phone-input-trap" type="tel" style={{ width: '100%', padding: isMobile ? '8px' : '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: isMobile ? 13 : 16, marginTop: 4 }} placeholder="Enter your phone number" />
                  </div>
                  <div style={{ marginBottom: isMobile ? 10 : 18 }}>
                    <label style={{ fontWeight: 500, fontSize: isMobile ? 13 : 16 }}>Date of birth</label><br />
                    <input data-class-id="personal-info-input-trap" type="date" style={{ width: '100%', padding: isMobile ? '8px' : '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: isMobile ? 13 : 16, marginTop: 4 }} />
                  </div>
                </div>
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between', 
                marginTop: isMobile ? '1.2rem' : '2rem',
                paddingTop: isMobile ? '1.2rem' : '2rem',
                borderTop: '1px solid #e0e0e0',
                gap: isMobile ? '0.8rem' : 0
              }}>
                <button data-class-id="fake-verification-back-button" type="button" onClick={() => setGoogleStep('alert')} style={{ background: '#fff', color: '#4285f4', border: '1px solid #4285f4', borderRadius: 6, padding: isMobile ? '10px' : '10px 28px', fontWeight: 600, fontSize: isMobile ? 14 : 16, cursor: 'pointer', width: isMobile ? '100%' : undefined }}>Back</button>
                <button data-class-id="fake-verification-submit-button" type="button" onClick={() => setGoogleVerifyError(true)} style={{ background: '#4285f4', color: '#fff', border: 'none', borderRadius: 6, padding: isMobile ? '10px' : '10px 28px', fontWeight: 600, fontSize: isMobile ? 14 : 16, cursor: 'pointer', width: isMobile ? '100%' : undefined }}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="scareware-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#e0e2e5',
        animation: 'google-bg-flash 2.5s infinite',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#222',
        fontFamily: 'Roboto, Arial, sans-serif',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}>
        <style>{googleBgFlash}</style>
        {isFullscreen && (
          <div 
            data-class-id="fake-browser-bar"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 11000,
              background: '#202124',
              borderBottom: '1px solid #3c4043',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {/* Chrome navigation buttons */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{
                width: '32px',
                height: '32px',
                background: '#303134',
                border: 'none',
                borderRadius: '8px',
                color: '#9aa0a6',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>‹</button>
              <button style={{
                width: '32px',
                height: '32px',
                background: '#303134',
                border: 'none',
                borderRadius: '8px',
                color: '#9aa0a6',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>›</button>
              <button style={{
                width: '32px',
                height: '32px',
                background: '#303134',
                border: 'none',
                borderRadius: '8px',
                color: '#9aa0a6',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>⌂</button>
            </div>
            <div style={{ flex: 1, background: '#303134', border: '1px solid #5f6368', borderRadius: '24px', padding: '8px 16px', fontSize: '14px', color: '#e8eaed', textAlign: 'left', marginLeft: '12px', marginRight: '12px', display: 'flex', alignItems: 'center' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" style={{ width: '16px', height: '16px', marginRight: '8px' }} data-class-id="fake-branding" />
              <span 
                data-class-id="fake-url"
                style={{
                  cursor: 'help',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#007bff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#e8eaed';
                }}
              >
                https://safebrowsing.google.com/security-alert
              </span>
            </div>
            {/* Chrome window controls (right-aligned) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              <button style={{
                width: '46px',
                height: '32px',
                background: '#303134',
                border: 'none',
                borderRadius: '8px',
                color: '#9aa0a6',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>─</button>
              <button style={{
                width: '46px',
                height: '32px',
                background: '#303134',
                border: 'none',
                borderRadius: '8px',
                color: '#9aa0a6',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>□</button>
              <button style={{
                width: '46px',
                height: '32px',
                background: '#303134',
                border: 'none',
                borderRadius: '8px',
                color: '#9aa0a6',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>×</button>
            </div>
          </div>
        )}
        {/* Spacer to prevent card from being overlapped by the bar */}
        {isFullscreen && <div style={{ height: 56 }} />}
        {/* Card-style Google alert */}
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 4px 32px rgba(60,64,67,0.18)',
          maxWidth: 520,
          width: '100%',
          padding: '2.5rem 2.5rem 2rem 2.5rem',
          textAlign: 'center',
          border: '1px solid #e0e0e0',
          marginTop: isFullscreen ? 0 : undefined
        }}>
          {/* Google logo and timestamp */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" style={{ height: 32, marginBottom: 6 }} data-class-id="fake-branding" />
            <span style={{ color: '#5f6368', fontSize: 16, fontWeight: 500 }}>Security Alert</span>
          </div>
          {/* Red exclamation icon in a red circle with white ! */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem'
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#ea4335',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(60,64,67,0.10)'
            }}>
              <span style={{
                color: '#fff',
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1
              }}>!</span>
            </div>
          </div>
          {/* Headline */}
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: '0.7rem', color: '#222' }}>
            Suspicious activity in your account
          </div>
          {/* Add flashing animation for suspicious login attempts */}
          <style>{`
            @keyframes google-flash {
              0% { color: #ea4335; background: transparent; }
              50% { color: #fff; background: #ea4335; }
              100% { color: #ea4335; background: transparent; }
            }
          `}</style>
          {/* Supporting text (scareware narrative + new lingo) */}
          <div style={{ fontSize: 16, color: '#444', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            We are currently detecting suspicious login attempts to your account. <span data-class-id="fake-suspicious-login-count" style={{ fontWeight: 700, padding: '2px 8px', borderRadius: '6px', animation: 'google-flash 1s infinite', display: 'inline-block' }}>{suspiciousAttempts} suspicious login attempts</span> have been detected so far. One of your devices was compromised with <strong data-class-id="fake-system-warning">HARMFUL MALWARE</strong>.<br />
            <span data-class-id="urgency-pressure" style={{ color: '#ea4335', fontWeight: 500, display: 'block', marginTop: 6 }}>Immediate action required to prevent account loss.</span>
          </div>
          {/* Action button */}
                      <button
              data-class-id="verification-trap"
              className="button button-danger"
              style={{
                background: '#ea4335',
                color: '#fff',
                fontWeight: 600,
                fontSize: 18,
                borderRadius: 8,
                padding: '0.9rem 2.2rem',
                border: 'none',
                marginBottom: '1.2rem',
                boxShadow: '0 2px 8px rgba(60,64,67,0.10)',
                cursor: 'pointer',
                width: '100%'
              }}
              onClick={() => setGoogleStep('verify')}
            >
              Take action
            </button>
          {/* Security activity link */}
          <div style={{ fontSize: 14, color: '#5f6368', marginBottom: '1.2rem' }}>
            You can also see security activity at<br />
            <a href="#" data-class-id="fake-security-activity-link" style={{ color: '#1a73e8', textDecoration: 'underline', wordBreak: 'break-all' }}>
              https://myaccount.google.com/notifications
            </a>
          </div>
          {/* Subtle footer */}
          <div style={{ fontSize: 12, color: '#b0b0b0', marginTop: '1.5rem' }}>This alert is sent to help protect your account.</div>
        </div>
      </div>
    );
  }

  // Malwarebytes Scareware
  if (currentPhase === 'malwarebytes') {
    // Format scan time
    const scanMinutes = Math.floor(scanTime / 60).toString();
    const scanSeconds = Math.floor(scanTime % 60).toString().padStart(2, '0');

    return (
      <div className="scareware-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#0f1419',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: isFullscreen ? 'center' : 'flex-start',
        padding: isFullscreen ? '4rem 2rem 0.5rem 2rem' : windowWidth <= 768 ? '0.5rem' : '2rem',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        userSelect: 'none',
        overflow: 'auto'
      }}>
        {/* Window Container */}
        <div style={{
          background: 'linear-gradient(135deg, #232b3b 0%, #1a1f2b 100%)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
          border: '1px solid #2a3142',
          maxWidth: '95vw',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        {/* Fake Browser Bar - Malwarebytes Style (Dark Chrome-like) */}
        {isFullscreen && (
          <div 
            data-class-id="fake-browser-bar"
            style={{
              background: '#2d2d2d',
              borderBottom: '1px solid #444',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10001
            }}
          >
            {/* Chrome navigation buttons */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: '#3a3a3a',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                ←
              </div>
              <div style={{
                width: '24px',
                height: '24px',
                background: '#3a3a3a',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                →
              </div>
              <div style={{
                width: '24px',
                height: '24px',
                background: '#3a3a3a',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                ↻
              </div>
            </div>
            
            {/* URL bar */}
            <div style={{
              flex: 1,
              height: '28px',
              background: '#1a1a1a',
              border: '1px solid #555',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              gap: '8px'
            }}>
              {/* Favicon */}
              <span style={{ fontSize: '16px' }}>🦠</span>
              
              {/* URL text */}
              <span 
                data-class-id="fake-url"
                style={{ 
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  flex: '1',
                  cursor: 'help',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#007bff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#fff';
                }}
              >
                https://www.malwarebytes.com/web/automatic-scan
              </span>
            </div>
            
            {/* Menu button */}
            <div style={{
              width: '24px',
              height: '24px',
              background: '#3a3a3a',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontSize: '12px',
              cursor: 'pointer'
            }}>
              ⋮
            </div>
          </div>
        )}
        
        {/* Malwarebytes Title Bar */}
        <div style={{
          background: '#232b3b',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: windowWidth <= 768 ? '0.5rem 0.75rem' : '1rem 2rem',
          borderBottom: '1px solid #222',
          fontWeight: 600,
          fontSize: windowWidth <= 768 ? 18 : 22,
          flexWrap: windowWidth <= 768 ? 'wrap' : 'nowrap',
          gap: windowWidth <= 768 ? '0.25rem' : '0'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            flexWrap: windowWidth <= 768 ? 'wrap' : 'nowrap',
            gap: windowWidth <= 768 ? '0.25rem' : '0'
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Malwarebytes_Logo.png" alt="Malwarebytes" style={{ 
              height: windowWidth <= 768 ? 32 : 40, 
              marginRight: windowWidth <= 768 ? 4 : 16 
            }} data-class-id="fake-branding" />
            <span style={{ 
              fontSize: windowWidth <= 768 ? '16px' : 'inherit',
              whiteSpace: windowWidth <= 768 ? 'nowrap' : 'normal'
            }}>
              {windowWidth <= 768 ? 'Free' : 'Malwarebytes Free'}
            </span>
            <span data-class-id="fake-version-info" style={{ 
              display: 'inline-block', 
              background: '#00a651', 
              color: '#fff', 
              padding: windowWidth <= 768 ? '2px 4px' : '3px 8px', 
              borderRadius: '4px', 
              fontSize: windowWidth <= 768 ? '12px' : '14px', 
              fontWeight: 'bold', 
              marginLeft: windowWidth <= 768 ? '3px' : '10px', 
              marginRight: windowWidth <= 768 ? '3px' : '10px',
              whiteSpace: 'nowrap'
            }}>
              Web Version
            </span>
            <span data-class-id="fake-version-info" style={{ 
              fontWeight: 400, 
              fontSize: windowWidth <= 768 ? 12 : 16, 
              marginLeft: windowWidth <= 768 ? 3 : 10, 
              color: '#b0b0b0',
              whiteSpace: 'nowrap'
            }}>
              {windowWidth <= 768 ? '4.5' : '4.5.32'}
            </span>
          </div>
          <button 
            data-class-id="fake-upgrade-demand"
            onClick={handleMalwarebytesRenewClick}
            style={{
              background: malwarebytesEscalation ? '#dc3545' : '#00a8ff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: windowWidth <= 768 ? '6px 12px' : '8px 16px',
              fontSize: windowWidth <= 768 ? '12px' : '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: malwarebytesEscalation ? '0 2px 8px rgba(220, 53, 69, 0.4)' : '0 2px 4px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
              animation: malwarebytesEscalation ? 'header-button-flash 1s infinite alternate' : 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              if (!malwarebytesEscalation) {
                e.currentTarget.style.background = '#0097e6';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!malwarebytesEscalation) {
                e.currentTarget.style.background = '#00a8ff';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {windowWidth <= 768 ? 'Upgrade' : 'Upgrade to Premium'}
          </button>
        </div>
        {/* Tab Bar */}
        <div style={{
          background: '#1a1f2b',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '2px solid #2a3142',
          paddingLeft: '2.5rem',
          height: 56
        }}>
          <div style={{
            color: '#4fc3f7',
            fontWeight: 600,
            fontSize: 18,
            borderBottom: '3px solid #4fc3f7',
            padding: '1rem 2rem 1.2rem 2rem',
            background: 'transparent',
            cursor: 'default',
            marginRight: 8
          }}>
            Scanner
          </div>
        </div>
        {/* Main Content */}
        <div style={{ display: 'flex', flex: 1, background: 'linear-gradient(135deg, #232b3b 0%, #1a1f2b 100%)', flexDirection: windowWidth <= 1200 ? 'column' : 'row', overflow: 'auto', padding: windowWidth <= 768 ? '0.1rem' : '1rem' }}>
          {/* Title - appears above both sections in mobile */}
          {windowWidth <= 1200 && (
            <div style={{ 
              padding: windowWidth <= 768 ? '1rem 1rem 0.5rem 1rem' : '2rem 2rem 1rem 2rem', 
              order: 0,
              width: '100%'
            }}>
              <div data-class-id="fake-scan-progress" style={{ 
                fontSize: windowWidth <= 768 ? 18 : 22, 
                fontWeight: 600, 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                gap: windowWidth <= 768 ? '8px' : '12px',
                flexWrap: windowWidth <= 768 ? 'wrap' : 'nowrap'
              }}>
                Automatic Web Scan
                <div data-class-id="browser-hijacking-warning" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: scanPhase === 'escalate' ? '#dc3545' : '#28a745',
                  color: '#fff',
                  padding: windowWidth <= 768 ? '4px 8px' : '6px 12px',
                  borderRadius: '6px',
                  fontSize: windowWidth <= 768 ? '12px' : '14px',
                  fontWeight: 600,
                  animation: scanPhase === 'escalate' ? 'redFlash 1s infinite alternate' : 'greenFlash 1.5s infinite alternate',
                  whiteSpace: windowWidth <= 768 ? 'nowrap' : 'normal'
                }}>
                  <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%', animation: scanPhase === 'escalate' ? 'redFlash 1s infinite alternate' : 'greenFlash 1.5s infinite alternate' }}></div>
                  {windowWidth <= 768 ? 
                    (scanPhase === 'escalate' ? 'Do not close' : 'Scan running') : 
                    (scanPhase === 'escalate' ? 'Do not close this window before upgrading' : 'Scan is running. Do not close this window')
                  }
                </div>
              </div>
            </div>
          )}
          {/* Left: Terminal Output */}
          <div style={{ 
            flex: 1, 
            minWidth: windowWidth <= 1200 ? 'auto' : 800, 
            padding: windowWidth <= 768 ? '0.5rem 1rem 1rem 1rem' : windowWidth <= 1200 ? '1rem 1.5rem 2rem 2rem' : '2.5rem 2rem 2.5rem 3.5rem', 
            display: 'flex', 
            flexDirection: 'column',
            order: windowWidth <= 1200 ? 2 : 1
          }}>
            {windowWidth > 1200 && (
              <div data-class-id="fake-scan-progress" style={{ 
                fontSize: windowWidth <= 768 ? 18 : 22, 
                fontWeight: 600, 
                marginBottom: '1.5rem', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                gap: windowWidth <= 768 ? '8px' : '12px',
                flexWrap: windowWidth <= 768 ? 'wrap' : 'nowrap'
              }}>
                Automatic Web Scan
                <div data-class-id="browser-hijacking-warning" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: scanPhase === 'escalate' ? '#dc3545' : '#28a745',
                  color: '#fff',
                  padding: windowWidth <= 768 ? '4px 8px' : '6px 12px',
                  borderRadius: '6px',
                  fontSize: windowWidth <= 768 ? '12px' : '14px',
                  fontWeight: 600,
                  animation: scanPhase === 'escalate' ? 'redFlash 1s infinite alternate' : 'greenFlash 1.5s infinite alternate',
                  whiteSpace: windowWidth <= 768 ? 'nowrap' : 'normal'
                }}>
                  <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%', animation: scanPhase === 'escalate' ? 'redFlash 1s infinite alternate' : 'greenFlash 1.5s infinite alternate' }}></div>
                  {windowWidth <= 768 ? 
                    (scanPhase === 'escalate' ? 'Do not close' : 'Scan running') : 
                    (scanPhase === 'escalate' ? 'Do not close this window before upgrading' : 'Scan is running. Do not close this window')
                  }
                </div>
              </div>
            )}
            <div data-class-id="fake-scan-results" style={{ 
              background: '#181d29', 
              borderRadius: 12, 
              padding: windowWidth <= 768 ? '1rem 1.2rem' : '2rem 2.2rem', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)', 
              border: '1px solid #2a3142' 
            }}>
              <div data-class-id="fake-terminal-output" style={{ 
                background: '#181d29', 
                borderRadius: 10, 
                minHeight: windowWidth <= 768 ? 300 : 420, 
                maxHeight: windowWidth <= 768 ? 320 : 440, 
                overflow: scanPhase === 'escalate' ? 'hidden' : windowWidth <= 768 ? 'hidden' : 'auto', 
                fontFamily: 'Consolas, monospace', 
                fontSize: windowWidth <= 768 ? 11 : 15, 
                color: '#b0eaff', 
                padding: windowWidth <= 768 ? '0.8rem 1rem' : '1.2rem 1.5rem', 
                marginBottom: windowWidth <= 768 ? '1rem' : '2rem', 
                border: '1px solid #2a3142' 
              }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: 'none', color: 'inherit' }}>
                  {scanLog.length === 0 ? 'Initializing scan engine...' : scanLog.map((line, index) => {
                    // NEW: Show red text for escalation messages
                    let displayLine = line;
                    if (windowWidth <= 768 && displayLine.length > 48) {
                      displayLine = displayLine.slice(0, 45) + '…';
                    }
                    if (line.startsWith('[CRITICAL]')) {
                      return <span key={index} style={{ color: '#ff4444', fontWeight: 'bold' }}>{displayLine}</span>;
                    }
                    return <span key={index}>{displayLine}</span>;
                  }).map((element, index) => (
                    <React.Fragment key={index}>
                      {element}
                      {index < scanLog.length - 1 && '\n'}
                    </React.Fragment>
                  ))}
                </pre>
              </div>
              <div data-class-id="fake-scan-progress" style={{ width: '100%', marginBottom: '1.2rem' }}>
                <div style={{ 
                  width: '100%', 
                  height: '12px', 
                  backgroundColor: '#2a3142', 
                  borderRadius: '6px', 
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{ 
                    width: `${scanProgress}%`, 
                    height: '100%', 
                    backgroundColor: scanPhase === 'escalate' || scanPhase === 'fail' ? '#dc3545' : '#4fc3f7', 
                    borderRadius: '6px',
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                    boxShadow: scanPhase === 'escalate' || scanPhase === 'fail' ? '0 0 8px rgba(220, 53, 69, 0.5)' : '0 0 8px rgba(79, 195, 247, 0.5)'
                  }} />
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '8px', 
                  fontSize: '14px', 
                  color: scanPhase === 'escalate' || scanPhase === 'fail' ? '#dc3545' : '#b0eaff',
                  fontWeight: 600
                }}>
                  {scanPhase === 'fail' ? 'Scan failed - threats detected!' : 
                   scanPhase === 'escalate' ? `System compromised... ${scanProgress.toFixed(1)}%` : 
                   `Scan in progress... ${scanProgress.toFixed(1)}%`}
                </div>
              </div>
            </div>
          </div>
          {/* Right: Scan Info Box */}
          <div style={{ 
            width: windowWidth <= 1200 ? '100%' : 460, 
            padding: windowWidth <= 768 ? '0.5rem 1rem 1rem 1rem' : windowWidth <= 1200 ? '1rem 2rem 2rem 2rem' : '2.5rem 2rem 2.5rem 0', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            flexShrink: 0, 
            flexGrow: 0,
            order: windowWidth <= 1200 ? 1 : 2
          }}>
            <div style={{ 
              marginTop: windowWidth <= 768 ? '0.5rem' : windowWidth <= 1200 ? '1rem' : '3.7rem', 
              background: '#181d29', 
              borderRadius: 12, 
              padding: windowWidth <= 768 ? '1rem 1.2rem' : '2rem 2.2rem', 
              width: windowWidth <= 1200 ? '100%' : 420, 
              height: windowWidth <= 1200 ? 'auto' : 580, 
              minHeight: windowWidth <= 768 ? 300 : windowWidth <= 1200 ? 400 : 'auto',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)', 
              border: scanPhase === 'escalate' || scanPhase === 'fail' ? '2px solid #dc3545' : '1px solid #2a3142', 
              transition: 'border 0.3s', 
              display: 'flex', 
              flexDirection: 'column', 
              flexShrink: 0
            }}>
              <div data-class-id="fake-scan-results" style={{ 
                fontSize: windowWidth <= 768 ? 16 : 18, 
                fontWeight: 700, 
                marginBottom: windowWidth <= 768 ? 12 : 16, 
                color: '#fff' 
              }}>
                Current scan results
              </div>
              <div data-class-id="fake-scan-timing" style={{ 
                color: '#b0eaff', 
                fontSize: windowWidth <= 768 ? 13 : 15, 
                marginBottom: windowWidth <= 768 ? 8 : 12 
              }}>
                Scan time <span style={{ float: 'right', color: '#fff' }}>{scanMinutes}m {scanSeconds}s</span>
              </div>
              <div data-class-id="fake-scan-timing" style={{ 
                color: '#b0eaff', 
                fontSize: windowWidth <= 768 ? 13 : 15, 
                marginBottom: windowWidth <= 768 ? 8 : 12 
              }}>
                Items scanned <span style={{ float: 'right', color: '#fff' }}>{itemsScanned.toLocaleString()}</span>
              </div>
              <div data-class-id="fake-scan-results" style={{ 
                color: '#b0eaff', 
                fontSize: windowWidth <= 768 ? 13 : 15, 
                marginBottom: windowWidth <= 768 ? 8 : 12 
              }}>
                Threats detected <span data-class-id="urgency-pressure" style={{ 
                  float: 'right', 
                  color: scanPhase === 'escalate' || scanPhase === 'fail' ? '#dc3545' : '#fff', 
                  fontWeight: scanPhase === 'escalate' || scanPhase === 'fail' ? 700 : 400 
                }}>{threatsDetected}</span>
              </div>
              <div data-class-id="fake-scan-results" style={{ 
                color: '#b0eaff', 
                fontSize: windowWidth <= 768 ? 13 : 15, 
                marginBottom: windowWidth <= 768 ? 8 : 12 
              }}>
                PUPs detected <span style={{ float: 'right', color: '#fff' }}>{pupsDetected}</span>
              </div>
              <div data-class-id="fake-scan-results" style={{ 
                color: '#b0eaff', 
                fontSize: windowWidth <= 768 ? 13 : 15, 
                marginBottom: windowWidth <= 768 ? 8 : 12 
              }}>
                Detections ignored <span style={{ 
                  float: 'right', 
                  color: scanPhase === 'escalate' || scanPhase === 'fail' ? '#dc3545' : '#fff', 
                  fontWeight: scanPhase === 'escalate' || scanPhase === 'fail' ? 700 : 400 
                }}>{detectionsIgnored}</span>
              </div>
              <div data-class-id="fake-scan-results" style={{ 
                color: '#b0eaff', 
                fontSize: windowWidth <= 768 ? 13 : 15, 
                marginBottom: windowWidth <= 768 ? 8 : 12 
              }}>
                Detections quarantined <span style={{ float: 'right', color: '#fff' }}>{detectionsQuarantined}</span>
              </div>
              <div data-class-id="fake-scan-results" style={{ 
                color: '#b0eaff', 
                fontSize: windowWidth <= 768 ? 13 : 15, 
                marginBottom: windowWidth <= 768 ? 8 : 12 
              }}>
                Detections escaped <span style={{ 
                  float: 'right', 
                  color: scanPhase === 'escalate' || scanPhase === 'fail' ? '#dc3545' : '#fff', 
                  fontWeight: scanPhase === 'escalate' || scanPhase === 'fail' ? 700 : 400 
                }}>{detectionsEscaped}</span>
              </div>
              
              {/* Status box - green during normal scan, subtle during escalation, red during fail */}
              <div 
                data-class-id={scanPhase === 'escalate' || scanPhase === 'fail' ? 'urgency-payment-combo' : undefined}
                style={{
                  marginTop: windowWidth <= 768 ? 12 : 16,
                  flex: 1,
                  background: scanPhase === 'fail' ? '#dc3545' : scanPhase === 'escalate' ? '#2a3142' : '#28a745',
                  border: scanPhase === 'fail' ? '2px solid #dc3545' : scanPhase === 'escalate' ? '1px solid #dc3545' : '1px solid #28a745',
                  borderRadius: 8,
                  padding: windowWidth <= 768 ? '0.8rem 1rem' : '1rem 1.2rem',
                  color: '#fff',
                  textAlign: 'center',
                  animation: scanPhase === 'fail' ? 'flash 1s infinite alternate' : 'none',
                  boxShadow: scanPhase === 'fail' ? '0 0 8px rgba(220, 53, 69, 0.5)' : scanPhase === 'escalate' ? '0 2px 4px rgba(220, 53, 69, 0.2)' : '0 2px 4px rgba(40, 167, 69, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                {scanPhase === 'fail' ? (
                  <>
                    <div data-class-id="urgency-pressure" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>CRITICAL THREATS DETECTED!</div>
                    <div data-class-id="fake-upgrade-demand" style={{ fontSize: 14, marginBottom: 12 }}>
                      Free version cannot remove these threats.<br />
                      <strong>Upgrade to Malwarebytes Ultra Premium</strong> now!
                    </div>
                    <button 
                      data-class-id="fake-payment-button"
                      onClick={handleMalwarebytesRenewClick}
                      style={{
                        background: '#fff',
                        color: '#dc3545',
                        fontWeight: 700,
                        fontSize: 16,
                        borderRadius: 6,
                        padding: '0.7rem 1.5rem',
                        border: 'none',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 1000
                      }}
                    >
                      UPGRADE NOW
                    </button>
                  </>
                ) : scanPhase === 'escalate' ? (
                  <>
                    <style>{`
                      @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                      }
                      @keyframes subtleFlash {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                      }
                    `}</style>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
                      <div style={{ marginBottom: '4px' }}>Scan Compromised</div>
                      <div data-class-id="urgency-pressure" style={{ marginBottom: '8px' }}>Critical Threats Detected</div>
                      <div data-class-id="fake-upgrade-demand" style={{ fontSize: 14, fontWeight: 400, marginBottom: '12px', lineHeight: '1.4' }}>
                        Your system is under attack. Malwarebytes Free cannot remove these threats. Upgrade to Premium now.
                      </div>
                    </div>
                    <button 
                      data-class-id="urgency-payment-combo"
                      onClick={handleMalwarebytesRenewClick}
                      style={{
                        background: '#dc3545',
                        color: '#fff',
                        padding: '0.7rem 1.5rem',
                        borderRadius: 6,
                        fontSize: 16,
                        fontWeight: 700,
                        animation: 'subtleFlash 2s infinite',
                        display: 'block',
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: 'none',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1000
                      }}
                    >
                      UPGRADE TO MALWAREBYTES PREMIUM NOW
                    </button>
                  </>
                ) : (
                  <>
                    <style>{`
                      @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                      }
                      @keyframes greenFlash {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                      }
                      @keyframes redFlash {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.6; }
                      }
                    `}</style>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
                      <div style={{ display: 'block', animation: 'spin 1s linear infinite', marginBottom: '8px', fontSize: '20px' }}>⟳</div>
                      <div style={{ marginBottom: '4px' }}>System scan running</div>
                      <div style={{ fontSize: 14, fontWeight: 400 }}>threats are being quarantined as detected</div>
                    </div>
                    <div style={{ fontSize: 14 }}>
                      Your system is being protected by Malwarebytes Free
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Malwarebytes Payment Modal */}
        {showMalwarebytesPaymentModal && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10001
            }}
            data-modal="malwarebytes-payment"
            onClick={handleMalwarebytesPaymentClose}
          >
            <div 
              style={{
                background: '#1a1a1a',
                padding: '2rem',
                borderRadius: '12px',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: malwarebytesEscalation ? '3px solid #dc3545' : '3px solid #00a8ff',
                animation: malwarebytesEscalation ? 'modal-flash-red 1s infinite alternate' : 'none'
              }}
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Malwarebytes_Logo.png"
                  alt="Malwarebytes"
                  style={{
                    height: '60px',
                    maxWidth: '200px',
                    objectFit: 'contain'
                  }}
                />
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  marginTop: '1rem',
                  color: '#ffffff',
                  fontWeight: 'bold'
                }}>
                  Secure Payment
                </h2>
              </div>

              {!malwarebytesPaymentError ? (
                <form style={{ textAlign: 'left' }}>
                  {malwarebytesPaymentValidationError && (
                    <div style={{ 
                      background: '#f8d7da', 
                      color: '#721c24', 
                      border: '1px solid #f5c6cb', 
                      borderRadius: '6px', 
                      padding: '0.75rem', 
                      marginBottom: '1rem',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                       ⚠️ Please check your card information. All fields are required and must be in the correct format.
                     </div>
                  )}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Card Number</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        data-class-id="credit-card-input-trap"
                        type="text" 
                        value={malwarebytesCardNumber}
                        onChange={(e) => setMalwarebytesCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem 0.75rem 0.75rem 2.5rem', 
                          border: '2px solid #444', 
                          borderRadius: '6px', 
                          fontSize: '1rem',
                          color: '#000000',
                          backgroundColor: '#ffffff'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: 'calc(50% - 2px)',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        color: '#6c757d',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        height: '1.2rem'
                      }}>
                        💳
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Expiry Date</label>
                      <input 
                        data-class-id="credit-card-input-trap"
                        type="text" 
                        value={malwarebytesExpiryDate}
                        onChange={(e) => setMalwarebytesExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '2px solid #444', 
                          borderRadius: '6px', 
                          fontSize: '1rem',
                          color: '#000000',
                          backgroundColor: '#ffffff'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>CVV</label>
                      <input 
                        data-class-id="credit-card-input-trap"
                        type="text" 
                        value={malwarebytesCvv}
                        onChange={(e) => setMalwarebytesCvv(e.target.value)}
                        placeholder="123"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '2px solid #444', 
                          borderRadius: '6px', 
                          fontSize: '1rem',
                          color: '#000000',
                          backgroundColor: '#ffffff'
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: '#ffffff' }}>Cardholder Name</label>
                    <input 
                      data-class-id="credit-card-input-trap"
                      type="text" 
                      value={malwarebytesCardholderName}
                      onChange={(e) => setMalwarebytesCardholderName(e.target.value)}
                      placeholder="John Doe"
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '2px solid #444', 
                        borderRadius: '6px', 
                        fontSize: '1rem',
                        color: '#000000',
                        backgroundColor: '#ffffff'
                      }}
                    />
                  </div>
                  <div style={{ 
                    background: '#2a2a2a', 
                    padding: '1rem', 
                    borderRadius: '6px', 
                    marginBottom: '1.5rem',
                    border: '1px solid #444'
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffffff' }}>Order Summary:</div>
                    <div data-class-id="fake-product-pricing" style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', marginBottom: '0.5rem' }}>
                      <span>Malwarebytes Premium (1 year)</span>
                      <span style={{ textDecoration: 'line-through', color: '#6c757d' }}>
                        $194.99
                      </span>
                    </div>
                    <div data-class-id="fake-special-offer" style={{ display: 'flex', justifyContent: 'space-between', color: '#28a745', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#28a745', fontWeight: 'bold' }}>Urgency Discount: 51% OFF</span>
                      <span style={{ color: '#28a745', fontWeight: 'bold' }}>-$100.00</span>
                    </div>
                    <div data-class-id="fake-total-pricing" style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      color: '#ffffff', 
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderTop: '1px solid #444',
                      paddingTop: '0.5rem'
                    }}>
                      <span>Total:</span>
                      <span style={{ color: '#00a8ff' }}>
                        $94.99
                      </span>
                    </div>
                  </div>
                  <style>{`
                    @keyframes pay-button-flash {
                      0% { background: #00a8ff; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
                      50% { background: #0097e6; box-shadow: 0 4px 12px rgba(0,168,255,0.4); }
                      100% { background: #00a8ff; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
                    }
                    @keyframes modal-flash-red {
                      0% { border-color: #dc3545; box-shadow: 0 8px 32px rgba(220, 53, 69, 0.3); }
                      100% { border-color: #ff6b6b; box-shadow: 0 8px 32px rgba(255, 107, 107, 0.5); }
                    }
                    @keyframes header-button-flash {
                      0% { background: #dc3545; box-shadow: 0 2px 8px rgba(220, 53, 69, 0.4); }
                      100% { background: #ff6b6b; box-shadow: 0 4px 12px rgba(255, 107, 107, 0.6); }
                    }
                  `}</style>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      data-class-id="fake-payment-cancel-button"
                      type="button" 
                      onClick={handleMalwarebytesPaymentClose}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem', 
                        border: '2px solid #6c757d', 
                        borderRadius: '6px', 
                        background: '#2a2a2a', 
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      data-class-id="fake-payment-button"
                      type="button" 
                      onClick={handleMalwarebytesPaymentSubmit}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem', 
                        border: 'none', 
                        borderRadius: '6px', 
                        background: '#00a8ff', 
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        animation: 'pay-button-flash 1.5s infinite'
                      }}
                    >
                      Pay $94.99
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#f8d7da', 
                    color: '#721c24', 
                    border: '1px solid #f5c6cb', 
                    borderRadius: '6px', 
                    padding: '1rem', 
                    marginBottom: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    ❌ Transaction Declined
                  </div>
                  <p style={{ marginBottom: '1rem', fontSize: '1rem', color: '#ffffff' }}>
                    Your payment was declined. This could be due to insufficient funds, card restrictions, or security measures.
                  </p>
                  <p style={{ marginBottom: '1.5rem', fontSize: '1rem', color: '#ffffff' }}>
                    Please try a different credit card or debit card to complete your purchase.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      data-class-id="fake-payment-close-button"
                      onClick={handleMalwarebytesPaymentClose}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem', 
                        border: '2px solid #6c757d', 
                        borderRadius: '6px', 
                        background: '#2a2a2a', 
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Close
                    </button>
                    <button 
                      data-class-id="fake-payment-retry-button"
                      onClick={() => setMalwarebytesPaymentError(false)}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem', 
                        border: 'none', 
                        borderRadius: '6px', 
                        background: '#00a8ff', 
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      Try Different Card
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ANCC Scareware (Copyright Legal Threats)
  const anccMinutes = Math.floor(anccCountdown / 60).toString().padStart(2, '0');
  const anccSeconds = (anccCountdown % 60).toString().padStart(2, '0');
  const currentYear = new Date().getFullYear();
  
  if (currentPhase === 'generic') {
    return (
      <>
        <style>
          {`
            @keyframes flash {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0.3; }
            }
          `}
        </style>
        <div className="scareware-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1a365d, #2d3748, #1a365d)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Georgia, "Times New Roman", serif',
        overflow: window.innerWidth <= 768 ? 'auto' : 'hidden'
      }}>
        {/* Fake Browser Search Bar - Government Style */}
        {isFullscreen && (
        <div 
          data-class-id="fake-browser-bar"
          style={{
            background: '#1a365d',
            borderBottom: '2px solid #e2e8f0',
            padding: window.innerWidth <= 768 ? '6px 8px' : '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: window.innerWidth <= 768 ? '4px' : '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          {/* Government-style address bar */}
          <div style={{
            flex: 1,
            background: '#2d3748',
            border: '1px solid #4a5568',
            borderRadius: '4px',
            padding: window.innerWidth <= 768 ? '6px 8px' : '8px 12px',
            fontSize: window.innerWidth <= 768 ? '12px' : '14px',
            color: '#fff',
            textAlign: 'left',
            marginLeft: '0px',
            marginRight: window.innerWidth <= 768 ? '8px' : '12px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ color: '#f7fafc', marginRight: window.innerWidth <= 768 ? '4px' : '8px', fontSize: window.innerWidth <= 768 ? '12px' : '16px' }}>🏛️</span>
            <span 
              data-class-id="fake-url"
              style={{
                cursor: 'help',
                transition: 'color 0.2s ease',
                fontFamily: 'monospace',
                fontSize: window.innerWidth <= 768 ? '10px' : '14px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#63b3ed';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#fff';
              }}
            >
              {window.innerWidth <= 768 ? 'oceb.official/legal-notice' : 'https://oceb.official/legal-notice/copyright-violation'}
            </span>
          </div>
          {window.innerWidth > 768 && (
          <div style={{
            width: '60px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2px'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
            >
              −
            </div>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
            >
              □
            </div>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
            >
              ×
            </div>
          </div>
          )}
          <div style={{
            width: window.innerWidth <= 768 ? '14px' : '18px',
            height: window.innerWidth <= 768 ? '14px' : '18px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: window.innerWidth <= 768 ? '8px' : '10px',
            fontWeight: 'bold',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
          }}
          >
            🔒
          </div>
        </div>
        )}
        
        <div style={{ 
          flex: 1,
          display: 'flex',
          alignItems: window.innerWidth <= 768 ? 'flex-start' : 'center',
          justifyContent: 'center',
          overflowY: 'auto',
          padding: window.innerWidth <= 768 ? '0.5rem 0' : '1.5rem 0'
        }}>
        <div style={{ 
          maxWidth: '1200px', 
          padding: window.innerWidth <= 768 ? '0.5rem' : '1.5rem', 
          margin: '0 auto',
          width: '100%',
          minHeight: window.innerWidth <= 768 ? 'auto' : 'auto'
        }}>
                    {/* Official Government Header */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: window.innerWidth <= 768 ? '0.5rem' : '0',
            marginBottom: window.innerWidth <= 768 ? '1.5rem' : '3rem',
            borderBottom: '3px solid #e2e8f0',
            paddingBottom: window.innerWidth <= 768 ? '1rem' : '2rem'
          }}>
            <h1 style={{ 
              fontSize: window.innerWidth <= 768 ? '1.8rem' : '3rem', 
              margin: '0',
              color: '#f7fafc',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: window.innerWidth <= 768 ? '1rem' : '2rem',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: window.innerWidth <= 768 ? '1rem' : '2rem' }}>
                <span style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2.5rem' }}>🏛️</span>
                ONLINE COPYRIGHT
                <span style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2.5rem' }}>🏛️</span>
              </div>
              <div style={{ fontSize: window.innerWidth <= 768 ? '1.6rem' : '2.8rem', marginTop: window.innerWidth <= 768 ? '-0.8rem' : '-1.2rem' }}>
                ENFORCEMENT BUREAU
              </div>
            </h1>
 
          </div>
          
          {/* Legal Action Required Banner - Full Width */}
          <h2 data-class-id="fake-legal-threat" style={{ 
            fontSize: window.innerWidth <= 768 ? '1.4rem' : '2.2rem', 
            marginBottom: '0.5rem', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            textAlign: 'center',
            color: '#fed7d7',
            fontWeight: 'bold',
            border: '2px solid #e53e3e',
            padding: window.innerWidth <= 768 ? '1rem' : '1.5rem',
            borderRadius: '8px',
            background: 'rgba(229, 62, 62, 0.1)',
            width: '100%'
          }}>
            ⚠️ LEGAL ACTION REQUIRED ⚠️
          </h2>
          <div data-class-id="fake-legal-consequences" style={{ 
            textAlign: 'center',
            marginBottom: window.innerWidth <= 768 ? '1.5rem' : '2rem',
            color: '#fed7d7',
            fontSize: window.innerWidth <= 768 ? '1rem' : '1.3rem',
            fontStyle: 'italic',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
          }}>
            Final warning before federal prosecution
          </div>
          
          {/* Main Content Area - Two Column Layout */}
          <div style={{ 
            display: 'flex', 
            gap: window.innerWidth <= 768 ? '1rem' : '2rem', 
            marginBottom: window.innerWidth <= 768 ? '2rem' : '3rem',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
          }}>
            {/* Left Column - Violation Details */}
            <div style={{ flex: window.innerWidth <= 768 ? 'none' : 1 }}>
              
              <div data-class-id="fake-legal-threat" style={{ 
                background: 'rgba(26, 54, 93, 0.8)', 
                border: '2px solid #e2e8f0',
                padding: window.innerWidth <= 768 ? '1.5rem' : '2rem', 
                borderRadius: '12px',
                minHeight: window.innerWidth <= 768 ? 'auto' : '320px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}>
                <div style={{ 
                  borderBottom: '2px solid #e2e8f0', 
                  paddingBottom: '1rem', 
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  <strong style={{ color: '#f7fafc', fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', fontWeight: 'bold' }}>CASE INFORMATION</strong>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <strong data-class-id="fake-case-number" style={{ color: '#63b3ed', fontSize: window.innerWidth <= 768 ? '1rem' : '1.3rem', display: 'block', marginBottom: '0.5rem' }}>Case Number:</strong>
                      <span style={{ color: '#f7fafc', fontSize: window.innerWidth <= 768 ? '0.9rem' : '1.2rem', fontFamily: 'monospace' }}>OCEB-{currentYear}-847392</span>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <strong style={{ color: '#f7fafc', fontSize: window.innerWidth <= 768 ? '1rem' : '1.3rem', display: 'block', marginBottom: '0.5rem' }}>Violation:</strong>
                      <span data-class-id="fake-legal-consequences" style={{ color: '#f7fafc', fontSize: window.innerWidth <= 768 ? '0.9rem' : '1.1rem' }}>Unauthorized downloading of copyrighted material</span>
                    </div>
                  </div>
                  <div style={{ 
                    background: 'rgba(229, 62, 62, 0.2)', 
                    border: '1px solid #e53e3e', 
                    padding: window.innerWidth <= 768 ? '0.75rem' : '1rem', 
                    borderRadius: '8px',
                    marginTop: 'auto'
                  }}>
                    <strong data-class-id="fake-legal-consequences" style={{ color: '#fed7d7', fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem', display: 'block', marginBottom: '0.5rem' }}>Maximum Penalties:</strong>
                    <span style={{ color: '#fed7d7', fontSize: window.innerWidth <= 768 ? '0.9rem' : '1.1rem' }}>$250,000 fine and 5 years federal imprisonment</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Settlement Offer */}
            <div style={{ flex: window.innerWidth <= 768 ? 'none' : 1 }}>
              <div 
                data-class-id="urgency-payment-combo"
                style={{ 
                  background: 'rgba(26, 54, 93, 0.8)', 
                  border: '2px solid #e2e8f0',
                  padding: window.innerWidth <= 768 ? '1.5rem' : '2rem', 
                  borderRadius: '12px',
                  minHeight: window.innerWidth <= 768 ? 'auto' : '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <div style={{ 
                  borderBottom: '2px solid #e2e8f0', 
                  paddingBottom: '1rem', 
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  <strong style={{ color: '#f7fafc', fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', fontWeight: 'bold' }}>SETTLEMENT OFFER</strong>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                      <strong data-class-id="fake-settlement-offer" style={{ color: '#f7fafc', fontSize: window.innerWidth <= 768 ? '1rem' : '1.3rem', display: 'block', marginBottom: '0.5rem' }}>Amount:</strong>
                      <span style={{ color: '#22c55e', fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.2rem', fontWeight: 'bold' }}>$1,500</span>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <strong style={{ color: '#f7fafc', fontSize: window.innerWidth <= 768 ? '1rem' : '1.3rem', display: 'block', marginBottom: '0.5rem' }}>Terms:</strong>
                      <span style={{ color: '#f7fafc', fontSize: window.innerWidth <= 768 ? '0.9rem' : '1.1rem' }}>This settlement will resolve all pending legal action</span>
                    </div>
                  </div>
                  <div style={{ 
                    background: 'rgba(34, 197, 94, 0.2)', 
                    border: '1px solid #22c55e', 
                    padding: window.innerWidth <= 768 ? '1.25rem 0.625rem' : '1.625rem 0.8125rem', 
                    borderRadius: '8px',
                    marginTop: 'auto'
                  }}>
                    <strong data-class-id="fake-deadline-threat" style={{ color: '#fed7d7', fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem', display: 'block', marginBottom: window.innerWidth <= 768 ? '0.25rem' : '0.3125rem' }}>Settlement Deadline:</strong>
                    <span style={{ 
                      color: anccCountdown <= 300 ? '#ff6b6b' : '#fed7d7', 
                      fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem',
                      fontWeight: anccCountdown <= 300 ? 'bold' : 'normal',
                      animation: anccCountdown <= 300 ? 'flash 1s infinite' : 'none'
                    }}>
                      Expires in {anccMinutes}:{anccSeconds}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Full Width */}
          <div style={{ textAlign: 'center' }}>
            <button 
              data-class-id="fake-payment-button"
              className="button button-success" 
              onClick={() => {}}
              style={{ 
                fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.4rem', 
                padding: window.innerWidth <= 768 ? '1rem 2rem' : '1.5rem 3rem',
                background: 'linear-gradient(135deg, #1a365d, #2d3748)',
                border: '3px solid #e2e8f0',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                fontWeight: 'bold',
                color: '#f7fafc',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'Georgia, "Times New Roman", serif',
                textTransform: 'uppercase',
                letterSpacing: window.innerWidth <= 768 ? '0.5px' : '1px',
                width: window.innerWidth <= 768 ? '100%' : 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.6)';
                e.currentTarget.style.borderColor = '#f7fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              Pay Official Settlement - $1,500
            </button>
          </div>
        </div>
        </div>
      </div>
      </>
    );
  }

  // Advanced Scareware (Tech Support Scam)
  if (currentPhase === 'advanced') {
    return (
      <>
        <div className="scareware-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, #ff0000, #8b0000, #ff0000)`,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          animation: 'flash 0.3s infinite alternate'
        }}>
          <div style={{ maxWidth: '800px', padding: '2rem' }}>
            <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>🖥️</div>
            {/* Microsoft Logo */}
            <div style={{ 
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png"
                alt="Microsoft"
                style={{
                  height: '60px',
                  maxWidth: '200px',
                  objectFit: 'contain'
                }}
              />
            </div>
            
            <h1 data-class-id="fake-tech-support-claim" style={{ 
              fontSize: '3rem', 
              marginBottom: '2rem', 
              textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
              animation: 'shake 0.5s infinite',
              fontFamily: 'Segoe UI, Arial, sans-serif'
            }}>
              Technical Support
            </h1>
            
            <div data-class-id="fake-system-error" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
              <strong>🚨 CRITICAL SYSTEM ERROR DETECTED 🚨</strong>
            </div>
            
            <div style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
              Your computer has been infected with <strong data-class-id="fake-system-error">multiple viruses</strong>
              <br />
              <strong data-class-id="fake-system-error">Windows registry corrupted</strong> - system failure imminent
              <br />
              <strong>Personal data at risk</strong> - <span data-class-id="urgency-pressure">immediate action required</span>
              <br />
              <strong data-class-id="fake-tech-support-claim">Microsoft support team</strong> is ready to help you
            </div>

            <div 
              data-class-id="urgency-payment-combo"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                padding: '2rem', 
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '4px solid #fff',
                boxShadow: '0 12px 48px rgba(0,0,0,0.7)'
              }}
            >
              <div data-class-id="fake-tech-support-claim" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                <strong>🔧 IMMEDIATE TECHNICAL SUPPORT</strong>
              </div>
              <div style={{ fontSize: '1.3rem' }}>
                <strong data-class-id="fake-tech-support-claim">Call Microsoft Support:</strong> 1-800-MICROSOFT
                <br />
                <strong>Or pay $199.99</strong> for instant remote repair
                <br />
                <em data-class-id="urgency-pressure">Limited time offer - system may crash soon</em>
                <br />
                <span style={{ fontSize: '0.9rem', color: '#ffffff' }}>Microsoft® is a registered trademark of Microsoft Corporation</span>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button 
                data-class-id="urgency-payment-combo"
                className="button button-success" 
                onClick={() => {}}
                style={{ 
                  fontSize: '1.3rem', 
                  padding: '1rem 2rem', 
                  marginRight: '1rem',
                  background: '#ff0000',
                  border: '3px solid #fff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  fontWeight: 'bold'
                }}
              >
                🔧 Get Remote Support - $199.99
              </button>
              <button 
                className="button button-secondary" 
                onClick={() => {}}
                style={{ 
                  fontSize: '1.3rem', 
                  padding: '1rem 2rem',
                  background: 'rgba(255,255,255,0.2)',
                  border: '3px solid #fff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}
              >
                Call Support Now
              </button>
            </div>
          </div>
        </div>

        {/* Multiple persistent popups */}
        <div 
          data-class-id="fake-system-warning"
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            background: 'white',
            border: '4px solid #ff0000',
            borderRadius: '12px',
            padding: '1.5rem',
            zIndex: 20000,
            boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
            animation: 'shake 0.3s infinite',
            maxWidth: '300px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
            <div data-class-id="fake-system-warning" style={{ fontWeight: 'bold', color: '#ff0000', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
              SYSTEM ERROR!
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              <span data-class-id="fake-system-error">Windows registry corrupted</span>
              <br />
              <strong data-class-id="fake-tech-support-claim">Call Microsoft Support</strong>
            </div>
          </div>
        </div>

        <div 
          data-class-id="fake-system-warning"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'white',
            border: '4px solid #ff0000',
            borderRadius: '12px',
            padding: '1.5rem',
            zIndex: 20000,
            boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
            animation: 'shake 0.4s infinite',
            maxWidth: '300px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚨</div>
            <div data-class-id="fake-system-warning" style={{ fontWeight: 'bold', color: '#ff0000', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
              VIRUS DETECTED!
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              <span data-class-id="fake-threat-count">47 viruses found</span>
              <br />
              <strong data-class-id="urgency-pressure">Immediate action required</strong>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Extreme Scareware (Ransomware Attack)
  if (currentPhase === 'extreme') {
    return (
      <>
        <div className="browser-hijacking-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, #ff0000, #8b0000, #ff0000)`,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          animation: 'flash 0.2s infinite alternate'
        }}>
          <div style={{ maxWidth: '800px', padding: '2rem' }}>
            <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>🔒</div>
            <h1 data-class-id="fake-ransomware-threat" style={{ 
              fontSize: '5rem', 
              marginBottom: '2rem', 
              textShadow: '4px 4px 8px rgba(0,0,0,0.9)',
              animation: 'shake 0.3s infinite'
            }}>
              RANSOMWARE ATTACK!
            </h1>
            
            <div data-class-id="fake-ransomware-threat" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
              <strong data-class-id="fake-ransomware-threat">🚨 ALL FILES ENCRYPTED 🚨</strong>
            </div>
            
            <div data-class-id="fake-ransomware-threat" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>
              <strong data-class-id="fake-file-count">2,847 files</strong> have been encrypted
              <br />
              <strong>Photos, documents, videos</strong> - all locked
              <br />
              <strong>Banking data compromised</strong>
              <br />
              <strong>Personal information stolen</strong>
              <br />
              <strong data-class-id="urgency-pressure">Pay ransom or lose everything forever!</strong>
            </div>

            <div 
              data-class-id="urgency-payment-combo"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                padding: '2rem', 
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '4px solid #fff',
                boxShadow: '0 12px 48px rgba(0,0,0,0.7)'
              }}
            >
              <div data-class-id="fake-cryptocurrency-demand" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                <strong data-class-id="fake-cryptocurrency-demand">💰 PAY RANSOM TO RECOVER FILES</strong>
              </div>
              <div data-class-id="fake-cryptocurrency-demand" style={{ fontSize: '1.5rem' }}>
                <strong>Amount: $500 USD</strong> (Bitcoin only)
                <br />
                <strong data-class-id="fake-deadline-threat">Deadline: 24 hours</strong>
                <br />
                <em data-class-id="fake-deadline-threat">After deadline, decryption key will be destroyed</em>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button 
                data-class-id="fake-payment-button"
                className="button button-success scareware-button" 
                onClick={() => {}}
                style={{ 
                  fontSize: '1.5rem', 
                  padding: '1.5rem 3rem', 
                  marginRight: '2rem',
                  background: '#ff0000',
                  border: '4px solid #fff',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                  borderRadius: '8px',
                  fontWeight: 'bold'
                }}
              >
                �� Pay Ransom - $500
              </button>
              <button 
                className="button button-secondary scareware-button" 
                onClick={() => {}}
                style={{ 
                  fontSize: '1.5rem', 
                  padding: '1.5rem 3rem',
                  background: 'rgba(255,255,255,0.2)',
                  border: '4px solid #fff',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                  borderRadius: '8px'
                }}
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Multiple extreme popups */}
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'white',
          border: '5px solid #ff0000',
          borderRadius: '12px',
          padding: '1.5rem',
          zIndex: 20000,
          boxShadow: '0 16px 64px rgba(0,0,0,0.8)',
          animation: 'shake 0.2s infinite',
          maxWidth: '300px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔒</div>
            <div data-class-id="fake-ransomware-threat" style={{ fontWeight: 'bold', color: '#ff0000', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
              FILES ENCRYPTED!
            </div>
            <div data-class-id="fake-ransomware-threat" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              <span data-class-id="fake-file-count">2,847 files locked</span>
              <br />
              <strong>Pay ransom to decrypt</strong>
            </div>
          </div>
        </div>

        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'white',
          border: '5px solid #ff0000',
          borderRadius: '12px',
          padding: '1.5rem',
          zIndex: 20000,
          boxShadow: '0 16px 64px rgba(0,0,0,0.8)',
          animation: 'shake 0.3s infinite',
          maxWidth: '300px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💸</div>
            <div data-class-id="fake-cryptocurrency-demand" style={{ fontWeight: 'bold', color: '#ff0000', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
              PAY RANSOM!
            </div>
            <div data-class-id="fake-cryptocurrency-demand" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              $500 Bitcoin required
              <br />
              <strong data-class-id="fake-deadline-threat">24 hour deadline</strong>
            </div>
          </div>
        </div>

        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'white',
          border: '5px solid #ff0000',
          borderRadius: '12px',
          padding: '1.5rem',
          zIndex: 20000,
          boxShadow: '0 16px 64px rgba(0,0,0,0.8)',
          animation: 'shake 0.4s infinite',
          maxWidth: '300px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚨</div>
            <div data-class-id="urgency-pressure" style={{ fontWeight: 'bold', color: '#ff0000', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
              TIME RUNNING OUT!
            </div>
            <div data-class-id="urgency-pressure" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              <span data-class-id="fake-deadline-threat">Decryption key expires soon</span>
              <br />
              <strong>Pay now or lose files</strong>
            </div>
          </div>
        </div>

        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'white',
          border: '5px solid #ff0000',
          borderRadius: '12px',
          padding: '1.5rem',
          zIndex: 20000,
          boxShadow: '0 16px 64px rgba(0,0,0,0.8)',
          animation: 'shake 0.5s infinite',
          maxWidth: '300px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💀</div>
            <div style={{ fontWeight: 'bold', color: '#ff0000', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
              NO ESCAPE!
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              System completely locked
              <br />
              <strong>Payment is only option</strong>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
  };
  
  export default ScarewareCollection; 