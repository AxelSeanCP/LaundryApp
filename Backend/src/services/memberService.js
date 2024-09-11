const db = require("../models");
const { nanoid } = require("nanoid");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");

const verifyMember = async ({ name, phoneNumber }) => {
  const member = await db.Member.findOne({
    where: {
      name,
      phoneNumber,
    },
  });

  if (member) {
    throw new InvariantError("Add member failed. Member already exists!");
  }
};

const addMember = async ({ name, phoneNumber }) => {
  await verifyMember({ name, phoneNumber });

  const id = `member-${nanoid(16)}`;

  const member = await db.Member.create({
    id: id,
    name: name,
    phoneNumber: phoneNumber,
  });

  if (!member) {
    throw new InvariantError("Add member failed.");
  }

  return member;
};

const getMembers = async () => {
  const members = await db.Member.findAll({
    attributes: ["id", "name", "phoneNumber"],
  });

  if (members.length === 0) {
    throw new NotFoundError("No members found");
  }

  return members;
};

module.exports = {
  addMember,
  getMembers,
};
