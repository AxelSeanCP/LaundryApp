import PropType from "prop-types";
import { TransactionContext } from "./TransactionContext";
import { add } from "../../Services/transactionService";

const TransactionContextProvider = ({ children }) => {
  const addTransaction = async (transactionData) => {
    return await add(transactionData);
  };

  const contextValue = {
    addTransaction,
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

TransactionContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default TransactionContextProvider;
