import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  findCurrentUser,
} from '../controllers/users.js';

export const userRouter = Router();

userRouter.get('/users/me', findCurrentUser);
userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);
