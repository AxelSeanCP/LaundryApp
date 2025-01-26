import axios from "axios";
// import { jwtDecode } from "jwt-decode";

const baseURL = "http://localhost:5000";

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  const response = await axios.put(`${baseURL}/authentications`, {
    refreshToken,
  });
  const { accessToken } = response.data.data;

  localStorage.setItem("accessToken", accessToken);
  return accessToken;
};

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed: ", refreshError);
        alert("Session expired. Please login again");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("organization");
        localStorage.removeItem("role");
        window.location.href = `/?redirect=${encodeURIComponent(
          window.location.pathname
        )}`;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
