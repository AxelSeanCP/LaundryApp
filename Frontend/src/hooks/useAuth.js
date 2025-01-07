import { useContext } from "react";
import { AuthContext } from "../Context/Auth/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
