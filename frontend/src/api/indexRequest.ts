import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // URL do seu backend em Node
  withCredentials: true, // se usar cookies
});

export default api;
