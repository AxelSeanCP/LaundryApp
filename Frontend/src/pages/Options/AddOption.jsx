import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useOption from "../../Hooks/useOption";
import Alert from "../../Components/Alert/Alert";

const AddOption = () => {
  const { addOption } = useOption();
  const { serviceId } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name !== "" && input.price !== 0) {
      setIsSubmitting(true);
      const { success, message } = await addOption(serviceId, input);

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
      <div className="w-full max-w-md p-8 space-y-6 sm:max-w-lg">
        <h1 className="text-xl sm:text-2xl text-center font-semibold">
          Add a option for this service
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Option Name"
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Option Price"
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
            {isSubmitting ? "Adding..." : "Add Option"}
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

export default AddOption;
