import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1234/api", // Adjust your base URL
});

const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  return `Bearer ${token}`;
};

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getAuthToken();
    // console.log("Authorization header set:", config.headers.Authorization);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
