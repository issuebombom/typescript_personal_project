import { Request, Response, NextFunction } from 'express';
import { User } from '../db';
import CustomError from '../error';
import UserService from '../services/user.service';

class UserController {
  userService = new UserService();

  findUser = async (req: Request, res: Response) => {
    const userId: string = req.params.userId; // 프론트에서 보낸 폼데이터를 받는다.

    try {
      // 요청을 보낸 유저
      const me = req.user as User;

      // 본인 프로필을 조회하는 케이스인지 검증
      const isApproval: boolean = this.userService.isPermitted(Number(userId), me.userId);
      if (isApproval) {
        // 유저 찾기
        const user = await this.userService.getUser(Number(userId));
        return res.send({ data: user });
      }
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(err.status).send({ message: `${err.message}` });
      }
    }
  };
}

export default UserController;
