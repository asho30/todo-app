const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

// --- In-Memory Database ---
const users = [{ id: 1, username: 'Asho', password: 'P@ssw0rd' }];
let tasks = [
    { id: 1, userId: 1, text: 'Write: Ahmed Ashour', completed: false },
    { id: 2, userId: 1, text: 'Solve the issue', completed: true },
];
let nextTaskId = 3;

// --- Authentication Middleware ---
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    next();
};

// --- API Endpoints ---

// 1. Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.userId = user.id;
        res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// 2. Get Tasks (for the logged-in user)
app.get('/api/tasks', requireAuth, (req, res) => {
    const userTasks = tasks.filter(task => task.userId === req.session.userId);
    res.json(userTasks);
});

// 3. Add Task
app.post('/api/tasks', requireAuth, (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Task text is required' });
    }
    const newTask = {
        id: nextTaskId++,
        userId: req.session.userId,
        text,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 4. Edit Task
app.put('/api/tasks/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    const taskIndex = tasks.findIndex(task => task.id == id && task.userId === req.session.userId);

    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], text, completed };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// 5. Remove Task
app.delete('/api/tasks/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const initialLength = tasks.length;
    tasks = tasks.filter(task => !(task.id == id && task.userId === req.session.userId));

    if (tasks.length < initialLength) {
        res.status(204).send(); // No content
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});


// Expose coverage data endpoint for collection
if (process.env.NODE_ENV === 'test') {
  const { nyc, execa } = require('nyc/lib/config-util');
  app.get('/__coverage__', (req, res) => {
    res.json(global.__coverage__ || {});
  });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});