const OrganizationsValidator = require("../validator/organizations");
const { generateAccessToken } = require("../tokenize/TokenManager");
const {
  addOrganization,
  verifyOrganizationCredential,
} = require("../services/organizationService");

const postOrganizationController = async (req, res, next) => {
  try {
    OrganizationsValidator.validateOrganizationPayload(req.body);

    const { name, password } = req.body;

    const organization = await addOrganization({ name, password });

    res.status(201).json({
      status: "success",
      message: "Organization added successfully",
      data: {
        organization,
      },
    });
  } catch (error) {
    next(error);
  }
};

const PostOrganizationLoginController = async (req, res, next) => {
  try {
    OrganizationsValidator.validateOrganizationPayload(req.body);

    const { name, password } = req.body;

    const id = await verifyOrganizationCredential({ name, password });

    const accessToken = await generateAccessToken({ id });

    res.status(201).json({
      status: "success",
      message: "organization login successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postOrganizationController,
  PostOrganizationLoginController,
};
