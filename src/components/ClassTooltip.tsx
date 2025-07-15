import React, { useEffect, useRef } from 'react';
import { useClassFramework } from '../contexts/ClassFrameworkContext';
import { ClassNote } from '../types/ClassFramework';

interface ClassTooltipProps {
  className?: string;
}

export function ClassTooltip({ className = '' }: ClassTooltipProps) {
  const { state, hideTooltip } = useClassFramework();
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        hideTooltip();
      }
    };

    if (state.isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [state.isVisible, hideTooltip]);

  console.log('ClassTooltip render - state:', {
    isVisible: state.isVisible,
    activeTooltip: state.activeTooltip,
    classes: Object.keys(state.classes)
  });

  if (!state.isVisible || !state.activeTooltip) {
    console.log('ClassTooltip not visible or no active tooltip');
    return null;
  }

  const { position, classId } = state.activeTooltip;
  const classDef = state.classes[classId];
  
  console.log('ClassTooltip - classId:', classId, 'classDef:', classDef);
  
  if (!classDef) {
    console.log('ClassTooltip - no class definition found for:', classId);
    return null;
  }

  // Calculate tooltip position
  const getTooltipStyle = () => {
    const rect = position.element.getBoundingClientRect();
    const tooltipWidth = 320; // Approximate tooltip width
    const tooltipHeight = 200; // Approximate tooltip height
    const offset = 10;

    let left = position.x;
    let top = position.y;

    console.log('Original position:', { left, top });
    console.log('Element rect:', rect);
    console.log('Window dimensions:', { width: window.innerWidth, height: window.innerHeight });

    // Adjust position to keep tooltip in viewport
    if (left + tooltipWidth > window.innerWidth) {
      left = window.innerWidth - tooltipWidth - offset;
    }
    if (top + tooltipHeight > window.innerHeight) {
      top = window.innerHeight - tooltipHeight - offset;
    }
    if (left < offset) left = offset;
    if (top < offset) top = offset;

    console.log('Adjusted position:', { left, top });

    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'danger': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'info':
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const renderNote = (note: ClassNote) => (
    <div key={note.id} className="mb-4 last:mb-0">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-semibold text-gray-900">{note.title}</h4>
        {note.severity && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(note.severity)}`}>
            {note.severity.toUpperCase()}
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{note.description}</p>
      
      {note.examples && note.examples.length > 0 && (
        <div className="mb-3">
          <h5 className="text-xs font-medium text-gray-600 mb-1">Examples:</h5>
          <ul className="text-xs text-gray-600 space-y-1">
            {note.examples.map((example, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {note.tips && note.tips.length > 0 && (
        <div className="mb-3">
          <h5 className="text-xs font-medium text-gray-600 mb-1">Tips:</h5>
          <ul className="text-xs text-gray-600 space-y-1">
            {note.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {note.externalLinks && note.externalLinks.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-gray-600 mb-1">Learn More:</h5>
          <div className="space-y-1">
            {note.externalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline block"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const tooltipStyle = getTooltipStyle();
  console.log('Tooltip position:', tooltipStyle);
  
  // Mobile detection
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  return (
    <div
      ref={tooltipRef}
      className={`fixed w-80 rounded-lg shadow-xl border p-4 max-h-96 overflow-y-auto ${className}`}
      style={{
        ...tooltipStyle,
        zIndex: 99999,
        backgroundColor: 'red', // Temporary: make it bright red for debugging
        border: '3px solid yellow', // Temporary: make border very visible
        color: 'white', // Temporary: white text on red background
        fontSize: '16px', // Temporary: larger text
        fontWeight: 'bold', // Temporary: bold text
        isolation: 'isolate', // Create new stacking context like simulation controls
        backdropFilter: 'blur(1px)', // Create new stacking context
        pointerEvents: 'auto', // Ensure interactivity
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)', // Strong shadow like simulation controls
        borderRadius: '12px' // Match simulation controls style
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {classDef.icon && (
            <span className="text-lg">{classDef.icon}</span>
          )}
          <h3 className="font-bold text-gray-900">{classDef.name}</h3>
        </div>
        <button
          onClick={hideTooltip}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4">{classDef.description}</p>

      {/* Notes */}
      <div className="space-y-3">
        {classDef.notes.map(renderNote)}
      </div>

      {/* Footer */}
      {!isMobile && (
        <div className="mt-4 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Hover or click elements with this class to learn more about scareware tactics.
          </p>
        </div>
      )}
    </div>
  );
} 