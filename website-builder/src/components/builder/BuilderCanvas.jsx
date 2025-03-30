// 

import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Rnd } from "react-rnd";
import { FaTimes } from "react-icons/fa";

const BuilderCanvas = () => {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const [, drop] = useDrop(() => ({
    accept: "element",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const newElement = {
        id: Date.now(),
        type: item.type,
        text: item.type === "text" ? "Click to edit" : null,
        position: { x: offset.x - 200, y: offset.y - 50 },
        size: { width: 100, height: 100 },
        properties: {},
      };
      setElements((prev) => [...prev, newElement]);
    },
  }));

  const updateElement = (id, newProps) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...newProps } : el))
    );
  };

  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedElementId === id) setSelectedElementId(null);
  };

  const handleImageUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setElements((prev) =>
          prev.map((el) =>
            el.id === id ? { ...el, properties: { ...el.properties, src: reader.result } } : el
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div ref={drop} className="builder-canvas">
      {elements.map((el) => (
        <Rnd
          key={el.id}
          size={{ width: el.size.width, height: el.size.height }}
          position={{ x: el.position.x, y: el.position.y }}
          onDragStop={(e, d) =>
            updateElement(el.id, { position: { x: d.x, y: d.y } })
          }
          onResizeStop={(e, direction, ref, delta, position) => {
            updateElement(el.id, {
              size: {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              },
              position,
            });
          }}
          bounds="parent"
          className={`element-container ${
            selectedElementId === el.id ? "selected" : ""
          }`}
          enableResizing={true}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElementId(el.id);
          }}
        >
          <div className="element" style={{ width: "100%", height: "100%", position: "relative" }}>
            {/* Render Text Elements */}
            {el.type === "text" ? (
              <div
                contentEditable={selectedElementId === el.id}
                suppressContentEditableWarning={true}
                onBlur={(e) => updateElement(el.id, { text: e.target.innerText })}
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: "text",
                  padding: "5px",
                  fontSize: "16px",
                  textAlign: "center",
                  outline: selectedElementId === el.id ? "1px solid blue" : "none",
                }}
              >
                {el.text}
              </div>
            ) : null}

            {/* Render Image Elements */}
            {el.type === "image" ? (
              el.properties.src ? (
                <img
                  src={el.properties.src}
                  alt="Uploaded"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, el.id)} />
              )
            ) : null}

            <button className="delete-btn" onClick={() => deleteElement(el.id)}>
              <FaTimes size={12} />
            </button>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default BuilderCanvas;



// import React, { useState, useRef, useEffect } from 'react';
// import { useDrop } from 'react-dnd';
// import Element from './Element';

// const BuilderCanvas = ({ elements, setElements, selectedElements, setSelectedElements }) => {
//   const canvasRef = useRef(null);
//   const [selectionBox, setSelectionBox] = useState(null);
//   const [isSelecting, setIsSelecting] = useState(false);
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'element',
//     drop: (item, monitor) => {
//       const offset = monitor.getClientOffset();
//       const canvasRect = canvasRef.current.getBoundingClientRect();
//       const dropPosition = offset 
//         ? { 
//             x: offset.x - canvasRect.left - (item.type === 'image' ? 100 : 50), 
//             y: offset.y - canvasRect.top - 50 
//           }
//         : { x: canvasRect.width / 2 - 50, y: 100 };
      
//       addElement(item.type, dropPosition);
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   // -- Event Handlers --
//   const handleCanvasMouseDown = (e) => {
//     if (e.target === canvasRef.current) {
//       const rect = canvasRef.current.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
      
//       setStartPos({ x, y });
//       setIsSelecting(true);
//       setSelectionBox({ x, y, width: 0, height: 0 });
//       setSelectedElements([]);
//     }
//   };

//   const handleCanvasMouseMove = (e) => {
//     if (!isSelecting) return;
    
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
    
//     setSelectionBox({
//       x: Math.min(startPos.x, x),
//       y: Math.min(startPos.y, y),
//       width: Math.abs(x - startPos.x),
//       height: Math.abs(y - startPos.y)
//     });
//   };

//   const handleCanvasMouseUp = () => {
//     if (!isSelecting) return;
    
//     setIsSelecting(false);
//     if (selectionBox.width > 10 && selectionBox.height > 10) {
//       const selectedIds = elements.filter(el => {
//         const elRight = el.position.x + el.size.width;
//         const elBottom = el.position.y + el.size.height;
//         return (
//           el.position.x < selectionBox.x + selectionBox.width &&
//           elRight > selectionBox.x &&
//           el.position.y < selectionBox.y + selectionBox.height &&
//           elBottom > selectionBox.y
//         );
//       }).map(el => el.id);
      
