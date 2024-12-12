const express = require("express");
const router = express.Router();
const {
  postTransactionController,
  getTransactionsController,
  getTransactionByIdController,
  putTransactionByIdController,
  deleteTransactionByIdController,
} = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, postTransactionController);

router.get("/", authMiddleware, getTransactionsController);

router.get("/:id", authMiddleware, getTransactionByIdController);

router.put("/:id", authMiddleware, putTransactionByIdController);

router.delete("/:id", authMiddleware, deleteTransactionByIdController);

module.exports = router;
