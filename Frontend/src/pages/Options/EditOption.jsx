import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useOption from "../../Hooks/useOption";
import Alert from "../../Components/Alert/Alert";

const EditOption = () => {
  const { serviceId, optionId } = useParams();
  const { editOption } = useOption();
  const [input, setInput] = useState({
    name: "",
    price: 0,
  });
  const [error, setError] = useState(null);
  const [alertObject, setAlertObject] = useState({
    message: "",
    type: "",
    show: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const option = location.state;

  useEffect(() => {
    if (option) {
      setInput({
        name: option.name || "",
        price: option.price || 0,
      });
    }
  }, [option]);

  if (!option) {
    return (
      <h1 className="text-2xl text-red-500 text-center">
        No Option data available
      </h1>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name !== "" && input.price !== 0) {
      setIsSubmitting(true);
      const { success, message } = await editOption(serviceId, optionId, input);

      if (success) {
        setAlertObject({ message: message, type: "success", show: true });
        setTimeout(() => {
          navigate(`/users/services/${serviceId}`);
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
      <div className="w-full max-w-md sm:max-w-lg p-8 space-y-6">
        <h1 className="text-xl sm:text-2xl text-center font-semibold">
          Edit Option
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="name"
            className="block text-sm sm:text-lg font-medium text-slate-700 mb-2"
          >
            Option name
          </label>
          <input
            type="text"
            name="name"
            value={input.name}
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm sm:text-lg font-medium text-slate-700 mb-2"
          >
            Option price
          </label>
          <input
            type="number"
            name="price"
            value={input.price}
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`form-button ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Editing..." : "Edit Option"}
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

export default EditOption;
