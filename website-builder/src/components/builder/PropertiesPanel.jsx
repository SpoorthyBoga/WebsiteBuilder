// import React, { useState } from 'react';
// import { HexColorPicker } from 'react-colorful';
// import { FiMinus, FiPlus } from 'react-icons/fi';

// const PropertiesPanel = ({ selectedElement, setElements }) => {
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [activeColorField, setActiveColorField] = useState(null);

//   const handlePropertyChange = (property, value) => {
//     setElements(prev => prev.map(el => 
//       el.id === selectedElement.id 
//         ? { 
//             ...el, 
//             properties: { 
//               ...el.properties, 
//               [property]: value 
//             } 
//           } 
//         : el
//     ));
//   };

//   const handleSizeChange = (dimension, value) => {
//     setElements(prev => prev.map(el => 
//       el.id === selectedElement.id 
//         ? { 
//             ...el, 
//             size: { 
//               ...el.size, 
//               [dimension]: parseInt(value) || 0 
//             } 
//           } 
//         : el
//     ));
//   };

//   const handlePositionChange = (axis, value) => {
//     setElements(prev => prev.map(el => 
//       el.id === selectedElement.id 
//         ? { 
//             ...el, 
//             position: { 
//               ...el.position, 
//               [axis]: parseInt(value) || 0 
//             } 
//           } 
//         : el
//     ));
//   };

//   const openColorPicker = (field) => {
//     setActiveColorField(field);
//     setShowColorPicker(true);
//   };

//   if (!selectedElement) {
//     return (
//       <div className="properties-panel empty">
//         <div className="empty-state">
//           <div className="empty-icon">👈</div>
//           <h4>No Element Selected</h4>
//           <p>Click on an element or drag a new one to edit its properties</p>
//         </div>
//       </div>
//     );
//   }

//   const renderPropertyControls = () => {
//     switch (selectedElement.type) {
//       case 'text':
//         return (
//           <>
//             <div className="form-group">
//               <label>Text Content</label>
//               <textarea
//                 value={selectedElement.properties.content}
//                 onChange={(e) => handlePropertyChange('content', e.target.value)}
//                 rows={3}
//               />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Font Size</label>
//                 <div className="number-input">
//                   <button 
//                     onClick={() => handlePropertyChange('fontSize', Math.max(8, selectedElement.properties.fontSize - 1))}
//                   >
//                     <FiMinus />
//                   </button>
//                   <input
//                     type="number"
//                     value={selectedElement.properties.fontSize}
//                     onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value))}
//                     min="8"
//                   />
//                   <button 
//                     onClick={() => handlePropertyChange('fontSize', selectedElement.properties.fontSize + 1)}
//                   >
//                     <FiPlus />
//                   </button>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.color }}
//                   onClick={() => openColorPicker('color')}
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={selectedElement.properties.bold || false}
//                   onChange={(e) => handlePropertyChange('bold', e.target.checked)}
//                 />
//                 Bold Text
//               </label>
//             </div>
//           </>
//         );
//       case 'image':
//         return (
//           <>
//             <div className="form-group">
//               <label>Image URL</label>
//               <input
//                 type="text"
//                 value={selectedElement.properties.src}
//                 onChange={(e) => handlePropertyChange('src', e.target.value)}
//                 placeholder="Enter image URL"
//               />
//             </div>
//             <div className="form-group">
//               <label>Image Fit</label>
//               <select
//                 value={selectedElement.properties.objectFit || 'contain'}
//                 onChange={(e) => handlePropertyChange('objectFit', e.target.value)}
//               >
//                 <option value="contain">Contain (Fit)</option>
//                 <option value="cover">Cover (Fill)</option>
//                 <option value="fill">Stretch</option>
//                 <option value="none">Original Size</option>
//               </select>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={selectedElement.properties.lockAspect || false}
//                     onChange={(e) => handlePropertyChange('lockAspect', e.target.checked)}
//                   />
//                   Lock Aspect
//                 </label>
//               </div>
//               {selectedElement.properties.lockAspect && (
//                 <div className="form-group">
//                   <label>Aspect Ratio</label>
//                   <select
//                     value={selectedElement.properties.aspectRatio || '16/9'}
//                     onChange={(e) => handlePropertyChange('aspectRatio', e.target.value)}
//                   >
//                     <option value="1/1">Square (1:1)</option>
//                     <option value="4/3">Standard (4:3)</option>
//                     <option value="16/9">Widescreen (16:9)</option>
//                     <option value="3/2">Photo (3:2)</option>
//                   </select>
//                 </div>
//               )}
//             </div>
//           </>
//         );
//       case 'button':
//         return (
//           <>
//             <div className="form-group">
//               <label>Button Text</label>
//               <input
//                 type="text"
//                 value={selectedElement.properties.text}
//                 onChange={(e) => handlePropertyChange('text', e.target.value)}
//               />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.color }}
//                   onClick={() => openColorPicker('color')}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Size</label>
//                 <select
//                   value={selectedElement.properties.size}
//                   onChange={(e) => handlePropertyChange('size', e.target.value)}
//                 >
//                   <option value="small">Small</option>
//                   <option value="medium">Medium</option>
//                   <option value="large">Large</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Font Size</label>
//                 <div className="number-input">
//                   <button 
//                     onClick={() => handlePropertyChange('fontSize', Math.max(8, (selectedElement.properties.fontSize || 16) - 1))}

