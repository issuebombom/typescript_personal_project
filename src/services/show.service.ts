import { Op } from 'sequelize';
import { Show } from '../db';
import CustomError from '../error';

class ShowService {
  // id와 email 기준 조회에 대한 처리
  getShow = async (showId: string): Promise<Show | null> => {
    const showById = await Show.findByPk(showId);

    if (!showById) {
      throw new CustomError(404, '공연 정보가 없습니다.');
    }
    return showById;
  };

  getAllShows = async (): Promise<Show[]> => {
    const allShows = await Show.findAll();
    return allShows;
  };

  searchShows = async (keyword: string | undefined): Promise<Show[]> => {
    const searchedShows = await Show.findAll({
      where: {
        name: { [Op.like]: `%${keyword}%` },
      },
    });
    return searchedShows;
  };

  createShow = async (showInfo: Required<Show>): Promise<Show> => {
    const { name, startDate, startHour, timeTaken, grade } = showInfo;
    const createdShow = await Show.create({
      name,
      startDate,
      startHour,
      timeTaken,
      grade,
    });

    return createdShow;
  };
}

export default ShowService;
