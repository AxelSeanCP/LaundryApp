const UsersValidator = require("../validator/users");
const { addUser, getUserById } = require("../services/userService");

const postUserController = async (req, res, next) => {
  try {
    UsersValidator.validateUserPayload(req.body);
    const { username, password } = req.body;
    const { idOrganization } = req.credentials;

    const user = await addUser(username, password, idOrganization);

    res.status(201).json({
      status: "success",
      message: "User added successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postUserController,
  getUserByIdController,
};
