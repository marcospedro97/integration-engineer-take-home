const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const binarySearch = (target) => {
  let low = 0;
  let high = tasks.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (tasks[mid].id === target) {
      return mid;
    } else if (tasks[mid].id < target) {
      low = mid + 1;
    } else {  
      high = mid - 1;
    }
  }
  
  return -1; // Return -1 if target is not found
};

const validateTask = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  next();
};

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let nextTaskId = 0;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'unknown error!' });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const index = binarySearch(parseInt(req.params.id));
  if (index !== -1 && tasks[index]) {
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found.' });
  }
});

app.post('/tasks', validateTask, (req, res) => {
  nextTaskId += 1;
  const { title, description } = req.body;
  const newTask = { id: nextTaskId, title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  try {
    const index = binarySearch(parseInt(req.params.id));
    if (index !== -1) {
      tasks.splice(index, 1);
      res.json({ status: 'success' });
    } else {
      res.status(404).json({ error: 'Task not found.' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Server error.' });
  }
});

app.post('/tasks/:id', validateTask, (req, res) => {
  const index = binarySearch(parseInt(req.params.id));
  if (index !== -1 && tasks[index]) {
    tasks[index] = { id: req.params.id, ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
