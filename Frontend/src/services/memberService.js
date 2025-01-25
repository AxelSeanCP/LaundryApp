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
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

const getMembers = async (input) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get(`/members?input=${input}`, {
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
    console.error(
      "Get member by id error: ",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "An error occurred");
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

const deleteMember = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/members/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

export { addMember, getMembers, getMemberById, editMember, deleteMember };
