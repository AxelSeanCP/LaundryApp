import { useLocation } from "react-router-dom";
import { useState } from "react";

const AddTransaction = () => {
  const { state } = useLocation();
  const { member, options, totalPrice } = state;
  const [input, setInput] = useState({
    idMember: member.id,
    options: options,
    description: "",
    estimation: "",
    discount: 0,
    payment: 0,
  });

  const date = new Date().toDateString();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-100 via-blue-500 to-blue-800">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-blue-500 to-blue-800 h-48 py-2 px-4 flex justify-between items-center">
          <div className="flex flex-col justify-between h-full py-2">
            <h1 className="text-2xl sm:text-3xl text-white font-semibold underline italic">
              Invoice Summary
            </h1>
            <div>
              <h1 className="text-2xl sm:text-3xl text-white font-semibold">
                {member.name}
              </h1>
              <p className="text-sm sm:text-base text-white font-medium">
                {member.id}
              </p>
            </div>
          </div>
          <div className="mt-auto flex flex-col items-end justify-between h-full py-4">
            <p className="text-sm sm:text-base text-white font-medium">
              {date}
            </p>
            <div className="flex flex-col items-end">
              <button className="bg-orange-500 hover:bg-orange-600 py-1 px-3 rounded-md text-sm text-white font-medium">
                Discount
              </button>
              <h1 className="text-3xl sm:text-4xl text-white font-bold">
                {totalPrice}
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
              placeholder="Description"
              name="description"
              required
              className="text-base sm:text-lg font-medium text-slate-700 w-full focus:outline-none p-2 border-b-2 border-slate-700"
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
              placeholder="Estimation"
              name="estimation"
              required
              className="text-base sm:text-lg font-medium text-slate-700 w-full focus:outline-none p-2 border-b-2 border-slate-700"
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
              placeholder="Payment"
              name="payment"
              required
              className="text-base sm:text-lg font-medium text-slate-700 w-full focus:outline-none p-2 border-b-2 border-slate-700"
            />
          </div>
        </div>

        <div className="space-y-2 p-1">
          {options.length > 0 ? (
            options.map((option) => (
              <div key={option.optionId} className="p-4">
                <div className="border border-slate-300 rounded-lg shadow-md">
                  <h1 className="text-2xl sm:text-3xl text-slate-800 border-b border-slate-300 font-semibold p-4 bg-slate-50">
                    {option.serviceName}
                  </h1>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg sm:text-xl text-teal-600 font-medium">
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
                      <p className="text-base sm:text-lg font-medium text-slate-600">
                        Qty
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No options available</p>
          )}
        </div>

        <div className="p-4">
          <button className="form-button bg-orange-500">Add Transaction</button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