//                   >
//                     <FiMinus />
//                   </button>
//                   <input
//                     type="number"
//                     value={selectedElement.properties.fontSize || 16}
//                     onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value))}
//                     min="8"
//                   />
//                   <button 
//                     onClick={() => handlePropertyChange('fontSize', (selectedElement.properties.fontSize || 16) + 1)}
//                   >
//                     <FiPlus />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         );
//       case 'divider':
//         return (
//           <>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Thickness</label>
//                 <div className="number-input">
//                   <button 
//                     onClick={() => handlePropertyChange('thickness', Math.max(1, selectedElement.properties.thickness - 1))}
//                   >
//                     <FiMinus />
//                   </button>
//                   <input
//                     type="number"
//                     value={selectedElement.properties.thickness}
//                     onChange={(e) => handlePropertyChange('thickness', parseInt(e.target.value))}
//                     min="1"
//                   />
//                   <button 
//                     onClick={() => handlePropertyChange('thickness', selectedElement.properties.thickness + 1)}
//                   >
//                     <FiPlus />
//                   </button>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.color }}
//                   onClick={() => openColorPicker('color')}
//                 />
//               </div>
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="properties-panel">
//       <div className="panel-header">
//         <h3>
//           {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} Properties
//         </h3>
//       </div>
      
//       <div className="panel-section">
//         <h4 className="section-title">Dimensions</h4>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Width (px)</label>
//             <input
//               type="number"
//               value={selectedElement.size?.width || 200}
//               onChange={(e) => handleSizeChange('width', e.target.value)}
//               min="50"
//             />
//           </div>
//           <div className="form-group">
//             <label>Height (px)</label>
//             <input
//               type="number"
//               value={selectedElement.size?.height || 
//                     (selectedElement.type === 'divider' ? 2 : 100)}
//               onChange={(e) => handleSizeChange('height', e.target.value)}
//               min={selectedElement.type === 'divider' ? '1' : '20'}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="panel-section">
//         <h4 className="section-title">Position</h4>
//         <div className="form-row">
//           <div className="form-group">
//             <label>X (px)</label>
//             <input
//               type="number"
//               value={selectedElement.position?.x || 0}
//               onChange={(e) => handlePositionChange('x', e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Y (px)</label>
//             <input
//               type="number"
//               value={selectedElement.position?.y || 0}
//               onChange={(e) => handlePositionChange('y', e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="panel-section">
//         <h4 className="section-title">Properties</h4>
//         <div className="property-controls">
//           {renderPropertyControls()}
//         </div>
//       </div>

