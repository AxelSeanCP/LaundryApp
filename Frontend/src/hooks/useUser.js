import { useContext } from "react";
import { UserContext } from "../Context/User/UserContext";

const useUser = () => useContext(UserContext);

export default useUser;
