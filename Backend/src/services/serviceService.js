const db = require("../models");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthorizationError = require("../exceptions/AuthorizationError");

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

const addService = async ({ name, unit, idOrganization }) => {
  await verifyService({ name });

  const id = `service-${nanoid(16)}`;

  const service = await db.Service.create({
    id: id,
    name: name,
    unit: unit,
    idOrganization: idOrganization,
  });

  if (!service) {
    throw new InvariantError("Add service failed");
  }

  return service;
};

const getServices = async (idOrganization) => {
  const services = await db.Service.findAll({
    attributes: ["id", "name", "unit"],
    where: {
      idOrganization,
    },
  });

  if (services.length === 0) {
    throw new NotFoundError("No services found");
  }

  return services;
};

const getServiceById = async (idService, idOrganization) => {
  // also return all the options
  const service = await db.Service.findOne({
    where: {
      id: idService,
      idOrganization: idOrganization,
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
  await db.Service.update({ name, unit }, { where: { id } });
};

const deleteServiceById = async (id) => {
  await db.Service.destroy({
    where: {
      id,
    },
  });
};

const verifyServiceAccess = async (id, idOrganization) => {
  const service = await db.Service.findOne({
    where: {
      id,
    },
  });

  if (!service) {
    throw new NotFoundError("Service not found. Invalid Id");
  }

  if (service.idOrganization !== idOrganization) {
    throw new AuthorizationError("You don't have access to this resource");
  }
};

/* 
OPTION
*/

const verifyOption = async ({ idService, name, price }) => {
  const option = await db.Option.findOne({
    where: {
      [Op.and]: [{ idService }, { name }, { price }],
    },
  });

  if (option) {
    throw new InvariantError(
      "Add option failed. Option already exists for this service"
    );
  }
};

const addOption = async (idService, idOrganization, { name, price }) => {
  await verifyOption({ idService, name, price });

  const id = `option-${nanoid(16)}`;

  const option = await db.Option.create({
    id: id,
    idService: idService,
    name: name,
    price: price,
    idOrganization: idOrganization,
  });

  if (!option) {
    throw new InvariantError("Add option failed");
  }

  return option;
};

const editOptionById = async (idService, idOption, { name, price }) => {
  await db.Option.update(
    { name, price },
    {
      where: {
        id: idOption,
        idService: idService,
      },
    }
  );
};

const deleteOptionById = async (idService, idOption) => {
  await db.Option.destroy({
    where: {
      id: idOption,
      idService,
    },
  });
};

const verifyOptionAccess = async (idService, idOption, idOrganization) => {
  const option = await db.Option.findOne({
    where: {
      id: idOption,
      idService: idService,
    },
  });

  if (!option) {
    throw new NotFoundError("Option not found. Invalid id");
  }

  if (option.idOrganization !== idOrganization) {
    throw new AuthorizationError("You don't have access to this resource");
  }
};

module.exports = {
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
};
