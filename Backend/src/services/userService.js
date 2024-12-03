const db = require("../models");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const InvariantError = require("../exceptions/InvariantError");
const AuthenticationError = require("../exceptions/AuthenticationError");

const verifyNewUsername = async ({ username }) => {
  const user = await db.User.findOne({
    where: {
      username: username,
    },
  });

  if (user) {
    throw new InvariantError("Add user failed. Username already exists!");
  }
};

const addUser = async ({ username, password, idOrganization }) => {
  await verifyNewUsername(username);

  const id = `user-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.User.create({
    id: id,
    username: username,
    password: hashedPassword,
    idOrganization: idOrganization,
  });

  if (!user) {
    throw new InvariantError("Add user failed. Please try again");
  }

  return user;
};

const verifyUserCredential = async ({ username, password }) => {
  const user = await db.User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new AuthenticationError("Login failed. User credentials is wrong");
  }

  const { password: hashedPassword } = user;
  const match = await bcrypt.compare(password, hashedPassword);

  if (!match) {
    throw new AuthenticationError("Login failed. User credentials is wrong");
  }
};

module.exports = {
  addUser,
  verifyUserCredential,
};
