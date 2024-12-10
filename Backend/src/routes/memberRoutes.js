const express = require("express");
const router = express.Router();
const {
  postMemberController,
  getMembersController,
  getMemberByIdController,
  putMemberByIdController,
  deleteMemberByIdController,
} = require("../controllers/memberController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, postMemberController);

router.get("/", authMiddleware, getMembersController);

router.get("/:id", authMiddleware, getMemberByIdController);

router.put("/:id", authMiddleware, putMemberByIdController);

router.delete("/:id", authMiddleware, deleteMemberByIdController);

module.exports = router;
