import { useEffect } from 'react';

interface UseExitFullscreenOptions {
  enabled?: boolean;
}

export const useExitFullscreen = (options: UseExitFullscreenOptions = {}) => {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    // Function to exit fullscreen
    const exitFullscreen = () => {
      try {
        // Check if we're in fullscreen mode
        if (document.fullscreenElement || 
            (document as any).webkitFullscreenElement || 
            (document as any).mozFullScreenElement || 
            (document as any).msFullscreenElement) {
          
          console.log('🚪 Exiting fullscreen mode...');
          
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
        }
        
        // Also remove CSS fullscreen styles if they exist
        if (document.documentElement.style.position === 'fixed') {
          console.log('🧹 Removing CSS fullscreen styles...');
          document.documentElement.style.position = '';
          document.documentElement.style.top = '';
          document.documentElement.style.left = '';
          document.documentElement.style.width = '';
          document.documentElement.style.height = '';
          document.documentElement.style.zIndex = '';
          document.body.style.overflow = '';
        }
        
        // Try to restore window to normal size
        try {
          window.resizeTo(1024, 768); // Default size
          window.moveTo(100, 100); // Default position
        } catch (error) {
          // Window resize/move might be blocked, that's okay
        }
        
      } catch (error) {
        console.log('⚠️ Error exiting fullscreen:', error);
      }
    };

    // Exit fullscreen immediately when hook is enabled
    exitFullscreen();
    
  }, [enabled]);
}; 