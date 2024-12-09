const AuthenticationsValidator = require("../validator/authentications");
const {
  addRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
} = require("../services/authenticationService");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../tokenize/TokenManager");
const { verifyUserCredential } = require("../services/userService");

const postAuthenticationController = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePostAuthenticationPayload(req.body);
    const { username, password } = req.body;

    const { id, idOrganization } = await verifyUserCredential(
      username,
      password
    );

    const accessToken = generateAccessToken({ id, idOrganization });
    const refreshToken = generateRefreshToken({ id, idOrganization });

    await addRefreshToken(refreshToken);

    res.status(201).json({
      status: "success",
      message: "authentications added successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putAuthenticationController = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePutAuthenticationPayload(req.body);

    const { refreshToken } = req.body;
    const { id, idOrganization } = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY
    );
    await verifyRefreshToken(refreshToken);

    const accessToken = await generateAccessToken({ id, idOrganization });
    res.status(200).json({
      status: "success",
      message: "Access token has been refreshed",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthenticationController = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePutAuthenticationPayload(req.body);

    const { refreshToken } = req.body;
    await verifyRefreshToken(refreshToken);
    await deleteRefreshToken(refreshToken);

    res.status(200).json({
      status: "success",
      message: "Refresh token deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAuthenticationController,
  putAuthenticationController,
  deleteAuthenticationController,
};
