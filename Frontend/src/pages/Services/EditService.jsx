import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useService from "../../Hooks/useService";
import Alert from "../../Components/Alert/Alert";

const EditService = () => {
  const { serviceId } = useParams();
  const { editService } = useService();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { state: service } = useLocation();

  useEffect(() => {
    if (service) {
      setInput({
        name: service.name || "",
        unit: service.unit || "",
      });
    }
  }, [service]);

  if (!service) {
    return (
      <h1 className="text-2xl text-red-500 text-center">
        No service data available
      </h1>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name !== "" && input.unit !== "") {
      setIsSubmitting(true);
      const { success, message } = await editService(serviceId, input);

      if (success) {
        setAlertObject({ message: message, type: "success", show: true });
        setTimeout(() => {
          navigate("/users/services");
        }, 3000);
      } else {
        setAlertObject({ message: message, type: "danger", show: true });
        setIsSubmitting(false);
      }
    } else {
      setError("Please fill out all fields");
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
          Edit Service
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="name"
            className="block text-sm sm:text-lg font-medium text-slate-700 mb-2"
          >
            Service name
          </label>
          <input
            type="text"
            name="name"
            value={input.name}
            required
            onChange={handleInput}
            className="form-input sm:text-lg"
          />
        </div>
        <label
          htmlFor="unit"
          className="block text-sm sm:text-lg font-medium text-slate-700"
        >
          Service unit
        </label>
        <div className="space-y-4 text-center">
          <p className="font-medium text-slate-700">Select Unit:</p>
          <div className="flex items-center justify-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="By Weight"
                checked={input.unit === "By Weight"}
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
                checked={input.unit === "By Item"}
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
            disabled={isSubmitting}
            className={`form-button sm:text-xl sm:px-5 sm:py-3 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Editing..." : "Edit Service"}
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

export default EditService;
