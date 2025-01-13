import { useNavigate } from "react-router-dom";
import PropType from "prop-types";
import useAuth from "../../Hooks/useAuth";

const Sidebar = ({ isOpen, toggleSidebar, isUser }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-200 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="bg-teal-500 p-4 text-lg font-semibold border-b border-gray-600">
          Username
        </div>
        <ul className="mt-6 space-y-2 px-2">
          {isUser && (
            <>
              <li>
                <button
                  className="text-slate-700 w-full hover:bg-slate-300 py-2 px-4 rounded-md text-left"
                  onClick={() => navigate("/users/dashboard")}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button className="text-slate-700 w-full hover:bg-slate-300 py-2 px-4 rounded-md text-left">
                  List Transaksi
                </button>
              </li>
              <li>
                <button className="text-slate-700 w-full hover:bg-slate-300 py-2 px-4 rounded-md text-left">
                  Member
                </button>
              </li>
              <li>
                <button className="text-slate-700 w-full hover:bg-slate-300 py-2 px-4 rounded-md text-left">
                  Services
                </button>
              </li>
              <li>
                <button className="text-slate-700 w-full hover:bg-slate-300 py-2 px-4 rounded-md text-left">
                  Reports
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="w-full text-slate-700 hover:bg-slate-300 py-2 px-4 rounded-md text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropType.bool.isRequired,
  toggleSidebar: PropType.func.isRequired,
  isUser: PropType.bool.isRequired,
};

export default Sidebar;
