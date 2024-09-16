const InvariantError = require("../exceptions/InvariantError");
const ClientError = require("../exceptions/ClientError");
const {
  addService,
  getServices,
  getServiceById,
  editServiceById,
  deleteServiceById,
  addOption,
  editOptionById,
  deleteOptionById,
} = require("../services/serviceService");

const logError = (error, res) => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  } else {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const postServiceController = async (req, res) => {
  try {
    const { name, unit } = req.body;

    if (!name || !unit) {
      throw new InvariantError("Name and unit are required");
    }

    const service = await addService({ name, unit });

    res.status(201).json({
      status: "success",
      message: "Service added successfully",
      data: service,
    });
  } catch (error) {
    logError(error, res);
  }
};

const getServicesController = async (req, res) => {
  try {
    const services = await getServices();

    res.status(200).json({
      status: "success",
      data: {
        services,
      },
    });
  } catch (error) {
    logError(error, res);
  }
};

const getServiceByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await getServiceById(id);

    res.status(200).json({
      status: "success",
      data: {
        service: service,
      },
    });
  } catch (error) {
    logError(error, res);
  }
};

const putServiceByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit } = req.body;

    if (!name || !unit) {
      throw new InvariantError("Name and unit are required");
    }

    await editServiceById(id, { name, unit });

    res.status(200).json({
      status: "success",
      message: "Service updated successfully",
    });
  } catch (error) {
    logError(error, res);
  }
};

const deleteServiceByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteServiceById(id);

    res.status(200).json({
      status: "success",
      message: "Service deleted successfully",
    });
  } catch (error) {
    logError(error, res);
  }
};

const postOptionController = async (req, res) => {
  try {
    const { id: idService } = req.params;
    const { name, price } = req.body;

    if (!name || !price) {
      throw new InvariantError("Name and price are required");
    }

    const option = await addOption(idService, { name, price });

    res.status(201).json({
      status: "success",
      message: "Option added successfully",
      data: option,
    });
  } catch (error) {
    logError(error, res);
  }
};

const putOptionByIdController = async (req, res) => {
  try {
    const { idService, idOption } = req.params;
    const { name, price } = req.body;

    if (!name || !price) {
      throw new InvariantError("Name and price are required");
    }

    await editOptionById(idService, idOption, { name, price });

    res.status(200).json({
      status: "success",
      message: "Option updated successfully",
    });
  } catch (error) {
    logError(error, res);
  }
};

const deleteOptionByIdController = async (req, res) => {
  try {
    const { idService, idOption } = req.params;

    await deleteOptionById(idService, idOption);

    res.status(200).json({
      status: "success",
      message: "Option deleted successfully",
    });
  } catch (error) {
    logError(error, res);
  }
};

module.exports = {
  postServiceController,
  getServicesController,
  getServiceByIdController,
  putServiceByIdController,
  deleteServiceByIdController,
  postOptionController,
  putOptionByIdController,
  deleteOptionByIdController,
};
