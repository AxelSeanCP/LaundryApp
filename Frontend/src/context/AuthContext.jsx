import { createContext, useState } from "react";
import PropType from "prop-types";
import { login as loginService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);
      setUser(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const contextValue = {
    user,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropType.node.isRequired,
};
