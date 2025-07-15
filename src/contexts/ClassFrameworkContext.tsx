import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { 
  ClassFrameworkState, 
  ClassDefinition, 
  ElementClass, 
  ClassNote,
  TooltipPosition 
} from '../types/ClassFramework';

type ClassFrameworkAction =
  | { type: 'ADD_CLASS'; payload: ClassDefinition }
  | { type: 'REMOVE_CLASS'; payload: { classId: string } }
  | { type: 'ATTACH_CLASS'; payload: ElementClass }
  | { type: 'DETACH_CLASS'; payload: { elementId: string; classId: string } }
  | { type: 'SHOW_TOOLTIP'; payload: { elementId: string; position: TooltipPosition; classId: string } }
  | { type: 'HIDE_TOOLTIP' }
  | { type: 'UPDATE_CLASS'; payload: ClassDefinition };

const initialState: ClassFrameworkState = {
  classes: {},
  elementClasses: {},
  activeTooltip: null,
  isVisible: false,
};

function classFrameworkReducer(state: ClassFrameworkState, action: ClassFrameworkAction): ClassFrameworkState {
  switch (action.type) {
    case 'ADD_CLASS':
      return {
        ...state,
        classes: {
          ...state.classes,
          [action.payload.id]: action.payload,
        },
      };

    case 'REMOVE_CLASS':
      const { [action.payload.classId]: removedClass, ...remainingClasses } = state.classes;
      return {
        ...state,
        classes: remainingClasses,
      };

    case 'ATTACH_CLASS':
      const existingClasses = state.elementClasses[action.payload.elementId] || [];
      const isAlreadyAttached = existingClasses.some(ec => ec.classId === action.payload.classId);
      
      if (isAlreadyAttached) {
        return state;
      }

      return {
        ...state,
        elementClasses: {
          ...state.elementClasses,
          [action.payload.elementId]: [...existingClasses, action.payload],
        },
      };

    case 'DETACH_CLASS':
      const elementClasses = state.elementClasses[action.payload.elementId] || [];
      const filteredClasses = elementClasses.filter(ec => ec.classId !== action.payload.classId);
      
      return {
        ...state,
        elementClasses: {
          ...state.elementClasses,
          [action.payload.elementId]: filteredClasses,
        },
      };

    case 'SHOW_TOOLTIP':
      return {
        ...state,
        activeTooltip: {
          elementId: action.payload.elementId,
          position: action.payload.position,
          classId: action.payload.classId,
        },
        isVisible: true,
      };

    case 'HIDE_TOOLTIP':
      return {
        ...state,
        activeTooltip: null,
        isVisible: false,
      };

    case 'UPDATE_CLASS':
      return {
        ...state,
        classes: {
          ...state.classes,
          [action.payload.id]: action.payload,
        },
      };

    default:
      return state;
  }
}

interface ClassFrameworkContextType {
  state: ClassFrameworkState;
  addClass: (classDef: ClassDefinition) => void;
  removeClass: (classId: string) => void;
  attachClass: (elementClass: ElementClass) => void;
  detachClass: (elementId: string, classId: string) => void;
  showTooltip: (elementId: string, position: TooltipPosition, classId: string) => void;
  hideTooltip: () => void;
  updateClass: (classDef: ClassDefinition) => void;
  getClassesForElement: (elementId: string) => ElementClass[];
  getClassDefinition: (classId: string) => ClassDefinition | undefined;
}

const ClassFrameworkContext = createContext<ClassFrameworkContextType | undefined>(undefined);

export function ClassFrameworkProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(classFrameworkReducer, initialState);

  const addClass = useCallback((classDef: ClassDefinition) => {
    dispatch({ type: 'ADD_CLASS', payload: classDef });
  }, []);

  const removeClass = useCallback((classId: string) => {
    dispatch({ type: 'REMOVE_CLASS', payload: { classId } });
  }, []);

  const attachClass = useCallback((elementClass: ElementClass) => {
    dispatch({ type: 'ATTACH_CLASS', payload: elementClass });
  }, []);

  const detachClass = useCallback((elementId: string, classId: string) => {
    dispatch({ type: 'DETACH_CLASS', payload: { elementId, classId } });
  }, []);

  const showTooltip = useCallback((elementId: string, position: TooltipPosition, classId: string) => {
    dispatch({ type: 'SHOW_TOOLTIP', payload: { elementId, position, classId } });
  }, []);

  const hideTooltip = useCallback(() => {
    dispatch({ type: 'HIDE_TOOLTIP' });
  }, []);

  const updateClass = useCallback((classDef: ClassDefinition) => {
    dispatch({ type: 'UPDATE_CLASS', payload: classDef });
  }, []);

  const getClassesForElement = useCallback((elementId: string): ElementClass[] => {
    return state.elementClasses[elementId] || [];
  }, [state.elementClasses]);

  const getClassDefinition = useCallback((classId: string): ClassDefinition | undefined => {
    return state.classes[classId];
  }, [state.classes]);

  const value: ClassFrameworkContextType = {
    state,
    addClass,
    removeClass,
    attachClass,
    detachClass,
    showTooltip,
    hideTooltip,
    updateClass,
    getClassesForElement,
    getClassDefinition,
  };

  return (
    <ClassFrameworkContext.Provider value={value}>
      {children}
    </ClassFrameworkContext.Provider>
  );
}

export function useClassFramework() {
  const context = useContext(ClassFrameworkContext);
  if (context === undefined) {
    throw new Error('useClassFramework must be used within a ClassFrameworkProvider');
  }
  return context;
} 