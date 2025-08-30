import axios from "axios";

// ✅ CRA/Vite requires env vars to start with REACT_APP_ (CRA) or VITE_ (Vite)
// ESLint no longer complains because we declared "process" as a global in .eslintrc.json
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Global error handler (e.g., auth failure)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Force logout
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
