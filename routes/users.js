import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  findCurrentUser,
} from '../controllers/users.js';
import { validAvatar, profileValid, validUserId } from '../validators/validators.js';

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/me', findCurrentUser);
userRouter.get('/users/:userId', validUserId, getUser);
userRouter.patch('/users/me', profileValid, updateUser);
userRouter.patch('/users/me/avatar', validAvatar, updateAvatar);
