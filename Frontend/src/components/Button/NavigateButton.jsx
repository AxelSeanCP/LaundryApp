import { useNavigate } from "react-router-dom";
import PropType from "prop-types";
const NavigateButton = ({ navigatePath, buttonText, icon = "none" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigatePath);
  };

  return (
    <div className="flex items-center justify-center inset-0 z-50">
      <button
        className="rounded-lg shadow-lg bg-purple-600 font-medium text-white hover:bg-purple-700 hover:scale-105 transition-transform fixed bottom-4 flex items-center justify-center gap-2 w-40 h-12 sm:w-48 sm:h-14 text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-purple-700"
        onClick={handleClick}
      >
        {icon === "plus" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
            className="w-5 sm:w-7"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        )}
        {buttonText}
      </button>
    </div>
  );
};

NavigateButton.propTypes = {
  navigatePath: PropType.string.isRequired,
  buttonText: PropType.string.isRequired,
  icon: PropType.oneOf(["none", "plus"]),
};

export default NavigateButton;
