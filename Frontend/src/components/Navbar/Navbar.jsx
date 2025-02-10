import PropType from "prop-types";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <nav className="text-black p-4 flex items-center fixed top-0 w-full bg-white z-40">
      <button className="block focus:outline-none mr-5" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <button className="block focus:outline-none mr-5" onClick={goBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </button>
      <h1 className="text-xl font-semibold">LaundryApp</h1>
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropType.func.isRequired,
};

export default Navbar;
