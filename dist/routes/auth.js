"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const middelwares_1 = require("./middelwares");
const db_1 = require("../db");
const router = express_1.default.Router();
//* 회원 가입
// 사용자 미들웨어 isNotLoggedIn을 통과해야 async (req, res, next) => 미들웨어 실행
router.post('/join', middelwares_1.isNotLoggedIn, async (req, res, next) => {
    const { email, password, name, phone, introduction } = req.body; // 프론트에서 보낸 폼데이터를 받는다.
    try {
        // 기존에 이메일로 가입한 사람이 있나 검사 (중복 가입 방지)
        const exUser = await db_1.User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist'); // 에러페이지로 바로 리다이렉트
        }
        // 정상적인 회원가입 절차면 해시화
        const hash = bcrypt_1.default.hashSync(password, 12);
        // DB에 해당 회원정보 생성
        await db_1.User.create({
            email,
            password: hash,
            name,
            phone,
            introduction,
        });
        return res.send({ message: '회원가입 완료' });
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
});
//* 로그인 요청
router.post('/login', middelwares_1.isNotLoggedIn, (req, res, next) => {
    // localstrategy.js 실행
    passport_1.default.authenticate('local', (error, user, info) => {
        //* localStrategy의 결과로 done 콜백함수가 실행된다.
        // done(err)가 발생한 경우
        if (error) {
            console.error(error);
            return next(error); // 에러처리 미들웨어로 보낸다.
        }
        // 유저 이슈가 발생한 경우
        if (!user) {
            return res.send({ message: info.message });
        }
        //* done에서 user값을 제대로 가져온 경우(성공한 경우)
        // passport.serializeUser 함수로 이동
        return req.login(user, (loginError) => {
            // deserializeUser 함수의 done이 실행되면  
            // done(err) 발생 시
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            // 세션에 사용자 정보를 저장하여 로그인 상태가 된다.
            return res.send({ message: '로그인 완료' });
        });
    })(req, res, next); //! 미들웨어 내의 미들웨어에는 콜백을 실행시키기위해 (req, res, next)를 붙인다.
});
/* **************************************************************************************** */
//* 로그아웃 (isLoggedIn 상태일 경우)
router.get('/logout', middelwares_1.isLoggedIn, (req, res) => {
    // req.user (사용자 정보가 안에 들어있다. 당연히 로그인되어있으니 로그아웃하려는 거니까)
    req.logout((err) => { });
    req.session.destroy((err) => { }); // 로그인인증 수단으로 사용한 세션쿠키를 지우고 파괴한다. 세션쿠키가 없다는 말은 즉 로그아웃 인 말.
    res.send({ message: '로그아웃 완료' });
});
exports.default = router;
