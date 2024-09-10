const userModel = require("../models/userModel");

const getUser = () => {
  console.log("Service: Fetching user data from model");
  return userModel.getUser();
};

module.exports = { getUser };
