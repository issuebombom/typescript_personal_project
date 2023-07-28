//* 사용자 미들웨어를 직접 구현
import { Request, Response, NextFunction } from 'express';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send({ message: '로그인 필요' });
  }
};

const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send({ message: '이미 로그인 되어 있음' });
  }
};

export { isLoggedIn, isNotLoggedIn };
