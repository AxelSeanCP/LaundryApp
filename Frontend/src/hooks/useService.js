import { useContext } from "react";
import { ServiceContext } from "../Context/Service/ServiceContext";

const useService = () => useContext(ServiceContext);

export default useService;
