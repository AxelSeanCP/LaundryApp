import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

const OrganizationRegister = () => {
  //   const { register } = useAuth();
  const [input, setInput] = useState({
    organizationName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { organizationName, password } = input;
    if (organizationName !== "" && password !== "") {
      navigate("/organizations/login");
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md rounded shadow-lmd p-8 space-y-4">
        <h1 className="text-3xl font-bold text-center text-slate-700">
          Welcome to Laundry App
        </h1>
        <p className="font-semibold text-slate-500">
          Please Register Organizations to Continue
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
            onChange={handleInput}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
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
            onChange={handleInput}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white bg-indigo600 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Register
          </button>
        </div>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link
            to={"/organizations/login"}
            className="text-sky-500 no-underline hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OrganizationRegister;
