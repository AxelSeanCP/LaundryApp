import { Link } from "react-router-dom";
import PropType from "prop-types";

const ServiceCard = ({ id, name, unit }) => {
  return (
    <Link to={`/users/services/${id}`} className="no-underline">
      <div className="border-l-8 bg-white border-slate-700 rounded-md shadow-lg p-5 sm:w-auto hover:shadow-xl">
        <div className="ml-1">
          <h1 className="text-2xl text-slate-800 font-semibold mb-2">{name}</h1>
          <p className="text-xl text-slate-800 font-medium">{unit}</p>
        </div>
      </div>
    </Link>
  );
};

ServiceCard.propTypes = {
  id: PropType.string.isRequired,
  name: PropType.string.isRequired,
  unit: PropType.string.isRequired,
};

export default ServiceCard;
