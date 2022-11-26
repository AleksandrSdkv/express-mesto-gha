import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  findCurrentUser,
} from '../controllers/users.js';
import { userAvatarValidator, userProfileValidator, userIdValidator } from '../validators/validators.js';

export const userRouter = Router();

userRouter.get('/users/me', findCurrentUser);
userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', userIdValidator, getUser);
userRouter.patch('/users/me', userProfileValidator, updateUser);
userRouter.patch('/users/me/avatar', userAvatarValidator, updateAvatar);
