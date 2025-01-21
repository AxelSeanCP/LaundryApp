import { useState, useEffect } from "react";
import PropType from "prop-types";
import { jwtDecode } from "jwt-decode";
import {
  login as loginService,
  organizationRegister,
  organizationLogin,
} from "../../Services/authService";
import { getUser } from "../../Services/userService";
import { AuthContext } from "../../Context/Auth/AuthContext";
import isTokenExpired from "../../utils/isTokenExpired";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    if (accessToken && user && !isTokenExpired(accessToken)) {
      const { username } = JSON.parse(user);
      setIsAuthenticated(true);
      setUser(username);
    } else {
      alert("Session expired. Please login again");
      logout();
    }
  }, []);

  const register = async (credentials) => {
    await organizationRegister(credentials);
  };

  const login = async (role, credentials) => {
    if (role === "organization") {
      const data = await organizationLogin(credentials);
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      const data = await loginService(credentials);
      const token = data.accessToken;

      const decoded = jwtDecode(token);
      const user = await getUser(decoded.id);
      setUser(user.username);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    localStorage.removeItem("role");
  };

  const contextValue = {
    isAuthenticated,
    user,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default AuthContextProvider;
