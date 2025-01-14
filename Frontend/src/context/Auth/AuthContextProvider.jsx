import { useState } from "react";
import PropType from "prop-types";
import {
  login as loginService,
  organizationRegister,
  organizationLogin,
} from "../../Services/authService";
import { AuthContext } from "../../Context/Auth/AuthContext";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);

  const register = async (credentials) => {
    await organizationRegister(credentials);
  };

  const login = async (role, credentials) => {
    if (role === "organization") {
      const data = await organizationLogin(credentials);
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      const data = await loginService(credentials);
      // setUser(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    // setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    localStorage.removeItem("role");
  };

  const contextValue = {
    isAuthenticated,
    // user,
    register,
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

export default AuthProvider;
