export interface ClassNote {
  id: string;
  title: string;
  description: string;
  category: string;
  severity?: 'info' | 'warning' | 'danger' | 'success';
  examples?: string[];
  tips?: string[];
  externalLinks?: Array<{
    label: string;
    url: string;
  }>;
}

export interface ClassDefinition {
  id: string;
  name: string;
  description: string;
  notes: ClassNote[];
  color?: string;
  icon?: string;
}

export interface ElementClass {
  elementId: string;
  classId: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'both';
  customNote?: Partial<ClassNote>;
}

export interface TooltipPosition {
  x: number;
  y: number;
  element: HTMLElement;
}

export interface ClassFrameworkState {
  classes: Record<string, ClassDefinition>;
  elementClasses: Record<string, ElementClass[]>;
  activeTooltip: {
    elementId: string;
    position: TooltipPosition;
    classId: string;
  } | null;
  isVisible: boolean;
} 