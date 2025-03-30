export const elementTypes = [
    { 
      type: 'text', 
      name: 'Text', 
      icon: 'T',
      defaultProperties: {
        content: 'New Text',
        fontSize: 16,
        color: '#000000'
      }
    },
    { 
      type: 'image', 
      name: 'Image', 
      icon: '📷',
      defaultProperties: {
        src: '',
        alt: 'Image',
        width: 200
      }
    },
    { 
      type: 'button', 
      name: 'Button', 
      icon: '🔘',
      defaultProperties: {
        text: 'Click Me',
        color: '#007bff',
        size: 'medium'
      }
    },
    { 
      type: 'divider', 
      name: 'Divider', 
      icon: '―',
      defaultProperties: {
        thickness: 1,
        color: '#cccccc',
        width: '100%'
      }
    }
  ];