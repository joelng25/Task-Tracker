import React from 'react';
import { vi, type Mocked } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as taskService from './services/taskService';

vi.mock('./services/taskService');
const mocked = taskService as Mocked<typeof taskService>;

const sampleTasks: taskService.Task[] = [
  { id: 1, desc: 'Write tests', status: 'todo', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 2, desc: 'Ship it', status: 'done', createdAt: '2026-01-02', updatedAt: '2026-01-02' },
];

beforeEach(() => {
  vi.resetAllMocks();
  mocked.getTasks.mockResolvedValue(sampleTasks);
});

test('loads and shows tasks from the API', async () => {
  render(<App />);
  expect(await screen.findByText('Write tests')).toBeInTheDocument();
  expect(screen.getByText('Ship it')).toBeInTheDocument();
  expect(mocked.getTasks).toHaveBeenCalledWith();
});

test('filter buttons request tasks by status', async () => {
  render(<App />);
  await screen.findByText('Write tests');
  fireEvent.click(screen.getByRole('button', { name: /done/i }));
  await waitFor(() => expect(mocked.getTasks).toHaveBeenCalledWith('done'));
});

test('adding a task calls the API and reloads the list', async () => {
  mocked.addTask.mockResolvedValue(sampleTasks[0]);
  render(<App />);
  await screen.findByText('Write tests');

  fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
    target: { value: 'New task' },
  });
  fireEvent.click(screen.getByRole('button', { name: /add task/i }));

  await waitFor(() => expect(mocked.addTask).toHaveBeenCalledWith('New task'));
  await waitFor(() => expect(mocked.getTasks).toHaveBeenCalledTimes(2));
});

test('shows empty state when there are no tasks', async () => {
  mocked.getTasks.mockResolvedValue([]);
  render(<App />);
  expect(await screen.findByText(/no tasks yet/i)).toBeInTheDocument();
});
