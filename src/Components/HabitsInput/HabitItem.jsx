import React from 'react';

const HabitItem = ({ habit, isEditing, editValue, onEdit, onEditChange, onUpdate, onDelete }) => {
  return (
    <li className="flex items-center gap-2 py-1">
      {isEditing ? (
        <>
          <input
            className="border rounded px-2 py-1 flex-1"
            value={editValue}
            onChange={onEditChange}
            onKeyDown={e => e.key === 'Enter' && onUpdate()}
            autoFocus
          />
          <button
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            onClick={onUpdate}
          >
            Update
          </button>
        </>
      ) : (
        <>
          <span className="flex-1">{habit}</span>
          <button
            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default HabitItem; 