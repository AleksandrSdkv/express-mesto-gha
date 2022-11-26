import { cardModel } from '../models/cards.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { InternalServerError } from '../errors/InternalServerError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      next(new InternalServerError('Произошла ошибка выгрузки карточек с сервера'));
    });
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new InternalServerError('Произошла ошибка сервера'));
      }
    });
};

export const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardModel.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено');
      } else {
        card.remove()
          .then(() => res.send({ data: card }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new InternalServerError('Произошла ошибка удаление карточки с сервера'));
      }
    });
};

export const putLikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new InternalServerError('Произошла ошибка постановки лайка на карточку на сервере'));
      }
    });
};

export const deleteLikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new InternalServerError('Произошла ошибка удаления лайка с карточки на сервере'));
      }
    });
};
