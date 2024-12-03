const UsersValidator = require("../validator/users");
const { addUser } = require("../services/userService");

const postUserController = async (req, res, next) => {
  try {
    UsersValidator.validateUserPayload(req.body);
    const { username, password, idOrganization } = req.body;

    const user = await addUser({ username, password, idOrganization });

    res.status(201).json({
      status: "success",
      message: "User added successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postUserController;
