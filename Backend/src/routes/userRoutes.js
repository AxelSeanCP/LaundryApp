const express = require("express");
const router = express.Router();
const { postUserController } = require("../controllers/userController");

router.post("/", postUserController);

module.exports = router;
