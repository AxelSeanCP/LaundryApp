import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTransaction from "../../Hooks/useTransaction";
import SearchBar from "../../Components/SearchBar/SeachBar";
import Loader from "../../Components/Loader/Loader";

const TransactionView = () => {
  const { getTransactions, deleteTransaction } = useTransaction();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const transactionsData = await getTransactions(searchInput);
      setTransactions(transactionsData);
      setLoading(false);
    };

    fetchTransactions();
  }, [getTransactions, searchInput]);

  const handleDelete = async (id) => {
    await deleteTransaction(id);

    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
  };

  const openDropdown = (transactionId) => {
    setMenuOpen(menuOpen !== transactionId ? transactionId : null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <SearchBar
          placeholderText="Search by member name"
          inputValue={searchInput}
          onInputChange={(value) => setSearchInput(value)}
        />
      </div>
      <div className="container mx-auto p-2 gap-3 grid xl:grid-cols-3 lg:grid-cols-2">
        {loading ? (
          <Loader />
        ) : transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`bg-white sm:w-auto border-l-8 ${
                transaction.paymentStatus === "Unpaid"
                  ? "border-purple-600"
                  : "border-indigo-700"
              } p-5 rounded-md shadow-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 h-36`}
            >
              <div className="absolute top-4 right-2">
                <button
                  className="p-1 rounded-full hover:bg-gray-200 transition"
                  onClick={() => openDropdown(transaction.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                    className="w-6"
                  >
                    <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                  </svg>
                </button>

                {menuOpen === transaction.id && (
                  <div className="absolute right-0 bg-white border border-slate-700 rounded-md shadow-md">
                    <button
                      className="flex items-center gap-2 z-50 px-4 py-2 text-slate-800 hover:bg-slate-100 w-full"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div
                className="ml-1 flex justify-between flex-col h-full"
                onClick={() =>
                  navigate(`/users/transactions/${transaction.id}`)
                }
              >
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-slate-800 font-semibold text-lg">
                    {transaction.id.replace("transaction-", "")} -{" "}
                    <span
                      className={
                        transaction.paymentStatus === "Unpaid"
                          ? "text-purple-600"
                          : "text-indigo-700"
                      }
                    >
                      {transaction.paymentStatus}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-slate-800 font-semibold text-xl">
                      {transaction.members.name}
                    </h1>
                    <p className="text-slate-500 text-lg">
                      {new Date(transaction.createdAt).toLocaleDateString()}{" "}
                      {new Date(transaction.createdAt).getHours()}
                      {":"}
                      {new Date(transaction.createdAt).getMinutes()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-white bg-blue-500 p-1 rounded-md shadow-md text-sm font-medium">
                      {transaction.status}
                    </p>
                    <p className="text-slate-800 font-semibold text-3xl">
                      {transaction.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No transactions available
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionView;
