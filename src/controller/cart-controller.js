import {
  addCartItemService,
  editCartItemService,
  getCartService,
  removeCartItemService,
} from "../service/cart-service.js";

const addCartItemController = async (req, res, next) => {
  try {
    const menuId = req.params.menuId;
    const result = await addCartItemService(menuId, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const editCartItemController = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const menuId = req.params.menuId;
    const result = await editCartItemService(cartId, menuId, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const removeCartItemController = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const menuId = req.params.menuId;
    await removeCartItemService(cartId, menuId);
    res.status(200).json({
      data: "Cart item is removed.",
    });
  } catch (e) {
    next(e);
  }
};

const getCartController = async (req, res, next) => {
  try {
    const id = req.params.cartId;
    const result = await getCartService(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export {
  addCartItemController,
  editCartItemController,
  removeCartItemController,
  getCartController,
};
