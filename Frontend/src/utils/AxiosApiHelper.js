import axios from "axios";
// import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
