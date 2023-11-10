import Joi from "joi";

const addCartItemValidation = Joi.object({
  quantity: Joi.number().required(),
  notes: Joi.string().max(100).optional(),
});

const editCartItemValidation = Joi.object({
  quantity: Joi.number().optional(),
  notes: Joi.string().max(100).optional(),
});

const idCartValidation = Joi.number().required();

export { addCartItemValidation, editCartItemValidation, idCartValidation };
