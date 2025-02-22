import { useEffect, useState } from "react";
import useTransaction from "../../Hooks/useTransaction";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
//TODO: if finished is clicked display a modal to input payment, if cancel then reset, if not then update the payment aswell.
const StatusDetail = () => {
  const { transactionId } = useParams();
  const { getTransactionById, editTransaction } = useTransaction();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    done: false,
    finished: false,
  });
  const [transaction, setTransaction] = useState({
    id: "",
    createdAt: "",
    memberName: "",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);

      const { id, createdAt, members, status } = await getTransactionById(
        transactionId
      );

      const formattedDate = new Date(createdAt);
      const completeDate = `${formattedDate.toLocaleDateString()} ${formattedDate.getHours()}:${formattedDate.getMinutes()}`;

      setTransaction({
        id,
        createdAt: completeDate,
        memberName: members.name,
      });

      setStatus({
        done: status === "Done" ? true : false,
        finished: status === "Finished" ? true : false,
      });

      setLoading(false);
    };

    fetchTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  const editStatus = async (status) => {
    let value = "In Progress";

    if (status.finished) {
      value = "Finished";
    } else if (status.done) {
      value = "Done";
    }

    console.log(status);
    const { message } = await editTransaction(transactionId, { status: value });

    alert(message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-lg w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 h-48 py-2 px-4 flex justify-between items-center">
            <div className="flex flex-col justify-between h-full py-2">
              <div>
                <h1 className="text-2xl sm:text-3xl text-white font-semibold underline italic">
                  Progress Status
                </h1>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl text-white font-semibold">
                  {transaction.memberName}
                </h1>
                <p className="text-sm sm:text-base text-white font-medium">
                  {transaction.id.replace("transaction-", "")}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm sm:text-base text-white font-medium">
                {transaction.createdAt}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4 px-2">
            <div
              className="text-indigo-700 flex items-center flex-col hover:bg-slate-200 rounded-xl cursor-pointer"
              onClick={() => {
                setStatus((prevStatus) => {
                  const updatedStatus = {
                    ...prevStatus,
                    done: false,
                    finished: false,
                  };

                  editStatus(updatedStatus);
                  return updatedStatus;
                });
                // setStatus({
                //   done: false,
                //   finished: false,
                // });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
                className="w-20 sm:w-24"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640H240v640Zm240-40q83 0 141.5-58.5T680-400q0-83-58.5-141.5T480-600q-83 0-141.5 58.5T280-400q0 83 58.5 141.5T480-200Zm0-68q-26 0-50.5-9.5T386-306l188-188q19 19 28.5 43.5T612-400q0 55-38.5 93.5T480-268ZM320-680q17 0 28.5-11.5T360-720q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720q0 17 11.5 28.5T320-680Zm120 0q17 0 28.5-11.5T480-720q0-17-11.5-28.5T440-760q-17 0-28.5 11.5T400-720q0 17 11.5 28.5T440-680ZM240-160v-640 640Z" />
              </svg>
              <p className="text-indigo-700 text-lg sm:text-xl font-semibold">
                In Progress
              </p>
            </div>

            <div
              className={`flex items-center flex-col hover:bg-slate-200 rounded-xl cursor-pointer ${
                status.done ? "text-indigo-700" : "text-purple-600"
              }`}
              onClick={() => {
                setStatus((prevStatus) => {
                  const updatedStatus = {
                    ...prevStatus,
                    done: !prevStatus.done,
                    finished: prevStatus.finished ? false : prevStatus.finished,
                  };

                  editStatus(updatedStatus);
                  return updatedStatus;
                });
                // setStatus((prev) => ({
                //   done: !prev.done,
                //   finished: prev.finished ? false : prev.finished,
                // }));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
                className="w-20 sm:w-24"
              >
                <path d="M165-480 45-688l264-152h51q16 48 38 84t82 36q60 0 82-36t38-84h51l263 153-119 207-75-41v192l-63 55q-3 2-8 5t-9 5v-393l125 69 40-70-153-89q-24 49-70.5 78T480-640q-55 0-101.5-29T308-747l-154 89 41 70 125-69v237q-21 2-41 6.5T240-401v-120l-75 41Zm21 295-52-61 87-74q23-20 52.5-30.5T335-361q32 0 61 10.5t52 30.5l116 99q12 10 28.5 15.5T626-200q18 0 33.5-5t27.5-16l87-75 52 62-87 74q-23 20-52 30t-61 10q-32 0-61.5-10T512-160l-116-99q-12-10-27.5-15.5T335-280q-17 0-33.5 5.5T273-259l-87 74Zm294-455Z" />
              </svg>
              <p className="text-lg sm:text-xl font-semibold">Done</p>
            </div>

            <div
              className={`flex items-center flex-col hover:bg-slate-200 rounded-xl cursor-pointer ${
                status.finished ? "text-indigo-700" : "text-purple-600"
              }`}
              onClick={() => {
                setStatus((prevStatus) => {
                  const updatedStatus = {
                    ...prevStatus,
                    done: prevStatus.done ? prevStatus.done : true,
                    finished: !prevStatus.finished,
                  };

                  editStatus(updatedStatus);
                  return updatedStatus;
                });
                // setStatus((prev) => ({
                //   done: prev.done ? prev.done : true,
                //   finished: !prev.finished,
                // }));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
                className="w-20 sm:w-24"
              >
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
              <p className="text-lg sm:text-xl font-semibold">Finished</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDetail;
