import { useState } from "react";
import PropType from "prop-types";
// import { login as loginService } from "../../services/authService";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);

  // const register = async () => {};

  const login = async (role) => {
    // try {
    //   const data = await loginService(credentials);
    //   setUser(data.accessToken);
    //   localStorage.setItem("accessToken", data.accessToken);
    // } catch (error) {
    //   setError(error.message);
    // }
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    // setUser(null);
    // localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    localStorage.removeItem("role");
  };

  const contextValue = {
    isAuthenticated,
    // user,
    // error,
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
