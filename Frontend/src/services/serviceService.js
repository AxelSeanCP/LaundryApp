import api from "../utils/AxiosApiHelper";

const add = async ({ name, unit }) => {
  try {
    const response = await api.post("/services", { name, unit });

    if (response.status === 201) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

const getAll = async () => {
  try {
    const response = await api.get("/services");

    if (response.status === 200) {
      const { services } = response.data.data;
      return services || [];
    }
  } catch (error) {
    console.error(
      "Get services error: ",
      error.response?.data || error.message
    );
    return [];
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/services/${id}`);

    if (response.status === 200) {
      const { service } = response.data.data;
      return service;
    }
  } catch (error) {
    console.error(
      "Get Service by id error: ",
      error.response?.data || error.message
    );
    return {
      error: true,
      message: error.response?.data?.message || "An error occured",
    };
  }
};

const update = async (id, { name, unit }) => {
  try {
    const response = await api.put(`/services/${id}`, { name, unit });

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/services/${id}`);

    if (response.status === 200) {
      console.log("Delete service successfull");
    }
  } catch (error) {
    alert("Delete service failed");
    console.error(
      "Delete service error: ",
      error.response?.data?.message || error.message
    );
  }
};

export { add, getAll, getById, update, remove };