//       {showColorPicker && (
//         <div className="color-picker-modal">
//           <div className="color-picker-container">
//             <HexColorPicker
//               color={selectedElement.properties[activeColorField]}
//               onChange={(color) => handlePropertyChange(activeColorField, color)}
//             />
//             <button 
//               className="close-picker-btn"
//               onClick={() => setShowColorPicker(false)}
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertiesPanel;
import React, { useState } from "react";
import Button from "../ui/Button";

const buttonStyles = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-500 text-white",
  outline: "border border-blue-500 text-blue-500",
  rounded: "bg-blue-500 text-white rounded-full px-6",
};

export default function WebsiteBuilder() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      content: type === "text" ? "Click to edit" : "",
      style: type === "button" ? "primary" : "",
    };
    setElements([...elements, newElement]);
  };

  const selectElement = (id) => {
    const element = elements.find((el) => el.id === id);
    setSelectedElement(element);
  };

  const updateElement = (key, value) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === selectedElement.id ? { ...el, [key]: value } : el
      )
    );
    setSelectedElement((prev) => ({ ...prev, [key]: value }));
  };
  

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-100 p-4">
        <h2 className="font-bold">Elements</h2>
        <button onClick={() => addElement("text")}>Text</button>
        <button onClick={() => addElement("button")}>Button</button>
      </aside>
      <main className="flex-1 p-4 relative">
        {elements.map((el) => (
          <div
            key={el.id}
            onClick={() => selectElement(el.id)}
            className={`p-2 m-2 border ${selectedElement?.id === el.id ? "border-blue-500" : ""}`}
          >
            {el.type === "text" ? (
              <span>{el.content}</span>
            ) : el.type === "button" ? (
              <button className={buttonStyles[el.style] || "bg-gray-300"}>Button</button>
            ) : null}
          </div>
        ))}
      </main>
      <aside className="w-1/4 bg-gray-100 p-4">
        <h2 className="font-bold">Properties</h2>
        {selectedElement ? (
          <div>
            {selectedElement.type === "text" && (
              <input
                type="text"
                value={selectedElement.content}
                onChange={(e) => updateElement("content", e.target.value)}
              />
            )}
            {selectedElement.type === "button" && (
  <div>
    <input
      type="text"
      value={selectedElement.content}
      onChange={(e) => updateElement("content", e.target.value)}
      placeholder="Button Text"
    />
    <select
      value={selectedElement.style}
      onChange={(e) => updateElement("style", e.target.value)}
    >
      {Object.keys(buttonStyles).map((style) => (
        <option key={style} value={style}>
          {style}
        </option>
      ))}
    </select>
  </div>
)}

          </div>
        ) : (
          <p>No element selected</p>
        )}
      </aside>
    </div>
  );
}


// import React, { useState } from 'react';
// import { HexColorPicker } from 'react-colorful';
// import { FiMinus, FiPlus } from 'react-icons/fi';

// const PropertiesPanel = ({ selectedElement, setElements }) => {
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [activeColorField, setActiveColorField] = useState(null);

//   const handlePropertyChange = (property, value) => {
//     setElements(prev => prev.map(el => 
//       el.id === selectedElement.id 
//         ? { 
//             ...el, 
//             properties: { 
//               ...el.properties, 
//               [property]: value 
//             } 
//           } 
//         : el
//     ));
//   };

//   const handleSizeChange = (dimension, value) => {
//     setElements(prev => prev.map(el => 
//       el.id === selectedElement.id 
//         ? { 
//             ...el, 
//             size: { 
//               ...el.size, 
//               [dimension]: parseInt(value) || 0 
//             } 
//           } 
//         : el
//     ));
//   };

//   const handlePositionChange = (axis, value) => {
//     setElements(prev => prev.map(el => 
//       el.id === selectedElement.id 
//         ? { 
//             ...el, 
//             position: { 
//               ...el.position, 
//               [axis]: parseInt(value) || 0 
//             } 
//           } 
//         : el
//     ));
//   };

//   const openColorPicker = (field) => {
//     setActiveColorField(field);
//     setShowColorPicker(true);
//   };

