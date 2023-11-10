import express from "express";
import {
  addMenuController,
  editMenuController,
  getAllMenuController,
  getMenuController,
  removeMenuController,
} from "../controller/menu-controller.js";
import {
  addCartItemController,
  editCartItemController,
  getCartController,
  removeCartItemController,
} from "../controller/cart-controller.js";
import {
  checkoutOrderController,
  getOrderController,
  updateOrderStatusController,
} from "../controller/order-controller.js";
import { getLocationController } from "../controller/location-controller.js";

const publicRouter = new express.Router();
publicRouter.get("/api/location", getLocationController);

publicRouter.post("/api/menus/add", addMenuController);
publicRouter.get("/api/menus/:menuId", getMenuController);
publicRouter.put("/api/menus/edit/:menuId", editMenuController);
publicRouter.delete("/api/menus/remove/:menuId", removeMenuController);
publicRouter.get("/api/menus", getAllMenuController);

publicRouter.post("/api/carts/add/menu/:menuId", addCartItemController);
publicRouter.put(
  "/api/carts/edit/:cartId/menu/:menuId",
  editCartItemController
);
publicRouter.delete(
  "/api/carts/remove/:cartId/menu/:menuId",
  removeCartItemController
);
publicRouter.get("/api/carts/:cartId", getCartController);

publicRouter.post("/api/carts/checkout/:cartId", checkoutOrderController);
publicRouter.put(
  "/api/orders/update-status/:orderId",
  updateOrderStatusController
);
publicRouter.get("/api/orders/:orderId", getOrderController);

export { publicRouter };
