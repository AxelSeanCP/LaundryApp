import axios from "axios";

const login = async (credentials) => {
  try {
    return "this is access token";
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export default login;
