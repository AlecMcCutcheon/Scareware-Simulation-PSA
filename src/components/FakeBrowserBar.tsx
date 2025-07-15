import React from 'react';
import { useClassElement } from '../hooks/useClassElement';

interface FakeBrowserBarProps {
  currentPhase: 'norton' | 'microsoft' | 'google' | 'malwarebytes' | 'generic' | 'advanced' | 'extreme';
}

const FakeBrowserBar: React.FC<FakeBrowserBarProps> = ({ currentPhase }) => {
  // Set up class elements for educational tooltips
  const browserBarElement = useClassElement({
    elementId: 'fake-browser-bar',
    classId: 'fake-browser-bar',
    trigger: 'hover',
    position: 'bottom'
  });

  const urlElement = useClassElement({
    elementId: 'fake-url-text',
    classId: 'fake-url',
    trigger: 'hover',
    position: 'bottom'
  });

  const securityIndicatorElement = useClassElement({
    elementId: 'fake-security-indicator',
    classId: 'fake-security-indicator',
    trigger: 'hover',
    position: 'bottom'
  });

  // Define URL mappings for each scareware phase
  const getUrlForPhase = (phase: string): string => {
    switch (phase) {
      case 'norton':
        return 'https://security.norton.com/scan-results';
      case 'microsoft':
        return 'https://login.microsoftonline.com/security-alert';
      case 'google':
        return 'https://safebrowsing.google.com/security-alert';
      case 'malwarebytes':
        return 'https://www.malwarebytes.com/threat-detection';
      case 'generic':
        return 'https://system-security-alert.com/scan';
      case 'advanced':
        return 'https://critical-security-warning.net/urgent';
      case 'extreme':
        return 'https://emergency-system-protection.com/critical';
      default:
        return 'https://security-alert.com/scan';
    }
  };

  const getFaviconForPhase = (phase: string): string => {
    switch (phase) {
      case 'norton':
        return '🛡️';
      case 'microsoft':
        return '🪟';
      case 'google':
        return '🔍';
      case 'malwarebytes':
        return '🦠';
      case 'generic':
        return '⚠️';
      case 'advanced':
        return '🚨';
      case 'extreme':
        return '💀';
      default:
        return '🌐';
    }
  };

  const currentUrl = getUrlForPhase(currentPhase);
  const favicon = getFaviconForPhase(currentPhase);

  return (
    <div 
      ref={browserBarElement.ref}
      {...browserBarElement.eventHandlers}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        zIndex: 999999,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        pointerEvents: 'auto',
        cursor: 'help',
        userSelect: 'none',
        transition: 'all 0.2s ease'
      }}
      className="safe-zone"
    >
      {/* Back/Forward buttons */}
      <div style={{ display: 'flex', gap: '5px', marginRight: '10px', pointerEvents: 'auto' }}>
        <div style={{
          width: '24px',
          height: '24px',
          background: '#6c757d',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          cursor: 'pointer',
          pointerEvents: 'auto'
        }}>
          ←
        </div>
        <div style={{
          width: '24px',
          height: '24px',
          background: '#6c757d',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          cursor: 'pointer',
          pointerEvents: 'auto'
        }}>
          →
        </div>
      </div>

      {/* Refresh button */}
      <div style={{
        width: '24px',
        height: '24px',
        background: '#6c757d',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer',
        marginRight: '10px',
        pointerEvents: 'auto'
      }}>
        ↻
      </div>

      {/* URL bar */}
      <div 
        style={{
          flex: 1,
          height: '28px',
          background: 'white',
          border: '1px solid #ced4da',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          gap: '8px',
          pointerEvents: 'auto',
          position: 'relative',
          zIndex: 1
        }}
        className="safe-zone browser-bar-safe-zone"
        data-browser-bar="true"
        data-no-hijack="true"
      >
        {/* Security indicator */}
        <div 
          ref={securityIndicatorElement.ref}
          {...securityIndicatorElement.eventHandlers}
          className="safe-zone"
          style={{
            width: '16px',
            height: '16px',
            background: '#dc3545',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'white',
            cursor: 'help'
          }}
        >
          ⚠️
        </div>
        
        {/* Favicon */}
        <span style={{ fontSize: '16px' }}>{favicon}</span>
        
        {/* URL text */}
        <span 
          ref={urlElement.ref}
          {...urlElement.eventHandlers}
          className="safe-zone"
          style={{ 
            color: '#495057',
            fontFamily: 'monospace',
            fontSize: '13px',
            flex: 1,
            cursor: 'help',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#007bff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#495057';
          }}
        >
          {currentUrl}
        </span>
      </div>

      {/* Menu button */}
      <div style={{
        width: '24px',
        height: '24px',
        background: '#6c757d',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        cursor: 'pointer',
        marginLeft: '10px',
        pointerEvents: 'auto'
      }}>
        ⋮
      </div>
    </div>
  );
};

export default FakeBrowserBar; 