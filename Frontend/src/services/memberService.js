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
      return members || [];
    }
  } catch (error) {
    alert("Get member failed");
    console.error("Get member error: ", error.response?.data || error.message);
    return [];
  }
};

const getMemberById = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get(`/members/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      const { member } = response.data.data;
      return member;
    }
  } catch (error) {
    alert("Get member by id failed");
    console.error(
      "Get member by id error: ",
      error.response?.data || error.message
    );
  }
};

const editMember = async (id, { name, phoneNumber }) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.put(
      `/members/${id}`,
      { name, phoneNumber },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      console.log("Edit member successfull");
    }
  } catch (error) {
    alert("Edit member failed.");
    console.error("Edit member error: ", error.response?.data || error.message);
  }
};

export { addMember, getMembers, getMemberById, editMember };
