const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const binarySearch = (target) => {
  let low = 0;
  let high = tasks.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (tasks[mid].id === target) {
      return mid
    } else if (tasks[mid] < target) {
      low = mid + 1
    } else {  
      high = mid - 1
    }
  }
  return null
}

const validateTask = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  next();
};

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors())
app.use(bodyParser.json());

let tasks = []
let nextTaskId = 0

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  res.json(tasks[binarySearch(req.params.id)]);
});

app.post('/tasks', validateTask, (req, res) => {
  const { title, description } = req.body;
  nextTaskId += 1
  const newTask = { id: nextTaskId, title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.delete('/tasks/:id', (req, res) => {
  try {
    tasks.splice(binarySearch(parseInt(req.params.id)), 1)
    res.json({ status: 'success' })
  } catch (e) {
    res.json({ status: 'error' })
  }
});

app.post('/tasks/:id', validateTask, (req, res) => {
  taskIndex = binarySearch(parseInt(req.params.id))
  tasks[taskIndex] = { 
    id: req.params.id,
    ...req.body
   }
  res.json(tasks[taskIndex])
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
