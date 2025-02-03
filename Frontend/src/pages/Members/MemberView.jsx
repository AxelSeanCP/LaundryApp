import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMember from "../../Hooks/useMember";
import Card from "../../Components/Card/Card";
import SearchBar from "../../Components/SearchBar/SeachBar";
import NavigateButton from "../../Components/Button/NavigateButton";
import Loader from "../../Components/Loader/Loader";

const MemberView = () => {
  const { getMembers } = useMember();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const membersData = await getMembers(searchInput);
      setMembers(membersData);
      setLoading(false);
    };

    fetchMembers();
  }, [getMembers, searchInput]);

  const cardOnClick = (id) => {
    navigate(`/users/members/${id}`);
  };

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
            <Card
              key={member.id}
              clickFunction={() => cardOnClick(member.id)}
              title={member.name}
              description={member.phoneNumber}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No members available
          </p>
        )}
      </div>
      <NavigateButton
        navigatePath="/users/members/add"
        buttonText="Add Member"
        icon="plus"
      />
    </div>
  );
};

export default MemberView;
