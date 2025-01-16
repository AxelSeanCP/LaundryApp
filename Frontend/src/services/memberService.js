import api from "../utils/AxiosApiHelper";

const addMember = async ({ name, phoneNumber }) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post(
      "/members",
      { name, phoneNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      alert("Member added successfully");
      console.log("Member added successfully");
    }
  } catch (error) {
    alert("Add member failed");
    console.error("Add member error: ", error.response?.data || error.message);
  }
};

const getMembers = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/members", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const { members } = response.data.data;
      return members;
    }
  } catch (error) {
    alert("Get member failed");
    console.error("Get member error: ", error.response?.data || error.message);
  }
};

export { addMember, getMembers };
