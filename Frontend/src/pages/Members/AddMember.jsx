import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMember from "../../Hooks/useMember";

const AddMember = () => {
  const { addMember } = useMember();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name !== "" && input.phoneNumber !== "") {
      addMember(input);
      navigate("/users/dashboard");
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-xl text-center font-semibold">Add a member</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <button onClick={handleSubmit} className="form-button">
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
