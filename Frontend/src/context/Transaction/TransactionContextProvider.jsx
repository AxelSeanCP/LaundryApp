import PropType from "prop-types";
import { TransactionContext } from "./TransactionContext";
import {
  add,
  getAll,
  getById,
  update,
  remove,
} from "../../Services/transactionService";

const TransactionContextProvider = ({ children }) => {
  const addTransaction = async (transactionData) => {
    return await add(transactionData);
  };

  const getTransactions = async (memberName) => {
    const transactions = await getAll(memberName);
    return transactions;
  };

  const getTransactionById = async (id) => {
    return await getById(id);
  };

  const editTransaction = async (id, transactionData) => {
    return await update(id, transactionData);
  };

  const deleteTransaction = async (id) => {
    await remove(id);
  };

  const contextValue = {
    addTransaction,
    getTransactions,
    getTransactionById,
    editTransaction,
    deleteTransaction,
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
