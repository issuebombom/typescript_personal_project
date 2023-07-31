import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();

import SeatPriceController from '../controllers/seatPrice.controller';
const seatPriceController = new SeatPriceController();

// 공연 좌석 조회
router.get('/shows/:showId/seats', isLoggedIn, seatPriceController.findSeatPrice);
// 공연별 판매 좌석 생성
router.post(
  '/shows/:showId/places/:placeId/seat-price',
  isLoggedIn,
  seatPriceController.postSeatPrice
);

export default router;
