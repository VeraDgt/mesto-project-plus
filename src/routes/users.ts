import { Router } from "express";
import { getUsers, getUserById, updateUser, updateUserAvatar } from "../controller/user";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;