import { useNavigate } from "react-router-dom";
import PropType from "prop-types";
import useAuth from "../../Hooks/useAuth";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-teal-600 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 text-lg font-semibold border-b border-gray-600">
          LaundryApp
        </div>
        <ul className="mt-6 space-y-4 px-4">
          <li>
            <button
              className="w-full bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md"
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
};

export default Sidebar;
