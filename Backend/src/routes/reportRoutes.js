const express = require("express");
const router = express.Router();
const { getReportsController } = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/reports", authMiddleware, getReportsController);

module.exports = router;
