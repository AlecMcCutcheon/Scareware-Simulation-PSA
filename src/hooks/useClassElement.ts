import { useCallback, useRef, useEffect } from 'react';
import { useClassFramework } from '../contexts/ClassFrameworkContext';
import { ElementClass, TooltipPosition } from '../types/ClassFramework';

interface UseClassElementOptions {
  elementId: string;
  classId: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'both';
  customNote?: Partial<ElementClass['customNote']>;
}

export function useClassElement({
  elementId,
  classId,
  position = 'top',
  trigger = 'hover',
  customNote,
}: UseClassElementOptions) {
  const { attachClass, detachClass, showTooltip, hideTooltip, getClassesForElement } = useClassFramework();
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Attach class to element on mount
  useEffect(() => {
    attachClass({
      elementId,
      classId,
      position,
      trigger,
      customNote,
    });

    return () => {
      detachClass(elementId, classId);
    };
  }, [elementId, classId, position, trigger, customNote, attachClass, detachClass]);

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'click' || !elementRef.current) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Show tooltip after a small delay
    timeoutRef.current = setTimeout(() => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const position: TooltipPosition = {
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
          element: elementRef.current,
        };
        showTooltip(elementId, position, classId);
      }
    }, 300);
  }, [trigger, elementId, classId, showTooltip]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'click') return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Hide tooltip after a small delay
    timeoutRef.current = setTimeout(() => {
      hideTooltip();
    }, 200);
  }, [trigger, hideTooltip]);

  const handleClick = useCallback(() => {
    if (trigger === 'hover' || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const position: TooltipPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      element: elementRef.current,
    };
    showTooltip(elementId, position, classId);
  }, [trigger, elementId, classId, showTooltip]);

  const handleTouchStart = useCallback(() => {
    if (trigger === 'hover' || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const position: TooltipPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      element: elementRef.current,
    };
    showTooltip(elementId, position, classId);
  }, [trigger, elementId, classId, showTooltip]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getEventHandlers = () => {
    const handlers: Record<string, any> = {};

    if (trigger === 'hover' || trigger === 'both') {
      handlers.onMouseEnter = handleMouseEnter;
      handlers.onMouseLeave = handleMouseLeave;
    }

    if (trigger === 'click' || trigger === 'both') {
      handlers.onClick = handleClick;
      handlers.onTouchStart = handleTouchStart;
    }

    return handlers;
  };

  const hasClass = getClassesForElement(elementId).some(ec => ec.classId === classId);

  return {
    ref: elementRef,
    eventHandlers: getEventHandlers(),
    hasClass,
    elementClasses: getClassesForElement(elementId),
  };
} 