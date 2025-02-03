import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useService from "../../Hooks/useService";
import Card from "../../Components/Card/Card";
import NavigateButton from "../../Components/Button/NavigateButton";
import Loader from "../../Components/Loader/Loader";

const ServiceView = () => {
  const { getServices } = useService();
  const [services, setServices] = useState([]);
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

  const cardOnClick = (id) => {
    navigate(`/users/services/${id}`);
  };

  return (
    <div className="space-y-4 mb-12">
      <div className="container mx-auto p-2 gap-3 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {loading ? (
          <Loader />
        ) : services.length > 0 ? (
          services.map((service) => (
            <Card
              key={service.id}
              clickFunction={() => cardOnClick(service.id)}
              title={service.name}
              description={service.unit}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg sm:text-xl">
            No services available
          </p>
        )}
      </div>
      <NavigateButton
        navigatePath="/users/services/add"
        buttonText="Add Service"
        icon="plus"
      />
    </div>
  );
};

export default ServiceView;
