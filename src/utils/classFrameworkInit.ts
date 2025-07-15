import React from 'react';
import { classDefinitions } from '../data/classDefinitions';
import { useClassFramework } from '../contexts/ClassFrameworkContext';

export function useClassFrameworkInit() {
  const { addClass } = useClassFramework();

  // Initialize class definitions
  React.useEffect(() => {
    classDefinitions.forEach(classDef => {
      addClass(classDef);
    });
  }, [addClass]);
}

// Alternative: Direct initialization function
export function initializeClassFramework(addClass: (classDef: any) => void) {
  classDefinitions.forEach(classDef => {
    addClass(classDef);
  });
} 