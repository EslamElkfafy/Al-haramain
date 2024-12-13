import React, { useState } from "react";

// Drag and Drop List Item Component
const DraggableListItem = ({
  item,
  index,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <li
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      style={{
        padding: "10px",
        margin: "5px 0",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ddd",
        cursor: "grab",
      }}
    >
      {item.text}
    </li>
  );
};

// Main Priority List Component
export const CustomDragDropList = ({ items, setItems, ComponentItem }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Handle when dragging starts
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  // Allow dropping by preventing the default behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle dropping and reordering
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);
    setItems(updatedItems);
    setDraggedIndex(null);
  };

  return (
    <>
      {items.map((item, index) => (
        <ComponentItem
          key={item.id}
          item={item}
          index={index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </>
  );
};
