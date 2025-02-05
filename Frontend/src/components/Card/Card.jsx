import PropType from "prop-types";

const Card = ({
  clickFunction = () => {},
  title,
  description,
  variant = "default",
  children,
}) => {
  const cardStyle = {
    default:
      "border-l-8 border-indigo-700 p-5 rounded-md shadow-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 cursor-pointer",
    compact:
      "border-b-2 border-slate-700 px-3 py-2 hover:bg-slate-200 rounded-sm shadow-sm cursor-pointer",
    functional: "px-3 py-2",
  };

  const h1Style = {
    default: "text-2xl mb-2",
    compact: "text-xl mb-1",
    functional: "text-2xl",
  };

  const pStyle = {
    default: "text-xl text-slate-700",
    compact: "text-base text-slate-500",
    functional: "hidden",
  };

  return (
    <div
      className={`bg-white sm:w-auto flex justify-between items-center ${cardStyle[variant]}`}
      onClick={clickFunction}
    >
      <div className="ml-1">
        <h1 className={`text-slate-900 font-semibold ${h1Style[variant]}`}>
          {title}
        </h1>
        <p className={`font-medium ${pStyle[variant]}`}>{description}</p>
      </div>
      {children}
    </div>
  );
};

Card.propTypes = {
  clickFunction: PropType.func,
  title: PropType.string.isRequired,
  description: PropType.oneOfType([PropType.string, PropType.number])
    .isRequired,
  variant: PropType.oneOf(["default", "compact", "functional"]),
  children: PropType.node,
};

export default Card;
