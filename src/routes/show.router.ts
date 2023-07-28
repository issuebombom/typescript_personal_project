import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();

import ShowController from '../controllers/show.controller';
const showController = new ShowController();

// 공연 조회
router.get('/shows/:showId', isLoggedIn, showController.findShow);
// router.get('/shows', isLoggedIn, showController.postShow);

export default router;
