import { addUser as addUserService } from "../../Services/userService";
import PropType from "prop-types";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
  const addUser = async (credentials) => {
    return await addUserService(credentials);
  };

  const contextValue = {
    addUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default UserContextProvider;
