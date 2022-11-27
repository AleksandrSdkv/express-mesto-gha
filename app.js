import path from 'path';
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
import { userBodyValid, loginValid } from './validators/validators.js';

dotenv.config();
const config = dotenv.config({ path: path.resolve('.env.common') }).parsed;
// подключаемся к серверу mongo
const app = express();
app.use(bodyParser.json());
// валидация mongo

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup', userBodyValid, createUser);
app.post('/signin', loginValid, login);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

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

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
