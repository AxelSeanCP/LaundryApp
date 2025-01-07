import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "organization") {
      navigate("/organizations/dashboard");
    } else if (role === "user") {
      navigate("/users/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12 mt-12">
        Welcome! Please Select{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">
          Your Role
        </span>
      </h1>
      <div className="lg:flex gap-10 w-4/5">
        <div className="flex-1 border border-indigo-700 shadow-md p-8 rounded-md text-center mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold mb-3">
            For <span className="text-indigo-600">Organizations</span>
          </h2>
          <p className="text-slate-700 h-20 flex items-center justify-center">
            Access tools to manage users, streamline operations, and create a
            better experience.
          </p>
          <button
            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 w-full mb-4"
            onClick={() => navigate("/organizations/login")}
          >
            Login
          </button>
          <p className="text-center text-slate-700">
            Don&apos;t have an account?{" "}
            <Link
              to={"/organizations/register"}
              className="text-indigo-500 font-medium hover:underline hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
        <div className="flex-1 shadow-md p-8 rounded-md text-center bg-white border border-teal-700">
          <h2 className="text-3xl font-bold mb-3">
            For <span className="text-teal-600">Users</span>
          </h2>
          <p className="text-slate-700 h-20 flex items-center justify-center">
            Join your organization, manage your tasks, and simplify your
            workflow.
          </p>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-800 w-full mb-4"
            onClick={() => navigate("/users/login")}
          >
            Login
          </button>
          <p className="text-center text-slate-700">
            Don&apos;t have an account?{" "}
            <Link
              to={"/users/register"}
              className="text-teal-500 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
