import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useMember from "../../Hooks/useMember";

const EditMember = () => {
  const { memberId } = useParams();
  const { editMember } = useMember();
  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
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
    return <h1>No member data available</h1>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name !== "" && input.phoneNumber !== "") {
      editMember(memberId, input);
      navigate("/users/members");
    } else {
      setError("Please fill out all fields");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-xl text-center font-semibold">Edit member</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Member name
          </label>
          <input
            type="text"
            name="name"
            value={input.name}
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Member phone number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            required
            onChange={handleInput}
            className="form-input"
          />
        </div>
        <div>
          <button onClick={handleSubmit} className="form-button">
            Edit Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMember;
