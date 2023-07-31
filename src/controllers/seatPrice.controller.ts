import { Request, Response, NextFunction } from 'express';

import SeatPriceService from '../services/seatPrice.service';
import PlaceService from '../services/place.service';
import CustomError from '../error';

class SeatPriceController {
  seatPriceService = new SeatPriceService();
  placeService = new PlaceService();

  findSeatPrice = async (req: Request, res: Response) => {
    try {
      const { showId } = req.params;
      const status = req.query.status as string | undefined;
      const seatClass = req.query.seatClass as string | undefined;

      const seats = await this.seatPriceService.getSeatPrices(showId, status, seatClass);
      return res.send({ data: seats });
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };

  postSeatPrice = async (req: Request, res: Response) => {
    try {
      const { showId, placeId } = req.params;
      const seatPriceInfo: string = req.body.seatPriceInfo;
      // 공연장 좌석 등급과 등급별 좌석수 가져오기
      const place = await this.placeService.getPlace(placeId);
      if (place) {
        await this.seatPriceService.createSeatPrice(
          showId,
          placeId,
          place.seatClassList,
          place.seatNumberList,
          seatPriceInfo
        );
        return res.send({ message: '좌석 요금 생성 완료' });
      }
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };
}

export default SeatPriceController;
