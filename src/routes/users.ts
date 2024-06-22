import { Router } from "express";
import { getUsers, getUserById, updateUser, updateUserAvatar, getUserMe } from "../controller/user";
import { updateUserValidation, updateAvatarValidation, userIdValidation } from "../middleware/validate";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserMe);
usersRouter.get('/:userId', userIdValidation, getUserById);
usersRouter.patch('/me', updateUserValidation, updateUser);
usersRouter.patch('/me/avatar', updateAvatarValidation, updateUserAvatar);

export default usersRouter;