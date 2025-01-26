import { useNavigate } from "react-router-dom";
import PropType from "prop-types";
import useAuth from "../../Hooks/useAuth";

const Sidebar = ({ isOpen, toggleSidebar, isUser }) => {
  const { logout, user, organization } = useAuth();
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
        {isUser ? (
          <div className="bg-teal-500 py-4 px-6 border-b border-gray-600">
            <h1 className="text-xl font-bold">{user}</h1>
            <p className="text-lg font-semibold">{organization}</p>
          </div>
        ) : (
          <div className="bg-teal-500 p-4 text-lg font-semibold border-b border-gray-600">
            {organization}
          </div>
        )}
        <ul className="mt-6 space-y-2 px-2">
          {isUser ? (
            <>
              <li>
                <button
                  className="sidebar-button"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/users/dashboard");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="334155"
                  >
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                  </svg>
                  Dashboard
                </button>
              </li>
              <li>
                <button className="sidebar-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="334155"
                  >
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640H240v640Zm240-40q83 0 141.5-58.5T680-400q0-83-58.5-141.5T480-600q-83 0-141.5 58.5T280-400q0 83 58.5 141.5T480-200Zm0-68q-26 0-50.5-9.5T386-306l188-188q19 19 28.5 43.5T612-400q0 55-38.5 93.5T480-268ZM320-680q17 0 28.5-11.5T360-720q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720q0 17 11.5 28.5T320-680Zm120 0q17 0 28.5-11.5T480-720q0-17-11.5-28.5T440-760q-17 0-28.5 11.5T400-720q0 17 11.5 28.5T440-680ZM240-160v-640 640Z" />
                  </svg>
                  List Transaksi
                </button>
              </li>
              <li>
                <button
                  className="sidebar-button"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/users/members");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="334155"
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                  </svg>
                  Member
                </button>
              </li>
              <li>
                <button
                  className="sidebar-button"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/users/services");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="334155"
                  >
                    <path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z" />
                  </svg>
                  Services
                </button>
              </li>
              <li>
                <button className="sidebar-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="334155"
                  >
                    <path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                  </svg>
                  Reports
                </button>
              </li>
            </>
          ) : (
            //organizations sidebar
            <>
              <li>
                <button
                  className="sidebar-button"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/organizations/dashboard");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="334155"
                  >
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                  </svg>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  className="sidebar-button"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/organizations/addUser");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="334155"
                  >
                    <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
                  </svg>
                  Add User
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="sidebar-button text-red-700"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentcolor"
              >
                <path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h264v72H216v528h264v72H216Zm432-168-51-51 81-81H384v-72h294l-81-81 51-51 168 168-168 168Z" />
              </svg>
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
