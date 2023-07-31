import { Transaction } from 'sequelize';
import { Book, Client, SeatPrice, sequelize } from '../db';
import ClientService from './client.service';
import CustomError from '../error';
import SeatPriceService from './seatPrice.service';
class BookService {
  clientService = new ClientService();
  seatPriceService = new SeatPriceService();

  createBook = async (userId: number, seatPriceId: string) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    const user = await this.clientService.getUser(userId);
    const seat = await this.seatPriceService.getSeatPrice(seatPriceId);
    let currPoint;

    try {
      if (user && seat && user.point >= seat.price) {
        currPoint = user.point - seat.price;
      } else {
        throw new CustomError(400, '잔액이 부족합니다.');
      }

      // 포인트 차감
      await Client.update({ point: currPoint }, { where: { userId }, transaction: t });
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
