import React from 'react';
import { useDrag } from 'react-dnd';
import { elementTypes } from '../../constants/elementTypes';

const DraggableElement = ({ type, name, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag}
      className={`element-item ${isDragging ? 'dragging' : ''}`}
      title={`Drag to add ${name}`}
    >
      <span className="element-icon">{icon}</span>
      <span className="element-name">{name}</span>
    </div>
  );
};

function ElementsPanel() {
  return (
    <div className="elements-panel">
      <h3>Elements</h3>
      <div className="elements-list">
        {elementTypes.map((element) => (
          <DraggableElement 
            key={element.type}
            type={element.type}
            name={element.name}
            icon={element.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default ElementsPanel;