import { useState } from 'react';

interface UseSafeModeOptions {
  forceFullscreen?: boolean;
  preventEscape?: boolean;
  preventTabSwitch?: boolean;
  preventMouseEvents?: boolean;
  preventWindowControl?: boolean;
  delayStart?: number;
  safeMode?: boolean;
}

export const useSafeMode = (options: UseSafeModeOptions = {}) => {
  // In safe mode, we don't apply any hijacking techniques
  // We just return the same interface for consistency
  const [blockedAttempts] = useState(0);
  const [isFullscreen] = useState(false);

  return {
    blockedAttempts,
    isFullscreen,
    resetBlockedAttempts: () => {} // No-op in safe mode
  };
}; 