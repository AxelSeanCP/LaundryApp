import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useService from "../../Hooks/useService";
import Alert from "../../Components/Alert/Alert";

const AddService = () => {
  const { addService } = useService();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    unit: "",
  });
  const [error, setError] = useState(null);
  const [alertObject, setAlertObject] = useState({
    message: "",
    type: "",
    show: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name !== "" && input.unit !== "") {
      const { success, message } = await addService(input);

      if (success) {
        setAlertObject({ message: message, type: "success", show: true });
        setTimeout(() => {
          navigate("/users/dashboard");
        }, 3000);
      } else {
        setAlertObject({ message: message, type: "danger", show: true });
      }
    } else {
      setError("Please fill out all fields");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeAlert = () => {
    setAlertObject((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 sm:max-w-lg">
        <h1 className="text-xl sm:text-2xl text-center font-semibold">
          Add a service
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleInput}
            className="form-input sm:text-lg"
          />
        </div>
        <div className="space-y-4 text-center">
          <p className="font-medium text-slate-700">Select Unit:</p>
          <div className="flex items-center justify-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="By Weight"
                className="hidden peer"
                onChange={handleInput}
              />
              <div className="w-5 h-5 rounded-full border border-gray-400 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>
              <span className="text-slate-800">By Weight</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="By Item"
                className="hidden peer"
                onChange={handleInput}
              />
              <div className="w-5 h-5 rounded-full border border-gray-400 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>
              <span className="text-slate-800">By Item</span>
            </label>
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="form-button sm:text-xl sm:px-5 sm:py-3"
          >
            Add Service
          </button>
        </div>
      </div>
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

export default AddService;
