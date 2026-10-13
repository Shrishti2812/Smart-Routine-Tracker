import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-routine-tracker.onrender.com/",
});

// Attach token to outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;