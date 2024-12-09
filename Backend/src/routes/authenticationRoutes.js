const express = require("express");
const router = express.Router();
const {
  postAuthenticationController,
  putAuthenticationController,
  deleteAuthenticationController,
} = require("../controllers/authenticationController");

router.post("/", postAuthenticationController);

router.put("/", putAuthenticationController);

router.delete("/", deleteAuthenticationController);

module.exports = router;
