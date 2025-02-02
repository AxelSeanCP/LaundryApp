import PropType from "prop-types";

const Card = ({ clickFunction, title, description, defaultStyle = true }) => {
  const cardStyle = {
    default:
      "border-l-8 border-indigo-700 p-5 rounded-md shadow-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1",
    other:
      "border-b-2 border-slate-700 px-3 py-2 hover:bg-slate-200 rounded-sm shadow-sm",
  };

  const h1Style = {
    default: "text-2xl mb-2",
    other: "text-xl mb-1",
  };

  const pStyle = {
    default: "text-xl text-slate-700",
    other: "text-base text-slate-500",
  };

  return (
    <div
      className={`bg-white sm:w-auto cursor-pointer ${
        defaultStyle ? cardStyle["default"] : cardStyle["other"]
      }`}
      onClick={clickFunction}
    >
      <div className="ml-1">
        <h1
          className={`text-slate-900 font-semibold ${
            defaultStyle ? h1Style["default"] : h1Style["other"]
          }`}
        >
          {title}
        </h1>
        <p
          className={`font-medium ${
            defaultStyle ? pStyle["default"] : pStyle["other"]
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  clickFunction: PropType.func.isRequired,
  title: PropType.string.isRequired,
  description: PropType.oneOfType([PropType.string, PropType.number])
    .isRequired,
  defaultStyle: PropType.bool,
};

export default Card;
