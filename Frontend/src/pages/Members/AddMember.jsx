import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMember from "../../Hooks/useMember";
import Alert from "../../Components/Alert/Alert";

const AddMember = () => {
  const { addMember } = useMember();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const [alertObject, setAlertObject] = useState({
    message: "",
    type: "",
    show: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name !== "" && input.phoneNumber !== "") {
      const { success, message } = await addMember(input);

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
          Add a member
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
        <div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            onChange={handleInput}
            className="form-input sm:text-lg"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="form-button sm:text-xl sm:px-5 sm:py-3"
          >
            Add Member
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

export default AddMember;
