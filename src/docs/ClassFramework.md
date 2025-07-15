# Class Framework Documentation

The Class Framework is a system for adding educational tooltips and information bubbles to various elements in the scareware simulation. It allows you to attach classes (categories) to different UI elements and display helpful information when users hover over or click on them.

## Overview

The framework consists of:
- **Classes**: Categories of scareware tactics (e.g., "Fake Branding", "Urgency Pressure")
- **Notes**: Detailed information about each class with examples, tips, and external links
- **Elements**: UI components that can have classes attached to them
- **Tooltips**: Information bubbles that appear when users interact with classified elements

## Quick Start

### 1. Using the `useClassElement` Hook

The easiest way to attach a class to an element is using the `useClassElement` hook:

```tsx
import { useClassElement } from '../hooks/useClassElement';

function MyComponent() {
  const fakeBrandingElement = useClassElement({
    elementId: 'norton-logo',
    classId: 'fake-branding',
    trigger: 'hover',
    position: 'top'
  });

  return (
    <div 
      ref={fakeBrandingElement.ref}
      {...fakeBrandingElement.eventHandlers}
      className="cursor-help"
    >
      🛡️ Norton Security
    </div>
  );
}
```

### 2. Available Classes

The framework comes with several predefined classes:

- `fake-branding` - Scareware uses fake branding to appear legitimate
- `urgency-pressure` - Creates false urgency to pressure users
- `fake-scan-results` - Displays fake virus scan results
- `browser-hijacking` - Prevents users from closing or navigating away
- `fake-payment` - Presents fake payment forms to steal information
- `social-proof` - Uses fake testimonials and reviews

### 3. Trigger Types

- `hover` - Show tooltip on mouse hover (default)
- `click` - Show tooltip on click/touch
- `both` - Show tooltip on both hover and click

### 4. Position Options

- `top` - Tooltip appears above the element (default)
- `bottom` - Tooltip appears below the element
- `left` - Tooltip appears to the left of the element
- `right` - Tooltip appears to the right of the element

## Advanced Usage

### Adding Custom Classes

You can add new classes programmatically:

```tsx
import { useClassFramework } from '../contexts/ClassFrameworkContext';

function MyComponent() {
  const { addClass } = useClassFramework();

  useEffect(() => {
    addClass({
      id: 'my-custom-class',
      name: 'Custom Scareware Tactic',
      description: 'Description of this tactic',
      icon: '🎭',
      color: '#ff0000',
      notes: [
        {
          id: 'custom-note',
          title: 'How it works',
          description: 'Detailed explanation...',
          category: 'Custom Category',
          severity: 'warning',
          examples: ['Example 1', 'Example 2'],
          tips: ['Tip 1', 'Tip 2'],
          externalLinks: [
            {
              label: 'Learn More',
              url: 'https://example.com'
            }
          ]
        }
      ]
    });
  }, [addClass]);
}
```

### Custom Notes for Specific Elements

You can override the default notes for a specific element:

```tsx
const element = useClassElement({
  elementId: 'specific-element',
  classId: 'fake-branding',
  customNote: {
    title: 'Custom Title for This Element',
    description: 'Custom description specific to this element'
  }
});
```

## Tooltip Content Structure

Each class can have multiple notes, and each note can include:

- **Title**: The main heading
- **Description**: Detailed explanation
- **Category**: Classification of the tactic
- **Severity**: `info`, `warning`, `danger`, or `success`
- **Examples**: List of real-world examples
- **Tips**: Helpful advice for users
- **External Links**: Links to additional resources

## Best Practices

1. **Use Descriptive Element IDs**: Make sure each element has a unique, descriptive ID
2. **Choose Appropriate Triggers**: Use `hover` for quick info, `click` for detailed content
3. **Position Tooltips Carefully**: Consider screen space and element location
4. **Keep Content Concise**: Tooltips should be informative but not overwhelming
5. **Use Severity Levels**: Help users understand the importance of each tactic

## Examples

### Norton Logo with Fake Branding

```tsx
const nortonLogo = useClassElement({
  elementId: 'norton-security-logo',
  classId: 'fake-branding',
  trigger: 'hover'
});

return (
  <img 
    ref={nortonLogo.ref}
    {...nortonLogo.eventHandlers}
    src="/norton-logo.png"
    alt="Norton Security"
    className="cursor-help"
  />
);
```

### Countdown Timer with Urgency Pressure

```tsx
const countdownTimer = useClassElement({
  elementId: 'system-destruction-timer',
  classId: 'urgency-pressure',
  trigger: 'both',
  position: 'bottom'
});

return (
  <div 
    ref={countdownTimer.ref}
    {...countdownTimer.eventHandlers}
    className="text-red-500 font-bold cursor-pointer"
  >
    ⏰ System will be destroyed in 2:45
  </div>
);
```

### Scan Results with Fake Detection

```tsx
const scanResults = useClassElement({
  elementId: 'virus-scan-results',
  classId: 'fake-scan-results',
  trigger: 'click',
  position: 'left'
});

return (
  <div 
    ref={scanResults.ref}
    {...scanResults.eventHandlers}
    className="bg-red-100 p-4 rounded cursor-pointer"
  >
    🔍 1,247 threats detected
  </div>
);
```

## Integration with Existing Components

To add classes to existing components in your scareware simulation:

1. Import the `useClassElement` hook
2. Create a class element configuration
3. Add the `ref` and `eventHandlers` to the target element
4. Test the interaction

The framework is designed to be non-intrusive and can be easily added to existing components without breaking their functionality. 