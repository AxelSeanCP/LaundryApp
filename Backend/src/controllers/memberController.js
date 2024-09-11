const ClientError = require("../exceptions/ClientError");
const { addMember, getMembers } = require("../services/memberService");

//TODO: add validation, add more error handling using try-catch with different response
const postMemberController = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      throw new ClientError("Name and phone number are required", 400);
    }
    const member = await addMember(req.body);

    res.status(201).json({
      status: "success",
      message: "Member added",
      data: member,
    });
  } catch (error) {
    if (error instanceof ClientError) {
      res.status(error.statusCode).json({
        status: "fail",
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
};

const getMembersController = async () => {
  try {
    const members = await getMembers();

    res.status(200).json({
      status: "success",
      data: {
        members,
      },
    });
  } catch (error) {
    if (error instanceof ClientError) {
      res.status(error.statusCode).json({
        status: "fail",
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
};

module.exports = { postMemberController, getMembersController };
