import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import passportConfig from './passport';
import {
  authRouter,
  userRouter,
  showRouter,
  placeRouter,
  seatPriceRouter,
  bookRouter,
} from './routes';

const app: Express = express();
const port: number = 3000;
passportConfig(); // 패스포트 설정

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET_KEY as string,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장

//* 라우터
app.use('/auth', authRouter);
app.use('/api', [userRouter, showRouter, placeRouter, seatPriceRouter, bookRouter]);

app.listen(port, () => {
  console.log(port, '포트로 접속하였습니다.');
});
