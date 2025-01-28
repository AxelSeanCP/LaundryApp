import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useMember from "../../Hooks/useMember";
import Alert from "../../Components/Alert/Alert";

const EditMember = () => {
  const { memberId } = useParams();
  const { editMember } = useMember();
  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const [alertObject, setAlertObject] = useState({
    message: "",
    type: "",
    show: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { state: member } = useLocation();

  useEffect(() => {
    if (member) {
      setInput({
        name: member.name || "",
        phoneNumber: member.phoneNumber || "",
      });
    }
  }, [member]);

  if (!member) {
    return (
      <h1 className="text-2xl text-red-500 text-center">
        No member data available
      </h1>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name !== "" && input.phoneNumber !== "") {
      setIsSubmitting(true);
      const { success, message } = await editMember(memberId, input);

      if (success) {
        setAlertObject({ message: message, type: "success", show: true });
        setTimeout(() => {
          navigate("/users/members");
        }, 3000);
      } else {
        setAlertObject({ message: message, type: "danger", show: true });
        setIsSubmitting(false);
      }
    } else {
      setError("Please fill out all fields");
      setIsSubmitting(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeAlert = () => {
    setAlertObject((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 sm:max-w-lg">
        <h1 className="text-xl sm:text-2xl text-center font-semibold">
          Edit Member
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="name"
            className="block text-sm sm:text-lg font-medium text-slate-700 mb-2"
          >
            Member name
          </label>
          <input
            type="text"
            name="name"
            value={input.name}
            required
            onChange={handleInput}
            className="form-input sm:text-lg"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm sm:text-lg font-medium text-slate-700 mb-2"
          >
            Member phone number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            required
            onChange={handleInput}
            className="form-input sm:text-lg"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`form-button sm:text-xl sm:px-5 sm:py-3 ${
              isSubmitting ? "opactity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Editing..." : "Edit Member"}
          </button>
        </div>
      </div>
      {alertObject.show && (
        <Alert
          alertText={alertObject.message}
          alertType={alertObject.type}
          duration={3000}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default EditMember;
