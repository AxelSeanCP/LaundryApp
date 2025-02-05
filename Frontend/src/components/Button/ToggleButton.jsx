import PropType from "prop-types";
import { useState } from "react";

const ToggleButton = ({ onToggle }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    onToggle();
  };

  return (
    <div onClick={handleToggle}>
      <div
        className={`w-9 h-5 cursor-pointer rounded-full flex items-center p-1 ${
          isToggled ? "bg-sky-600" : "bg-slate-500"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
            isToggled ? "translate-x-3" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  onToggle: PropType.func,
};

export default ToggleButton;
