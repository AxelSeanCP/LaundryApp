const express = require("express");
const router = express.Router();
const {
  postUserController,
  getUserByIdController,
} = require("../controllers/userController");

router.post("/", postUserController);

router.get("/:id", getUserByIdController);

module.exports = router;
