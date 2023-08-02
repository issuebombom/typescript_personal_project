import { Transaction } from 'sequelize';
import { Book, User, SeatPrice, sequelize } from '../db';
import User from './user.service';
import CustomError from '../error';
import SeatPriceService from './seatPrice.service';
class BookService {
  userService = new User();
  seatPriceService = new SeatPriceService();

  createBook = async (userId: number, seatPriceId: string) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    const user = await this.userService.getUser(userId);
    const seat = await this.seatPriceService.getSeatPrice(seatPriceId);
    let currPoint;

    try {
      // 예약 가능한 상태인지 확인
      if (seat.status !== 'available') {
        throw new CustomError(400, '이미 예약된 좌석입니다.');
      }

      if (user && seat && user.point >= seat.price) {
        currPoint = user.point - seat.price;
      } else {
        throw new CustomError(400, '잔액이 부족합니다.');
      }

      // 포인트 차감
      await User.update({ point: currPoint }, { where: { userId }, transaction: t });
      // 좌석 예약 완료 처리
      await SeatPrice.update({ status: 'booked' }, { where: { seatPriceId }, transaction: t });
      // 예약 정보 생성
      const createdBook = await Book.create({ userId, seatPriceId }, { transaction: t });

      await t.commit();
      return createdBook;
    } catch (err) {
      console.error(err);
      t.rollback();
      throw new CustomError(400, '티켓 예매에 실패했습니다.');
    }
  };
}

export default BookService;
