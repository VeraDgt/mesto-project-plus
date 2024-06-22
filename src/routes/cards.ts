import { Router } from "express";
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from "../controller/card";
import { cardIdValidation, createCardValidation } from "../middleware/validate";

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', cardIdValidation, deleteCard);
cardsRouter.post('/', createCardValidation, createCard);
cardsRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardsRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard);

export default cardsRouter;