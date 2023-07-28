import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();

import ClientController from '../controllers/client.controller';
const clientController = new ClientController();

// 프로필 조회 (유저 정보 조회)
router.get('/users/:userId', isLoggedIn, clientController.findUser);

export default router;
