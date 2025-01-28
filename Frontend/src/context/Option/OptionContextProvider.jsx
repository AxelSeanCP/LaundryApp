import PropType from "prop-types";
import { OptionContext } from "./OptionContext";
import { add } from "../../Services/optionService";

const OptionContextProvider = ({ children }) => {
  const addOption = async (serviceId, optionData) => {
    return await add(serviceId, optionData);
  };

  const contextValue = {
    addOption,
  };

  return (
    <OptionContext.Provider value={contextValue}>
      {children}
    </OptionContext.Provider>
  );
};

OptionContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default OptionContextProvider;
