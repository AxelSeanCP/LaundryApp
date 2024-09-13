const express = require("express");
const router = express.Router();
const {
  postMemberController,
  getMembersController,
  getMemberByIdController,
  putMemberByIdController,
  deleteMemberByIdController,
} = require("../controllers/memberController");

router.post("/", postMemberController);

router.get("/", getMembersController);

router.get("/:id", getMemberByIdController);

router.put("/:id", putMemberByIdController);

router.delete("/:id", deleteMemberByIdController);

module.exports = router;
