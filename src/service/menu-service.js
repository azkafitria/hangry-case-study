import { validate } from "../validation/validation.js";
import {
  addMenuValidation,
  editMenuValidation,
  idMenuValidation,
} from "../validation/menu-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const addMenuService = async (request) => {
  const menu = validate(addMenuValidation, request);

  return prismaClient.menu.create({
    data: menu,
  });
};

const getMenuService = async (id) => {
  id = validate(idMenuValidation, id);
  return getMenu(id);
};

const editMenuService = async (id, request) => {
  id = validate(idMenuValidation, id);
  const newMenu = validate(editMenuValidation, request);

  await getMenu(id);

  return prismaClient.menu.update({
    where: {
      id: id,
    },
    data: newMenu,
  });
};

const removeMenuService = async (id) => {
  id = validate(idMenuValidation, id);

  await getMenu(id);

  return prismaClient.menu.delete({
    where: {
      id: id,
    },
  });
};

const getAllMenuService = async () => {
  return prismaClient.menu.findMany();
};

const getMenu = async (id) => {
  const menu = await prismaClient.menu.findUnique({
    where: {
      id: id,
    },
  });

  if (!menu) {
    throw new ResponseError(404, "Menu with id " + id + " is not found.");
  }
  return menu;
};

export {
  addMenuService,
  getMenuService,
  editMenuService,
  removeMenuService,
  getAllMenuService,
  getMenu,
};
