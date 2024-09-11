const express = require("express");
const router = express.Router();
const {
  postMemberController,
  getMembersController,
} = require("../controllers/memberController");

router.post("/", postMemberController);

router.get("/", getMembersController);

module.exports = router;
