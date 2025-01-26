import PropType from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const PrivateRouteOrganization = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={"/organizations/login"} replace />
  );
};

PrivateRouteOrganization.propTypes = {
  children: PropType.node.isRequired,
};

export default PrivateRouteOrganization;
