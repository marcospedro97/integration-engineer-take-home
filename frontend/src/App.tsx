import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Create Task</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
      </Routes>
    </div>
  );
};

export default App;