//   if (!selectedElement) {
//     return (
//       <div className="properties-panel empty">
//         <div className="empty-state">
//           <div className="empty-icon">👈</div>
//           <h4>No Element Selected</h4>
//           <p>Click on an element or drag a new one to edit its properties</p>
//         </div>
//       </div>
//     );
//   }

//   const renderPropertyControls = () => {
//     switch (selectedElement.type) {
//       case 'text':
//         return (
//           <>
//             <div className="form-group">
//               <label>Text Content</label>
//               <textarea
//                 value={selectedElement.properties.content}
//                 onChange={(e) => handlePropertyChange('content', e.target.value)}
//                 rows={3}
//               />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Font Family</label>
//                 <select
//                   value={selectedElement.properties.fontFamily}
//                   onChange={(e) => handlePropertyChange('fontFamily', e.target.value)}
//                 >
//                   <option value="Arial">Arial</option>
//                   <option value="Helvetica">Helvetica</option>
//                   <option value="Times New Roman">Times New Roman</option>
//                   <option value="Verdana">Verdana</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Text Align</label>
//                 <select
//                   value={selectedElement.properties.textAlign}
//                   onChange={(e) => handlePropertyChange('textAlign', e.target.value)}
//                 >
//                   <option value="left">Left</option>
//                   <option value="center">Center</option>
//                   <option value="right">Right</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Font Size</label>
//                 <div className="number-input">
//                   <button 
//                     onClick={() => handlePropertyChange('fontSize', Math.max(8, selectedElement.properties.fontSize - 1))}
//                   >
//                     <FiMinus />
//                   </button>
//                   <input
//                     type="number"
//                     value={selectedElement.properties.fontSize}
//                     onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value))}
//                     min="8"
//                   />
//                   <button 
//                     onClick={() => handlePropertyChange('fontSize', selectedElement.properties.fontSize + 1)}
//                   >
//                     <FiPlus />
//                   </button>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.color }}
//                   onClick={() => openColorPicker('color')}
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={selectedElement.properties.bold || false}
//                     onChange={(e) => handlePropertyChange('bold', e.target.checked)}
//                   />
//                   Bold
//                 </label>
//               </div>
//               <div className="form-group">
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={selectedElement.properties.italic || false}
//                     onChange={(e) => handlePropertyChange('italic', e.target.checked)}
//                   />
//                   Italic
//                 </label>
//               </div>
//             </div>
//           </>
//         );
//       case 'image':
//         return (
//           <>
//             <div className="form-group">
//               <label>Image URL</label>
//               <input
//                 type="text"
//                 value={selectedElement.properties.src}
//                 onChange={(e) => handlePropertyChange('src', e.target.value)}
//                 placeholder="Enter image URL"
//               />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Border Width</label>
//                 <input
//                   type="number"
//                   value={selectedElement.properties.borderWidth || 0}
//                   onChange={(e) => handlePropertyChange('borderWidth', parseInt(e.target.value))}
//                   min="0"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Border Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.borderColor || '#000000' }}
//                   onClick={() => openColorPicker('borderColor')}
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Border Radius</label>
//                 <input
//                   type="number"
//                   value={selectedElement.properties.borderRadius || 0}
//                   onChange={(e) => handlePropertyChange('borderRadius', parseInt(e.target.value))}
//                   min="0"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Object Fit</label>
//                 <select
//                   value={selectedElement.properties.objectFit || 'contain'}
//                   onChange={(e) => handlePropertyChange('objectFit', e.target.value)}
//                 >
//                   <option value="contain">Contain</option>
//                   <option value="cover">Cover</option>
//                   <option value="fill">Fill</option>
//                 </select>
//               </div>
//             </div>
//           </>
//         );
//       case 'button':
//         return (
//           <>
//             <div className="form-group">
//               <label>Button Text</label>
//               <input
//                 type="text"
//                 value={selectedElement.properties.text}
//                 onChange={(e) => handlePropertyChange('text', e.target.value)}
//               />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Background Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.backgroundColor || '#ffffff' }}
//                   onClick={() => openColorPicker('backgroundColor')}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Text Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.color || '#000000' }}
//                   onClick={() => openColorPicker('color')}
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Border Radius</label>
//                 <input
//                   type="number"
//                   value={selectedElement.properties.borderRadius || 0}
//                   onChange={(e) => handlePropertyChange('borderRadius', parseInt(e.target.value))}
//                   min="0"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Border Width</label>
//                 <input
//                   type="number"
//                   value={selectedElement.properties.borderWidth || 0}
//                   onChange={(e) => handlePropertyChange('borderWidth', parseInt(e.target.value))}
//                   min="0"
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Font Size</label>
//               <div className="number-input">
//                 <button 
//                   onClick={() => handlePropertyChange('fontSize', Math.max(8, (selectedElement.properties.fontSize || 16) - 1))}
//                 >
//                   <FiMinus />
//                 </button>
//                 <input
//                   type="number"
//                   value={selectedElement.properties.fontSize || 16}
//                   onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value))}
//                   min="8"
//                 />
//                 <button 
//                   onClick={() => handlePropertyChange('fontSize', (selectedElement.properties.fontSize || 16) + 1)}
//                 >
//                   <FiPlus />
//                 </button>
//               </div>
//             </div>
//           </>
//         );
//       case 'shape':
//         return (
//           <>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Background Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.backgroundColor || '#cccccc' }}
//                   onClick={() => openColorPicker('backgroundColor')}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Border Color</label>
//                 <div 
//                   className="color-preview" 
//                   style={{ backgroundColor: selectedElement.properties.borderColor || '#000000' }}
//                   onClick={() => openColorPicker('borderColor')}
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Border Width</label>
//                 <input
//                   type="number"
//                   value={selectedElement.properties.borderWidth || 0}
//                   onChange={(e) => handlePropertyChange('borderWidth', parseInt(e.target.value))}
//                   min="0"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Border Radius</label>
//                 <input
//                   type="number"
//                   value={selectedElement.properties.borderRadius || 0}
//                   onChange={(e) => handlePropertyChange('borderRadius', parseInt(e.target.value))}
//                   min="0"
//                 />
//               </div>
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="properties-panel">
//       <div className="panel-header">
//         <h3>
//           {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} Properties
//         </h3>
//       </div>
      
