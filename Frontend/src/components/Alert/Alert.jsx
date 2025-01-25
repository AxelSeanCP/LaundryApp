import PropType from "prop-types";
import { useEffect } from "react";

const Alert = ({ alertText, alertType, duration = 5000, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  const alertStyles = {
    success: "border-green-500 bg-green-100 text-green-800",
    danger: "border-red-500 bg-red-100 text-red-800",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-96 p-4 rounded-lg shadow-lg border-l-4 flex items-start gap-3 ${alertStyles[alertType]}`}
    >
      <div>
        {alertType === "success" ? (
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium">{alertText}</p>
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
