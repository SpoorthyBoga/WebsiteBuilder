// import React from 'react';
// import { useDrag } from 'react-dnd';
// import { Rnd } from 'react-rnd';
// import { FaTimes, FaCropAlt, FaArrowsAlt } from 'react-icons/fa';

// const Element = ({ element, onClick, isSelected, onDelete, onResize }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'move',
//     item: { id: element.id },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   const handleDelete = (e) => {
//     e.stopPropagation();
//     onDelete([element.id]);
//   };

//   return (
//     <Rnd
//       size={{ 
//         width: element.size?.width || 200, 
//         height: element.size?.height || element.type === 'divider' ? 2 : 100 
//       }}
//       position={{ x: element.position.x, y: element.position.y }}
//       onDragStop={(e, d) => {
//         onResize(element.id, { position: { x: d.x, y: d.y } });
//       }}
//       onResizeStop={(e, direction, ref, delta, position) => {
//         onResize(element.id, {
//           size: {
//             width: parseInt(ref.style.width),
//             height: parseInt(ref.style.height)
//           },
//           position
//         });
//       }}
//       bounds="parent"
//       dragHandleClassName="element-drag-handle"
//       enableResizing={isSelected}
//       disableDragging={!isSelected}
//       minWidth={element.type === 'divider' ? 100 : 80}
//       minHeight={element.type === 'divider' ? 2 : 40}
//       className={`element-container ${isSelected ? 'selected' : ''}`}
//       resizeHandleClasses={{
//         bottomRight: 'resize-handle'
//       }}
//     >
//       <div
//         ref={drag}
//         className={`element ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
//         onClick={(e) => onClick(element, e)}
//         style={{
//           width: '100%',
//           height: '100%',
//           opacity: isDragging ? 0.5 : 1,
//           position: 'relative',
//           overflow: 'hidden',
//           borderRadius: element.type === 'image' ? '4px' : '0'
//         }}
//       >
//         {/* Render element content (same as before) */}
        
//         {isSelected && (
//           <div className="element-controls">
//             {element.type === 'image' && (
//               <button
//                 className="control-btn crop-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   // Handle crop
//                 }}
//                 title="Crop Image"
//               >
//                 <FaCropAlt size={12} />
//               </button>
//             )}
//             <button 
//               className="control-btn delete-btn"
//               onClick={handleDelete}
//               title="Delete Element"
//             >
//               <FaTimes size={12} />
//             </button>
//             <div className="element-drag-handle" title="Drag Element">
//               <FaArrowsAlt size={12} />
//             </div>
//           </div>
//         )}
//       </div>
//     </Rnd>
//   );
// };

// export default Element;
import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { Rnd } from "react-rnd";
import { FaTimes, FaCropAlt, FaArrowsAlt } from "react-icons/fa";

const buttonStyles = {
  primary: "bg-blue-500 text-white p-2 rounded",
  secondary: "bg-gray-500 text-white p-2 rounded",
  outline: "border border-blue-500 text-blue-500 p-2 rounded",
  rounded: "bg-blue-500 text-white rounded-full px-6 py-2",
};

const Element = ({ element, onClick, isSelected, onDelete, onResize, onUpdate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "move",
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [editing, setEditing] = useState(false);
  const textRef = useRef(null);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete([element.id]);
  };

  const handleTextClick = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleTextChange = (e) => {
    onUpdate(element.id, { text: e.target.innerText });
  };

  return (
    <Rnd
      size={{
        width: element.size?.width || 200,
        height: element.size?.height || (element.type === "divider" ? 2 : 100),
      }}
      position={{ x: element.position.x, y: element.position.y }}
      onDragStop={(e, d) => {
        onResize(element.id, { position: { x: d.x, y: d.y } });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onResize(element.id, {
          size: {
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          },
          position,
        });
      }}
      bounds="parent"
      dragHandleClassName="element-drag-handle"
      enableResizing={isSelected}
      disableDragging={!isSelected}
      minWidth={element.type === "divider" ? 100 : 80}
      minHeight={element.type === "divider" ? 2 : 40}
      className={`element-container ${isSelected ? "selected" : ""}`}
      resizeHandleClasses={{
        bottomRight: "resize-handle",
      }}
    >
      <div
        ref={drag}
        className={`element ${isSelected ? "selected" : ""} ${isDragging ? "dragging" : ""}`}
        onClick={(e) => onClick(element, e)}
        style={{
          width: "100%",
          height: "100%",
          opacity: isDragging ? 0.5 : 1,
          position: "relative",
          overflow: "hidden",
          borderRadius: element.type === "image" ? "4px" : "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Render Text Element */}
        {element.type === "text" ? (
          <div
            ref={textRef}
            contentEditable={editing}
            suppressContentEditableWarning={true}
            onClick={handleTextClick}
            onBlur={() => setEditing(false)}
            onInput={handleTextChange}
            style={{
              width: "100%",
              height: "100%",
              cursor: "text",
              outline: editing ? "1px solid blue" : "none",
              padding: "5px",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            {element.text || "Click to edit"}
          </div>
        ) : null}

        {/* Render Button Element */}
        {element.type === "button" ? (
          <button
            className={`${buttonStyles[element.style] || "bg-gray-300 p-2 rounded"}`}
            contentEditable={editing}
            suppressContentEditableWarning={true}
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
            onBlur={() => setEditing(false)}
            onInput={(e) => onUpdate(element.id, { text: e.target.innerText })}
          >
            {element.text || "Click Me"}
          </button>
        ) : null}

        {/* Render Image Element */}
        {element.type === "image" && <img src={element.src} alt="Element" style={{ width: "100%", height: "100%" }} />}

        {isSelected && (
          <div className="element-controls">
            {element.type === "image" && (
              <button
              className={`${buttonStyles[element.style] || "bg-gray-300"} p-2 rounded control-btn crop-btn`}
              onClick={(e) => {
                e.stopPropagation();
                // Handle crop
              }}
              title="Crop Image"
            >
              {element.text || "Click Me"}
              <FaCropAlt size={12} />
            </button>
            
            )}
            <button className="control-btn delete-btn" onClick={handleDelete} title="Delete Element">
              <FaTimes size={12} />
            </button>
            <div className="element-drag-handle" title="Drag Element">
              <FaArrowsAlt size={12} />
            </div>
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default Element;
