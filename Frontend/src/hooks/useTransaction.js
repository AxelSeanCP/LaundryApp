import { useContext } from "react";
import { TransactionContext } from "../Context/Transaction/TransactionContext";

const useTransaction = () => useContext(TransactionContext);

export default useTransaction;
