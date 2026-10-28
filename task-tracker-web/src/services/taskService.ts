// Baked in at build time. Vite only exposes variables that start with VITE_.
// Unset locally -> http://localhost:8080/api
// Docker/Render -> /api (nginx proxies that path)
// Vercel -> set VITE_API_URL to the public API, including /api
const configured = import.meta.env.VITE_API_URL?.trim();
const API_URL = (configured ? configured : 'http://localhost:8080/api').replace(/\/+$/, '');

export interface Task {
  id: number;
  desc: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
  updatedAt: string;
}

export const getTasks = async (status?: string): Promise<Task[]> => {
  const url = status ? `${API_URL}/tasks?status=${status}` : `${API_URL}/tasks`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data || [];
};

export const addTask = async (description: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description })
  });
  const data = await response.json();
  return data.data;
};

export const updateTaskStatus = async (id: number, status: string): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task status');
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};