import api from "../utils/AxiosApiHelper";

const addUser = async ({ username, password }) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post(
      "/users",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);

    if (response.status === 200) {
      console.log("Get user successfull");
      const { user } = response.data.data;
      return user;
    }
  } catch (error) {
    alert("Get user failed");
    console.error("Add user error: ", error.response?.data || error.message);
  }
};

export { addUser, getUser };
