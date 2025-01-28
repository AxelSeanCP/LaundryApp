import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useService from "../../Hooks/useService";
import Loader from "../../Components/Loader/Loader";
import Modal from "../../Components/Modal/Modal";
import AddButton from "../../Components/AddButton/AddButton";

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
          <div className="w-full max-w-md lg:max-w-xl flex flex-col items-center justify-center">
            <div className="flex w-full items-center justify-between bg-white border-x-4 border-slate-700 rounded-md shadow-lg p-5 my-4">
              <h1 className="text-center text-xl lg:text-2xl font-semibold">
                {service.name}
              </h1>
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

            <div className="container mx-auto p-2 gap-3 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              {service.options.length > 0 ? (
                <h1>Hello World, options are here</h1>
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
        navigatePath={`/users/services/${serviceId}/options`}
        buttonText="Add Options"
      />
    </div>
  );
};

export default ServiceDetail;
