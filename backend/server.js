


const express = require('express');


const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// In-memory data store for tasks
const tasks = [];

app.use(bodyParser.json());

// Route to list all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Route to add a new task
app.post('/api/tasks', (req, res) => {
  const { title, completed } = req.body;
  const newTask = { title, completed };
  tasks.push(newTask);
  res.json({ message: 'Task added successfully', task: newTask });
});

// Route to mark a task as complete by ID
app.patch('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = tasks.find((task) => task.id === taskId);
  if (updatedTask) {
    updatedTask.completed = true;
    res.json({ message: 'Task marked as  the completed ', task: updatedTask });
  } else {
    res.status(404).json({ message: 'Task  was not found in todo' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
