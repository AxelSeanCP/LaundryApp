import { useNavigate } from "react-router-dom";
import PropType from "prop-types";

const OptionCard = ({ optionId, name, price, serviceId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/services/${serviceId}/options/${optionId}`, {
      state: { optionId, name, price, serviceId },
    });
  };
  return (
    <div
      className="border-l-8 bg-white border-slate-700 rounded-md shadow-lg p-5 sm:w-auto hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="ml-1">
        <h1 className="text-2xl text-slate-800 font-semibold mb-2">{name}</h1>
        <p className="text-xl text-slate-800 font-medium">{price}</p>
      </div>
    </div>
  );
};

OptionCard.propTypes = {
  optionId: PropType.string.isRequired,
  name: PropType.string.isRequired,
  price: PropType.number.isRequired,
  serviceId: PropType.string.isRequired,
};

export default OptionCard;
