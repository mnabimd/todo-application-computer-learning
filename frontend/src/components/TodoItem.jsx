import { useState } from 'react';
import './TodoItem.css';

export default function TodoItem({ todo, onToggle, onDelete, index }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(todo.id);
  };

  return (
    <div
      className={`todo-item glass-card ${todo.completed ? 'completed' : ''} ${
        isDeleting ? 'deleting' : ''
      }`}
      style={{
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div className="todo-item-content">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, todo.completed)}
          />
        </label>
        <div className="todo-text">
          <h4 className="todo-title">{todo.title}</h4>
          {todo.createdAt && (
            <p className="todo-date">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={handleDelete}
          className="btn-icon btn-danger-icon"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
