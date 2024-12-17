const MembersValidator = require("../validator/members");
const {
  addMember,
  getMembers,
  getMemberById,
  editMemberById,
  deleteMemberById,
  verifyMemberAccess,
} = require("../services/memberService");

const postMemberController = async (req, res, next) => {
  try {
    MembersValidator.validateMemberPayload(req.body);
    const { name, phoneNumber } = req.body;
    const { idOrganization } = req.credentials;
    console.log(idOrganization);

    const member = await addMember({ name, phoneNumber, idOrganization });

    res.status(201).json({
      status: "success",
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

const getMembersController = async (req, res, next) => {
  try {
    const { input } = req.query;
    const { idOrganization } = req.credentials;
    const members = await getMembers(input, idOrganization);

    res.status(200).json({
      status: "success",
      data: {
        members,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMemberByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idOrganization } = req.credentials;

    const member = await getMemberById(id, idOrganization);

    res.status(200).json({
      status: "success",
      data: {
        member,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putMemberByIdController = async (req, res, next) => {
  try {
    MembersValidator.validateMemberPayload(req.body);
    const { id } = req.params;
    const { idOrganization } = req.credentials;

    await verifyMemberAccess(id, idOrganization);
    await editMemberById(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Member updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteMemberByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idOrganization } = req.credentials;

    await verifyMemberAccess(id, idOrganization);
    await deleteMemberById(id);

    res.status(200).json({
      status: "success",
      message: "Member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postMemberController,
  getMembersController,
  getMemberByIdController,
  putMemberByIdController,
  deleteMemberByIdController,
};
