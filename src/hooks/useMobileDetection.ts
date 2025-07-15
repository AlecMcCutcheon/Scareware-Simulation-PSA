import { useState, useEffect } from 'react';

interface MobileDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  userAgent: string;
}

export function useMobileDetection(): MobileDetectionResult {
  const [detection, setDetection] = useState<MobileDetectionResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    userAgent: ''
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
      
      // Check for touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Mobile detection patterns
      const mobilePatterns = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
        /Mobile/i,
        /CriOS/i, // Chrome on iOS
        /FxiOS/i  // Firefox on iOS
      ];
      
      // Tablet detection patterns
      const tabletPatterns = [
        /iPad/i,
        /Android(?!.*Mobile)/i, // Android but not Mobile
        /Tablet/i
      ];
      
      // Check if it's a mobile device
      const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent));
      
      // Check if it's a tablet
      const isTablet = tabletPatterns.some(pattern => pattern.test(userAgent));
      
      // Check screen size (fallback method)
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isSmallScreen = screenWidth <= 768 || screenHeight <= 768;
      
      // Determine device type
      let deviceType = 'desktop';
      if (isMobile || (isTouchDevice && isSmallScreen)) {
        deviceType = 'mobile';
      } else if (isTablet || (isTouchDevice && screenWidth <= 1024)) {
        deviceType = 'tablet';
      }
      
      setDetection({
        isMobile: deviceType === 'mobile',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop',
        isTouchDevice,
        userAgent
      });
    };

    // Initial detection
    detectDevice();
    
    // Re-detect on resize
    const handleResize = () => {
      detectDevice();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return detection;
} 