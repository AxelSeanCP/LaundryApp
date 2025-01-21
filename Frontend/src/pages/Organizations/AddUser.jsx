import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../../Hooks/useUser";

const AddUser = () => {
  const { addUser } = useUser();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.username !== "" && input.password !== "") {
      await addUser(input);
      navigate("/organizations/dashboard");
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
        <h1 className="text-xl text-center font-semibold text-indigo-600">
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
          <button type="button" onClick={handleSubmit} className="form-button">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
