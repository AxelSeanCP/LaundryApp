const userService = require("../services/userService");

const getUser = (req, res) => {
  const user = userService.getUser();
  console.log("Controller: sending data to client");
  res.json({ user });
};

module.exports = { getUser };
