import {
  addMenuService,
  editMenuService,
  getAllMenuService,
  getMenuService,
  removeMenuService,
} from "../service/menu-service.js";

const addMenuController = async (req, res, next) => {
  try {
    const result = await addMenuService(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getMenuController = async (req, res, next) => {
  try {
    const id = req.params.menuId;
    const result = await getMenuService(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const editMenuController = async (req, res, next) => {
  try {
    const id = req.params.menuId;
    const result = await editMenuService(id, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const removeMenuController = async (req, res, next) => {
  try {
    const id = req.params.menuId;
    await removeMenuService(id);
    res.status(200).json({
      data: `Menu with id ${id} is removed.`,
    });
  } catch (e) {
    next(e);
  }
};

const getAllMenuController = async (req, res, next) => {
  try {
    const result = await getAllMenuService();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export {
  addMenuController,
  getMenuController,
  editMenuController,
  removeMenuController,
  getAllMenuController,
};
