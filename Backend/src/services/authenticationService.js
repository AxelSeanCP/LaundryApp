const db = require("../models");
const InvariantError = require("../exceptions/InvariantError");

const addRefreshToken = async (token) => {
  await db.Authentication.create({
    token: token,
  });
};

const verifyRefreshToken = async (token) => {
  const refreshToken = await db.Authentication.findOne({
    where: {
      token: token,
    },
  });

  if (!refreshToken) {
    throw new InvariantError("Refresh token not valid");
  }
};

const deleteRefreshToken = async (token) => {
  await db.Authentication.destroy({
    where: {
      token: token,
    },
  });
};

module.exports = {
  addRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
};
