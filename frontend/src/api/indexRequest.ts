import axios from "axios";

const PORT = 8000;

const api = axios.create({
  baseURL: `http://localhost:${PORT}/api`, // URL do seu backend em Node
  withCredentials: true, // se usar cookies
});

export default api;
