import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} from '../controllers/users.js';

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);
