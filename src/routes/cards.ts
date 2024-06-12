import { Router } from "express";
import { getCards, createCard, deleteCard } from "../controller/card";

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.post('/', createCard);

export default cardsRouter;