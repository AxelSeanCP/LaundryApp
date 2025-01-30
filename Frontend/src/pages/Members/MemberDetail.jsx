import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useMember from "../../Hooks/useMember";
import Loader from "../../Components/Loader/Loader";
import Modal from "../../Components/Modal/Modal";

const MemberDetail = () => {
  const { memberId } = useParams();
  const { getMemberById, deleteMember } = useMember();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);

      const memberData = await getMemberById(memberId);
      setMember(memberData);

      setLoading(false);
    };

    fetchMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  const handleEditMember = () => {
    navigate(`/users/members/${memberId}/edit`, { state: member });
  };

  const handleDeleteMember = async () => {
    await deleteMember(memberId);
    setShowModal(false);
    navigate("/users/members");
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center">
      {showModal && (
        <Modal
          buttonAction={handleDeleteMember}
          closeModal={toggleModal}
          title="Delete Member?"
          body="Are you sure you want to delete this member?"
          buttonText="Delete"
        />
      )}
      {loading ? (
        <Loader />
      ) : member.error ? (
        <p className="text-center col-span-full text-red-500">
          {member.message}
        </p>
      ) : (
        <div className="max-w-md w-full space-y-3 sm:max-w-lg">
          <div className="bg-teal-400 flex flex-col items-center justify-center p-4 sm:p-5 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#FFFFFF"
              className="w-36 sm:w-48"
            >
              <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
            </svg>
            <h1 className="text-4xl sm:text-5xl text-white font-bold">
              {member.name}
            </h1>
          </div>
          <div className="border-b-2 border-slate-600 p-2 sm:p-3 flex items-center gap-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#000000"
              className="w-6 sm:w-9"
            >
              <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
            </svg>
            <p className="text-xl sm:text-2xl font-medium text-slate-700">
              {member.phoneNumber}
            </p>
          </div>
          <div className="border-b-2 border-slate-600 p-2 sm:p-3 flex items-center gap-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#000000"
              className="w-6 sm:w-9"
            >
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
            </svg>
            <p className="text-xl sm:text-2xl font-medium text-slate-700">
              {member.address || "Information not available"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <button className="form-button" onClick={handleEditMember}>
              Edit Member
            </button>
            <button className="reverse-form-button" onClick={toggleModal}>
              Delete Member
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetail;
