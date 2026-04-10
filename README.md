cat > README.md << 'EOF'
# Task Manager App

A simple full-stack task management application built with React and Node.js.

## Features

- ✅ Create new tasks
- ✅ View all tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Real-time task statistics
- ✅ Loading and error states
- ✅ Persistent storage (tasks saved to JSON file)

## Tech Stack

**Frontend:**
- React 18
- CSS3 (inline styles)

**Backend:**
- Node.js
- Express.js
- File-based storage (JSON)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation & Setup

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/task-manager-app.git
cd task-manager-app

### 1. Setup Backend

cd backend
npm install
npm start

The backend will run on http://localhost:5001

### 3.Setup Frontend (in a new terminal)

cd frontend
npm install
npm start

The frontend will run on http://localhost:3000

### 4. Open your browser
Navigate to http://localhost:3000 to use the app

### API Endpoints

Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Create a new task
PATCH	/tasks/:id	Update task status
DELETE	/tasks/:id	Delete a task

### API Examples

Get all tasks
bash
curl http://localhost:5001/tasks

### Create a task

curl -X POST http://localhost:5001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn React"}'

### Update task status

curl -X PATCH http://localhost:5001/tasks/123 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

###  Delete a task

curl -X DELETE http://localhost:5001/tasks/123

### Project Structure

task-manager-app/
├── backend/
│   ├── data/
│   │   └── tasks.json          # Task storage
│   ├── server.js                # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js               # Main React component
│   │   ├── App.css              # Styles
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   └── package.json
└── README.md

### Usage Guide

Add a task: Type a task in the input field and click "Add Task"
Complete a task: Click the checkbox next to any task
Delete a task: Click the red "Delete" button
View statistics: See total, completed, and pending counts
Assumptions & Trade-offs

### Assumptions
No authentication required - Single user app
Small scale - No pagination needed (tasks fit on one page)
Simple validation - Title required, max 100 characters
File storage is sufficient - No database needed for this scale

### Trade-offs
File-based storage instead of database (simpler setup, no external dependencies)
No task editing - Focus on core CRUD operations
No filtering - Kept simple for 2-hour constraint
Inline styles - Used for simplicity, could be extracted to CSS
No tests - Prioritized functionality over testing

### Potential Improvements (Time permitting)
Add task editing feature
Add filtering by status (completed/pending)
Add due dates
Add user authentication
Implement a real database (MongoDB/PostgreSQL)
Add unit tests
Docker setup

### License
MIT

### Author
Anusha B
