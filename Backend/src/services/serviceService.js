const db = require("../models");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");

//TODO: add service and options methods
const verifyService = async ({ name }) => {
  const service = await db.Service.findOne({
    where: {
      name,
    },
  });

  if (service) {
    throw new InvariantError("Add service failed. Service already exists");
  }
};

const addService = async ({ name, unit }) => {
  await verifyService({ name });

  const id = `service-${nanoid(16)}`;

  const service = await db.Service.create({
    id: id,
    name: name,
    unit: unit,
  });

  if (!service) {
    throw new InvariantError("Add service failed");
  }

  return service;
};

const getServices = async () => {
  const services = await db.Service.findAll({
    attributes: ["id", "name", "unit"],
  });

  if (services.length === 0) {
    throw new NotFoundError("No services found");
  }

  return services;
};

const getServiceById = async (idService) => {
  // also return all the options
  const service = await db.Service.findOne({
    where: {
      id: idService,
    },
    include: [
      {
        model: db.Option,
        as: "options",
      },
    ],
  });

  if (!service) {
    throw new NotFoundError("Service not found. Invalid Id");
  }

  return service;
};

const editServiceById = async (idService, { name, unit }) => {
  const service = await getServiceById(idService);

  service.name = name;
  service.unit = unit;

  await service.save();
};

const deleteServiceById = async (idService) => {
  const service = await getServiceById(idService);

  await service.destroy();
};

const addOption = async (idService) => {};

const editOption = async (idService) => {};

const deleteOption = async (idService) => {};

module.exports = {
  addService,
  getServices,
  getServiceById,
  editServiceById,
  deleteServiceById,
  addOption,
  editOption,
  deleteOption,
};