//       setSelectedElements(selectedIds);
//     }
//     setSelectionBox(null);
//   };

//   const handleElementClick = (element, e) => {
//     e.stopPropagation();
    
//     if (e.ctrlKey || e.metaKey) {
//       setSelectedElements(prev => 
//         prev.includes(element.id) 
//           ? prev.filter(id => id !== element.id)
//           : [...prev, element.id]
//       );
//     } else {
//       setSelectedElements([element.id]);
//     }
//   };

//   const handleDeleteElements = (ids) => {
//     setElements(elements.filter(el => !ids.includes(el.id)));
//     setSelectedElements(selectedElements.filter(id => !ids.includes(id)));
//   };

//   const handleResizeElement = (id, updates) => {
//     setElements(elements.map(el => 
//       el.id === id ? { ...el, ...updates } : el
//     ));
//   };

//   // -- Helper Functions --
//   const getDefaultProperties = (type) => {
//     const defaults = {
//       text: { 
//         content: 'Edit me', 
//         fontSize: 16, 
//         color: '#000000',
//         fontFamily: 'Arial',
//         textAlign: 'left',
//         bold: false,
//         italic: false
//       },
//       image: {
//         src: '',
//         borderWidth: 0,
//         borderColor: '#000000',
//         borderRadius: 0,
//         objectFit: 'contain'
//       },
//       button: {
//         text: 'Button',
//         color: '#000000',
//         backgroundColor: '#ffffff',
//         borderWidth: 1,
//         borderRadius: 4,
//         fontSize: 14
//       },
//       shape: {
//         backgroundColor: '#cccccc',
//         borderWidth: 1,
//         borderColor: '#000000',
//         borderRadius: 0
//       }
//     };
//     return defaults[type] || {};
//   };

//   const addElement = (type, position) => {
//     const defaultSize = {
//       text: { width: 200, height: 100 },
//       image: { width: 250, height: 200 },
//       button: { width: 150, height: 50 },
//       shape: { width: 150, height: 150 },
//       divider: { width: 300, height: 2 }
//     };
    
//     const newElement = {
//       id: `element-${Date.now()}`,
//       type,
//       position,
//       size: defaultSize[type],
//       properties: getDefaultProperties(type),
//     };
//     setElements([...elements, newElement]);
//     setSelectedElements([newElement.id]);
//   };

//   // -- Keyboard Controls --
//   const handleKeyDown = (e) => {
//     if (e.key === 'Delete' && selectedElements.length > 0) {
//       handleDeleteElements(selectedElements);
//     }
    
//     if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
//       e.preventDefault();
//       const moveAmount = e.shiftKey ? 10 : 1;
      
//       setElements(elements.map(el => {
//         if (selectedElements.includes(el.id)) {
//           const newPosition = { ...el.position };
//           if (e.key === 'ArrowUp') newPosition.y -= moveAmount;
//           if (e.key === 'ArrowDown') newPosition.y += moveAmount;
//           if (e.key === 'ArrowLeft') newPosition.x -= moveAmount;
//           if (e.key === 'ArrowRight') newPosition.x += moveAmount;
//           return { ...el, position: newPosition };
//         }
//         return el;
//       }));
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, elements]);

//   return (
//     <div 
//       ref={node => {
//         canvasRef.current = node;
//         drop(node);
//       }}
//       className={`builder-canvas ${isOver ? 'drop-active' : ''}`}
//       onClick={(e) => e.target === canvasRef.current && setSelectedElements([])}
//       onMouseDown={handleCanvasMouseDown}
//       onMouseMove={handleCanvasMouseMove}
//       onMouseUp={handleCanvasMouseUp}
//       onMouseLeave={handleCanvasMouseUp}
//       tabIndex="0"
//     >
//       {elements.map((element) => (
//         <Element
//           key={element.id}
//           element={element}
//           onClick={handleElementClick}
//           isSelected={selectedElements.includes(element.id)}
//           onDelete={handleDeleteElements}
//           onResize={handleResizeElement}
//         />
//       ))}
      
//       {selectionBox && (
//         <div 
//           className="selection-box"
//           style={{
//             left: `${selectionBox.x}px`,
//             top: `${selectionBox.y}px`,
//             width: `${selectionBox.width}px`,
//             height: `${selectionBox.height}px`
//           }}
//         />
//       )}
      
//       {elements.length === 0 && (
//         <div className="empty-canvas">
//           <p>Drag elements here to start building</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuilderCanvas;