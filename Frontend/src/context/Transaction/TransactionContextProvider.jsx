import PropType from "prop-types";
import { TransactionContext } from "./TransactionContext";
import { add, getAll } from "../../Services/transactionService";

const TransactionContextProvider = ({ children }) => {
  const addTransaction = async (transactionData) => {
    return await add(transactionData);
  };

  const getTransactions = async (memberName) => {
    const transactions = await getAll(memberName);
    return transactions;
  };

  const contextValue = {
    addTransaction,
    getTransactions,
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
