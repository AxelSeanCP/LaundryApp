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

const update = async (serviceId, optionId, { name, price }) => {
  try {
    const response = await api.put(
      `/services/${serviceId}/options/${optionId}`,
      { name, price }
    );

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

const remove = async (serviceId, optionId) => {
  try {
    const response = await api.delete(
      `/services/${serviceId}/options/${optionId}`
    );

    if (response.status === 200) {
      console.log("Delete option successfull");
    }
  } catch (error) {
    alert("Delete option failed");
    console.error(
      "Delete option error: ",
      error.response?.data?.message || error.message
    );
  }
};

export { add, update, remove };
