import { Request, Response, NextFunction } from 'express';
import BookService from '../services/book.service';
import CustomError from '../error';
import { User } from '../db';

class BookController {
  bookService = new BookService();

  bookTicket = async (req: Request, res: Response) => {
    try {
      const { userId } = req.user as User;
      const { seatPriceId } = req.params;
      await this.bookService.createBook(userId, seatPriceId);
      return res.send({ message: '예약 완료' });
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(err.status).send({ message: `${err.message}` });
      }
    }
  };
}

export default BookController;
