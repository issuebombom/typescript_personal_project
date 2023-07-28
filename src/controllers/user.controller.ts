import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db';

import UserService from '../services/user.service';

class UserController {
  userService = new UserService();

  findUser = async (req: Request, res: Response) => {
    const userId: string = req.params.userId; // 프론트에서 보낸 폼데이터를 받는다.

    try {
      // 유저 찾기
      const user = await this.userService.getUser(Number(userId));

      if (!user) {
        return res.status(404).send({ message: '회원 정보가 없습니다.' });
      }
      return res.send({ data: user });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.name, ':', err.message);
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };
}

export default UserController;
