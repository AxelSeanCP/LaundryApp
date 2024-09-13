const db = require("../models");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");

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

const editServiceById = async (id, { name, unit }) => {
  const service = await getServiceById(id);

  service.name = name;
  service.unit = unit;

  await service.save();
};

const deleteServiceById = async (id) => {
  const service = await getServiceById(id);

  await service.destroy();
};

const addOption = async (idService, { name, price }) => {
  const id = `option-${nanoid(16)}`;

  const option = await db.Option.create({
    id: id,
    idService: idService,
    name: name,
    price: price,
  });

  if (!option) {
    throw new InvariantError("Add option failed");
  }

  return option;
};

const editOptionById = async (idService, idOption, { name, price }) => {
  const option = await db.Option.findOne({
    where: {
      id: idOption,
      idService: idService,
    },
  });

  if (!option) {
    throw new NotFoundError("Option not found. Invalid id");
  }

  option.name = name;
  option.price = price;

  await option.save();
};

const deleteOptionById = async (idService, idOption) => {
  const option = await db.Option.findOne({
    where: {
      id: idOption,
      idService: idService,
    },
  });

  await option.destroy();
};

module.exports = {
  addService,
  getServices,
  getServiceById,
  editServiceById,
  deleteServiceById,
  addOption,
  editOptionById,
  deleteOptionById,
};
