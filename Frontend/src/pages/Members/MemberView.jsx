import { useState, useEffect } from "react";
import useMember from "../../Hooks/useMember";
import MemberCard from "../../Components/Card/MemberCard";
import SearchBar from "../../Components/SearchBar/SeachBar";
import AddButton from "../../Components/AddButton/AddButton";
import Loader from "../../Components/Loader/Loader";

const MemberView = () => {
  const { getMembers } = useMember();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const membersData = await getMembers(searchInput);
      setMembers(membersData);
      setLoading(false);
    };

    fetchMembers();
  }, [getMembers, searchInput]);

  return (
    <div className="space-y-4 mb-12">
      <div className="flex items-center justify-center">
        <SearchBar
          placeholderText={"name / phone number"}
          inputValue={searchInput}
          onInputChange={(value) => setSearchInput(value)}
        />
      </div>
      <div className="container mx-auto p-2 gap-3 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {loading ? (
          <Loader />
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
      <AddButton navigatePath="/users/members/add" buttonText="Add Member" />
    </div>
  );
};

export default MemberView;
