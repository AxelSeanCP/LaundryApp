import PropType from "prop-types";
import { useEffect } from "react";

const Alert = ({ alertText, alertType, duration = 3000, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  const alertStyles = {
    success: "border-green-500",
    danger: "border-red-500",
  };

  const loadingBarStyles = {
    success: "bg-green-500",
    danger: "bg-red-500",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
      <div
        className={`p-4 rounded-t-lg rounded-x-lg shadow-lg border-l-8 flex flex-col justify-center items-start gap-3 bg-white text-slate-800 ${alertStyles[alertType]}`}
      >
        <div className="flex-1">
          <p className="font-medium">{alertText}</p>
        </div>
      </div>
      <div
        className={`relative w-full h-1 overflow-hidden rounded ${loadingBarStyles[alertType]}`}
      >
        <div className="absolute bottom-0 left-0 h-full animate-scroll bg-white"></div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  alertText: PropType.string.isRequired,
  alertType: PropType.oneOf(["success", "danger"]).isRequired,
  duration: PropType.number,
  onClose: PropType.func.isRequired,
};

export default Alert;
