import { Router } from "express";
import { getUsers, getUserById, createUser } from "../controller/user";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

export default usersRouter;