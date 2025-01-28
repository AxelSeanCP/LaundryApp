import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../../Hooks/useUser";
import Alert from "../../Components/Alert/Alert";

const AddUser = () => {
  const { addUser } = useUser();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
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

    if (input.username !== "" && input.password !== "") {
      setIsSubmitting(true);
      const { success, message } = await addUser(input);

      if (success) {
        setAlertObject({ message: message, type: "success", show: true });
        setTimeout(() => {
          navigate("/organizations/dashboard");
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
        <h1 className="text-xl sm:text-2xl text-center font-semibold text-indigo-600">
          Add a user to your organization
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={`form-button ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Adding..." : "Add User"}
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

export default AddUser;
