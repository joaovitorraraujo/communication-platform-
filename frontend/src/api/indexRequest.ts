import axios from "axios";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";

const PORT = 8000;
// const cookiesData = await cookies();

const api = axios.create({
  baseURL: `http://localhost:${PORT}/api`,
  withCredentials: true, // se usar cookies
});

api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token adicionado ao header:", config.headers.Authorization);
  }
  return config;
});

export default api;
