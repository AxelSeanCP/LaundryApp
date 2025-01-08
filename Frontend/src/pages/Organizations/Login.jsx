import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const OrganizationLogin = () => {
  const { login } = useAuth();
  const [input, setInput] = useState({
    organizationName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { organizationName, password } = input;
    const role = "organization";

    if (organizationName !== "" && password !== "") {
      await login(role);
      navigate("/organizations/dashboard");
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
      <div className="w-full max-w-md bg-white rounded shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Welcome to <span className="text-teal-500">Laundry App</span>
        </h1>
        <p className="font-semibold text-slate-500 text-center">
          Please Login <span className="text-indigo-600">Organization</span> to
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
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Login
          </button>
        </div>
        <p className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <Link
            to={"/organizations/register"}
            className="text-teal-500 no-underline hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OrganizationLogin;
