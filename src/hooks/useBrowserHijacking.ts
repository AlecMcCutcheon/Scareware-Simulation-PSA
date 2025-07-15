import React, { useState, useEffect } from 'react';
import $ from 'jquery';

// Make jQuery available globally for console testing
(window as any).$ = $;

interface UseBrowserHijackingOptions {
  forceFullscreen?: boolean;
  preventEscape?: boolean;
  preventTabSwitch?: boolean;
  preventMouseEvents?: boolean;
  preventWindowControl?: boolean;
  safeMode?: boolean; // If true, disables all hijacking techniques
}

export const useBrowserHijacking = (options: UseBrowserHijackingOptions = {}) => {
  const {
    forceFullscreen = true,
    preventEscape = true,
    preventTabSwitch = true,
    preventMouseEvents = true,
    preventWindowControl = true,
    safeMode = false
  } = options;

  const [blockedAttempts, setBlockedAttempts] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Store interval references for cleanup
  const intervalRefs = React.useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // If in safe mode, don't apply any hijacking techniques
    if (safeMode) {
      return () => {};
    }
    
    // Add fullscreen change listener to update isFullscreen state
    const handleFullscreenChange = () => {
      const isInFullscreen = !!(document.fullscreenElement || 
                                (document as any).webkitFullscreenElement || 
                                (document as any).mozFullScreenElement || 
                                (document as any).msFullscreenElement);
      setIsFullscreen(isInFullscreen);
    };

    // Add listeners for all fullscreen change events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    // Check initial fullscreen state
    handleFullscreenChange();
    
    // REAL SCAREWARE BYPASS TECHNIQUES:
    
    // 1. Fake user interaction events to bypass security restrictions
    const createFakeUserInteraction = () => {
      // Real scareware technique: Create more realistic fake events
      const fakeClick = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: Math.random() * window.innerWidth,
        clientY: Math.random() * window.innerHeight,
        button: 0,
        buttons: 1
      });
      
      const fakeMouseDown = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: Math.random() * window.innerWidth,
        clientY: Math.random() * window.innerHeight,
        button: 0,
        buttons: 1
      });
      
      const fakeMouseUp = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: Math.random() * window.innerWidth,
        clientY: Math.random() * window.innerHeight,
        button: 0,
        buttons: 1
      });
      
      // Real scareware technique: Dispatch events on document element instead of document
      document.documentElement.dispatchEvent(fakeClick);
      document.documentElement.dispatchEvent(fakeMouseDown);
      document.documentElement.dispatchEvent(fakeMouseUp);
      
      // Real scareware technique: Also try body element
      document.body.dispatchEvent(fakeClick);
      document.body.dispatchEvent(fakeMouseDown);
      document.body.dispatchEvent(fakeMouseUp);
    };
    
    // 2. Real scareware technique: Force fullscreen using cross-browser approach
    const maxWindow = () => {
      try {
        // Real scareware technique: Try cross-browser fullscreen API
        // Only try if not already in fullscreen
        if (!document.fullscreenElement && 
            !(document as any).webkitFullscreenElement && 
            !(document as any).mozFullScreenElement && 
            !(document as any).msFullscreenElement) {
          
          if ((document.documentElement as any).requestFullScreen) {
            (document.documentElement as any).requestFullScreen();
          } else if ((document.documentElement as any).mozRequestFullScreen) { /* Firefox */
            (document.documentElement as any).mozRequestFullScreen();
          } else if ((document.documentElement as any).webkitRequestFullScreen) { /* Chrome, Safari & Opera */
            (document.documentElement as any).webkitRequestFullScreen((Element as any).ALLOW_KEYBOARD_INPUT);
          } else if ((document.documentElement as any).msRequestFullscreen) { /* IE/Edge */
            (document.documentElement as any).msRequestFullscreen();
          }
        }
        
        setIsFullscreen(true);
      } catch (error) {
        // Silent error handling
      }
    };

    const restoreWindow = () => {
      // Real scareware technique: Exit fullscreen mode
      try {
        // Exit fullscreen using the appropriate API
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
        
        console.log('✅ Exited fullscreen mode'); // Debug log
      } catch (error) {
        console.log('❌ Fullscreen exit failed:', error); // Debug log
      }
      
      setIsFullscreen(false);
    };

    const isWindowMaximized = () => {
      // Check if window is in fullscreen mode using the fullscreen API
      return Boolean(document.fullscreenElement || 
                (document as any).webkitFullscreenElement || 
                (document as any).mozFullScreenElement || 
                (document as any).msFullscreenElement);
    };

    const forceFullscreenMode = async (userInitiated = false) => {
      if (!forceFullscreen) return;
      
      // Real scareware technique: Maximize window instead of requesting fullscreen
      // Always try to maximize when called, regardless of userInitiated flag
      maxWindow();
    };

    // 3. Real scareware technique: Prevent exiting maximized window with aggressive re-entry
    const preventFullscreenExit = () => {
      if (!forceFullscreen) return;
      
      // If user restores window, immediately try to maximize it back
      if (!isWindowMaximized()) {
        // Real scareware technique: Multiple rapid maximize attempts
        maxWindow();
        setTimeout(() => maxWindow(), 10);
        setTimeout(() => maxWindow(), 50);
        setTimeout(() => maxWindow(), 100);
        setTimeout(() => maxWindow(), 200);
        setTimeout(() => maxWindow(), 500);
      }
    };

    // 4. Real scareware technique: Block ALL escape methods and force fullscreen back
    const preventEscapeKeys = (e: KeyboardEvent) => {
      if (!preventEscape) return;
      
      // Block all common escape keys and function keys
      if (e.key === 'Escape' || e.key === 'F11' || e.key === 'F5' || e.key === 'F12' || 
          e.key === 'F1' || e.key === 'F2' || e.key === 'F3' || e.key === 'F4' ||
          e.key === 'F6' || e.key === 'F7' || e.key === 'F8' || e.key === 'F9' || e.key === 'F10') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setBlockedAttempts(prev => prev + 1);
        
        // Real scareware technique: Trigger fullscreen immediately when escape is pressed
        maxWindow();
        setTimeout(() => maxWindow(), 10);
        setTimeout(() => maxWindow(), 50);
        return false;
      }
    };

    const preventAltF4 = (e: KeyboardEvent) => {
      if (!preventEscape) return;
      
      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setBlockedAttempts(prev => prev + 1);
        
        // Real scareware technique: Force fullscreen back after user interaction
        forceFullscreenMode(true);
        return false;
      }
    };

    const preventCtrlW = (e: KeyboardEvent) => {
      if (!preventEscape) return;
      
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setBlockedAttempts(prev => prev + 1);
        
        // Real scareware technique: Force fullscreen back after user interaction
        forceFullscreenMode(true);
        return false;
      }
    };

    const preventCtrlShiftW = (e: KeyboardEvent) => {
      if (!preventEscape) return;
      
      if (e.ctrlKey && e.shiftKey && e.key === 'W') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setBlockedAttempts(prev => prev + 1);
        
        // Real scareware technique: Force fullscreen back after user interaction
        forceFullscreenMode(true);
        return false;
      }
    };

    const preventAltTab = (e: KeyboardEvent) => {
      if (!preventEscape) return;
      
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setBlockedAttempts(prev => prev + 1);
        
        // Real scareware technique: Force fullscreen back after user interaction
        forceFullscreenMode(true);
        return false;
      }
    };

    const preventCtrlAltDelete = (e: KeyboardEvent) => {
      if (!preventEscape) return;
      
      if (e.ctrlKey && e.altKey && e.key === 'Delete') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setBlockedAttempts(prev => prev + 1);
        
        // Real scareware technique: Force fullscreen back after user interaction
        forceFullscreenMode(true);
        return false;
      }
    };

    // 5. Real scareware technique: Allow right-click context menu (disabled for user experience)
    // Completely remove preventRightClick and do not register any contextmenu event listeners

    // 6. Real scareware technique: Prevent all mouse events outside the overlay - BUT ALLOW SIMULATION CONTROLS
    const preventMouseEvents = (e: MouseEvent) => {
      if (!preventMouseEvents) return;
      // Only block actual click/press events, not hover or pointer movement
      if (e.type !== 'click' && e.type !== 'mousedown' && e.type !== 'mouseup') {
        return; // Allow hover, mousemove, mouseover, mouseout, pointer events, etc.
      }
      const target = e.target as Element;
      
      // Handle fake events that don't have proper target elements
      if (!target || typeof target.closest !== 'function') {
        return; // Allow fake events to pass through
      }
      
      // ALLOW simulation controls and safe zones - improved detection
      if (target.closest('.simulation-controls') || 
          target.closest('.safe-zone') ||
          target.closest('.escape-controls') ||
          target.closest('.educational-overlay') ||
          target.closest('[data-no-drag]') ||
          target.hasAttribute('data-no-drag') ||
          target.closest('button')?.closest('.simulation-controls') ||
          target.closest('[data-button-index]') ||
          target.hasAttribute('data-button-index') ||
          // Additional check for simulation controls by styling and position
          (target as HTMLElement).style?.zIndex === '99999' ||
          (target as HTMLElement).style?.zIndex === '100000' ||
          target.closest('[style*="z-index: 99999"]') ||
          target.closest('[style*="z-index: 100000"]')) {
        return; // Allow these elements to work normally
      }
      
      // Block events outside scareware overlays
      if (!target.closest('.scareware-overlay') && 
          !target.closest('.fullscreen-overlay') && 
          !target.closest('.browser-hijacking-overlay')) {
        e.preventDefault();
        e.stopPropagation();
        setBlockedAttempts(prev => prev + 1);
        return false;
      }
    };

    // 7. Real scareware technique: Prevent window focus loss with fake interactions
    const preventBlur = () => {
      if (!preventWindowControl) return;
      
      // Real scareware technique: Create fake user interaction and multiple focus attempts
      createFakeUserInteraction();
      window.focus();
      setTimeout(() => {
        createFakeUserInteraction();
        window.focus();
      }, 10);
      setTimeout(() => {
        createFakeUserInteraction();
        window.focus();
      }, 50);
      setTimeout(() => {
        createFakeUserInteraction();
        window.focus();
      }, 100);
      setBlockedAttempts(prev => prev + 1);
    };

    // 8. Real scareware technique: Prevent tab switching with aggressive title changes and fake interactions
    const preventTabSwitch = () => {
      if (!preventTabSwitch) return;
      
      if (document.hidden) {
        document.title = '🚨 CRITICAL SYSTEM ALERT - RETURN IMMEDIATELY 🚨';
        
        // Real scareware technique: Create fake user interaction and multiple focus attempts
        createFakeUserInteraction();
        window.focus();
        setTimeout(() => {
          createFakeUserInteraction();
          window.focus();
        }, 10);
        setTimeout(() => {
          createFakeUserInteraction();
          window.focus();
        }, 50);
        
        setTimeout(() => {
          if (document.hidden) {
            document.title = '⚠️ YOUR COMPUTER IS BEING HACKED ⚠️';
            createFakeUserInteraction();
            window.focus();
            setTimeout(() => {
              createFakeUserInteraction();
              window.focus();
            }, 10);
            setTimeout(() => {
              createFakeUserInteraction();
              window.focus();
            }, 50);
            
            setTimeout(() => {
              if (document.hidden) {
                document.title = '💀 SYSTEM COMPROMISED - IMMEDIATE ACTION REQUIRED 💀';
                // Real scareware technique: Aggressive focus attempts with fake interactions
                createFakeUserInteraction();
                window.focus();
                setTimeout(() => {
                  createFakeUserInteraction();
                  window.focus();
                }, 10);
                setTimeout(() => {
                  createFakeUserInteraction();
                  window.focus();
                }, 50);
                setTimeout(() => {
                  createFakeUserInteraction();
                  window.focus();
                }, 100);
                setTimeout(() => {
                  createFakeUserInteraction();
                  window.focus();
                }, 200);
              }
            }, 1000);
          }
        }, 1000);
      }
    };

    // 9. Real scareware technique: Prevent window resizing and moving with fake interactions
    // DISABLED: This was causing window resizing issues when exiting fullscreen
    const preventResize = () => {
      // Disabled to prevent window resizing conflicts
      return;
    };

    // 10. Real scareware technique: Continuous window maximization enforcement
    const startContinuousFullscreenEnforcement = () => {
      const continuousFullscreenCheck = setInterval(() => {
        if (!isWindowMaximized()) {
          // Real scareware technique: Try to maximize window back
          maxWindow();
        }
      }, 500); // Check every 500ms (less aggressive)
      
      intervalRefs.current.push(continuousFullscreenCheck);
    };

    // Add all event listeners with fake interactions
    if (preventEscape) {
      // Real scareware technique: Multiple event listeners for the same events
      document.addEventListener('keydown', preventEscapeKeys, true); // Capture phase
      document.addEventListener('keydown', preventEscapeKeys, false); // Bubble phase
      document.addEventListener('keydown', preventAltF4, true);
      document.addEventListener('keydown', preventAltF4, false);
      document.addEventListener('keydown', preventCtrlW, true);
      document.addEventListener('keydown', preventCtrlW, false);
      document.addEventListener('keydown', preventCtrlShiftW, true);
      document.addEventListener('keydown', preventCtrlShiftW, false);
      document.addEventListener('keydown', preventAltTab, true);
      document.addEventListener('keydown', preventAltTab, false);
      document.addEventListener('keydown', preventCtrlAltDelete, true);
      document.addEventListener('keydown', preventCtrlAltDelete, false);
      
      // Real scareware technique: Block keyboard events that might help escape, but allow copy/paste
      const blockAllKeys = (e: KeyboardEvent) => {
        // Allow copy/paste operations
        if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a' || e.key === 'z')) {
          return; // Allow copy, paste, cut, select all, undo
        }
        
        // Block other key combinations that might help escape
        if (e.ctrlKey || e.altKey || e.metaKey) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setBlockedAttempts(prev => prev + 1);
          
          // Real scareware technique: Create fake user interaction and force fullscreen
          createFakeUserInteraction();
          forceFullscreenMode(true);
          return false;
        }
      };
      
      document.addEventListener('keydown', blockAllKeys, true);
    }

    if (preventMouseEvents) {
      // Real scareware technique: Multiple event listeners for mouse events
      // Remove contextmenu event listeners to allow right-click
      document.addEventListener('mousedown', preventMouseEvents, true);
      document.addEventListener('mousedown', preventMouseEvents, false);
      document.addEventListener('mouseup', preventMouseEvents, true);
      document.addEventListener('mouseup', preventMouseEvents, false);
      document.addEventListener('click', preventMouseEvents, true);
      document.addEventListener('click', preventMouseEvents, false);
    }

    if (forceFullscreen) {
      // Real scareware technique: Multiple fullscreen change listeners
      document.addEventListener('fullscreenchange', preventFullscreenExit);
      document.addEventListener('webkitfullscreenchange', preventFullscreenExit);
      document.addEventListener('mozfullscreenchange', preventFullscreenExit);
      document.addEventListener('MSFullscreenChange', preventFullscreenExit);
      
      // Start continuous fullscreen enforcement
      startContinuousFullscreenEnforcement();
    }

    if (preventTabSwitch) {
      document.addEventListener('visibilitychange', preventTabSwitch);
    }

    if (preventWindowControl) {
      window.addEventListener('blur', preventBlur);
      window.addEventListener('resize', preventResize);
    }

    // Start the hijacking by waiting for real user interaction
    if (forceFullscreen) {
      // Real scareware technique: jQuery escape key detection and fullscreen trigger
      const setupJQueryEscapeDetection = () => {
        $(document).keyup(function(e) {
          if (e.keyCode === 27) {
            // Check if already in fullscreen before attempting to trigger it
            if (document.fullscreenElement || 
                (document as any).webkitFullscreenElement || 
                (document as any).mozFullScreenElement || 
                (document as any).msFullscreenElement ||
                document.documentElement.style.position === 'fixed') {
              return;
            }
            
            var elem = $(document.documentElement)[0] as any;
            
            // Add delay to prevent immediate exit
            setTimeout(() => {
              try {
                if (elem.requestFullscreen) {
                  elem.requestFullscreen().catch(function(err: any) {});
                } else if (elem.webkitRequestFullscreen) {
                  elem.webkitRequestFullscreen().catch(function(err: any) {});
                } else if (elem.mozRequestFullScreen) {
                  elem.mozRequestFullScreen().catch(function(err: any) {});
                } else if (elem.msRequestFullscreen) {
                  elem.msRequestFullscreen().catch(function(err: any) {});
                }
              } catch (error: any) {}
            }, 200); // 200ms delay to prevent immediate exit
          }
        });
      };
      
      // Test function to simulate escape key press using jQuery
      const simulateEscapeKey = () => {
        console.log('🧪 Simulating escape key press with jQuery...'); // Debug log
        
        var e = $.Event("keydown", {
          keyCode: 27
        });
        
        $("body").trigger(e);
      };
      
      // Expose test function globally for debugging
      (window as any).testEscapeKey = simulateEscapeKey;
      
      // Setup jQuery escape key detection immediately (no delay)
      setupJQueryEscapeDetection();
    }

    return () => {
      // Clean up all event listeners
      
      // Remove fullscreen change listeners
      const handleFullscreenChange = () => {
        const isInFullscreen = !!(document.fullscreenElement || 
                                  (document as any).webkitFullscreenElement || 
                                  (document as any).mozFullScreenElement || 
                                  (document as any).msFullscreenElement);
        setIsFullscreen(isInFullscreen);
      };
      
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      
      if (preventEscape) {
        // Remove all event listeners (both capture and bubble phases)
        document.removeEventListener('keydown', preventEscapeKeys, true);
        document.removeEventListener('keydown', preventEscapeKeys, false);
        document.removeEventListener('keydown', preventAltF4, true);
        document.removeEventListener('keydown', preventAltF4, false);
        document.removeEventListener('keydown', preventCtrlW, true);
        document.removeEventListener('keydown', preventCtrlW, false);
        document.removeEventListener('keydown', preventCtrlShiftW, true);
        document.removeEventListener('keydown', preventCtrlShiftW, false);
        document.removeEventListener('keydown', preventAltTab, true);
        document.removeEventListener('keydown', preventAltTab, false);
        document.removeEventListener('keydown', preventCtrlAltDelete, true);
        document.removeEventListener('keydown', preventCtrlAltDelete, false);
        
        // Remove the blockAllKeys listener
        const blockAllKeys = (e: KeyboardEvent) => {
          // Allow copy/paste operations
          if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a' || e.key === 'z')) {
            return; // Allow copy, paste, cut, select all, undo
          }
          
          // Block other key combinations that might help escape
          if (e.ctrlKey || e.altKey || e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            setBlockedAttempts(prev => prev + 1);
            
            // Real scareware technique: Create fake user interaction and force fullscreen
            createFakeUserInteraction();
            forceFullscreenMode(true);
            return false;
          }
        };
        document.removeEventListener('keydown', blockAllKeys, true);
      }

      if (preventMouseEvents) {
        // Remove all mouse event listeners (both capture and bubble phases)
        document.removeEventListener('mousedown', preventMouseEvents, true);
        document.removeEventListener('mousedown', preventMouseEvents, false);
        document.removeEventListener('mouseup', preventMouseEvents, true);
        document.removeEventListener('mouseup', preventMouseEvents, false);
        document.removeEventListener('click', preventMouseEvents, true);
        document.removeEventListener('click', preventMouseEvents, false);
      }

      if (forceFullscreen) {
        document.removeEventListener('fullscreenchange', preventFullscreenExit);
        document.removeEventListener('webkitfullscreenchange', preventFullscreenExit);
        document.removeEventListener('mozfullscreenchange', preventFullscreenExit);
        document.removeEventListener('MSFullscreenChange', preventFullscreenExit);
        
        // Clear all intervals
        intervalRefs.current.forEach(interval => clearInterval(interval));
        intervalRefs.current = [];
      }

      if (preventTabSwitch) {
        document.removeEventListener('visibilitychange', preventTabSwitch);
      }

      if (preventWindowControl) {
        window.removeEventListener('blur', preventBlur);
        window.removeEventListener('resize', preventResize);
      }
      
      // Restore window when component unmounts
      if (isWindowMaximized()) {
        restoreWindow();
      }
      
      document.title = 'Scareware Simulation - Educational Tool';
    };
  }, [forceFullscreen, preventEscape, preventTabSwitch, preventMouseEvents, preventWindowControl, safeMode]);

  return {
    blockedAttempts,
    isFullscreen,
    resetBlockedAttempts: () => setBlockedAttempts(0)
  };
}; 