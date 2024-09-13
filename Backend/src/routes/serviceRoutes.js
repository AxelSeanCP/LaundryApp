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

router.post("/", postServiceController);

router.get("/", getServicesController);

router.get("/:id", getServiceByIdController);

router.put("/:id", putServiceByIdController);

router.delete("/:id", deleteServiceByIdController);

router.post("/:id/options", postOptionController);

router.put("/:idService/options/:idOption", putOptionByIdController);

router.delete("/:idService/options/:idOption", deleteOptionByIdController);

module.exports = router;
