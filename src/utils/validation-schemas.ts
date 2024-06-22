import { Joi } from "celebrate";

const name = Joi.string().min(2).max(30);
const about = Joi.string().min(2).max(200);
const email = Joi.string().email();
const password = Joi.string().required();
const link = Joi.string().uri();
const id = Joi.string().length(24).hex().required();

const createUserSchema = Joi.object().keys({
  name: name,
  about: about,
  avatar: link,
  email: email.required(),
  password: password.required() });

const loginSchema = Joi.object().keys({
  email,
  password });

const updateUserSchema = Joi.object().keys({
  name: name.required(),
  about: about.required()
});

const updateAvatarSchema = Joi.object().keys({
  avatar: link.required()
});

const userIdSchema = Joi.object().keys({ userId: id });

const cardIdSchema = Joi.object().keys({ _id: id });

const createCardSchema = Joi.object().keys({
  name: name.required(),
  link: link.required()
});

export {
  createUserSchema,
  loginSchema,
  updateUserSchema,
  updateAvatarSchema,
  userIdSchema,
  cardIdSchema,
  createCardSchema
}