const InvariantError = require("../exceptions/InvariantError");
const ClientError = require("../exceptions/ClientError");
const {
  addMember,
  getMembers,
  getMemberById,
  editMemberById,
  deleteMemberById,
} = require("../services/memberService");

const logError = (error, res) => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  } else {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const postMemberController = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      throw new InvariantError("Name and phone number are required");
    }
    const member = await addMember({ name, phoneNumber });

    res.status(201).json({
      status: "success",
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    logError(error, res);
  }
};

const getMembersController = async (req, res) => {
  try {
    const members = await getMembers();

    res.status(200).json({
      status: "success",
      data: {
        members,
      },
    });
  } catch (error) {
    logError(error, res);
  }
};

const getMemberByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await getMemberById(id);

    res.status(200).json({
      status: "success",
      data: {
        member,
      },
    });
  } catch (error) {
    logError(error, res);
  }
};

const putMemberByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber } = req.body;

    await editMemberById(id, { name, phoneNumber });

    res.status(200).json({
      status: "success",
      message: "Member updated successfully",
    });
  } catch (error) {
    logError(error, res);
  }
};

const deleteMemberByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteMemberById(id);

    res.status(200).json({
      status: "success",
      message: "Member deleted successfully",
    });
  } catch (error) {
    logError(error, res);
  }
};

module.exports = {
  postMemberController,
  getMembersController,
  getMemberByIdController,
  putMemberByIdController,
  deleteMemberByIdController,
};
