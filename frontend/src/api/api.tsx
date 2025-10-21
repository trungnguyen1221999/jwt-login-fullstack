import axios from "axios";

const api = axios.create({
  baseURL: "https://jwt-login-fullstack-2.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ bắt buộc để gửi cookie HttpOnly
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use((response) => {
  return response;
});
export default api;
