import { Op } from 'sequelize';
import { Place } from '../db';

class PlaceService {
  // id와 email 기준 조회에 대한 처리
  getPlace = async (placeId: string): Promise<Place | null> => {
    const placeById = await Place.findByPk(placeId);
    return placeById;
  };

  getAllPlaces = async (): Promise<Place[]> => {
    const allPlaces = await Place.findAll();
    return allPlaces;
  };

  searchPlaces = async (keyword: string): Promise<Place[]> => {
    const searchedPlaces = await Place.findAll({
      where: {
        name: { [Op.like]: `%${keyword}%` },
      },
    });
    return searchedPlaces;
  };

  createPlace = async (placeInfo: Required<Place>): Promise<Place> => {
    const { name, address, seatClassList, seatNumberList } = placeInfo;
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
