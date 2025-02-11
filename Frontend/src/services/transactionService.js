import api from "../utils/AxiosApiHelper";

const add = async ({
  idMember,
  options,
  description,
  estimation,
  discount,
  payment,
}) => {
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
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

const getAll = async (memberName) => {
  try {
    const response = await api.get(`/transactions?memberName=${memberName}`);

    if (response.status === 200) {
      const { transactions } = response.data.data;
      return transactions || [];
    }
  } catch (error) {
    console.error(
      "Get transactions error: ",
      error.response?.data || error.message
    );
    return [];
  }
};

export { add, getAll };
