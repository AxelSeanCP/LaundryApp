import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useService from "../../Hooks/useService";
import Loader from "../../Components/Loader/Loader";
import Card from "../../Components/Card/Card";
import NavigateButton from "../../Components/Button/NavigateButton";

const ChooseService = () => {
  const { getServices } = useService();
  const [services, setServices] = useState([]);
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const servicesData = await getServices();
      setServices(servicesData);
      setLoading(false);
    };

    fetchServices();
  }, [getServices]);

  return (
    <div className="space-y-4 mb-12">
      <div className="flex items-center justify-center">
        <button className="border-b border-indigo-600 text-indigo-600 text-xl font-semibold hover:bg-slate-200 flex items-center gap-3 w-full max-w-md sm:max-w-lg px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
          {member.name || "Select/Input Member"}
        </button>
      </div>
      <div className="container mx-auto p-2 gap-3 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {loading ? (
          <Loader />
        ) : services.length > 0 ? (
          services.map(
            (
              service //TODO: add toggle button as children of card, add function to toggle the toggle button when card is clicked
            ) => (
              <Card
                key={service.id}
                title={service.name}
                description={service.unit}
                variant="functional"
              />
            )
          )
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg sm:text-xl">
            No Services available
          </p>
        )}
      </div>
      <NavigateButton
        navigatePath="/users/transactions/add"
        buttonText="Continue"
      />
    </div>
  );
};

export default ChooseService;
