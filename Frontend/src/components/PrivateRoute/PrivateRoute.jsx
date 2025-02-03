import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import PropType from "prop-types";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={"/"} replace />;
};

PrivateRoute.propTypes = {
  children: PropType.node.isRequired,
};

export default PrivateRoute;
