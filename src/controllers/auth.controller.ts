import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db';
import passport from 'passport';

import UserService from '../services/user.service';

class AuthController {
  userService = new UserService();

  signup = async (req: Request, res: Response) => {
    const { email, password, name, phone, introduction }: User = req.body; // 프론트에서 보낸 폼데이터를 받는다.

    try {
      // 기존에 이메일로 가입한 사람이 있나 검사 (중복 가입 방지)
      const user = await this.userService.getUser(email);
      if (user) {
        return res.status(403).send({ message: '이미 가입한 회원' });
      }

      // 정상적인 회원가입 절차면 해시화
      const hash = bcrypt.hashSync(password, 12);

      // DB에 해당 회원정보 생성
      await User.create({
        email,
        password: hash,
        name,
        phone,
        introduction,
      });

      return res.send({ message: '회원가입 완료' });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.name, ':', err.message);
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    interface Info {
      message: string;
    }

    try {
      // localstrategy.js 실행
      passport.authenticate('local', (error: Error | null, user: false | User, info: Info) => {
        //* localStrategy의 결과로 done 콜백함수가 실행된다.
        // done(err)가 발생한 경우
        if (error) {
          throw error;
        }
        // 유저 이슈가 발생한 경우
        if (!user) {
          return res.status(403).send({ message: info.message });
        }

        //* done에서 user값을 제대로 가져온 경우(성공한 경우)
        // passport.serializeUser 함수로 이동
        return req.login(user.userId, (loginError) => {
          // deserializeUser 함수의 done이 실행되면
          // done(err) 발생 시
          if (loginError) {
            throw loginError;
          }
          // 세션에 사용자 정보를 저장하여 로그인 상태가 된다.
          return res.send({ message: '로그인 완료' });
        });
      })(req, res, next); //! 미들웨어 내의 미들웨어에는 콜백을 실행시키기위해 (req, res, next)를 붙인다.
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.name, ':', err.message);
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };

  logout = (req: Request, res: Response) => {
    try {
      // req.user
      req.logout((err) => {
        if (err instanceof Error) throw err;
      });
      req.session.destroy((err) => {
        if (err instanceof Error) throw err;
      }); // 로그인인증 수단으로 사용한 세션쿠키를 지우고 파괴
      res.send({ message: '로그아웃 완료' });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.name, ':', err.message);
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };
}

export default AuthController;
