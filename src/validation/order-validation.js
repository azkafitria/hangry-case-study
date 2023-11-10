import Joi from "joi";

const checkoutOrderValidation = Joi.object({
  destination_address: Joi.string().max(500).required(),
});

const updateOrderStatusValidation = Joi.object({
  status: Joi.string().max(100).required(),
});

const idOrderValidation = Joi.number().required();

export {
  checkoutOrderValidation,
  updateOrderStatusValidation,
  idOrderValidation,
};
