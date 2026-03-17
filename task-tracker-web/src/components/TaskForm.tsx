import React, { useState } from 'react';
import { addTask } from '../services/taskService';
import '../styles/TaskForm.css';

interface TaskFormProps {
  onTaskAdded: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      setLoading(true);
      await addTask(description);
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
        disabled={loading}
      />
      <button 
        type="submit" 
        className="add-btn"
        disabled={loading || !description.trim()}
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};