//       <div className="panel-section">
//         <h4 className="section-title">Dimensions</h4>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Width (px)</label>
//             <input
//               type="number"
//               value={selectedElement.size?.width || 200}
//               onChange={(e) => handleSizeChange('width', e.target.value)}
//               min="50"
//             />
//           </div>
//           <div className="form-group">
//             <label>Height (px)</label>
//             <input
//               type="number"
//               value={selectedElement.size?.height || 
//                     (selectedElement.type === 'divider' ? 2 : 100)}
//               onChange={(e) => handleSizeChange('height', e.target.value)}
//               min={selectedElement.type === 'divider' ? '1' : '20'}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="panel-section">
//         <h4 className="section-title">Position</h4>
//         <div className="form-row">
//           <div className="form-group">
//             <label>X (px)</label>
//             <input
//               type="number"
//               value={selectedElement.position?.x || 0}
//               onChange={(e) => handlePositionChange('x', e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Y (px)</label>
//             <input
//               type="number"
//               value={selectedElement.position?.y || 0}
//               onChange={(e) => handlePositionChange('y', e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="panel-section">
//         <h4 className="section-title">Properties</h4>
//         <div className="property-controls">
//           {renderPropertyControls()}
//         </div>
//       </div>

//       {showColorPicker && (
//         <div className="color-picker-modal">
//           <div className="color-picker-container">
//             <HexColorPicker
//               color={selectedElement.properties[activeColorField]}
//               onChange={(color) => handlePropertyChange(activeColorField, color)}
//             />
//             <button 
//               className="close-picker-btn"
//               onClick={() => setShowColorPicker(false)}
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertiesPanel;