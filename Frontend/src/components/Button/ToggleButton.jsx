const ToggleButton = () => {
  return (
    <div>
      <input type="checkbox" id="toggle" className="hidden" />
      <label htmlFor="toggle">
        <div className="w-9 h-5 bg-slate-500 rounded-full flex items-center p-1 cursor-pointer toggle-track">
          <div className="w-4 h-4 bg-white rounded-full toggle-circle"></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleButton;
