"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send({ message: '로그인 필요' });
    }
};
exports.isLoggedIn = isLoggedIn;
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send({ message: '이미 로그인 되어 있음' });
    }
};
exports.isNotLoggedIn = isNotLoggedIn;
