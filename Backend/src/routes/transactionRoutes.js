const express = require("express");
const router = express.Router();
const {
  postTransactionController,
  getTransactionsController,
  getTransactionByIdController,
  putTransactionByIdController,
  deleteTransactionByIdController,
} = require("../controllers/transactionController");

router.post("/", postTransactionController);

router.get("/", getTransactionsController);

router.get("/:id", getTransactionByIdController);

router.put("/:id", putTransactionByIdController);

router.delete("/:id", deleteTransactionByIdController);

module.exports = router;
