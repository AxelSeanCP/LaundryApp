import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddUser = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = input;

    if (username !== "" && password !== "") {
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
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleInput}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
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
