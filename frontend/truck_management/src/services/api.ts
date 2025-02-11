import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  // Optionally add headers or interceptors here.
});

export default api;
