import api from "../utils/AxiosApiHelper";

const add = async ({ name, phoneNumber }) => {
  try {
    const response = await api.post("/members", { name, phoneNumber });

    if (response.status === 201) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

const getAll = async (input) => {
  try {
    const response = await api.get(`/members?input=${input}`);

    if (response.status === 200) {
      const { members } = response.data.data;
      return members || [];
    }
  } catch (error) {
    console.error("Get members error: ", error.response?.data || error.message);
    return [];
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/members/${id}`);

    if (response.status === 200) {
      const { member } = response.data.data;
      return member;
    }
  } catch (error) {
    console.error(
      "Get member by id error: ",
      error.response?.data || error.message
    );
    return error.response?.data?.message || "An error occurred";
  }
};

const update = async (id, { name, phoneNumber }) => {
  try {
    const response = await api.put(`/members/${id}`, { name, phoneNumber });

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message;
    return { success: false, message: message };
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/members/${id}`);

    if (response.status === 200) {
      console.log("Delete member successfull");
    }
  } catch (error) {
    alert("Delete member failed");
    console.error(
      "Delete member error: ",
      error.response?.data || error.message
    );
  }
};

export { add, getAll, getById, update, remove };
