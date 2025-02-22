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

const getById = async (id) => {
  try {
    const response = await api.get(`/transactions/${id}`);

    if (response.status === 200) {
      const { transaction } = response.data.data;
      return transaction;
    }
  } catch (error) {
    console.error(
      "Get transaction by id error: ",
      error.response?.data || error.message
    );
    return {
      error: true,
      message: error.response?.data?.message || "An error occured",
    };
  }
};

const update = async (
  id,
  { discount, payment, description, estimation, status }
) => {
  try {
    const response = await api.put(`/transactions/${id}`, {
      discount,
      payment,
      description,
      estimation,
      status,
    });

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
    const response = await api.delete(`/transactions/${id}`);

    if (response.status === 200) {
      console.log("Delete transaction successfull");
    }
  } catch (error) {
    alert("Delete transaction failed");
    console.error(
      "Delete transaction error: ",
      error.response?.data || error.message
    );
  }
};

export { add, getAll, getById, update, remove };
