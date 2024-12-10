const db = require("../models");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthorizationError = require("../exceptions/AuthorizationError");

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

const addMember = async ({ name, phoneNumber, idOrganization }) => {
  await verifyMember({ name, phoneNumber });

  const id = `member-${nanoid(16)}`;

  const member = await db.Member.create({
    id: id,
    name: name,
    phoneNumber: phoneNumber,
    idOrganization: idOrganization,
  });

  if (!member) {
    throw new InvariantError("Add member failed.");
  }

  return member;
};

const getMembers = async (input, idOrganization) => {
  const whereClause = input
    ? {
        [Op.and]: [
          {
            [Op.or]: [
              { name: { [Op.like]: `%${input}%` } },
              { phoneNumber: { [Op.like]: `%${input}%` } },
            ],
          },
          { idOrganization: idOrganization },
        ],
      }
    : { idOrganization: idOrganization };

  const members = await db.Member.findAll({
    attributes: ["id", "name", "phoneNumber"],
    where: whereClause,
  });

  if (members.length === 0) {
    throw new NotFoundError("No members found");
  }

  return members;
};

const getMemberById = async (id, idOrganization) => {
  const member = await db.Member.findOne({
    where: {
      id,
      idOrganization,
    },
    attributes: ["id", "name", "phoneNumber"],
  });

  if (!member) {
    throw new NotFoundError("Member not found. Invalid Id");
  }

  return member;
};

const editMemberById = async (id, { name, phoneNumber }) => {
  await db.Member.update({ name, phoneNumber }, { where: { id } });
};

const deleteMemberById = async (id) => {
  await db.Member.destroy({
    where: {
      id,
    },
  });
};

const verifyMemberAccess = async (id, idOrganization) => {
  const member = await db.Member.findOne({
    where: {
      id: id,
    },
  });

  if (!member) {
    throw new NotFoundError("Resource not found");
  }

  if (member.idOrganization !== idOrganization) {
    throw new AuthorizationError("You dont have access to this resource");
  }
};

module.exports = {
  addMember,
  getMembers,
  getMemberById,
  editMemberById,
  deleteMemberById,
  verifyMemberAccess,
};
