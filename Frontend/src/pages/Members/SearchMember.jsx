import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMember from "../../Hooks/useMember";
import Card from "../../Components/Card/Card";
import SearchBar from "../../Components/SearchBar/SeachBar";
import Loader from "../../Components/Loader/Loader";

const SearchMember = () => {
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
    //TODO: fix this to navigate(-1) with state data
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
      <div className="container mx-auto p-2 gap-1 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {loading ? (
          <Loader />
        ) : members.length > 0 ? (
          members.map((member) => (
            <Card
              key={member.id}
              clickFunction={() => cardOnClick(member.id)}
              title={member.name}
              description={member.phoneNumber}
              variant="compact"
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No members available
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchMember;
