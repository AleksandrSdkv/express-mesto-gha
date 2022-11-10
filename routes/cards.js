import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} from '../controllers/cards.js';

export const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', putLikeCard);
cardRouter.delete('/cards/:cardId/likes', deleteLikeCard);
