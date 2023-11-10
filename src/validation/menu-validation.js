import Joi from "joi";

const addMenuValidation = Joi.object({
  name: Joi.string().max(100).required(),
  price: Joi.number().required(),
  image: Joi.string().max(500).required(),
  description: Joi.string().max(200).required(),
  availability: Joi.number().required(),
});

const editMenuValidation = Joi.object({
  name: Joi.string().max(100).optional(),
  price: Joi.number().optional(),
  image: Joi.string().max(500).optional(),
  description: Joi.string().max(200).optional(),
  availability: Joi.number().optional(),
});

const idMenuValidation = Joi.number().required();

export { addMenuValidation, editMenuValidation, idMenuValidation };
