import React, { useCallback, useEffect, useState } from 'react';
import { Task, getTasks } from './services/taskService';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = filter === 'all' ? await getTasks() : await getTasks(filter);
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
      alert('Error loading tasks. Make sure the backend server is running on http://localhost:8080');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>📋 Task Tracker</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <TaskForm onTaskAdded={loadTasks} />
        </section>

        <section className="filter-section">
          <div className="filter-buttons">
            <button 
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'active' : ''}
            >
              All Tasks
            </button>
            <button 
              onClick={() => setFilter('todo')}
              className={filter === 'todo' ? 'active' : ''}
            >
              📝 Todo
            </button>
            <button 
              onClick={() => setFilter('in-progress')}
              className={filter === 'in-progress' ? 'active' : ''}
            >
              ⏳ In Progress
            </button>
            <button 
              onClick={() => setFilter('done')}
              className={filter === 'done' ? 'active' : ''}
            >
              ✅ Done
            </button>
          </div>
        </section>

        <section className="list-section">
          {loading ? <p className="loading">Loading...</p> : <TaskList tasks={tasks} onRefresh={loadTasks} />}
        </section>
      </main>
    </div>
  );
}

export default App;
