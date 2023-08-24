import axios from "axios";
import jwtDecode from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:1234/api", // Adjust your base URL
});

const isTokenValid = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return false; // Token is missing
  }

  const decodedToken = jwtDecode(token);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const bufferSeconds = 600;
  // console.log(decodedToken, currentTimestamp);
  return decodedToken.exp > currentTimestamp + bufferSeconds;
};

const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];

  if (refreshToken) {
    return `Bearer ${token} RefreshToken ${refreshToken}`;
  } else {
    return `Bearer ${token}`;
  }
};
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If response status is 401 and there is no previous retry
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1];

      if (refreshToken) {
        try {
          const refreshResponse = await api.post("/refresh-token", {
            refreshToken,
          });

          if (refreshResponse.status === 200) {
            const newAccessToken = refreshResponse.data.accessToken;
            localStorage.setItem("authToken", newAccessToken);

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api(originalRequest); // Retry the original request
          }
        } catch (refreshError) {
          // Handle error refreshing access token
          console.error("Error refreshing access token:", refreshError);
        }
      }
    }
    throw error;
  }
);
api.interceptors.request.use(
  (config) => {
    if (isTokenValid()) {
      console.log("got the token!");
      config.headers.Authorization = getAuthToken();
    } else {
      console.log("token is not valid anymore");
    }
    // console.log("Authorization header set:", config.headers.Authorization);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
