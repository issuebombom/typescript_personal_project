import { SeatPrice } from '../db';
import CustomError from '../error';

interface ConditionAttributes {
  showId: string;
  [key: string]: string; // 다른 프로퍼티 이름으로 string 값을 추가할 수 있도록 인덱스 시그니처를 추가
}

class SeatPriceService {
  getSeatPrices = async (
    showId: string,
    status: string | undefined,
    seatClass: string | undefined
  ) => {
    let condition: ConditionAttributes = { showId };
    if (status) {
      condition.status = status;
    }

    if (seatClass) {
      condition.seatClass = seatClass;
    }

    const seats = await SeatPrice.findAll({ where: condition });
    return seats;
  };

  getSeatPrice = async (seatPriceId: string) => {
    const seat = await SeatPrice.findByPk(seatPriceId);

    if (!seat) {
      throw new CustomError(404, '좌석 정보가 없습니다.');
    }
    return seat;
  };

  createSeatPrice = async (
    showId: string,
    placeId: string,
    seatClassList: string,
    seatNumberList: string,
    seatPriceList: string
  ) => {
    const dummies = [];
    for (let i = 0; i < seatClassList.length; i++) {
      const seatClass = seatClassList.split(',')[i];
      const price = Number(seatPriceList.split(',')[i]);
      const seatTotal = Number(seatNumberList.split(',')[i]);

      for (let j = 1; j <= seatTotal; j++) {
        dummies.push({
          showId,
          placeId,
          seatClass,
          seatNumber: String(j),
          price,
        });
      }
    }
    const createdSeatPrice = await SeatPrice.bulkCreate(dummies);
    return createdSeatPrice;
  };
}

export default SeatPriceService;
