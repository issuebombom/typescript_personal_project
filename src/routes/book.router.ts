import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();

import BookController from '../controllers/book.controller';
const bookController = new BookController();

router.post('/shows/:showId/seats/:seatPriceId/book', isLoggedIn, bookController.bookTicket);
router.get('/books', isLoggedIn, bookController.getMyBooks)
export default router;
