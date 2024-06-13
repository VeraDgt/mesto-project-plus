import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, updateUserAvatar } from "../controller/user";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;