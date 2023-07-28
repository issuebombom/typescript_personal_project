import { Op } from 'sequelize';
import { Show } from '../db';

class ShowService {
  // id와 email 기준 조회에 대한 처리
  getShow = async (showId: string) => {
    const showById = await Show.findByPk(showId);
    return showById;
  };

  getAllShows = async () => {
    const allShows = await Show.findAll();
    return allShows;
  };

  searchShows = async (keyword: string) => {
    const searchedShows = await Show.findAll({
      where: {
        name: { [Op.like]: `%${keyword}%` },
      },
    });
    return searchedShows;
  };
}

export default ShowService;
