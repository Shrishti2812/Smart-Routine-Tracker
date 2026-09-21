import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-routine-tracker.onrender.com/"
});

export default api;

