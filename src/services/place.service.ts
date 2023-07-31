import { Op } from 'sequelize';
import { Place } from '../db';
import CustomError from '../error';

class PlaceService {
  // id와 email 기준 조회에 대한 처리
  getPlace = async (placeId: string): Promise<Place> => {
    const placeById = await Place.findByPk(placeId);

    if (!placeById) {
      throw new CustomError(404, '공연장 정보가 없습니다.');
    }
    return placeById;
  };

  getAllPlaces = async (): Promise<Place[]> => {
    const allPlaces = await Place.findAll();

    if (allPlaces.length === 0) {
      throw new CustomError(200, '등록된 공연장이 하나도 없습니다.');
    }
    return allPlaces;
  };

  searchPlaces = async (keyword: string): Promise<Place[]> => {
    const searchedPlaces = await Place.findAll({
      where: {
        name: { [Op.like]: `%${keyword}%` },
      },
    });

    if (searchedPlaces.length === 0) {
      throw new CustomError(200, '공연장 검색 결과가 없음');
    }
    return searchedPlaces;
  };

  createPlace = async (placeInfo: Required<Place>): Promise<Place> => {
    const { name, address, seatClassList, seatNumberList } = placeInfo;

    /*
    Validation
    ...
    */

    const createdPlace = await Place.create({
      name,
      address,
      seatClassList,
      seatNumberList,
    });
    return createdPlace;
  };
}

export default PlaceService;
