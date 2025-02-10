import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useService from "../../Hooks/useService";
import Loader from "../../Components/Loader/Loader";
import Card from "../../Components/Card/Card";
import ToggleButton from "../../Components/Button/ToggleButton";
import Alert from "../../Components/Alert/Alert";

const ChooseService = () => {
  const { getServices, getServiceById } = useService();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});
  const [alertObject, setAlertObject] = useState({
    message: "",
    type: "",
    show: false,
  });
  const navigate = useNavigate();
  const { state } = useLocation();
  const member = state?.member || { name: "" };
  const [input, setInput] = useState({
    options: [],
    member: member || null,
  });

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const servicesData = await getServices();

      const updatedServices = await Promise.all(
        servicesData.map(async (service) => {
          const serviceData = await getServiceById(service.id);
          return {
            ...service,
            options: serviceData.options,
          };
        })
      );

      setServices(updatedServices);
      setLoading(false);
    };

    fetchServices();
  }, [getServices, getServiceById]);

  const handleValidation = () => {
    if (member.name === "") {
      setAlertObject({
        message: "Please select a member",
        type: "danger",
        show: true,
      });
      return false;
    }

    if (input.options.length === 0) {
      setAlertObject({
        message: "Please choose at least one service option ",
        type: "danger",
        show: true,
      });
      return false;
    }

    if (
      input.options.some(
        (option) => option.qty === 0 || option.qty === undefined
      )
    ) {
      setAlertObject({
        message: "Please input a valid quantity for all selected options ",
        type: "danger",
        show: true,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!handleValidation()) {
      return;
    }

    const totalPrice = input.options.reduce(
      (total, option) => total + option.qty * option.price,
      0
    );

    const newInput = {
      member: input.member,
      options: input.options.map(({ serviceName, idOption, qty, price }) => ({
        serviceName,
        idOption,
        qty,
        price,
      })),
      totalPrice,
    };

    navigate("/users/transactions/add", { state: newInput });
  };

  const handleOptionChange = (serviceId, serviceName, optionId, price) => {
    setInput((prev) => {
      const existingService = prev.options.find(
        (entry) => entry.serviceId === serviceId
      );

      if (existingService) {
        return {
          ...prev,
          options: prev.options.map((entry) =>
            entry.serviceId === serviceId
              ? { ...entry, serviceName, idOption: optionId, price, qty: 0 }
              : entry
          ),
        };
      }

      return {
        ...prev,
        options: [
          ...prev.options,
          { serviceId, serviceName, idOption: optionId, price, qty: 0 },
        ],
      };
    });
  };

  const handleQtyChange = (serviceId, qty) => {
    setInput((prev) => ({
      ...prev,
      options: prev.options.map((entry) =>
        entry.serviceId === serviceId
          ? { ...entry, qty: parseFloat(qty) || 0 }
          : entry
      ),
    }));
  };

  const handleToggle = (id) => {
    setDropdownStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const closeAlert = () => {
    setAlertObject((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <div className="space-y-4 mb-12">
      {/* Member select button */}
      <div className="flex items-center justify-center">
        <button
          className="border-b border-indigo-600 text-indigo-600 text-xl font-semibold hover:bg-slate-200 flex items-center gap-3 w-full max-w-md sm:max-w-lg px-3 py-2"
          onClick={() => navigate("/users/members/search")}
        >
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

      {/* Services card */}
      <div className="container mx-auto p-2 gap-3 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {loading ? (
          <Loader />
        ) : services.length > 0 ? (
          services.map((service) => (
            <div key={service.id}>
              <Card
                title={service.name}
                description={service.unit}
                variant="functional"
              >
                <ToggleButton onToggle={() => handleToggle(service.id)} />
              </Card>
              {/* Dropdown options */}
              {dropdownStates[service.id] && (
                <div className="bg-white p-1 rounded shadow">
                  {service.options.length > 0 ? (
                    <div>
                      <ul className="grid grid-cols-2">
                        {service.options.map((option) => (
                          <li key={option.id} className="p-1 gap-2">
                            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition">
                              <input
                                type="radio"
                                name={service.id}
                                value={option.id}
                                className="hidden peer"
                                onChange={() =>
                                  handleOptionChange(
                                    service.id,
                                    service.name,
                                    option.id,
                                    option.price
                                  )
                                }
                              />
                              <div className="w-5 h-5 rounded-full border border-gray-400 peer-checked:border-purple-600 peer-checked:bg-purple-600 flex items-center justify-center transition-all">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-slate-800 font-medium">
                                  {option.name}
                                </span>
                                <span className="text-slate-600 flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    viewBox="0 -960 960 960"
                                    fill="currentColor"
                                  >
                                    <path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" />
                                  </svg>
                                  {option.price}
                                </span>
                              </div>
                            </label>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-end">
                        <label
                          htmlFor="qty"
                          className="flex items-center gap-2 mt-4 mr-4"
                        >
                          <span className="text-slate-700 font-medium">
                            Qty:
                          </span>
                          <input
                            type="number"
                            name="qty"
                            className="w-16 p-1 border border-gray-300 rounded-md text-center"
                            placeholder="0"
                            step="0.1"
                            min="0"
                            onChange={(e) =>
                              handleQtyChange(service.id, e.target.value)
                            }
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center col-span-full text-gray-500 text-lg sm:text-xl">
                      No Options available
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg sm:text-xl">
            No Services available
          </p>
        )}
      </div>
      <div className="flex items-center justify-center inset-0 z-50">
        <button
          className="rounded-lg shadow-lg bg-purple-600 font-medium text-white hover:bg-purple-700 hover:scale-105 transition-transform fixed bottom-4 flex items-center justify-center gap-2 w-40 h-12 sm:w-48 sm:h-14 text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-purple-700"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
      {alertObject.show && (
        <Alert
          alertText={alertObject.message}
          alertType={alertObject.type}
          duration={3000}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default ChooseService;
