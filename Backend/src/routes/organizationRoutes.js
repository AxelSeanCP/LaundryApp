const express = require("express");
const router = express.Router();
const {
  postOrganizationController,
  postOrganizationLoginController,
  getOrganizationController,
} = require("../controllers/organizationController");

router.post("/", postOrganizationController);

router.post("/login", postOrganizationLoginController);

router.get("/:id", getOrganizationController);

module.exports = router;
