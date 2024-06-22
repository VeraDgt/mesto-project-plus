import * as Schema from "../utils/validation-schemas";
const { celebrate } = require('celebrate');

export const loginValidation = celebrate({ body: Schema.loginSchema });
export const createUserValidation = celebrate({ body: Schema.createUserSchema });

export const updateUserValidation = celebrate({ body: Schema.updateUserSchema });
export const updateAvatarValidation = celebrate({ body: Schema.updateAvatarSchema });
export const userIdValidation = celebrate({ body: Schema.userIdSchema });

export const cardIdValidation = celebrate({ body: Schema.cardIdSchema });
export const createCardValidation = celebrate({ body: Schema.createCardSchema });