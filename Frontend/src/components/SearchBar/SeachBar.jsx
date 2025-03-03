import PropType from "prop-types";
import { useEffect, useState } from "react";

const SearchBar = ({
  placeholderText = "Search...",
  inputValue,
  onInputChange,
}) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onInputChange(debouncedValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue, onInputChange]);
  return (
    <div className="flex items-center space-x-2 w-full px-2 max-w-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#000000"
        className="w-9 h-9"
        aria-hidden="true"
      >
        <path d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z" />
      </svg>
      <input
        type="text"
        name="searchInput"
        placeholder={placeholderText}
        value={inputValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
        className="w-full px-3 py-2 mt-1 border-b-2 rounded-md border-slate-600 focus:outline-none focus:border-sky-600 italic"
        aria-label={placeholderText}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholderText: PropType.string,
  inputValue: PropType.string.isRequired,
  onInputChange: PropType.func.isRequired,
};

export default SearchBar;
