const db = require("../models");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const InvariantError = require("../exceptions/InvariantError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const NotFoundError = require("../exceptions/NotFoundError");

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

const verifyUserCredential = async (username, password) => {
  const user = await db.User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new AuthenticationError("Login failed. User credentials is wrong");
  }

  const { id, idOrganization, password: hashedPassword } = user;
  const match = await bcrypt.compare(password, hashedPassword);

  if (!match) {
    throw new AuthenticationError("Login failed. User credentials is wrong");
  }

  return { id, idOrganization };
};

const getUserById = async (id) => {
  const user = await db.User.findOne({
    where: {
      id,
    },
    attributes: ["username", "idOrganization"],
  });

  if (!user) {
    throw new NotFoundError("Get user failed. User not found");
  }

  return user;
};

module.exports = {
  addUser,
  verifyUserCredential,
  getUserById,
};
