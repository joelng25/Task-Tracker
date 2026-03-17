import React from 'react';
import { Task, updateTaskStatus, deleteTask } from '../services/taskService';
import '../styles/TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onRefresh: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onRefresh }) => {
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateTaskStatus(id, newStatus);
      onRefresh();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this task?')) {
      try {
        await deleteTask(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task');
      }
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add one to get started!</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className={`task-item task-${task.status}`}>
            <div className="task-content">
              <p className="task-description">{task.desc}</p>
              <small className="task-meta">
                ID: {task.id} | Created: {new Date(task.createdAt).toLocaleDateString()}
              </small>
            </div>
            <div className="task-actions">
              <select 
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className="status-select"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button 
                onClick={() => handleDelete(task.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};