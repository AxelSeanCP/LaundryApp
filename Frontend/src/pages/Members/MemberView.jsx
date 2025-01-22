import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMember from "../../Hooks/useMember";
import MemberCard from "../../Components/Card/MemberCard";
import SearchBar from "../../Components/SearchBar/SeachBar";
import Loader from "../../Components/Loader/Loader";

const MemberView = () => {
  const { getMembers } = useMember();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const membersData = await getMembers(searchInput);
        setMembers(membersData);
      } catch (error) {
        setError("Failed to load members. Please try again");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [getMembers, searchInput]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <SearchBar
          placeholderText={"name / phone number"}
          inputValue={searchInput}
          onInputChange={(value) => setSearchInput(value)}
        />
      </div>
      <div className="container mx-auto p-2 gap-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mb-12">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center col-span-full text-red-500">{error}</p>
        ) : members.length > 0 ? (
          members.map((member) => (
            <MemberCard
              key={member.id}
              id={member.id}
              name={member.name}
              phoneNumber={member.phoneNumber}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No members available
          </p>
        )}
      </div>
      <button
        className="w-full rounded-xl bg-white text-orange-600 hover:border hover:border-orange-600 px-4 py-2 fixed bottom-1"
        onClick={() => navigate("/users/members/add")}
      >
        Add Member
      </button>
    </div>
  );
};

export default MemberView;
