import { ErrorResponse } from "@remix-run/router";
import axios from "axios";
import jwtDecode from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:1234/api",
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${getAuthToken()}`,
  // }, // Adjust your base URL
});
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};
export const isTokenValid = () => {
  const decodedToken = jwtDecode(getAuthToken());
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const countDown = decodedToken.exp - currentTimestamp;

  return countDown > 0;
};

let isRefreshing = false;

const requestQueue = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("this is the request: ", originalRequest);
    if (
      originalRequest.url === "/login" &&
      error.reponse &&
      error.response.status === 401
    ) {
      prompt("invalid username or password");
      console.log("back to login");
      return;
    } else if (error.response && error.response.status === 401) {
      console.log("atleasthere ");
      if (!isRefreshing && !isTokenValid()) {
        console.log("going for refresh");
        isRefreshing = true;

        try {
          const response = await api.post("/refresh-token");
          if (response.status === 200) {
            const newAuthToken = response.data.authToken;
            localStorage.setItem("authToken", newAuthToken);
            originalRequest.headers["Authorization"] = `Bearer ${newAuthToken}`;
            console.log("new authToken set");

            const retryResponse = await api(originalRequest);

            while (requestQueue.length > 0) {
              const queuedRequest = requestQueue.shift();
              queuedRequest.headers["Authorization"] = `Bearer ${newAuthToken}`;
              await api(queuedRequest);
            }

            return retryResponse;
          }
        } catch (refreshError) {
          if (refreshError.response && refreshError.response.status === 401) {
            console.log("unauthorized request to refresh:", refreshError);
            window.location.href = "/";
            return;
          } else {
            console.log("TOKEN REFRESH FAILED:", refreshError);
            console.log("user neeeds to login again");
            throw refreshError;
          }
        } finally {
          isRefreshing = false;
        }
      } else {
        requestQueue.push(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
api.interceptors.request.use((config) => {
  console.log("sending request out ");
  console.log("Request:", config);
  return config;
});

export default api;
