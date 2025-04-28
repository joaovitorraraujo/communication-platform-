import axios from "axios";

const PORT = 8000;

const api = axios.create({
  baseURL: `http://localhost:${PORT}/api`,
  withCredentials: true, // se usar cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
