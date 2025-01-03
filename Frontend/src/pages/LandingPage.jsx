import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12 mt-12">
        Please Select <span className="text-indigo-600">Your Role</span>
      </h1>
      <div className="lg:flex gap-10 w-4/5">
        <div className="flex-1 bg-slate-200 shadow-md p-8 rounded-md text-center mb-6 md:mb-0">
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
              className="text-indigo-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
        <div className="flex-1 shadow-md p-8 rounded-md text-center">
          <h2 className="text-3xl font-bold mb-3">
            For <span className="text-indigo-600">Users</span>
          </h2>
          <p className="text-slate-700 h-20 flex items-center justify-center">
            Join your organization, manage your tasks, and simplify your
            workflow.
          </p>
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 w-full mb-4"
            onClick={() => navigate("/users/login")}
          >
            Login
          </button>
          <p className="text-center text-slate-700">
            Don&apos;t have an account?{" "}
            <Link
              to={"/users/register"}
              className="text-indigo-500 font-medium hover:underline"
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
