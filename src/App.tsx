import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ScarewareSimulation from './components/ScarewareSimulation';
import EscapeGuide from './components/EscapeGuide';
import SimulationControls from './components/SimulationControls';
import { useExitFullscreen } from './hooks/useExitFullscreen';
import { GlobalAudioProvider } from './contexts/GlobalAudioContext';
import { ClassFrameworkProvider } from './contexts/ClassFrameworkContext';
import FloatingTooltip from './components/FloatingTooltip';
import { useClassFrameworkInit } from './utils/classFrameworkInit';

interface SimulationState {
  isActive: boolean;
  currentPhase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme';
  nortonEscalation: boolean; // Track Norton escalation state
  malwarebytesEscalation: boolean; // Track Malwarebytes escalation state
}

// Main App component that handles routing
const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <GlobalAudioProvider>
      <ClassFrameworkProvider>
        <Router>
          <AppContent />
        </Router>
        <FloatingTooltip mousePosition={mousePosition} />
      </ClassFrameworkProvider>
    </GlobalAudioProvider>
  );
};

// Inner component that handles the actual app logic
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Speech settings are handled by the useSpeechSettings hook
  // const { isMuted, toggleMuted } = useSpeechSettings();
  
  // Initialize class framework
  useClassFrameworkInit();
  
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isActive: false,
    currentPhase: 'norton',
    nortonEscalation: false, // Initialize Norton escalation state
    malwarebytesEscalation: false // Initialize Malwarebytes escalation state
  });

  // Exit fullscreen when on home page
  useExitFullscreen({
    enabled: location.pathname === '/'
  });

  // Sync URL with current phase
  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    
    if (path && path !== '') {
      const validPhases = ['norton', 'microsoft', 'google', 'malwarebytes', 'generic', 'advanced', 'extreme', 'escape'];
      if (validPhases.includes(path)) {
        setSimulationState(prev => ({
          ...prev,
          isActive: true,
          currentPhase: path as SimulationState['currentPhase']
        }));
      }
    } else if (path === '') {
      // Home page - ensure simulation is inactive
      setSimulationState(prev => ({
        ...prev,
        isActive: false,
        currentPhase: 'norton'
      }));
    }
  }, [location.pathname]);

  const startSimulation = useCallback(() => {
    setSimulationState(prev => ({
      ...prev,
      isActive: true,
      currentPhase: 'norton'
    }));
    navigate('/norton');
  }, [navigate]);

  const stopSimulation = useCallback(() => {
    setSimulationState({
      isActive: false,
      currentPhase: 'norton',
      nortonEscalation: false, // Reset Norton escalation state
      malwarebytesEscalation: false // Reset Malwarebytes escalation state
    });
    navigate('/');
  }, [navigate]);



  const advancePhase = useCallback((phase: SimulationState['currentPhase'] | 'escape') => {
    if (phase === 'escape') {
      navigate('/escape');
    } else {
      setSimulationState(prev => ({
        ...prev,
        currentPhase: phase
      }));
      navigate(`/${phase}`);
    }
  }, [navigate]);

  const resetSimulation = () => {
    // Real scareware technique: Full page reload to completely clear all hijacking
    window.location.href = '/';
  };



  // NEW: Handle Norton state changes
  const handleNortonStateChange = useCallback((escalation: boolean, muted: boolean) => {
    setSimulationState(prev => ({
      ...prev,
      nortonEscalation: escalation
    }));
    // Note: Speech muted state is now handled by the useSpeechSettings hook
  }, []);
  
  // NEW: Handle Malwarebytes state changes
  const handleMalwarebytesStateChange = useCallback((escalation: boolean, muted: boolean) => {
    setSimulationState(prev => ({
      ...prev,
      malwarebytesEscalation: escalation
    }));
    // Note: Speech muted state is now handled by the useSpeechSettings hook
  }, []);

  return (
    <div className="simulation-container">

      
      <Routes>
        {/* Home route - landing page */}
        <Route path="/" element={
          <div className="simulation-content dark-mode">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h1 style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                🚨 Scareware Education Platform
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#b0b0b0', maxWidth: '600px', margin: '0 auto' }}>
                An interactive learning experience to understand and recognize real-world scareware threats
              </p>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #2d2d2d, #1a1a1a)', 
              padding: '2rem', 
              borderRadius: '12px',
              border: '1px solid #4a4a4a',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>🎯 Purpose & Mission</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                This platform was created to help users understand how scareware operates in the real world. 
                By experiencing these techniques in a safe, controlled environment, you'll develop the skills 
                needed to identify and avoid actual threats when they appear.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                Scareware is malicious software that uses psychological manipulation to trick users into 
                believing their computer is infected, then demands payment for fake "security fixes." 
                Understanding these tactics is your first line of defense.
              </p>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #1a2f35, #2d2d2d)', 
              padding: '2rem', 
              borderRadius: '12px',
              border: '1px solid #17a2b8',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: '#17a2b8', marginBottom: '1rem' }}>📚 What You'll Experience</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(23, 162, 184, 0.1)', borderRadius: '8px' }}>
                  <h4 style={{ color: '#17a2b8', marginBottom: '0.5rem' }}>🔍 Realistic Scenarios</h4>
                  <p>Experience authentic-looking scareware from major brands like Norton, Microsoft, and Google</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(23, 162, 184, 0.1)', borderRadius: '8px' }}>
                  <h4 style={{ color: '#17a2b8', marginBottom: '0.5rem' }}>🎭 Psychological Tactics</h4>
                  <p>Learn how scareware uses urgency, fear, and fake authority to manipulate users</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(23, 162, 184, 0.1)', borderRadius: '8px' }}>
                  <h4 style={{ color: '#17a2b8', marginBottom: '0.5rem' }}>🛡️ Defense Strategies</h4>
                  <p>Master the techniques to identify, avoid, and escape real scareware situations</p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #1f3d1f, #2d2d2d)', 
              padding: '2rem', 
              borderRadius: '12px',
              border: '1px solid #28a745',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: '#28a745', marginBottom: '1rem' }}>🎓 Educational Value</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                This tool is designed for cybersecurity education, IT training, and personal awareness. 
                Schools, businesses, and individuals are welcome to use it if they find it helpful for 
                building digital literacy and developing critical thinking skills when encountering 
                suspicious online content.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                By understanding the enemy's tactics, you become better equipped to protect yourself 
                and others from real cyber threats.
              </p>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #2f1f3d, #2d2d2d)', 
              padding: '2rem', 
              borderRadius: '12px',
              border: '1px solid #6f42c1',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: '#6f42c1', marginBottom: '1rem' }}>⚖️ Fair Use & Legal Compliance</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                This simulation operates under fair use principles for educational purposes. The use of 
                brand names, logos, and scareware techniques is intended solely for cybersecurity 
                education and awareness training.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                <strong>Fair Use Factors:</strong>
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', paddingLeft: '2rem' }}>
                <li><strong>Educational Purpose:</strong> Used exclusively for cybersecurity education and awareness</li>
                <li><strong>Non-Commercial:</strong> No profit is generated from this educational tool</li>
                <li><strong>Transformative Use:</strong> Brand elements are used to demonstrate real threats for educational benefit</li>
                <li><strong>Public Benefit:</strong> Helps protect users from actual cyber threats</li>
              </ul>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                This tool is designed to help users recognize and avoid real scareware threats, 
                contributing to public safety and cybersecurity awareness.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button 
                className="button button-primary" 
                onClick={startSimulation}
                style={{ 
                  fontSize: '1.3rem', 
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #007bff, #0056b3)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
                }}
              >
                🚀 Start Scareware Simulation
              </button>
            </div>
          </div>
        } />

        {/* Scareware phase routes */}
        <Route path="/norton" element={
          <ScarewareSimulation
            currentPhase="norton"
            onAdvancePhase={advancePhase}
            onStop={stopSimulation}
            onNortonStateChange={handleNortonStateChange}
          />
        } />
        
        <Route path="/microsoft" element={
          <ScarewareSimulation
            currentPhase="microsoft"
            onAdvancePhase={advancePhase}
            onStop={stopSimulation}
          />
        } />
        
        <Route path="/google" element={
          <ScarewareSimulation
            currentPhase="google"
            onAdvancePhase={advancePhase}
            onStop={stopSimulation}
          />
        } />
        
        <Route path="/malwarebytes" element={
          <ScarewareSimulation
            currentPhase="malwarebytes"
            onAdvancePhase={advancePhase}
            onStop={stopSimulation}
            onMalwarebytesStateChange={handleMalwarebytesStateChange}
          />
        } />
        
        <Route path="/generic" element={
          <ScarewareSimulation
            currentPhase="generic"
            onAdvancePhase={advancePhase}
            onStop={stopSimulation}
          />
        } />
        
        <Route path="/advanced" element={
          <ScarewareSimulation
            currentPhase="advanced"
            onAdvancePhase={advancePhase}
            onStop={stopSimulation}
          />
        } />
        
        <Route path="/extreme" element={
          <ScarewareSimulation
            currentPhase="extreme"
            onAdvancePhase={advancePhase}
            onStop={stopSimulation}
          />
        } />
        
        <Route path="/escape" element={
          <EscapeGuide 
            onRestart={() => advancePhase('norton')}
            onStop={stopSimulation}
          />
        } />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Floating Simulation Controls - Always visible during simulation */}
      {simulationState.isActive && location.pathname !== '/escape' && (
        <SimulationControls
          currentPhase={simulationState.currentPhase}
          onAdvancePhase={advancePhase}
          onReset={resetSimulation}
          nortonEscalation={simulationState.nortonEscalation} // Pass Norton escalation state
          malwarebytesEscalation={simulationState.malwarebytesEscalation} // Pass Malwarebytes escalation state
        />
      )}
    </div>
  );
};

export default App; 