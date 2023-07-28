import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();

import AuthController from '../controllers/auth.controller';
const authController = new AuthController();

//* 회원 가입
// 사용자 미들웨어 isNotLoggedIn을 통과해야 async (req, res, next) => 미들웨어 실행
router.post('/join', isNotLoggedIn, authController.signup);

interface Info {
  message: string;
}
//* 로그인 요청
router.post('/login', isNotLoggedIn, authController.login);

//* 로그아웃 (isLoggedIn 상태에 해당)
router.get('/logout', isLoggedIn, authController.logout);

export default router;
