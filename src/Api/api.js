import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use(
  (req) => {
    const user = JSON.parse(localStorage.getItem('auth'));
    if (user?.user) {
      req.headers.Authorization = user.token;
    }
    return req;
  }
)

// States
export const fetchStates = () => API.get('/states');
export const getState = (id) => API.get(`/states/${ id }`);

// Users
export const fetchUsers = () => API.get('/users');
export const getUser = (id) => API.get(`/users/${ id }`);
export const createUser = (newUser) => API.post(`/users`, newUser);
export const loginUser = (user) => API.post(`/users/login`, user);
export const updateUser = (id, updatedUser) => API.put(`/users/${ id }`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${ id }`);

// Tasks
export const fetchTasks = (id) => API.get(`/tasks/${ id }`);
export const getTask = (id, idUsuario) => API.get(`/tasks/t/${ id }/${ idUsuario }`);
export const createTask = (newTask) => API.post(`/tasks`, newTask);
export const updateTask = (id, idUsuario, updatedTask) => API.put(`/tasks/${ id }/${ idUsuario }`, updatedTask);
export const deleteTask = (id, idUsuario) => API.delete(`/tasks/${ id }/${ idUsuario }`);
// export const nextTaskId = () => API.get(`/tasks/next`);

// Uploads
export const getFile = (type, fileName) => API.get(`/uploads/${ type }/${ fileName }`);
export const uploadFile = (type, id, idUsuario, file) => API.post(`/uploads/${ type }/${ id }/${ idUsuario }`, file, {
  headers: {
    'Content-Type': file.type
  }
});
export const deleteFile = (type, fileName) => API.delete(`/uploads/${ type }/${ fileName }`);