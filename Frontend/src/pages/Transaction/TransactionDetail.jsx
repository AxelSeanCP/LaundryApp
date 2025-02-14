import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useTransaction from "../../Hooks/useTransaction";
import Alert from "../../Components/Alert/Alert";
import Loader from "../../Components/Loader/Loader";

const TransactionDetail = () => {
  const { transactionId } = useParams();
  const { getTransactionById, editTransaction } = useTransaction();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState({
    id: "",
    createdAt: "",
    discount: 0,
    payment: 0,
    estimation: "",
    description: "",
    status: "",
    paymentStatus: "",
    totalPrice: "",
    memberName: "",
    options: [],
  });
  const [newPrice, setNewPrice] = useState(0);
  const [input, setInput] = useState({
    description: "",
    estimation: "",
    payment: 0,
    discount: 0,
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);

      const {
        id,
        createdAt,
        discount,
        payment,
        estimation,
        description,
        status,
        paymentStatus,
        totalPrice,
        members,
        options,
      } = await getTransactionById(transactionId);

      const formattedDate = new Date(createdAt);
      const completeDate = `${formattedDate.toLocaleDateString()} ${formattedDate.getHours()}:${formattedDate.getMinutes()}`;

      setTransaction({
        id,
        createdAt: completeDate,
        status,
        paymentStatus,
        totalPrice,
        memberName: members.name,
        options: options.map(
          ({ TransactionOption: { qty }, price, services: { name } }) => ({
            qty,
            price,
            serviceName: name,
          })
        ),
      });

      setInput({
        discount,
        payment,
        estimation,
        description,
      });

      setNewPrice(totalPrice);

      setLoading(false);
    };

    fetchTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  const [showModal, setShowModal] = useState(false);
  const [discValue, setDiscValue] = useState(0);
  const [alertObject, setAlertObject] = useState({
    message: "",
    type: "",
    show: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEditTransaction = async () => {
    setIsSubmitting(true);
    const { success, message } = await editTransaction(
      transactionId,
      Object.fromEntries(
        Object.entries(input).filter(
          // eslint-disable-next-line no-unused-vars
          ([_, value]) => value !== null && value !== ""
        )
      )
    );

    if (success) {
      setAlertObject({ message: message, type: "success", show: true });
      setTimeout(() => {
        navigate("/users/transactions/list");
      }, 3000);
    } else {
      setAlertObject({ message: message, type: "danger", show: true });
      setIsSubmitting(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addDiscount = () => {
    setInput((prev) => ({
      ...prev,
      discount: discValue,
    }));
    setShowModal(false);
    setNewPrice(transaction.totalPrice - discValue);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const closeAlert = () => {
    setAlertObject((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-md">
            <div className="bg-indigo-600 p-5 sm:p-6 rounded-t-2xl">
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
                Add Discount
              </h1>
            </div>
            <div className="px-6 py-4 sm:py-6">
              <div className="text-center mb-6">
                <p className="text-base sm:text-lg font-medium text-blue-600">
                  Price
                </p>
                <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800">
                  {transaction.totalPrice}
                </h1>
              </div>
              <div className="mb-6">
                <input
                  type="number"
                  name="discount"
                  placeholder="Discount"
                  onChange={(e) => setDiscValue(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-4 sm:py-5 bg-slate-50 rounded-b-2xl">
              <button
                className="text-slate bg-white border border-indigo-600 hover:border-none hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg font-medium"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium"
                onClick={addDiscount}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-lg w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 h-48 py-2 px-4 flex justify-between items-center">
            <div className="flex flex-col justify-between h-full py-2">
              <div>
                <h1 className="text-2xl sm:text-3xl text-white font-semibold underline italic">
                  Invoice Summary
                </h1>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl text-white font-semibold">
                  {transaction.memberName}
                </h1>
                <p className="text-sm sm:text-base text-white font-medium">
                  {transaction.createdAt}
                </p>
              </div>
            </div>
            <div className="mt-auto flex flex-col items-end justify-between h-full py-4 ">
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm text-white font-semibold rounded-md shadow-md px-2 py-1 ${
                    transaction.paymentStatus === "Paid"
                      ? "bg-indigo-700"
                      : "bg-purple-600"
                  }`}
                >
                  {transaction.paymentStatus}
                </p>
                <p className="text-sm text-white font-medium bg-blue-500 rounded-md shadow-md p-1">
                  {transaction.status}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <button
                  className="bg-purple-700 hover:bg-purple-800 py-1 px-3 rounded-md text-sm text-white font-medium disabled:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-75"
                  onClick={toggleModal}
                  disabled={transaction.paymentStatus === "Paid"}
                >
                  Discount
                </button>
                <h1 className="text-3xl sm:text-4xl text-white font-bold">
                  {newPrice}
                </h1>
              </div>
            </div>
          </div>

          <div className="space-y-2 p-6">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#1C1C1C"
                className="w-6 sm:w-8"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
              <input
                type="text"
                value={input.description || ""}
                name="description"
                required
                placeholder={input.description ? "" : "Description"}
                onChange={handleInput}
                className="text-base sm:text-lg font-medium text-slate-700 w-full focus:outline-none p-2 border-b-2 border-slate-300"
              />
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#1C1C1C"
                className="w-6 sm:w-8"
              >
                <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
              </svg>
              <input
                type="text"
                value={input.estimation || ""}
                name="estimation"
                required
                placeholder={input.estimation ? "" : "Estimation"}
                onChange={handleInput}
                className="text-base sm:text-lg font-medium text-slate-700 w-full focus:outline-none p-2 border-b-2 border-slate-300"
              />
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#1C1C1C"
                className="w-6 sm:w-8"
              >
                <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
              </svg>
              <input
                type="number"
                value={input.payment === 0 ? "" : 0}
                name="payment"
                placeholder={input.payment === 0 ? "Payment" : ""}
                onChange={handleInput}
                className="text-base sm:text-lg font-medium text-slate-700 w-full focus:outline-none p-2 border-b-2 border-slate-300"
              />
            </div>
          </div>

          <div className="space-y-2 p-1">
            {transaction.options.length > 0 ? (
              transaction.options.map((option) => (
                <div className="p-4" key={option.serviceName}>
                  <div className="border border-slate-300 rounded-lg shadow-md">
                    <h1 className="text-2xl sm:text-3xl text-slate-800 border-b border-slate-300 font-semibold p-4 bg-slate-50">
                      {option.serviceName}
                    </h1>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-lg sm:text-xl text-blue-500 font-medium">
                          price / unit
                        </p>
                        <p className="text-2xl sm:text-3xl font-semibold text-slate-900">
                          {option.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
                          {option.qty}
                        </h1>
                        <p className="text-base sm:text-lg font-medium text-slate-600 mt-auto">
                          Qty
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No options available</p>
            )}
          </div>

          <div className="p-4">
            <button
              disabled={isSubmitting}
              className={`form-button ${
                isSubmitting ? "cursor-not-allowed" : ""
              }`}
              onClick={handleEditTransaction}
            >
              {isSubmitting ? "Editting" : "Edit Transaction"}
            </button>
          </div>
        </div>
      )}
      {alertObject.show && (
        <Alert
          alertText={alertObject.message}
          alertType={alertObject.type}
          duration={3000}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default TransactionDetail;
