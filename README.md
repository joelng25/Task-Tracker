
<img src="ballot.svg" width="150" height="150" />

# Task Tracker

[![CI](https://github.com/joelng25/Task-Tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/joelng25/Task-Tracker/actions/workflows/ci.yml)

A simple task management app built with C++ on the backend and React on the frontend. Add, update, and delete tasks.

## What it does

- Add tasks with a description
- Filter tasks by status (todo, in-progress, done)
- Update task status with a dropdown
- Delete tasks
- All changes saved to a JSON file

## Installation

### Backend

You need a C++17 compiler, make and (for tests) GoogleTest.

```bash
cd Task-Tracker-CLI
make
./task-server
```

Server runs on `http://localhost:8080`. It can be configured with environment variables:

| Variable | Default | Description |
|---|---|---|
| `HOST` | `localhost` | Address to listen on |
| `PORT` | `8080` | Port |
| `CORS_ORIGIN` | `http://localhost:3000` | Origin allowed to call the API |
| `TASKS_FILE` | `tasks.json` | Where tasks are stored |

Run the backend tests with `make run-tests`.

### Frontend

You need Node.js and npm.

```bash
cd task-tracker-web
npm install
npm start
```

App opens at `http://localhost:3000`. To point it to another API, set `REACT_APP_API_URL` (default `http://localhost:8080/api`).

Run the frontend tests with `npm test`.

## How to use

1. Start the backend: `./task-server` in the CLI folder
2. Start the frontend: `npm start` in the web folder
3. Type in a task, hit "Add Task"
4. Change status with the dropdown, delete with the button 

## API

Basic REST endpoints:
- `GET /api/tasks` - get all tasks
- `POST /api/tasks` - add task (send `{"description": "..."}`)
- `PUT /api/tasks/:id` - update status (send `{"status": "todo" | "in-progress" | "done"}`)
- `DELETE /api/tasks/:id` - delete task

Invalid bodies return `400`, unknown ids return `404`.

## Storage

Tasks are saved in `tasks.json`:

```json
{
  "id": 1,
  "desc": "Buy groceries",
  "status": "todo",
  "createdAt": "...",
  "updatedAt": "..."
}
```

## Tech stack

- Backend: C++ with httplib and nlohmann/json
- Frontend: React + TypeScript

