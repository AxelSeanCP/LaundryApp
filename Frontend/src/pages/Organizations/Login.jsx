import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const OrganizationLogin = () => {
  const { login } = useAuth();
  const [input, setInput] = useState({
    organizationName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { organizationName, password } = input;
    console.log(input);
    if (organizationName !== "" && password !== "") {
      login();
      navigate("/");
    } else {
      alert("Please fill out all fields");
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
      <div className="w-full max-w-md rounded shadow-md p-8 space-y-4">
        <h1 className="text-3xl font-bold text-center text-slate-700">
          Welcome to <span className="text-indigo-600">Laundry App</span>
        </h1>
        <p className="font-semibold text-slate-500 text-center">
          Please Login <span className="text-indigo-600">Organizations</span> to
          Continue
        </p>

        <div>
          <label
            htmlFor="organizationName"
            className="block text-sm font-medium text-slate-700"
          >
            Organization Name
          </label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            onChange={handleInput}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationLogin;
