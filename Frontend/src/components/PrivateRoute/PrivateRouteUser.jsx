import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import PropType from "prop-types";

const PrivateRouteUser = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={"/users/login"} replace />;
};

PrivateRouteUser.propTypes = {
  children: PropType.node.isRequired,
};

export default PrivateRouteUser;
