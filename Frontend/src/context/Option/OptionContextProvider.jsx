import PropType from "prop-types";
import { OptionContext } from "./OptionContext";
import { add, update, remove } from "../../Services/optionService";

const OptionContextProvider = ({ children }) => {
  const addOption = async (serviceId, optionData) => {
    return await add(serviceId, optionData);
  };

  const editOption = async (serviceId, optionId, optionData) => {
    return await update(serviceId, optionId, optionData);
  };

  const deleteOption = async (serviceId, optionId) => {
    await remove(serviceId, optionId);
  };

  const contextValue = {
    addOption,
    editOption,
    deleteOption,
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
