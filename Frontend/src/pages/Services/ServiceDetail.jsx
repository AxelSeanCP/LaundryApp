import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useService from "../../Hooks/useService";
import Loader from "../../Components/Loader/Loader";
import Modal from "../../Components/Modal/Modal";
import AddButton from "../../Components/AddButton/AddButton";
import Card from "../../Components/Card/Card";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { getServiceById, deleteService } = useService();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);

      const serviceData = await getServiceById(serviceId);
      setService(serviceData);

      setLoading(false);
    };

    fetchService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  const handleEditService = () => {
    navigate(`/users/services/${serviceId}/edit`, { state: service });
  };

  const handleDeleteService = async () => {
    await deleteService(serviceId);
    setShowModal(false);
    navigate("/users/services");
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const cardOnClick = ({ optionId, name, price, serviceId }) => {
    navigate(`/users/services/${serviceId}/options/${optionId}`, {
      state: { optionId, name, price, serviceId },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        {showModal && (
          <Modal
            buttonAction={handleDeleteService}
            closeModal={toggleModal}
            title="Delete Service?"
            body="Are you sure you want to delete this service?"
            buttonText="Delete"
          />
        )}
        {loading ? (
          <Loader />
        ) : service.error ? (
          <p className="text-red-500 text-center col-span-full">
            {service.message}
          </p>
        ) : (
          <div className="w-full max-w-xl lg:max-w-2xl flex flex-col items-center justify-center">
            <div className="flex w-full items-center justify-between bg-white border-x-8 border-slate-700 rounded-md shadow-lg px-5 py-7 my-4">
              <div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#000000"
                    className="w-7"
                  >
                    <path d="M165-480 45-688l264-152h51q16 48 38 84t82 36q60 0 82-36t38-84h51l263 153-119 207-75-41v192l-63 55q-3 2-8 5t-9 5v-393l125 69 40-70-153-89q-24 49-70.5 78T480-640q-55 0-101.5-29T308-747l-154 89 41 70 125-69v237q-21 2-41 6.5T240-401v-120l-75 41Zm21 295-52-61 87-74q23-20 52.5-30.5T335-361q32 0 61 10.5t52 30.5l116 99q12 10 28.5 15.5T626-200q18 0 33.5-5t27.5-16l87-75 52 62-87 74q-23 20-52 30t-61 10q-32 0-61.5-10T512-160l-116-99q-12-10-27.5-15.5T335-280q-17 0-33.5 5.5T273-259l-87 74Zm294-455Z" />
                  </svg>
                  <h1 className="text-2xl font-semibold">{service.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#000000"
                    className="w-7"
                  >
                    <path d="m240-160 40-160H120l20-80h160l40-160H180l20-80h160l40-160h80l-40 160h160l40-160h80l-40 160h160l-20 80H660l-40 160h160l-20 80H600l-40 160h-80l40-160H360l-40 160h-80Zm140-240h160l40-160H420l-40 160Z" />
                  </svg>
                  <p className="text-lg font-medium">{service.unit}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-md shadow-sm bg-slate-700 text-white px-4 py-3 hover:bg-slate-800"
                  onClick={handleEditService}
                >
                  Edit
                </button>
                <button
                  className="rounded-md shadow-sm border border-slate-700 px-4 py-3 hover:bg-slate-700 hover:text-white"
                  onClick={toggleModal}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="container mx-auto p-2 gap-3 grid lg:grid-cols-2">
              {service.options.length > 0 ? (
                service.options.map((option) => (
                  <Card
                    key={option.id}
                    clickFunction={() => cardOnClick(option)}
                    title={option.name}
                    description={option.price}
                  />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500 text-lg sm:text-xl">
                  No options available
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <AddButton
        navigatePath={`/users/services/${serviceId}/options/add`}
        buttonText="Add Options"
      />
    </div>
  );
};

export default ServiceDetail;
