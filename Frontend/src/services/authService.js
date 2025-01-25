import api from "../utils/AxiosApiHelper";

const login = async ({ username, password }) => {
  try {
    const response = await api.post("/authentications", {
      username: username,
      password: password,
    });

    if (response.status === 201) {
      const { accessToken, refreshToken } = response.data.data;
      return { accessToken, refreshToken };
    }
  } catch (error) {
    alert("Login failed. Please check your credentials");
    console.error("Login error: ", error.response?.data || error.message);
  }
};

const organizationRegister = async ({ name, password }) => {
  try {
    const response = await api.post("/organizations", {
      name: name,
      password: password,
    });

    if (response.status === 201) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    const message = error.response?.data?.message || "An error occured";
    return { success: false, message };
  }
};

const organizationLogin = async ({ name, password }) => {
  try {
    const response = await api.post("/organizations/login", {
      name: name,
      password: password,
    });

    if (response.status === 201) {
      const { accessToken } = response.data.data;
      return { accessToken };
    }
  } catch (error) {
    alert("Login failed. Please check your credentials");
    console.error("Login error: ", error.response?.data || error.message);
  }
};

export { login, organizationRegister, organizationLogin };
