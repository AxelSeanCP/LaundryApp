import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import PropType from "prop-types";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const role = localStorage.getItem("role");

  if (!isAuthenticated || !role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropType.node.isRequired,
};

export default PrivateRoute;
