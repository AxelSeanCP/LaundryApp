const ClientError = require("../exceptions/ClientError");
const {
  addMember,
  getMembers,
  getMemberById,
  editMemberById,
  deleteMemberById,
} = require("../services/memberService");

const postMemberController = async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      throw new ClientError("Name and phone number are required", 400);
    }
    const member = await addMember({ name, phoneNumber });

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
    const members = await getMembers();

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

    const member = await getMemberById(id);

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
    const { id } = req.params;
    const { name, phoneNumber } = req.body;

    await editMemberById(id, { name, phoneNumber });

    res.status(200).json({
      status: "success",
      message: "Member edited successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteMemberByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

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
