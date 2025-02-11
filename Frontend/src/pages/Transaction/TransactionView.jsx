import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTransaction from "../../Hooks/useTransaction";
import SearchBar from "../../Components/SearchBar/SeachBar";
import Loader from "../../Components/Loader/Loader";

const TransactionView = () => {
  const { getTransactions } = useTransaction();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
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
              onClick={() => navigate(`/users/transactions/${transaction.id}`)}
            >
              <div className="ml-1 flex justify-between flex-col h-full">
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
                  <p className="text-white bg-blue-500 p-1 rounded-md shadow-md text-sm font-medium">
                    {transaction.status}
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
                  <p className="text-slate-800 font-semibold text-3xl">
                    {transaction.totalPrice}
                  </p>
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
