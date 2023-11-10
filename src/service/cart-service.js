import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import {
  addCartItemValidation,
  editCartItemValidation,
  idCartValidation,
} from "../validation/cart-validation.js";
import { idMenuValidation } from "../validation/menu-validation.js";
import { getMenu } from "./menu-service.js";
import { ResponseError } from "../error/response-error.js";

const addCartItemService = async (menuId, request) => {
  menuId = validate(idMenuValidation, menuId);
  const cartItem = validate(addCartItemValidation, request);

  const menu = await getMenu(menuId);

  const cart = await prismaClient.cart.findFirst({
    where: {
      status: "ACTIVE",
    },
  });

  if (!cart) {
    const newCart = await prismaClient.cart.create({
      data: { status: "ACTIVE", total: menu.price * cartItem.quantity },
    });
    cartItem.cart_id = newCart.id;
  } else {
    await prismaClient.cart.update({
      where: {
        id: cart.id,
      },
      data: { total: { increment: menu.price * cartItem.quantity } },
    });
    cartItem.cart_id = cart.id;
  }
  cartItem.menu_id = menu.id;

  const cartItemCheck = await prismaClient.cartItem.findUnique({
    where: {
      cartItemIdentifier: {
        cart_id: cartItem.cart_id,
        menu_id: menu.id,
      },
    },
  });

  if (cartItemCheck) {
    return prismaClient.cartItem.update({
      where: {
        cartItemIdentifier: {
          cart_id: cartItem.cart_id,
          menu_id: menu.id,
        },
      },
      data: cartItem,
    });
  }
  return prismaClient.cartItem.create({
    data: cartItem,
  });
};

const editCartItemService = async (cartId, menuId, request) => {
  cartId = validate(idCartValidation, cartId);
  menuId = validate(idMenuValidation, menuId);
  const cartItem = validate(editCartItemValidation, request);

  if (cartItem.quantity === 0) {
    removeCartItemService(cartId, menuId);
    return "Cart item is removed.";
  } else {
    const oldCartItem = await getCartItem(cartId, menuId);
    const menu = await getMenu(menuId);

    await prismaClient.cart.update({
      where: {
        id: cartId,
      },
      data: {
        total: {
          increment: menu.price * (cartItem.quantity - oldCartItem.quantity),
        },
      },
    });

    return prismaClient.cartItem.update({
      where: {
        cartItemIdentifier: {
          cart_id: parseInt(cartId),
          menu_id: parseInt(menuId),
        },
      },
      data: cartItem,
    });
  }
};

const removeCartItemService = async (cartId, menuId) => {
  cartId = validate(idCartValidation, cartId);
  menuId = validate(idMenuValidation, menuId);

  const cartItem = await getCartItem(cartId, menuId);
  const menu = await getMenu(menuId);

  await prismaClient.cart.update({
    where: {
      id: cartId,
    },
    data: { total: { decrement: cartItem.quantity * menu.price } },
  });

  await prismaClient.cartItem.delete({
    where: {
      cartItemIdentifier: {
        cart_id: parseInt(cartId),
        menu_id: parseInt(menuId),
      },
    },
  });
};

const getCartService = async (id) => {
  id = validate(idCartValidation, id);

  const cart = await prismaClient.cart.findUnique({
    where: {
      id: id,
    },
  });

  if (!cart) {
    throw new ResponseError(404, `Cart with id ${id} is not found.`);
  }

  const cartItems = await prismaClient.cartItem.findMany({
    where: {
      cart_id: cart.id,
    },
  });
  cart.cart_items = cartItems;

  return cart;
};

const getCartItem = async (cartId, menuId) => {
  const cartItem = await prismaClient.cartItem.findUnique({
    where: {
      cartItemIdentifier: {
        cart_id: parseInt(cartId),
        menu_id: parseInt(menuId),
      },
    },
  });

  if (!cartItem) {
    throw new ResponseError(404, "Cart item is not found.");
  }
  return cartItem;
};

export {
  addCartItemService,
  editCartItemService,
  removeCartItemService,
  getCartService,
};
