import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} from '../controllers/cards.js';
import { validCardId, cardValid } from '../validators/validators.js';

export const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', cardValid, createCard);
cardRouter.delete('/cards/:cardId/likes', validCardId, deleteLikeCard);
cardRouter.delete('/cards/:cardId', validCardId, deleteCard);
cardRouter.put('/cards/:cardId/likes', validCardId, putLikeCard);
