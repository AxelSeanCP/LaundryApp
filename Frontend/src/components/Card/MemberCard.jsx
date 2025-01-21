import { Link } from "react-router-dom";
import PropType from "prop-types";

const MemberCard = (props) => {
  const { id, name, phoneNumber } = props;

  return (
    <Link to={`/users/members/${id}`} className="no-underline">
      <div className="border-l-8 bg-white border-indigo-500 rounded-md shadow-lg p-5 sm:w-auto hover:shadow-xl ">
        <div className="ml-1">
          <h1 className="text-2xl text-slate-800 font-semibold mb-2">{name}</h1>
          <p className="text-xl text-slate-800 font-medium">{phoneNumber}</p>
        </div>
      </div>
    </Link>
  );
};

MemberCard.propTypes = {
  id: PropType.string.isRequired,
  name: PropType.string.isRequired,
  phoneNumber: PropType.string.isRequired,
};

export default MemberCard;
