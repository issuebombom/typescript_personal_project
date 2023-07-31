import { Request, Response, NextFunction } from 'express';
import { Place } from '../db';

import PlaceService from '../services/place.service';
import CustomError from '../error';

class PlaceController {
  placeService = new PlaceService();

  findPlace = async (req: Request, res: Response) => {
    const { placeId }: Partial<Place> = req.params;
    const keyword = req.query.keyword as string;

    try {
      if (placeId) {
        // 특정 공연 찾기
        const place = await this.placeService.getPlace(placeId);
        return res.send({ data: place });
      } else if (keyword) {
        // 키워드 검색
        const searchedPlaces = await this.placeService.searchPlaces(keyword);
        return res.send({ data: searchedPlaces });
      } else {
        // 전체 조회
        const places = await this.placeService.getAllPlaces();
        return res.send({ data: places });
      }
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(err.status).send({ message: `${err.message}` });
      }
    }
  };

  postPlace = async (req: Request, res: Response) => {
    try {
      const placeInfo: Required<Place> = req.body;
      await this.placeService.createPlace(placeInfo);
      return res.send({ message: '공연 생성 완료' });
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(err.status).send({ message: `${err.message}` });
      }
    }
  };
}

export default PlaceController;
