import PropType from "prop-types";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex items-center">
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
      <h1 className="text-xl font-semibold">LaundryApp</h1>
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropType.func.isRequired,
};

export default Navbar;
