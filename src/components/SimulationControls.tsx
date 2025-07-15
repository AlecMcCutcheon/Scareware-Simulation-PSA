import React, { useRef, useState, useEffect } from 'react';
import { useSpeechSettings } from '../hooks/useSpeechSettings';

interface SimulationControlsProps {
  currentPhase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme';
  onAdvancePhase: (phase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme' | 'escape') => void;
  onReset: () => void;
  nortonEscalation?: boolean; // Norton escalation state
  malwarebytesEscalation?: boolean; // Malwarebytes escalation state
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  currentPhase,
  onAdvancePhase,
  onReset,
  nortonEscalation = false, // Norton escalation state
  malwarebytesEscalation = false // Malwarebytes escalation state
}) => {
  const { isMuted, toggleMuted } = useSpeechSettings();

  const phases = [
    { id: 'norton', name: 'Norton', color: '#ff6b35' },
    { id: 'microsoft', name: 'Microsoft', color: '#0078d4' },
    { id: 'google', name: 'Google', color: '#4285f4' },
    { id: 'malwarebytes', name: 'Malwarebytes', color: '#00a651' },
    { id: 'generic', name: 'Legal Threats', color: '#ff0000' },
    { id: 'advanced', name: 'Tech Support', color: '#8b0000' },
    { id: 'extreme', name: 'Ransomware', color: '#8b0000' }
  ];

  const currentPhaseIndex = phases.findIndex(phase => phase.id === currentPhase);

  // Get the goal/overview for the current scareware phase
  const getScarewareGoal = () => {
    const goals: Record<string, { label: string; description: string }> = {
      'norton': {
        label: 'Norton Subscription Scareware:',
        description: 'Tries to extract credit card information by claiming the Norton subscription has expired and multiple threats are detected. Uses persistent retry logic to capture multiple payment attempts, with escalating urgency tactics and fake threat counts that increase over time. The scareware repeatedly prompts for payment information while preventing browser closure.'
      },
      'microsoft': {
        label: 'Microsoft Account Scareware:',
        description: 'Attempts to steal Microsoft account credentials (email/password) by claiming the account is compromised and needs immediate verification to prevent data loss. Uses a multi-step login process that captures both email and password separately, with persistent retry logic for failed attempts. Creates urgency through countdown timers and security warnings.'
      },
      'google': {
        label: 'Google Security Scareware:',
        description: 'Tries to extract Google account credentials and personal information by claiming the account is hacked and requires immediate security verification. Uses persistent login attempts with escalating security warnings and fake threat indicators. Employs browser address bar spoofing to appear legitimate while repeatedly prompting for account credentials.'
      },
      'malwarebytes': {
        label: 'Malwarebytes Upgrade Scareware:',
        description: 'Attempts to extract credit card information by showing fake threats that require premium upgrade payment, with escalation tactics to increase pressure. Uses realistic scan progress and fake threat detection to create urgency, then presents multiple upgrade prompts with persistent retry logic for declined payments.'
      },
      'generic': {
        label: 'Legal Threat Scareware:',
        description: 'Tries to extract payment information by claiming copyright violations and threatening legal action, demanding immediate settlement payment. Uses persistent retry logic for payment attempts with escalating legal threats and fake court documents. Creates urgency through countdown timers and legal action warnings.'
      },
      'advanced': {
        label: 'Tech Support Scareware:',
        description: 'Attempts to gain remote access credentials and personal information by claiming to be tech support fixing critical system issues that require immediate attention. Uses persistent retry logic for login attempts and escalating urgency tactics with fake system warnings.'
      },
      'extreme': {
        label: 'Ransomware Scareware:',
        description: 'Tries to extract cryptocurrency payments by claiming all files are encrypted, with threats of permanent data deletion unless ransom is paid immediately. Uses persistent retry logic for payment attempts with escalating threats and fake file deletion countdowns.'
      }
    };

    return goals[currentPhase] || {
      label: 'Scareware Simulation:',
      description: 'Educational demonstration of scareware techniques and browser hijacking methods.'
    };
  };

  // --- Drag and Drop State ---
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('simulationControlsPosition');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure position is within viewport bounds
      const maxLeft = window.innerWidth - 340;
      const maxTop = window.innerHeight - 100;
      return {
        top: Math.min(Math.max(parsed.top, 0), maxTop),
        left: Math.min(Math.max(parsed.left, 0), maxLeft)
      };
    }
    return { top: 20, left: window.innerWidth - 340 };
  });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [dragStartTime, setDragStartTime] = useState(0);
  
  // Local storage state management
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('simulationControlsCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [goalExpanded, setGoalExpanded] = useState(() => {
    const saved = localStorage.getItem('simulationControlsGoalExpanded');
    return saved ? JSON.parse(saved) : false;
  });
  const [safeZoneExpanded, setSafeZoneExpanded] = useState(() => {
    const saved = localStorage.getItem('simulationControlsSafeZoneExpanded');
    return saved ? JSON.parse(saved) : false;
  });
  const [speechExpanded, setSpeechExpanded] = useState(() => {
    const saved = localStorage.getItem('simulationControlsSpeechExpanded');
    return saved ? JSON.parse(saved) : false;
  });
  const [contentLevel, setContentLevel] = useState(() => {
    const saved = localStorage.getItem('simulationControlsContentLevel');
    return saved ? JSON.parse(saved) : 5.0; // Default to showing all content (level 5.0)
  });
  const [transparency, setTransparency] = useState(() => {
    const saved = localStorage.getItem('simulationControlsTransparency');
    return saved ? JSON.parse(saved) : 1.0; // Default to 100% opacity
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('simulationControlsCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem('simulationControlsGoalExpanded', JSON.stringify(goalExpanded));
  }, [goalExpanded]);

  useEffect(() => {
    localStorage.setItem('simulationControlsSafeZoneExpanded', JSON.stringify(safeZoneExpanded));
  }, [safeZoneExpanded]);

  useEffect(() => {
    localStorage.setItem('simulationControlsSpeechExpanded', JSON.stringify(speechExpanded));
  }, [speechExpanded]);

  useEffect(() => {
    localStorage.setItem('simulationControlsContentLevel', JSON.stringify(contentLevel));
  }, [contentLevel]);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('simulationControlsPosition', JSON.stringify(position));
  }, [position]);

  // Save transparency to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('simulationControlsTransparency', JSON.stringify(transparency));
    console.log('Transparency changed to:', transparency);
  }, [transparency]);

  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStartY = useRef(0);
  const resizeStartLevel = useRef(0);
  const isResizing = useRef(false);

  // Calculate what should be visible and collapsed based on content level
  const getVisibleSections = () => {
    let sections = {
      showGoal: true,
      showSafeZone: true,
      showSpeech: true,
      goalCollapsed: false,
      safeZoneCollapsed: false,
      speechCollapsed: false,
      compactMode: false,
      horizontalLayout: false,
      horizontalButtonLayout: false,
      shortEscalationText: false
    };

    // Content levels with sub-levels:
    // 5.0: All sections visible and expanded (goal, safe zone, speech) - default
    // 4.5: Goal section collapsed
    // 4.0: Goal section hidden
    // 3.5: Safe zone section collapsed
    // 3.0: Safe zone section hidden
    // 2.5: Speech section collapsed
    // 2.0: Speech section hidden + horizontal layout (escalation + speech on same line, short text)
    // 1.5: Horizontal button layout (escape guide + exit to home on same line)
    // 1.0: Minimal mode
    // 0.0: Hide everything (ultra minimal)

    // Goal section: visible at 4.0+, collapsed at 4.5, hidden below 4.0
    if (contentLevel < 4.0) {
      sections.showGoal = false;
    } else if (contentLevel < 4.5) {
      sections.goalCollapsed = true;
    }

    // Safe zone section: visible at 3.0+, collapsed at 3.5, hidden below 3.0
    if (contentLevel < 3.0) {
      sections.showSafeZone = false;
    } else if (contentLevel < 3.5) {
      sections.safeZoneCollapsed = true;
    }

    // Speech section: visible at 2.0+, collapsed at 2.5, hidden below 2.0
    if (contentLevel < 2.0) {
      sections.showSpeech = false;
    } else if (contentLevel < 2.5) {
      sections.speechCollapsed = true;
    }
    
    // Horizontal layout and short text at level 2.0 and below
    if (contentLevel <= 2.0) {
      sections.horizontalLayout = true;
      sections.shortEscalationText = true;
    }
    
    // Horizontal button layout at level 1.5 and below
    if (contentLevel <= 1.5) {
      sections.horizontalButtonLayout = true;
    }
    
    // Enable compact mode for controls when showing minimal content (only at very low levels)
    if (contentLevel <= 0.5) {
      sections.compactMode = true;
    }

    return sections;
  };

  

  const visibleSections = getVisibleSections();
  
  // Debug logging to see what's happening
  console.log(`Current content level: ${contentLevel}, horizontalLayout: ${visibleSections.horizontalLayout}, horizontalButtonLayout: ${visibleSections.horizontalButtonLayout}, compactMode: ${visibleSections.compactMode}`);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Don't start dragging if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('[data-no-drag]')) {
      return;
    }
    
    setDragging(true);
    setDragStartTime(Date.now());
    let clientX: number, clientY: number;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }
    dragOffset.current = {
      x: clientX - position.left,
      y: clientY - position.top
    };
    document.body.style.userSelect = 'none';
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setResizing(true);
    isResizing.current = true;
    let clientY: number;
    if ('touches' in e && e.touches.length > 0) {
      clientY = e.touches[0].clientY;
    } else if ('clientY' in e) {
      clientY = e.clientY;
    } else {
      return;
    }
    resizeStartLevel.current = contentLevel;
    resizeStartY.current = clientY;
    document.body.style.userSelect = 'none';
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (dragging) {
      let clientX: number, clientY: number;
      if ('touches' in e && (e as TouchEvent).touches.length > 0) {
        clientX = (e as TouchEvent).touches[0].clientX;
        clientY = (e as TouchEvent).touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }
      setPosition(pos => ({
        top: Math.max(0, Math.min(window.innerHeight - 80, clientY - dragOffset.current.y)),
        left: Math.max(0, Math.min(window.innerWidth - 320, clientX - dragOffset.current.x))
      }));
      }
      
      if (resizing || isResizing.current) {
        let clientY: number;
        if ('touches' in e && (e as TouchEvent).touches.length > 0) {
          clientY = (e as TouchEvent).touches[0].clientY;
        } else if ('clientY' in e) {
          clientY = (e as MouseEvent).clientY;
        } else {
          return;
        }
        
        // Use a larger threshold for less sensitivity
        const threshold = 60; // Increased threshold for less sensitive resizing
        
        // Calculate the target level based on current mouse position relative to start
        const deltaY = clientY - resizeStartY.current;
        const levelChange = deltaY / threshold;
        const targetLevel = Math.max(0, Math.min(5, resizeStartLevel.current + levelChange));
        
        if (targetLevel !== contentLevel) {
          setContentLevel(targetLevel);
          console.log(`Changing to content level: ${targetLevel} (deltaY: ${deltaY}, levelChange: ${levelChange})`);
        }
      }
    };
    
    const handleMouseUp = () => {
      setDragging(false);
      setResizing(false);
      isResizing.current = false;
      document.body.style.userSelect = '';
    };
    
    // Handle window resize to keep controls in viewport
    const handleResize = () => {
      setPosition(pos => ({
        top: Math.max(0, Math.min(window.innerHeight - 80, pos.top)),
        left: Math.max(0, Math.min(window.innerWidth - 320, pos.left))
      }));
    };
    
    if (dragging || resizing || isResizing.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [dragging, resizing, contentLevel]);

  // In the horizontal layout section, define switch size variables:
  const switchWidth = visibleSections.horizontalLayout ? 32 : 50;
  const switchHeight = visibleSections.horizontalLayout ? 18 : 24;
  const knobSize = visibleSections.horizontalLayout ? 12 : 18;
  const knobLeftOn = visibleSections.horizontalLayout ? '15px' : '27px';
  const knobLeftOff = '1px';

  return (
    <>
      <div 
        className="simulation-controls dark-mode"
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          background: 'rgba(45, 45, 45, 0.9)',
          border: resizing ? '3px solid #ff6b35' : '3px solid #007bff',
          borderRadius: '12px',
          padding: collapsed ? '0.5rem' : '1.5rem',
          paddingBottom: collapsed ? '0.5rem' : '2.5rem',
          zIndex: 99999,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          backdropFilter: `blur(${5 * transparency}px)`,
          width: '350px',
          height: collapsed ? 'auto' : 'auto',
          cursor: dragging ? 'grabbing' : resizing ? 'ns-resize' : 'default',
          userSelect: dragging ? 'none' : 'auto',
          transition: dragging || resizing ? 'none' : snapping ? 'height 0.3s ease' : 'box-shadow 0.2s',
          pointerEvents: 'auto',
          isolation: 'isolate',
          overflow: 'visible',
          display: 'flex',
          flexDirection: 'column',
          opacity: transparency
        }}
      >
        <div 
          style={{ 
            textAlign: 'center', 
            marginBottom: collapsed ? '0' : '1rem',
            borderBottom: collapsed ? 'none' : 'none',
            paddingBottom: collapsed ? '0' : '0.5rem',
            cursor: 'grab',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
            position: 'relative',
            zIndex: 99999,
            flexShrink: 0
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div style={{ flex: 1 }}>
            {collapsed ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%'
                }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentPhaseIndex === 0) {
                      onReset();
                    } else {
                      const prevIndex = currentPhaseIndex - 1;
                      onAdvancePhase(phases[prevIndex].id as any);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color: '#ffffff',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s',
                    pointerEvents: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title={currentPhaseIndex === 0 ? 'Return to Home' : 'Previous Scareware'}
                >
                  ←
                </button>
                            <h3 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Only expand/collapse if we haven't been dragging
                    const dragDuration = Date.now() - dragStartTime;
                    if (dragDuration < 200) { // If drag lasted less than 200ms, treat as click
                      setCollapsed(!collapsed);
                    }
                  }}
                  style={{ 
                    margin: 0, 
                    color: '#007bff', 
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'color 0.2s',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#66b3ff';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#007bff';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title="Click to expand controls"
                >
                  Simulation Controls
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentPhaseIndex === phases.length - 1) {
                      onAdvancePhase('escape' as any);
                    } else {
                      const nextIndex = currentPhaseIndex + 1;
                      onAdvancePhase(phases[nextIndex].id as any);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color: '#ffffff',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s',
                    pointerEvents: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title={currentPhaseIndex === phases.length - 1 ? 'Go to Escape Guide' : 'Next Scareware'}
                >
                  →
                </button>
          </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%'
                }}>
                  <div style={{ flex: 1 }}></div>
            <h3 style={{ 
              margin: 0, 
              color: '#007bff', 
              fontSize: '1.2rem',
              fontWeight: 'bold',
                    pointerEvents: 'none',
                    textAlign: 'center'
            }}>
                    Simulation Controls
            </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
            style={{
              background: 'none',
              border: 'none',
                      fontSize: '1.2rem',
              cursor: 'pointer',
              color: '#007bff',
              padding: '0.25rem',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
                      flex: 1,
                      textAlign: 'right'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title={collapsed ? 'Expand Controls' : 'Collapse Controls'}
          >
            {collapsed ? '▶' : '▼'}
          </button>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0 0.5rem',
                  opacity: 1
                }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    color: '#007bff', 
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}>
                    Opacity
                  </span>
                  <div style={{
                    flex: 1,
                    height: '8px',
                    background: 'rgba(0, 123, 255, 0.3)',
                    borderRadius: '4px',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clampedX = Math.max(0, Math.min(rect.width, clickX));
                    const percentage = 0.6 + (clampedX / rect.width) * 0.4; // Map to 0.6-1.0 range
                    setTransparency(percentage);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const element = e.currentTarget;
                    
                    const updateTransparency = (clientX: number) => {
                      if (!element || !element.getBoundingClientRect) return;
                      const rect = element.getBoundingClientRect();
                      // Allow dragging beyond the slider bounds for better UX
                      const clickX = clientX - rect.left;
                      const clampedX = Math.max(0, Math.min(rect.width, clickX));
                      const percentage = 0.6 + (clampedX / rect.width) * 0.4; // Map to 0.6-1.0 range
                      setTransparency(percentage);
                    };
                    
                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      updateTransparency(moveEvent.clientX);
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const touch = e.touches[0];
                    const clickX = touch.clientX - rect.left;
                    const clampedX = Math.max(0, Math.min(rect.width, clickX));
                    const percentage = 0.6 + (clampedX / rect.width) * 0.4; // Map to 0.6-1.0 range
                    setTransparency(percentage);
                  }}
                  onTouchMove={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const touch = e.touches[0];
                    const clickX = touch.clientX - rect.left;
                    const clampedX = Math.max(0, Math.min(rect.width, clickX));
                    const percentage = 0.6 + (clampedX / rect.width) * 0.4; // Map to 0.6-1.0 range
                    setTransparency(percentage);
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: `${(transparency - 0.6) / 0.4 * 100}%`, // Map 0.6-1.0 to 0-100%
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '16px',
                      height: '16px',
                      background: '#ffffff',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      cursor: 'pointer',
                      pointerEvents: 'none',
                      zIndex: 1
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      height: '100%',
                      width: `${(transparency - 0.6) / 0.4 * 100}%`, // Map 0.6-1.0 to 0-100%
                      background: '#007bff',
                      borderRadius: '4px',
                      pointerEvents: 'none'
                    }} />
                  </div>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    color: '#007bff', 
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    minWidth: '2rem',
                    textAlign: 'center'
                  }}>
                    {Math.round(transparency * 100)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {!collapsed && (
          <div style={{ 
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            overflow: 'visible'
          }}>
            <div style={{ marginBottom: '1rem', flexShrink: 0 }}>
          <div style={{ 
            fontSize: '0.9rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            Current Scareware: {phases[currentPhaseIndex]?.name}
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '0.25rem',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 99999,
            padding: '2px',
            borderRadius: '4px',
            minHeight: '32px',
            justifyContent: 'center'
          }}>
            {phases.map((phase, index) => {
              return (
              <div
                key={phase.id}
                data-no-drag="true"
                data-button-index={index}
                data-button-number={index + 1}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: phase.id === currentPhase ? phase.color : '#404040',
                  border: phase.id === currentPhase ? '2px solid #ffffff' : '1px solid #666',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  color: phase.id === currentPhase ? 'white' : '#b0b0b0',
                  fontWeight: 'bold',
                  position: 'relative',
                  zIndex: 100000,
                  userSelect: 'none',
                  padding: '2px',
                  boxSizing: 'border-box',
                  minWidth: '28px',
                  minHeight: '28px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onAdvancePhase(phase.id as any);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onMouseEnter={(e) => {
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                title={`${phase.name} (${index + 1}/${phases.length})`}
              >
                {index + 1}
              </div>
            )})}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '0.5rem',
              flexWrap: 'wrap',
              flexShrink: 0
        }}>
          <button
            onClick={() => {
              if (currentPhaseIndex === 0) {
                // On first scareware, go back to home page
                onReset();
              } else {
                // Go to previous scareware
                const prevIndex = currentPhaseIndex - 1;
                onAdvancePhase(phases[prevIndex].id as any);
              }
            }}
            style={{
              padding: '0.5rem 1rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              flex: 1,
              minWidth: '80px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5a6268';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6c757d';
            }}
          >
            {currentPhaseIndex === 0 ? '← Return' : '← Previous'}
          </button>
          
          <button
            onClick={() => {
              if (currentPhaseIndex === phases.length - 1) {
                // On last scareware, go to escape guide
                onAdvancePhase('escape' as any);
              } else {
                // Go to next scareware
                const nextIndex = currentPhaseIndex + 1;
                onAdvancePhase(phases[nextIndex].id as any);
              }
            }}
            style={{
              padding: '0.5rem 1rem',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              flex: 1,
              minWidth: '80px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
            }}
          >
            {currentPhaseIndex === phases.length - 1 ? 'Exit →' : 'Next →'}
          </button>
        </div>

        <div style={{ 
              marginTop: '0.5rem',
              flexShrink: 0
        }}>
              {visibleSections.horizontalButtonLayout ? (
                /* Horizontal button layout: escape guide and exit to home on same line */
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => onAdvancePhase('escape' as any)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      flex: 1,
                      transition: 'background-color 0.2s',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#218838';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#28a745';
                    }}
                  >
                    🛡️ Guide
                  </button>
                  
                  <button
                    onClick={onReset}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      flex: 1,
                      transition: 'background-color 0.2s',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#c82333';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc3545';
                    }}
                  >
                    🏠 Home
                  </button>
                </div>
              ) : (
                /* Vertical button layout: escape guide and exit to home on separate lines */
                <>
          <button
            onClick={() => onAdvancePhase('escape' as any)}
            style={{
              padding: '0.5rem 1rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              width: '100%',
              transition: 'background-color 0.2s',
              marginBottom: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#218838';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#28a745';
            }}
          >
            🛡️ Escape Guide
          </button>
          
          <button
            onClick={onReset}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              width: '100%',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c82333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#dc3545';
            }}
          >
            🏠 Exit to Home
          </button>
                </>
              )}
        </div>

        <div style={{ 
              marginTop: '0.5rem',
              flexShrink: 0
            }}>
              {/* Compact mode: escalation and speech on same line */}
              {visibleSections.compactMode ? (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem'
        }}>
          {/* Norton escalation mode (only for Norton phase) */}
          {currentPhase === 'norton' && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.5rem',
              background: 'rgba(220, 53, 69, 0.2)',
              borderRadius: '6px',
                      border: '1px solid rgba(220, 53, 69, 0.4)',
                      flex: 1
            }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ff6b6b', whiteSpace: 'nowrap', marginRight: '0.5em' }}>
                        ⚡ Mode
              </div>
              <div
                onClick={() => {
                  if ((window as any).toggleNortonEscalation) {
                    (window as any).toggleNortonEscalation();
                  }
                }}
                style={{
                          width: switchWidth,
                          height: switchHeight,
                  background: nortonEscalation ? '#dc3545' : '#6c757d',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.3s ease',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{
                          width: knobSize,
                          height: knobSize,
                  background: '#fff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '1px',
                          left: nortonEscalation ? knobLeftOn : knobLeftOff,
                  transition: 'left 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }} />
              </div>
            </div>
          )}
          
          {/* Malwarebytes escalation mode (only for Malwarebytes phase) */}
          {currentPhase === 'malwarebytes' && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.5rem',
              background: 'rgba(0, 166, 81, 0.2)',
              borderRadius: '6px',
                      border: '1px solid rgba(0, 166, 81, 0.4)',
                      flex: 1
            }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#00a651', whiteSpace: 'nowrap', marginRight: '0.5em' }}>
                        ⚡ Mode
              </div>
              <div
                onClick={() => {
                  if ((window as any).toggleMalwarebytesEscalation) {
                    (window as any).toggleMalwarebytesEscalation();
                  }
                }}
                style={{
                          width: switchWidth,
                          height: switchHeight,
                  background: malwarebytesEscalation ? '#dc3545' : '#6c757d',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.3s ease',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{
                          width: knobSize,
                          height: knobSize,
                  background: '#fff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '1px',
                          left: malwarebytesEscalation ? knobLeftOn : knobLeftOff,
                  transition: 'left 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }} />
              </div>
            </div>
          )}
          
          {/* Speech toggle (available for all phases) */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '0.5rem',
            background: 'rgba(108, 117, 125, 0.2)',
            borderRadius: '6px',
                    border: '1px solid rgba(108, 117, 125, 0.4)',
                    flex: 1
          }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#b0b0b0', whiteSpace: 'nowrap' }}>
              🔊 Audio
            </div>
            <div
              onClick={() => {
                        toggleMuted();
              }}
              style={{
                        width: switchWidth,
                        height: switchHeight,
                        background: !isMuted ? '#28a745' : '#6c757d',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.3s ease',
                border: '2px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{
                        width: knobSize,
                        height: knobSize,
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '1px',
                        left: !isMuted ? knobLeftOn : knobLeftOff,
                transition: 'left 0.3s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </div>
          </div>
        </div>
              ) : (
                /* Normal mode: escalation and speech on separate lines */
                <>
                                     {visibleSections.horizontalLayout ? (
                     /* Horizontal layout: escalation and speech on same line */
                     <div style={{ 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center',
                       gap: '0.5rem'
                     }}>
                       {/* Left side: Escalation */}
                       {currentPhase === 'norton' && (
                         <div style={{ 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'space-between',
                           padding: '0.5rem',
                           background: 'rgba(220, 53, 69, 0.2)',
                           borderRadius: '6px',
                           border: '1px solid rgba(220, 53, 69, 0.4)',
                           flex: 1
                         }}>
                           <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ff6b6b', whiteSpace: 'nowrap', marginRight: '0.5em' }}>
                             ⚡ Mode
                           </div>
                           <div
                             onClick={() => {
                               if ((window as any).toggleNortonEscalation) {
                                 (window as any).toggleNortonEscalation();
                               }
                             }}
                             style={{
                               width: switchWidth,
                               height: switchHeight,
                               background: nortonEscalation ? '#dc3545' : '#6c757d',
                               borderRadius: '12px',
                               cursor: 'pointer',
                               position: 'relative',
                               transition: 'background-color 0.3s ease',
                               border: '2px solid #fff',
                               boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                             }}
                           >
                             <div style={{
                               width: knobSize,
                               height: knobSize,
                               background: '#fff',
                               borderRadius: '50%',
                               position: 'absolute',
                               top: '1px',
                               left: nortonEscalation ? knobLeftOn : knobLeftOff,
                               transition: 'left 0.3s ease',
                               boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                             }} />
                           </div>
                         </div>
                       )}
                       {currentPhase === 'malwarebytes' && (
                         <div style={{ 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'space-between',
                           padding: '0.5rem',
                           background: 'rgba(0, 166, 81, 0.2)',
                           borderRadius: '6px',
                           border: '1px solid rgba(0, 166, 81, 0.4)',
                           flex: 1
                         }}>
                           <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#00a651', whiteSpace: 'nowrap', marginRight: '0.5em' }}>
                             ⚡ Mode
                           </div>
                           <div
                             onClick={() => {
                               if ((window as any).toggleMalwarebytesEscalation) {
                                 (window as any).toggleMalwarebytesEscalation();
                               }
                             }}
                             style={{
                               width: switchWidth,
                               height: switchHeight,
                               background: malwarebytesEscalation ? '#dc3545' : '#6c757d',
                               borderRadius: '12px',
                               cursor: 'pointer',
                               position: 'relative',
                               transition: 'background-color 0.3s ease',
                               border: '2px solid #fff',
                               boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                             }}
                           >
                             <div style={{
                               width: knobSize,
                               height: knobSize,
                               background: '#fff',
                               borderRadius: '50%',
                               position: 'absolute',
                               top: '1px',
                               left: malwarebytesEscalation ? knobLeftOn : knobLeftOff,
                               transition: 'left 0.3s ease',
                               boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                             }} />
                           </div>
                         </div>
                       )}
                       
                       {/* Right side: Speech */}
        <div style={{ 
                         display: 'flex', 
                         alignItems: 'center', 
                         justifyContent: 'space-between',
                         padding: '0.5rem',
                         background: 'rgba(108, 117, 125, 0.2)',
                         borderRadius: '6px',
                         border: '1px solid rgba(108, 117, 125, 0.4)',
                         flex: 1
                       }}>
                         <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#b0b0b0', whiteSpace: 'nowrap', marginRight: '0.5em' }}>
                           🔊 Audio
                         </div>
                         <div
                           onClick={() => {
                             toggleMuted();
                           }}
                           style={{
                             width: switchWidth,
                             height: switchHeight,
                             background: !isMuted ? '#28a745' : '#6c757d',
                             borderRadius: '12px',
                             cursor: 'pointer',
                             position: 'relative',
                             transition: 'background-color 0.3s ease',
                             border: '2px solid #fff',
                             boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                           }}
                         >
                           <div style={{
                             width: knobSize,
                             height: knobSize,
                             background: '#fff',
                             borderRadius: '50%',
                             position: 'absolute',
                             top: '1px',
                             left: !isMuted ? knobLeftOn : knobLeftOff,
                             transition: 'left 0.3s ease',
                             boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                           }} />
                         </div>
                       </div>
                     </div>
                                        ) : (
                    // Vertical layout: only if horizontalLayout is false
                    <>
                      {/* Norton escalation mode (only for Norton phase) */}
                      {currentPhase === 'norton' && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(220, 53, 69, 0.2)', borderRadius: '6px', border: '1px solid rgba(220, 53, 69, 0.4)' }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ff6b6b' }}>
                            ⚡ Escalation Mode
                          </div>
                          <div
                            onClick={() => {
                              if ((window as any).toggleNortonEscalation) {
                                (window as any).toggleNortonEscalation();
                              }
                            }}
                            style={{
                              width: switchWidth,
                              height: switchHeight,
                              background: nortonEscalation ? '#dc3545' : '#6c757d',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'background-color 0.3s ease',
                              border: '2px solid #fff',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                          >
                            <div style={{
                              width: knobSize,
                              height: knobSize,
                              background: '#fff',
                              borderRadius: '50%',
                              position: 'absolute',
                              top: '1px',
                              left: nortonEscalation ? knobLeftOn : knobLeftOff,
                              transition: 'left 0.3s ease',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                            }} />
                          </div>
                        </div>
                      )}
                      
                      {/* Malwarebytes escalation mode (only for Malwarebytes phase) */}
                      {currentPhase === 'malwarebytes' && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(0, 166, 81, 0.2)', borderRadius: '6px', border: '1px solid rgba(0, 166, 81, 0.4)' }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#00a651' }}>
                            ⚡ Escalation Mode
                          </div>
                          <div
                            onClick={() => {
                              if ((window as any).toggleMalwarebytesEscalation) {
                                (window as any).toggleMalwarebytesEscalation();
                              }
                            }}
                            style={{
                              width: switchWidth,
                              height: switchHeight,
                              background: malwarebytesEscalation ? '#dc3545' : '#6c757d',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'background-color 0.3s ease',
                              border: '2px solid #fff',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                          >
                            <div style={{
                              width: knobSize,
                              height: knobSize,
                              background: '#fff',
                              borderRadius: '50%',
                              position: 'absolute',
                              top: '1px',
                              left: malwarebytesEscalation ? knobLeftOn : knobLeftOff,
                              transition: 'left 0.3s ease',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                            }} />
                          </div>
                        </div>
                      )}
                      
                      {/* Speech toggle (available for all phases) */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(108, 117, 125, 0.2)', borderRadius: '6px', border: '1px solid rgba(108, 117, 125, 0.4)' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#b0b0b0' }}>
              🔊 Speech
            </div>
            <div
              onClick={() => {
                            toggleMuted();
              }}
              style={{
                            width: switchWidth,
                            height: switchHeight,
                            background: !isMuted ? '#28a745' : '#6c757d',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.3s ease',
                border: '2px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{
                            width: knobSize,
                            height: knobSize,
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '1px',
                            left: !isMuted ? knobLeftOn : knobLeftOff,
                transition: 'left 0.3s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </div>
          </div>
                    </>
                                     )}
                </>
              )}
        </div>

            {/* Content sections - only render if there's space */}
            {/* Speech explanation (shown when speech is enabled) */}
            {!isMuted && visibleSections.showSpeech && (
        <div style={{ 
                padding: '0.75rem',
                background: 'rgba(40, 167, 69, 0.2)',
                borderRadius: '6px',
                border: '1px solid rgba(40, 167, 69, 0.4)',
                fontSize: '0.8rem',
                color: '#90EE90',
                flexShrink: 0
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: (speechExpanded && !visibleSections.speechCollapsed) ? '0.25rem' : '0'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>
                    🔊 Speech Mode Active
                  </div>
                  <button
                    onClick={() => setSpeechExpanded(!speechExpanded)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      color: '#fff',
                      padding: '0.25rem',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    title={speechExpanded ? 'Collapse Speech Info' : 'Expand Speech Info'}
                  >
                    {speechExpanded ? '▼' : '▶'}
                  </button>
                </div>
                {(speechExpanded && !visibleSections.speechCollapsed) && (
                  <div style={{ lineHeight: '1.4', color: '#e6ffe6', fontSize: '0.85em' }}>
                    The scareware will now speak its threats and demands out loud, simulating how real scareware might use audio to create urgency and pressure. This helps demonstrate the psychological manipulation tactics used by actual malware.
                  </div>
                )}
              </div>
            )}

            {visibleSections.showSafeZone && (
              <div style={{ 
                padding: '0.75rem',
                background: 'rgba(255, 193, 7, 0.2)',
                borderRadius: '6px',
                border: '1px solid rgba(255, 193, 7, 0.4)',
                fontSize: '0.8rem',
                color: '#FFE066',
                flexShrink: 0
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: (safeZoneExpanded && !visibleSections.safeZoneCollapsed) ? '0.25rem' : '0'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>
                    🛡️ Safe Interaction Zone
                  </div>
                  <button
                    onClick={() => setSafeZoneExpanded(!safeZoneExpanded)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      color: '#fff',
                      padding: '0.25rem',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    title={safeZoneExpanded ? 'Collapse Safe Zone' : 'Expand Safe Zone'}
                  >
                    {safeZoneExpanded ? '▼' : '▶'}
                  </button>
                </div>
                {(safeZoneExpanded && !visibleSections.safeZoneCollapsed) && (
                  <div style={{ lineHeight: '1.4', color: '#fff3cd', fontSize: '0.85em' }}>
                    You can safely interact with all buttons and elements in this simulation. This is an educational tool designed to show you how real scareware works. In real life, never click on security warning popups or enter information on suspicious pages.
                  </div>
                )}
              </div>
            )}

            {/* Current Scareware Goal */}
            {visibleSections.showGoal && (
              <div style={{ 
          padding: '0.75rem',
          background: 'rgba(0, 123, 255, 0.2)',
          borderRadius: '6px',
          border: '1px solid rgba(0, 123, 255, 0.4)',
          fontSize: '0.8rem',
                color: '#66b3ff',
                flexShrink: 0
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: (goalExpanded && !visibleSections.goalCollapsed) ? '0.25rem' : '0'
        }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#fff' }}>
                    Current Scareware Goal
          </div>
                  <button
                    onClick={() => setGoalExpanded(!goalExpanded)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      color: '#fff',
                      padding: '0.25rem',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    title={goalExpanded ? 'Collapse Goal' : 'Expand Goal'}
                  >
                    {goalExpanded ? '▼' : '▶'}
                  </button>
          </div>
                {(goalExpanded && !visibleSections.goalCollapsed) && (
                  <>
                    <div style={{ fontSize: '0.85rem', color: '#b0c4d6', fontWeight: 600, marginBottom: '0.4rem', marginTop: '0.1rem' }}>
                      {getScarewareGoal().label}
                    </div>
                    <div style={{ lineHeight: '1.5', color: '#e6f2ff', fontSize: '0.95em' }}>
                      {getScarewareGoal().description}
        </div>
          </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Resize handle */}
        {!collapsed && (
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '30px',
              cursor: 'ns-resize',
              background: 'linear-gradient(to bottom, transparent, rgba(0, 123, 255, 0.4))',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              zIndex: 100000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              transition: 'all 0.2s ease'
            }}
            onMouseDown={handleResizeMouseDown}
            onTouchStart={handleResizeMouseDown}
            onDoubleClick={() => setContentLevel(5.0)}
            title="Drag to resize, double-click to reset to auto size"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to bottom, transparent, rgba(0, 123, 255, 0.6))';
              e.currentTarget.style.borderColor = 'rgba(0, 123, 255, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to bottom, transparent, rgba(0, 123, 255, 0.4))';
              e.currentTarget.style.borderColor = 'rgba(0, 123, 255, 0.6)';
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{
                width: '60px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '2px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
              <div style={{
                fontSize: '0.6rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}>
                RESIZE
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SimulationControls; 