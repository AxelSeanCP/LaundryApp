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
      console.log("User added successfully");
      alert("User added successfully");
    }
  } catch (error) {
    alert("Add user failed");
    console.error("Add user error: ", error.response?.data || error.message);
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
