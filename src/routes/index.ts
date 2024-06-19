import { Router } from "express";
import usersRouter from "./users";
import cardsRouter from "./cards";
import noPage from "../controller/no-page";
import { auth } from "middleware/auth";

const router = Router();
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', noPage);

export default router;