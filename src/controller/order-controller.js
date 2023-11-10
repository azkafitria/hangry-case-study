import {
  checkoutOrderService,
  getOrderService,
  updateOrderStatusService,
} from "../service/order-service.js";

const checkoutOrderController = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const result = await checkoutOrderService(cartId, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateOrderStatusController = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const result = await updateOrderStatusService(orderId, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getOrderController = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const result = await getOrderService(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export {
  checkoutOrderController,
  updateOrderStatusController,
  getOrderController,
};
