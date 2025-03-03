import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useOption from "../../Hooks/useOption";
import Modal from "../../Components/Modal/Modal";

const OptionDetail = () => {
  const { deleteOption } = useOption();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { optionId, name, price, serviceId } = location.state;

  const handleEditOption = () => {
    navigate(`/users/services/${serviceId}/options/${optionId}`, {
      state: { optionId, name, price, serviceId },
    });
  };

  const handleDeleteOption = async () => {
    await deleteOption(serviceId, optionId);
    setShowModal(false);
    navigate(`/users/services/${serviceId}`);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500">
      {showModal && (
        <Modal
          buttonAction={handleDeleteOption}
          closeModal={toggleModal}
          title="Delete Option?"
          body="Are you sure you want to delete this option?"
          buttonText="Delete"
        />
      )}
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 h-40 flex flex-col p-2 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#FFFFFF"
            className="w-24 sm:w-32"
          >
            <path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z" />
          </svg>
          <h1 className="text-2xl sm:text-3xl text-white font-semibold">
            {name}
          </h1>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#000000"
              className="w-6 sm:w-8"
            >
              <path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" />
            </svg>
            <p className="text-base sm:text-lg font-medium text-slate-700">
              {price}
            </p>
          </div>
        </div>
        <div className="flex justify-between py-2 px-4 gap-4">
          <button
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-lg w-full"
            onClick={handleEditOption}
          >
            Edit Option
          </button>
          <button
            className="border border-slate-800 hover:bg-slate-900 text-slate-800 hover:text-white font-bold py-2 px-4 rounded-lg w-full"
            onClick={toggleModal}
          >
            Delete Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionDetail;
