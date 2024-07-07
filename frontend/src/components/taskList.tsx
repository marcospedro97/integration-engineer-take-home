import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, deleteTask, Task } from '../services/taskService';
import './taskList.css';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    await fetchTasks()
  };

  return (
    <div>
      <div className="task-list-header">
        <h1>Task List</h1>
      </div>

      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className='task-actions'>
            <Link to={`/edit/${task.id}`}>
              <button className="edit">Edit</button>
            </Link>
            <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
