const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data', 'tasks.json');

if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

const readTasks = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeTasks = (tasks) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
};

app.get('/tasks', (req, res) => {
    try {
        const tasks = readTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/tasks', (req, res) => {
    try {
        const { title } = req.body;
        
        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'Task title is required' });
        }
        
        if (title.length > 100) {
            return res.status(400).json({ error: 'Task title must be less than 100 characters' });
        }
        
        const tasks = readTasks();
        
        const newTask = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        writeTasks(tasks);
        
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

app.patch('/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Completed status must be boolean' });
        }
        
        const tasks = readTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        tasks[taskIndex].completed = completed;
        writeTasks(tasks);
        
        res.json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const tasks = readTasks();
        const filteredTasks = tasks.filter(task => task.id !== id);
        
        if (filteredTasks.length === tasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        writeTasks(filteredTasks);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});