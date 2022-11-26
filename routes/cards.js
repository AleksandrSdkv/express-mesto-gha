import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} from '../controllers/cards.js';
import { cardIdValidator, cardBodyValidator } from '../validators/validators.js';

export const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', cardBodyValidator, createCard);
cardRouter.delete('/cards/:cardId/likes', cardIdValidator, deleteLikeCard);
cardRouter.delete('/cards/:cardId', cardIdValidator, deleteCard);
cardRouter.put('/cards/:cardId/likes', cardIdValidator, putLikeCard);
