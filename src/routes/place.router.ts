import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();

import PlaceController from '../controllers/place.controller';
const placeController = new PlaceController();

// 공연 조회
router.get('/places/', placeController.findPlace);
router.get('/places/:placeId', placeController.findPlace);
router.post('/places', isLoggedIn, placeController.postPlace);

export default router;
