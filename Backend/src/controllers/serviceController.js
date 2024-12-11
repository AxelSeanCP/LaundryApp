const ServicesValidator = require("../validator/services");
const OptionsValidator = require("../validator/options");
const {
  addService,
  getServices,
  getServiceById,
  editServiceById,
  deleteServiceById,
  verifyServiceAccess,
  addOption,
  editOptionById,
  deleteOptionById,
  verifyOptionAccess,
} = require("../services/serviceService");

const postServiceController = async (req, res, next) => {
  try {
    ServicesValidator.validateServicePayload(req.body);
    const { name, unit } = req.body;
    const { idOrganization } = req.credentials;

    const service = await addService({ name, unit, idOrganization });

    res.status(201).json({
      status: "success",
      message: "Service added successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const getServicesController = async (req, res, next) => {
  try {
    const { idOrganization } = req.credentials;
    const services = await getServices(idOrganization);

    res.status(200).json({
      status: "success",
      data: {
        services,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getServiceByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idOrganization } = req.credentials;

    const service = await getServiceById(id, idOrganization);

    res.status(200).json({
      status: "success",
      data: {
        service: service,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putServiceByIdController = async (req, res, next) => {
  try {
    ServicesValidator.validateServicePayload(req.body);
    const { id } = req.params;
    const { idOrganization } = req.credentials;

    await verifyServiceAccess(id, idOrganization);
    await editServiceById(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Service updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteServiceByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idOrganization } = req.credentials;

    await verifyServiceAccess(id, idOrganization);
    await deleteServiceById(id);

    res.status(200).json({
      status: "success",
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const postOptionController = async (req, res, next) => {
  try {
    OptionsValidator.validateOptionPayload(req.body);
    const { id: idService } = req.params;
    const { idOrganization } = req.credentials;

    const option = await addOption(idService, idOrganization, req.body);

    res.status(201).json({
      status: "success",
      message: "Option added successfully",
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

const putOptionByIdController = async (req, res, next) => {
  try {
    OptionsValidator.validateOptionPayload(req.body);
    const { idService, idOption } = req.params;
    const { idOrganization } = req.credentials;

    await verifyOptionAccess(idService, idOption, idOrganization);
    await editOptionById(idService, idOption, req.body);

    res.status(200).json({
      status: "success",
      message: "Option updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOptionByIdController = async (req, res, next) => {
  try {
    const { idService, idOption } = req.params;
    const { idOrganization } = req.credentials;

    await verifyOptionAccess(idService, idOption, idOrganization);
    await deleteOptionById(idService, idOption);

    res.status(200).json({
      status: "success",
      message: "Option deleted successfully",
    });
  } catch (error) {
    next(error);
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
