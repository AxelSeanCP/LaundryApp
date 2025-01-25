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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.username !== "" && input.password !== "") {
      const { success, message } = await addUser(input);

      if (success) {
        setAlertObject({ message: message, type: "success", show: true });
        setTimeout(() => {
          navigate("/organizations/dashboard");
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
            className="form-input sm:text-lg"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleInput}
            className="form-input sm:text-lg"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="form-button sm:px-5 sm:py-3 sm:text-xl"
          >
            Add User
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
