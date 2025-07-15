import React, { useState, useEffect } from 'react';
import { getClassDefinition } from '../data/classDefinitions';
import { ClassDefinition } from '../types/ClassFramework';

interface FloatingTooltipProps {
  mousePosition: { x: number; y: number };
}

const FloatingTooltip: React.FC<FloatingTooltipProps> = ({ mousePosition }) => {
  // Mobile detection (move to top)
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [tooltipContent, setTooltipContent] = useState<ClassDefinition | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Mobile long-press state
  const longPressTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const lastTouchTarget = React.useRef<EventTarget | null>(null);
  // Store last touch position for mobile
  const lastTouchPosition = React.useRef<{ x: number; y: number } | null>(null);
  // Track if finger is currently down on mobile
  const isTouching = React.useRef(false);

  useEffect(() => {
    // Check fullscreen state
    const checkFullscreenState = () => {
      const isInFullscreen = !!(document.fullscreenElement || 
                                (document as any).webkitFullscreenElement || 
                                (document as any).mozFullScreenElement || 
                                (document as any).msFullscreenElement);
      setIsFullscreen(isInFullscreen);
    };

    // Check initial fullscreen state
    checkFullscreenState();

    // Add fullscreen change listeners
    const handleFullscreenChange = () => {
      checkFullscreenState();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    const handleMouseOver = (event: Event) => {
      const target = event.target as HTMLElement;
      // Find the closest parent element with data-class-id, or use the target itself
      const elementWithClass = target.closest('[data-class-id]') as HTMLElement;
      const classId = elementWithClass?.getAttribute('data-class-id');
      
      if (!isMobile) {
        if (classId) {
          // Get class info from the proper class framework
          const classInfo = getClassDefinition(classId);
          if (classInfo) {
            setTooltipContent(classInfo);
            
            // Find the largest parent element with data-class-id for better positioning
            let positioningElement = elementWithClass;
            const parentWithClass = elementWithClass.parentElement?.closest('[data-class-id]') as HTMLElement;
            
            // Use the parent element if it exists and is larger than the current element
            if (parentWithClass) {
              const currentRect = elementWithClass.getBoundingClientRect();
              const parentRect = parentWithClass.getBoundingClientRect();
              
              // Use parent if it's significantly larger (more than 2x the area)
              const currentArea = currentRect.width * currentRect.height;
              const parentArea = parentRect.width * parentRect.height;
              
              if (parentArea > currentArea * 2) {
                positioningElement = parentWithClass;
              }
            }
            
            setHoveredElement(positioningElement);
          }
        }
      }
    };

    const handleMouseOut = () => {
      setTooltipContent(null);
      setHoveredElement(null);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if mouse is over simulation controls (but not the tooltip itself)
      const isOverSimulationControls = target.closest('.simulation-controls') !== null;
      const isOverTooltip = target.closest('[data-tooltip="true"]') !== null;
      
      // In fullscreen mode, also check for scareware overlay elements
      const isOverScarewareOverlay = isFullscreen && (
        target.closest('.fake-browser-bar') !== null ||
        target.closest('[data-browser-bar="true"]') !== null ||
        target.closest('.browser-hijacking-overlay') !== null ||
        target.closest('.scareware-overlay') !== null ||
        target.closest('.fullscreen-overlay') !== null
      );
      
      if ((isOverSimulationControls || isOverScarewareOverlay) && !isOverTooltip) {
        setTooltipContent(null);
        setHoveredElement(null);
      }
    };

    // Mobile: handle long-press for tooltip
    const handleTouchStart = (event: Event) => {
      if (!isMobile) return;
      isTouching.current = true;
      const touchEvent = event as TouchEvent;
      const target = touchEvent.target as HTMLElement;
      // Prevent default for images to block open-in-new-tab prompt
      if (target.tagName === 'IMG') {
        event.preventDefault();
      }
      // Store last touch position
      if (touchEvent.touches && touchEvent.touches.length > 0) {
        lastTouchPosition.current = {
          x: touchEvent.touches[0].clientX,
          y: touchEvent.touches[0].clientY
        };
      }
      const elementWithClass = target.closest('[data-class-id]') as HTMLElement;
      const classId = elementWithClass?.getAttribute('data-class-id');
      if (classId) {
        lastTouchTarget.current = target;
        longPressTimeout.current = setTimeout(() => {
          // Only show tooltip if finger is still down
          if (isTouching.current) {
            const classInfo = getClassDefinition(classId);
            if (classInfo) {
              setTooltipContent(classInfo);
              setHoveredElement(elementWithClass);
            }
          }
        }, 500); // 500ms long-press threshold
      }
    };
    const handleTouchEnd = (event: Event) => {
      if (!isMobile) return;
      isTouching.current = false;
      if (longPressTimeout.current) {
        clearTimeout(longPressTimeout.current);
        longPressTimeout.current = null;
      }
      // Hide tooltip if touch ends and not a long press
      setTimeout(() => {
        setTooltipContent(null);
        setHoveredElement(null);
      }, 100);
    };

    // Function to add event listeners
    const addEventListeners = () => {
      const elementsWithClasses = document.querySelectorAll('[data-class-id]');
      
      elementsWithClasses.forEach(element => {
        element.addEventListener('mouseover', handleMouseOver);
        element.addEventListener('mouseout', handleMouseOut);
        // Mobile: add long-press listeners
        if (isMobile) {
          element.addEventListener('touchstart', handleTouchStart);
          element.addEventListener('touchend', handleTouchEnd);
          element.addEventListener('touchcancel', handleTouchEnd);
        }
      });
    };

    // Add listeners immediately
    addEventListeners();

    // Also add listeners periodically to catch dynamically created elements
    const interval = setInterval(addEventListeners, 1000);

    // Add global mouse move listener to detect simulation controls
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      const elementsWithClasses = document.querySelectorAll('[data-class-id]');
      elementsWithClasses.forEach(element => {
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
        // Mobile: remove long-press listeners
        if (isMobile) {
          element.removeEventListener('touchstart', handleTouchStart);
          element.removeEventListener('touchend', handleTouchEnd);
          element.removeEventListener('touchcancel', handleTouchEnd);
        }
      });
      document.removeEventListener('mousemove', handleMouseMove);
      
      // Remove fullscreen change listeners
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Calculate smart positioning to keep tooltip on screen and avoid element overlap
  const calculatePosition = () => {
    if (isMobile) {
      // Center horizontally, margin from edges, but adjust vertical position based on last touch
      const margin = 16;
      const width = Math.min(window.innerWidth - margin * 2, 400);
      const left = (window.innerWidth - width) / 2;
      let top: number | undefined = 32; // Default: 32px from top
      let bottom: number | undefined = undefined;
      if (lastTouchPosition.current) {
        const y = lastTouchPosition.current.y;
        if (y < window.innerHeight / 2) {
          // Touch in top half: show tooltip near bottom
          top = undefined;
          bottom = margin;
        } else {
          // Touch in bottom half: show tooltip near top
          top = margin;
          bottom = undefined;
        }
      }
      return { left, top, bottom, width };
    }
    const tooltipWidth = 400; // Increased for more content
    const tooltipHeight = 200; // Increased for more content
    const padding = 20; // Padding from screen edges
    const elementPadding = 10; // Padding from hovered element
    
    // Start with mouse position (bottom right)
    let left = mousePosition.x + 20;
    let top: number | undefined = 32; // Default: 32px from top
    let bottom: number | undefined = undefined;
    
    // If we have a hovered element, try to avoid overlapping with it
    if (hoveredElement) {
      const elementRect = hoveredElement.getBoundingClientRect();
      
      // Check if tooltip would overlap with the element
      const tooltipRight = left + tooltipWidth;
      const tooltipBottom = top + tooltipHeight;
      const elementRight = elementRect.right;
      const elementBottom = elementRect.bottom;
      
      // If tooltip overlaps horizontally, try positioning to the left
      if (left < elementRect.right + elementPadding && tooltipRight > elementRect.left - elementPadding) {
        // Try left side first
        if (mousePosition.x - tooltipWidth - elementPadding > 0) {
          left = mousePosition.x - tooltipWidth - elementPadding;
        } else {
          // If left side doesn't work, try right side
          left = elementRect.right + elementPadding;
        }
      }
      
      // If tooltip overlaps vertically, try positioning above
      if (top < elementRect.bottom + elementPadding && tooltipBottom > elementRect.top - elementPadding) {
        // Try above first
        if (mousePosition.y - tooltipHeight - elementPadding > 0) {
          top = mousePosition.y - tooltipHeight - elementPadding;
        } else {
          // If above doesn't work, try below
          top = elementRect.bottom + elementPadding;
        }
      }
    }
    
    // Check right edge
    if (left + tooltipWidth > window.innerWidth - padding) {
      left = mousePosition.x - tooltipWidth - 20;
    }
    
    // Check left edge
    if (left < padding) {
      left = padding;
    }
    
    // Check bottom edge
    if (top + tooltipHeight > window.innerHeight - padding) {
      top = mousePosition.y - tooltipHeight - 20;
    }
    
    // Check top edge
    if (top < padding) {
      top = padding;
    }
    
    return { left, top };
  };

  const position = calculatePosition();

  // Only show tooltip when there's content
  if (!tooltipContent) {
    return null;
  }

  // Get the first note for display (most classes have one main note)
  const mainNote = tooltipContent.notes[0];

  // Get severity color
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'danger': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'success': return '#10b981';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div
      className="floating-tooltip"
      data-tooltip="true"
      style={{
        position: 'fixed',
        left: position.left,
        background: '#2d2d2d',
        border: '1px solid #555',
        borderRadius: '6px',
        padding: '12px 16px',
        zIndex: 99999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        minWidth: isMobile ? undefined : '280px',
        maxWidth: isMobile ? undefined : '400px',
        width: isMobile && position.width ? position.width : undefined,
        cursor: 'default',
        userSelect: 'auto',
        transition: 'box-shadow 0.2s',
        pointerEvents: 'auto',
        isolation: 'isolate',
        overflow: 'visible',
        marginLeft: isMobile ? 'auto' : undefined,
        marginRight: isMobile ? 'auto' : undefined,
        ...(typeof position.top === 'number' ? { top: position.top } : {}),
        ...(typeof position.bottom === 'number' ? { bottom: position.bottom } : {}),
      }}
    >
      <div style={{ 
        fontSize: '14px', 
        color: '#e0e0e0',
        textAlign: 'left',
        lineHeight: '1.4'
      }}>
        {/* Header with icon and title */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>{tooltipContent.icon}</span>
          <div style={{ 
            fontSize: '15px', 
            color: '#ffffff', 
            fontWeight: '600',
            pointerEvents: 'none'
          }}>
            {tooltipContent.name}
          </div>
        </div>

        {/* Category and Severity */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px',
          fontSize: '12px'
        }}>
          <span style={{ 
            color: '#b0b0b0',
            background: '#1a1a1a',
            padding: '2px 6px',
            borderRadius: '3px'
          }}>
            {mainNote?.category || 'Scareware'}
          </span>
          {mainNote?.severity && (
            <span style={{ 
              color: getSeverityColor(mainNote.severity),
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center'
            }}>
              {mainNote.severity.toUpperCase()}
            </span>
          )}
        </div>

        {/* Description */}
        <div style={{ 
          marginBottom: '10px',
          color: '#b0b0b0',
          fontSize: '13px'
        }}>
          {mainNote?.description || tooltipContent.description}
        </div>

        {/* Examples */}
        {mainNote?.examples && mainNote.examples.length > 0 && !isMobile && (
          <div style={{ marginBottom: '8px' }}>
            <div style={{ 
              fontSize: '12px', 
              color: '#d0d0d0',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              Examples:
            </div>
            <ul style={{ 
              margin: '0',
              paddingLeft: '16px',
              fontSize: '12px',
              color: '#a0a0a0'
            }}>
              {mainNote.examples.slice(0, 2).map((example, index) => (
                <li key={index} style={{ marginBottom: '2px' }}>{example}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tips */}
        {mainNote?.tips && mainNote.tips.length > 0 && (
          <div style={{ marginBottom: '8px' }}>
            <div style={{ 
              fontSize: '12px', 
              color: '#10b981',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              Safety Tips:
            </div>
            <ul style={{ 
              margin: '0',
              paddingLeft: '16px',
              fontSize: '12px',
              color: '#a0a0a0'
            }}>
              {mainNote.tips.slice(0, 2).map((tip, index) => (
                <li key={index} style={{ marginBottom: '2px' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Context box */}
        {!isMobile && (
          <div style={{ 
            fontSize: '12px', 
            color: '#d0d0d0',
            fontStyle: 'italic',
            background: '#1a1a1a',
            border: '1px solid #444',
            borderRadius: '4px',
            padding: '8px 10px',
            marginTop: '8px'
          }}>
            This element is part of the scareware simulation to demonstrate how {tooltipContent.name.toLowerCase()} tactics work.
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingTooltip; 