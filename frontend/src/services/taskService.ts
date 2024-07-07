import axios from 'axios';

const API_URL = 'http://localhost:8000/tasks';

export interface Task {
  id: number;
  title: string;
  description: string;
}

export const getTasks = async () => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>) => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const updateTask = async (id: number, task: Omit<Task, 'id'>) => {
  const response = await axios.post<Task>(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
