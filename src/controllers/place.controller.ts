import { Request, Response, NextFunction } from 'express';
import { Place } from '../db';

import PlaceService from '../services/place.service';

class PlaceController {
  placeService = new PlaceService();

  findPlace = async (req: Request, res: Response) => {
    const { placeId }: Partial<Place> = req.params;
    const keyword = req.query.keyword as string;

    try {
      if (placeId) {
        // 특정 공연 찾기
        const place = await this.placeService.getPlace(placeId);

        if (!place) {
          return res.send({ message: '공연장 정보가 없습니다.' });
        }

        return res.send({ data: place });
      } else if (keyword) {
        // 키워드 검색
        const searchedPlaces = await this.placeService.searchPlaces(keyword);

        if (searchedPlaces.length === 0) {
          return res.send({ message: '공연장 검색 결과가 없음' });
        }

        return res.send({ data: searchedPlaces });
      } else {
        const places = await this.placeService.getAllPlaces();

        if (places.length === 0) {
          return res.send({ message: '등록된 공연장이 하나도 없습니다.' });
        }
        return res.send({ data: places });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.name, ':', err.message);
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };

  postPlace = async (req: Request, res: Response) => {
    try {
      const placeInfo: Required<Place> = req.body;
      await this.placeService.createPlace(placeInfo);
      return res.send({ message: '공연 생성 완료' });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.name, ':', err.message);
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };
}

export default PlaceController;
