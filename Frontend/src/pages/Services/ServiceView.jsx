import { useState, useEffect } from "react";
import useService from "../../Hooks/useService";
import ServiceCard from "../../Components/Card/ServiceCard";
import AddButton from "../../Components/AddButton/AddButton";
import Loader from "../../Components/Loader/Loader";

const ServiceView = () => {
  const { getServices } = useService();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <div className="container mx-auto p-2 gap-3 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {loading ? (
          <Loader />
        ) : services.length > 0 ? (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              unit={service.unit}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg sm:text-xl">
            No services available
          </p>
        )}
      </div>
      <AddButton navigatePath="/users/services/add" buttonText="Add Service" />
    </div>
  );
};

export default ServiceView;
