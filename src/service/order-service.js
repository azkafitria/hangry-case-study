import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import {
  checkoutOrderValidation,
  idOrderValidation,
  updateOrderStatusValidation,
} from "../validation/order-validation.js";
import { idCartValidation } from "../validation/cart-validation.js";
import { ResponseError } from "../error/response-error.js";

const checkoutOrderService = async (cartId, request) => {
  cartId = validate(idCartValidation, cartId);
  var order = validate(checkoutOrderValidation, request);

  const cart = await prismaClient.cart.findUnique({
    where: {
      id: cartId,
    },
  });

  if (!cart) {
    throw new ResponseError(404, "Cart with id " + cartId + " is not found.");
  } else if (cart.status === "INACTIVE") {
    throw new ResponseError(400, "Cart with id " + cartId + " is inactive.");
  }

  const countOnGoingOrder = await prismaClient.order.count({
    where: {
      status: "WAITING_CONFIRMATION" || "IN_COOKING" || "IN_DELIVERY",
    },
  });

  if (countOnGoingOrder > 0) {
    throw new ResponseError(
      400,
      "You have an on going order. Please complete the order before you make another one."
    );
  }

  await prismaClient.cart.update({
    where: {
      id: cartId,
    },
    data: {
      status: "INACTIVE",
    },
  });

  order = await prismaClient.order.create({
    data: {
      total: cart.total,
      destination_address: order.destination_address,
    },
  });

  const cartItems = await prismaClient.cartItem.findMany({
    where: {
      cart_id: cart.id,
    },
  });

  for (const cartItem of cartItems) {
    const menu = await prismaClient.menu.update({
      where: {
        id: cartItem.menu_id,
      },
      data: {
        availability: { decrement: cartItem.quantity },
      },
    });
    await prismaClient.orderItem.create({
      data: {
        name: menu.name,
        price: menu.price,
        image: menu.image,
        description: menu.description,
        quantity: cartItem.quantity,
        notes: cartItem.notes,
        menu_id: cartItem.menu_id,
        order_id: order.id,
      },
    });
  }

  const orderItems = await prismaClient.orderItem.findMany({
    where: {
      order_id: order.id,
    },
  });

  order.order_items = orderItems;
  return order;
};

const updateOrderStatusService = async (orderId, request) => {
  orderId = validate(idOrderValidation, orderId);
  const newOrder = validate(updateOrderStatusValidation, request);

  const order = await getOrder(orderId);

  if (
    (order.status === "WAITING_CONFIRMATION" &&
      (newOrder.status === "IN_COOKING" || newOrder.status === "CANCELLED")) ||
    (order.status === "IN_COOKING" && newOrder.status === "IN_DELIVERY") ||
    (order.status === "IN_DELIVERY" && newOrder.status === "DONE")
  ) {
    return prismaClient.order.update({
      where: {
        id: orderId,
      },
      data: newOrder,
    });
  }
  throw new ResponseError(
    400,
    "Can not update order status from " +
      order.status +
      " to " +
      newOrder.status +
      "."
  );
};

const getOrderService = async (id) => {
  id = validate(idOrderValidation, id);
  return getOrder(id);
};

const getOrder = async (id) => {
  const order = await prismaClient.order.findUnique({
    where: {
      id: id,
    },
  });

  if (!order) {
    throw new ResponseError(404, "Order with id " + id + " is not found.");
  }

  const orderItems = await prismaClient.orderItem.findMany({
    where: {
      order_id: order.id,
    },
  });
  order.order_items = orderItems;

  return order;
};

export { checkoutOrderService, updateOrderStatusService, getOrderService };
