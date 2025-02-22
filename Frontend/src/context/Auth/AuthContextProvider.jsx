import { useState, useEffect, useRef } from "react";
import PropType from "prop-types";
import { jwtDecode } from "jwt-decode";
import {
  login as loginService,
  organizationRegister,
  organizationLogin,
  logout as logoutService,
} from "../../Services/authService";
import { getUser } from "../../Services/userService";
import { getOrganization } from "../../Services/organizationService";
import { AuthContext } from "../../Context/Auth/AuthContext";
import isTokenExpired from "../../utils/isTokenExpired";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const role = localStorage.getItem("role");

    if (accessToken && refreshToken && !isTokenExpired(accessToken) && role) {
      setIsAuthenticated(true);
      if (role === "organization") {
        const organization = JSON.parse(localStorage.getItem("organization"));
        setOrganization(organization.name);
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        const organization = JSON.parse(localStorage.getItem("organization"));
        setUser(user.username);
        setOrganization(organization.name);
      }
    } else if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isTokenExpired(accessToken)) {
        alert("Session expired. Please login again");
        logout();
      }
    } else {
      logout();
    }
  }, []);

  const register = async (credentials) => {
    return await organizationRegister(credentials);
  };

  const login = async (role, credentials) => {
    if (role === "organization") {
      const data = await organizationLogin(credentials);
      const token = data.accessToken;

      const decoded = jwtDecode(token);
      const organization = await getOrganization(decoded.idOrganization);
      setOrganization(organization.name);

      localStorage.setItem("organization", JSON.stringify(organization));
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      const data = await loginService(credentials);
      const token = data.accessToken;

      const decoded = jwtDecode(token);
      const user = await getUser(decoded.id);
      const organization = await getOrganization(decoded.idOrganization);
      setUser(user.username);
      setOrganization(organization.name);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("organization", JSON.stringify(organization));
    }
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) await logoutService(refreshToken);
    setUser(null);
    setOrganization(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("organization");
    setIsAuthenticated(false);
    localStorage.removeItem("role");
  };

  const contextValue = {
    isAuthenticated,
    user,
    organization,
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
