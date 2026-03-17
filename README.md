
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><rect fill="none" fill-rule="evenodd" height="24" width="24"/><path d="M13,9.5h5v-2h-5V9.5z M13,16.5h5v-2h-5V16.5z M19,21H5c-1.1,0-2-0.9-2-2V5 c0-1.1,0.9-2,2-2h14c1.1,0,2,0.9,2,2v14C21,20.1,20.1,21,19,21z M6,11h5V6H6V11z M7,7h3v3H7V7z M6,18h5v-5H6V18z M7,14h3v3H7V14z" fill-rule="evenodd"/></svg>

# Task Tracker

A simple task management app built with C++ on the backend and React on the frontend. Add, update, and delete tasks. Nothing fancy, just works.

## What it does

- Add tasks with a description
- Filter tasks by status (todo, in-progress, done)
- Update task status with a dropdown
- Delete tasks
- All changes saved to a JSON file

## Folders

```
├── Task-Tracker-CLI/      # Backend (C++ server)
│   ├── server.cc
│   ├── task_manager.cpp
│   ├── tasks.json
│   └── Makefile
└── task-tracker-web/      # Frontend (React)
    ├── src/
    │   ├── App.tsx
    │   ├── components/
    │   └── services/
    └── package.json
```

## Installation

### Backend

You need C++11, g++, and make.

```bash
cd Task-Tracker-CLI
make
./task-server
```

Server runs on `http://localhost:8080`

### Frontend

You need Node.js and npm.

```bash
cd task-tracker-web
npm install
npm start
```

App opens at `http://localhost:3000`

## How to use

1. Start the backend: `./task-server` in the CLI folder
2. Start the frontend: `npm start` in the web folder
3. Type in a task, hit "Add Task"
4. Change status with the dropdown, delete with the button 

## API

Basic REST endpoints:
- `GET /api/tasks` - get all tasks
- `POST /api/tasks` - add task (send `{"description": "..."}`)
- `PUT /api/tasks/:id` - update status (send `{"status": "done"}`)
- `DELETE /api/tasks/:id` - delete task

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
