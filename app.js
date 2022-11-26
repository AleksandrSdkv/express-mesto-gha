import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { constants } from 'http2';
import { userRouter } from './routes/users.js';
import { cardRouter } from './routes/cards.js';
import { createUser, login } from './controllers/users.js';
import { auth } from './middlewares/auth.js';
import { NotFoundError } from './errors/NotFoundError.js';
import { userBodyValidator, userLoginValidator } from './validators/validators.js';

dotenv.config();
// подключаемся к серверу mongo
const app = express();
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
// валидация mongo

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup', userBodyValidator, createUser);
app.post('/signin', userLoginValidator, login);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use(auth);

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

// Общий обработчик ошибок
app.use(errors());
app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log('Запускаем сервер');
});
