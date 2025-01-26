import api from "../utils/AxiosApiHelper";

const getOrganization = async (id) => {
  try {
    const response = await api.get(`/organizations/${id}`);

    if (response.status === 200) {
      console.log("Get organization successfull");
      const { organization } = response.data.data;
      return organization;
    }
  } catch (error) {
    alert("Get organization failed");
    console.error(
      "Get organization error: ",
      error.response?.data || error.message
    );
  }
};

export { getOrganization };
