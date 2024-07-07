import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTasks, createTask, updateTask, Task } from '../services/taskService';
import './taskForm.css';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const tasks = await getTasks();
        const task = tasks.find(task => task.id === parseInt(id));
        if (task) {
          setEditingTask(task);
          setTitle(task.title);
          setDescription(task.description);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      if (editingTask) {
        await updateTask(editingTask.id, { title, description });
      } else {
        await createTask({ title, description });
      }
      navigate('/');
    } else {
      alert('Title and Description cannot be empty');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
       />
      <button type="submit" className='submit-btn'>{editingTask ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
