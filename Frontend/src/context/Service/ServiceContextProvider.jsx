import PropType from "prop-types";
import { ServiceContext } from "./ServiceContext";
import { add, getAll } from "../../Services/serviceService";

const ServiceContextProvider = ({ children }) => {
  const addService = async (serviceData) => {
    return await add(serviceData);
  };

  const getServices = async () => {
    return await getAll();
  };

  const contextValue = {
    addService,
    getServices,
  };

  return (
    <ServiceContext.Provider value={contextValue}>
      {children}
    </ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default ServiceContextProvider;
