import React from 'react';
import { useClassElement } from '../hooks/useClassElement';

interface ClassExampleProps {
  className?: string;
}

export function ClassExample({ className = '' }: ClassExampleProps) {
  // Example 1: Fake branding class on a logo
  const fakeBrandingLogo = useClassElement({
    elementId: 'norton-logo-example',
    classId: 'fake-branding',
    trigger: 'hover',
    position: 'top'
  });

  // Example 2: Urgency pressure class on a countdown timer
  const urgencyTimer = useClassElement({
    elementId: 'countdown-timer-example',
    classId: 'urgency-pressure',
    trigger: 'both',
    position: 'bottom'
  });

  // Example 3: Fake scan results class on scan results
  const fakeScanResults = useClassElement({
    elementId: 'scan-results-example',
    classId: 'fake-scan-results',
    trigger: 'click',
    position: 'left'
  });

  return (
    <div className={`p-6 bg-gray-100 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Class Framework Examples</h3>
      
      <div className="space-y-4">
        {/* Fake Branding Example */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-medium mb-2">Fake Branding Example</h4>
          <div 
            ref={fakeBrandingLogo.ref}
            {...fakeBrandingLogo.eventHandlers}
            className="inline-block p-2 bg-yellow-400 rounded cursor-help"
          >
            🛡️ Norton Security
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Hover over the logo to see fake branding information
          </p>
        </div>

        {/* Urgency Pressure Example */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-medium mb-2">Urgency Pressure Example</h4>
          <div 
            ref={urgencyTimer.ref}
            {...urgencyTimer.eventHandlers}
            className="inline-block p-2 bg-red-500 text-white rounded cursor-pointer"
          >
            ⏰ System will be destroyed in 2:45
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Hover or click to learn about urgency tactics
          </p>
        </div>

        {/* Fake Scan Results Example */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-medium mb-2">Fake Scan Results Example</h4>
          <div 
            ref={fakeScanResults.ref}
            {...fakeScanResults.eventHandlers}
            className="inline-block p-2 bg-green-500 text-white rounded cursor-pointer"
          >
            🔍 1,247 threats detected
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Click to learn about fake scan results
          </p>
        </div>
      </div>
    </div>
  );
} 