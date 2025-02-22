import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (isAuthenticated && role === "organization") {
      navigate("/organizations/dashboard");
    } else if (isAuthenticated && role === "user") {
      navigate("/users/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-300 via-slate-200 to-blue-200">
      <div className="w-full p-8 flex items-center justify-center">
        <h1 className="text-center text-4xl font-bold">
          Welcome! Please Select{" "}
          <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
            Your Role
          </span>
        </h1>
      </div>

      <div className="lg:flex lg:flex-1 p-12">
        <div className="flex-1 text-center lg:mb-0 flex max-lg:border-b lg:border-r border-slate-600">
          <div className="w-full flex flex-col gap-6 p-12 items-center justify-center">
            <h2 className="text-3xl font-bold text-indigo-800">
              For{" "}
              <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
                Organizations
              </span>
            </h2>
            <p className="text-slate-700 text-lg h-20 flex items-center justify-center">
              Access tools to manage users, streamline operations, and create a
              better experience.
            </p>
            <button
              className="bg-indigo-600 text-white py-4 px-5 rounded-sm hover:bg-indigo-700 transition-colors duration-300 w-1/3 shadow-sm"
              onClick={() => navigate("/organizations/login")}
            >
              Login
            </button>
            <p className="text-center text-slate-700">
              Don&apos;t have an account?{" "}
              <Link
                to={"/organizations/register"}
                className="text-blue-500 font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="flex-1 text-center flex max-lg:border-t lg:border-l border-slate-600">
          <div className="w-full flex flex-col gap-6 p-12 items-center justify-center">
            <h2 className="text-3xl font-bold text-indigo-800">
              For{" "}
              <span className="bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
                Users
              </span>
            </h2>
            <p className="text-slate-700 text-lg h-20 flex items-center justify-center">
              Join your organization with other users, manage your tasks, and
              simplify your workflow.
            </p>
            <button
              className="border border-indigo-600 text-indigo-600 py-4 px-5 rounded-sm hover:bg-indigo-600 hover:text-white transition-colors duration-300 w-1/3 shadow-sm"
              onClick={() => navigate("/users/login")}
            >
              Login
            </button>
            <p className="text-center text-slate-700">
              Don&apos;t have an account? Ask your organizations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
