import React, { useCallback } from 'react';
import ScarewareCollection from './ScarewareCollection';

interface ScarewareSimulationProps {
  currentPhase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme' | 'escape';
  onAdvancePhase: (phase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme' | 'escape') => void;
  onStop: () => void;
  onNortonStateChange?: (escalation: boolean, muted: boolean) => void; // Norton state callback
  onMalwarebytesStateChange?: (escalation: boolean, muted: boolean) => void; // Malwarebytes state callback
}

const ScarewareSimulation: React.FC<ScarewareSimulationProps> = ({
  currentPhase,
  onAdvancePhase,
  onStop,
  onNortonStateChange, // Norton state callback
  onMalwarebytesStateChange // Malwarebytes state callback
}) => {

  const handleAdvancePhase = useCallback((phase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme' | 'escape') => {
    onAdvancePhase(phase);
  }, [onAdvancePhase]);

  return (
    <div className="simulation-content">
      {/* Simulation Content */}
      <ScarewareCollection
        currentPhase={currentPhase}
        onAdvancePhase={handleAdvancePhase}
        onNortonStateChange={onNortonStateChange}
        onMalwarebytesStateChange={onMalwarebytesStateChange}
      />
    </div>
  );
};

export default ScarewareSimulation; 