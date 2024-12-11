const express = require("express");
const router = express.Router();
const {
  postServiceController,
  getServicesController,
  getServiceByIdController,
  putServiceByIdController,
  deleteServiceByIdController,
  postOptionController,
  putOptionByIdController,
  deleteOptionByIdController,
} = require("../controllers/serviceController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, postServiceController);

router.get("/", authMiddleware, getServicesController);

router.get("/:id", authMiddleware, getServiceByIdController);

router.put("/:id", authMiddleware, putServiceByIdController);

router.delete("/:id", authMiddleware, deleteServiceByIdController);

router.post("/:id/options", authMiddleware, postOptionController);

router.put(
  "/:idService/options/:idOption",
  authMiddleware,
  putOptionByIdController
);

router.delete(
  "/:idService/options/:idOption",
  authMiddleware,
  deleteOptionByIdController
);

module.exports = router;
