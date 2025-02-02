import api from "../utils/AxiosApiHelper";

const add = async (
  idMember,
  options,
  description,
  estimation,
  discount,
  payment
) => {
  try {
    const response = await api.post("/transactions", {
      idMember,
      options,
      description,
      estimation,
      discount,
      payment,
    });

    if (response.status === 201) {
      return { success: true, message: response.data.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

export { add };
