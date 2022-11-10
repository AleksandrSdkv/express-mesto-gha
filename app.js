import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { constants } from 'http2';
import { userRouter } from './routes/users.js';
import { cardRouter } from './routes/cards.js';

dotenv.config();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();

app.use((req, res, next) => {
  req.user = { _id: '636aea4bbbc4fb5ba1c49893' };

  next();
});
mongoose.set({ runValidators: true });
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', cardRouter);

app.all('/*', (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Такой страницы не существует' });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
