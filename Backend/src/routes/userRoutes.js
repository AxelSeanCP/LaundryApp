const express = require("express");
const router = express.Router();
const {
  postUserController,
  getUserByIdController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, postUserController);

router.get("/:id", getUserByIdController);

module.exports = router;
