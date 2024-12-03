const db = require("../models");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");

const verifyMember = async ({ name, phoneNumber }) => {
  const member = await db.Member.findOne({
    where: {
      [Op.or]: [{ name }, { phoneNumber }],
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

const getMembers = async (input) => {
  const whereClause = input
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${input}%` } },
          { phoneNumber: { [Op.like]: `%${input}%` } },
        ],
      }
    : {};

  const members = await db.Member.findAll({
    attributes: ["id", "name", "phoneNumber"],
    where: whereClause,
  });

  if (members.length === 0) {
    throw new NotFoundError("No members found");
  }

  return members;
};

const getMemberById = async (id) => {
  const member = await db.Member.findOne({
    where: {
      id,
    },
    attributes: ["id", "name", "phoneNumber"],
  });

  if (!member) {
    throw new NotFoundError("Member not found. Invalid Id");
  }

  return member;
};

const editMemberById = async (id, { name, phoneNumber }) => {
  await verifyMember({ name, phoneNumber });
  const member = await getMemberById(id);

  member.name = name;
  member.phoneNumber = phoneNumber;

  await member.save();
};

const deleteMemberById = async (id) => {
  const member = await getMemberById(id);

  await member.destroy();
};

module.exports = {
  addMember,
  getMembers,
  getMemberById,
  editMemberById,
  deleteMemberById,
};
