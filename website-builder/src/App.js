import React, { useState } from 'react';
import BuilderCanvas from './components/builder/BuilderCanvas';
import ElementsPanel from './components/builder/ElementsPanel';
import PropertiesPanel from './components/builder/PropertiesPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

function App() {
  const [elements, setElements] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  
  const backend = isMobile ? TouchBackend : HTML5Backend;

  const handleUpdateElement = (id, updates) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const handleBulkUpdate = (updates) => {
    setElements(prev => prev.map(el => 
      selectedElements.includes(el.id) ? { ...el, ...updates } : el
    ));
  };

  return (
    <DndProvider backend={backend}>
      <div className="app">
        <header className="app-header">
          <h1>Website Builder</h1>
          {selectedElements.length > 0 && (
            <div className="selection-count">
              {selectedElements.length} element{selectedElements.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </header>
        <div className="builder-container">
          <ElementsPanel />
          <BuilderCanvas 
            elements={elements} 
            setElements={setElements}
            selectedElements={selectedElements}
            setSelectedElements={setSelectedElements}
          />
          <PropertiesPanel 
            selectedElements={selectedElements}
            elements={elements}
            onUpdate={handleUpdateElement}
            onBulkUpdate={handleBulkUpdate}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;

// import React, { useState } from 'react';
// import BuilderCanvas from './components/builder/BuilderCanvas';
// import ElementsPanel from './components/builder/ElementsPanel';
// import PropertiesPanel from './components/builder/PropertiesPanel';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';
// import { isMobile } from 'react-device-detect';

// function App() {
//   const [elements, setElements] = useState([]);
//   const [selectedElements, setSelectedElements] = useState([]);
  
//   const backend = isMobile ? TouchBackend : HTML5Backend;

//   const handleUpdateElement = (id, updates) => {
//     setElements(prev => prev.map(el => 
//       el.id === id ? { ...el, ...updates } : el
//     ));
//   };

//   const handleBulkUpdate = (updates) => {
//     setElements(prev => prev.map(el => 
//       selectedElements.includes(el.id) ? { ...el, ...updates } : el
//     ));
//   };

//   const handleDeleteElements = (ids) => {
//     setElements(prev => prev.filter(el => !ids.includes(el.id)));
//     setSelectedElements(prev => prev.filter(id => !ids.includes(id)));
//   };

//   return (
//     <DndProvider 
//       backend={backend}
//       options={{ enableMouseEvents: true, enableTouchEvents: true }}
//     >
//       <div className="app">
//         <header className="app-header">
//           <h1>Website Builder</h1>
//           <div className="selection-status">
//             {selectedElements.length > 0 
//               ? `${selectedElements.length} element${selectedElements.length !== 1 ? 's' : ''} selected`
//               : 'No element selected'}
//           </div>
//         </header>
        
//         <div className="builder-container">
//           <ElementsPanel />
          
//           <BuilderCanvas 
//             elements={elements} 
//             setElements={setElements}
//             selectedElements={selectedElements}
//             setSelectedElements={setSelectedElements}
//             onDeleteElements={handleDeleteElements}
//           />
          
//           <PropertiesPanel 
//             selectedElements={selectedElements}
//             elements={elements}
//             onUpdate={handleUpdateElement}
//             onBulkUpdate={handleBulkUpdate}
//           />
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// export default App;