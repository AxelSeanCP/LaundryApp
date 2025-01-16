import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const UserLogin = () => {
  const { login } = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = input;
    const role = "user";

    if (username !== "" && password !== "") {
      await login(role, { username, password });
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
      <div className="w-full max-w-md bg-white rounded shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Welcome to <span className="text-teal-500">Laundry App</span>
        </h1>
        <p className="font-semibold text-slate-500 text-center">
          Please Login <span className="text-indigo-600">User</span> to Continue
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleInput}
            required
            className="form-input"
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
            className="form-input"
          />
        </div>

        <div>
          <button type="button" onClick={handleSubmit} className="form-button">
            Login
          </button>
        </div>
        <p className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <Link
            to={"/users/register"}
            className="text-teal-500 no-underline hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
