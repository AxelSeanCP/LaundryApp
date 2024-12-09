const express = require("express");
const router = express.Router();
const {
  postOrganizationController,
  PostOrganizationLoginController,
} = require("../controllers/organizationController");

router.post("/", postOrganizationController);

router.post("/login", PostOrganizationLoginController);

module.exports = router;
