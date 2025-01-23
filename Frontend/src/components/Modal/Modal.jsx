import PropType from "prop-types";

const Modal = ({ buttonAction, closeModal, title, body, buttonText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeModal}
      ></div>

      <div className="relative bg-white rounded-lg shadow-lg">
        <div className="bg-teal-400 p-4 sm:p-6 rounded-t-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
            {title}
          </h1>
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-lg sm:text-xl font-medium text-slate-700 text-center">
            {body}
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 sm:gap-2 p-1 sm:p-2">
          <button
            className="form-button sm:px-5 sm:py-3 sm:text-xl"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="reverse-form-button sm:px-5 sm:py-3 sm:text-xl"
            onClick={buttonAction}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  buttonAction: PropType.func.isRequired,
  closeModal: PropType.func.isRequired,
  title: PropType.string.isRequired,
  body: PropType.string.isRequired,
  buttonText: PropType.string.isRequired,
};

export default Modal;
