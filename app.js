import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { userRouter } from './routes/users.js';
import { cardRouter } from './routes/cards.js';
import { createUser, login } from './controllers/users.js';

dotenv.config();
// подключаемся к серверу mongo
const app = express();
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
// валидация mongo

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
