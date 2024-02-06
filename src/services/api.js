import axios from "axios";

// Axios instance with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axios.interceptors.request.use((req) => {
  console.log(JSON.stringify(req, null, 2));
  return req;
});

export default api;
