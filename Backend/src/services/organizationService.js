const db = require("../models");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const InvariantError = require("../exceptions/InvariantError");
const AuthenticationError = require("../exceptions/AuthenticationError");

const verifyNewOrganization = async ({ name }) => {
  const organization = await db.Organization.findOne({
    where: {
      name: name,
    },
  });

  if (organization) {
    throw new InvariantError(
      "Add organization failed. Organization already exists!"
    );
  }
};

const addOrganization = async ({ name, password }) => {
  await verifyNewOrganization({ name });

  const id = `organization-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  const organization = await db.Organization.create({
    id: id,
    name: name,
    password: hashedPassword,
  });

  if (!organization) {
    throw new InvariantError("Add organization failed. Please try again");
  }

  return organization;
};

const verifyOrganizationCredential = async ({ name, password }) => {
  const organization = await db.Organization.findOne({
    where: {
      name: name,
    },
  });

  if (!organization) {
    throw new AuthenticationError(
      "Login failed. Organization credentials is wrong"
    );
  }

  const { id, password: hashedPassword } = organization;
  const match = bcrypt.compare(password, hashedPassword);

  if (!match) {
    throw new AuthenticationError(
      "Login failed. Organization credentials is wrong"
    );
  }

  return id;
};

module.exports = {
  addOrganization,
  verifyOrganizationCredential,
};