import api from "../utils/AxiosApiHelper";

const add = async (serviceId, { name, price }) => {
  try {
    const response = await api.post(`/services/${serviceId}/options`, {
      name,
      price,
    });

    if (response.status === 201) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

export { add };
