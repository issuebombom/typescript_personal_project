import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();

import UserController from '../controllers/user.controller';
const userController = new UserController();

// 프로필 조회 (유저 정보 조회)
router.get('/users/:userId', isLoggedIn, userController.findUser);

export default router;
