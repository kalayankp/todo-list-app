import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
  
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching :', error));
  }, []);

  const addTask = () => {
   
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTask, completed: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data.task]);
        setNewTask('');
      })
      .catch((error) => console.error('Error adding  the task:', error));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder=" ADD New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <h1>Updated Todo List</h1>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} ({task.completed ? 'Completed' : 'Incomplete'})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
