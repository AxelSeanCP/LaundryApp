import { useNavigate } from "react-router-dom";
import PropType from "prop-types";

const AddButton = ({ navigatePath, buttonText }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center inset-0 z-50">
      <button
        className="rounded-lg shadow-lg bg-white font-medium text-slate-700 hover:bg-slate-200 border border-slate-700 fixed bottom-1 flex items-center justify-center gap-2 w-36 h-12 sm:w-48 sm:h-16 transition-all sm:text-xl focus:outline-none focus:ring-2 focus:ring-slate-700"
        onClick={() => navigate(navigatePath)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#000000"
          className="w-6 sm:w-9"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        {buttonText}
      </button>
    </div>
  );
};

AddButton.propTypes = {
  navigatePath: PropType.string.isRequired,
  buttonText: PropType.string.isRequired,
};

export default AddButton;
