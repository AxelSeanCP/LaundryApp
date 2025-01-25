import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Alert from "../../Components/Alert/Alert";

const OrganizationRegister = () => {
  const { register } = useAuth();
  const [input, setInput] = useState({
    organizationName: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [alertObject, setAlertObject] = useState({
    message: "",
    type: "",
    show: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { organizationName, password } = input;
    if (organizationName !== "" && password !== "") {
      const { success, message } = await register({
        name: organizationName,
        password,
      });

      if (success) {
        setAlertObject({ message: message, type: "success", show: true });
        setTimeout(() => {
          navigate("/organizations/login");
        }, 3000);
      } else {
        setAlertObject({ message: message, type: "danger", show: true });
      }
    } else {
      setError("Please fill out all the fields");
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded shadow-lmd p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Welcome to <span className="text-teal-500">Laundry App</span>
        </h1>
        <p className="font-semibold text-slate-500 text-center">
          Please Login <span className="text-indigo-600">Organization</span> to
          Continue
        </p>
        {error && <p className="text-red-500">{error}</p>}
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
            Register
          </button>
        </div>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link
            to={"/organizations/login"}
            className="text-teal-500 no-underline hover:underline"
          >
            Login here
          </Link>
        </p>
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

export default OrganizationRegister;
