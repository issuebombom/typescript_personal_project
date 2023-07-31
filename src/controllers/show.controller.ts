import { Request, Response, NextFunction } from 'express';
import { Show } from '../db';
import CustomError from '../error';
import ShowService from '../services/show.service';

class ShowController {
  showService = new ShowService();

  findShow = async (req: Request, res: Response) => {
    const { showId }: Partial<Show> = req.params;
    const keyword = req.query.keyword as string;

    try {
      if (showId) {
        // 특정 공연 찾기
        const show = await this.showService.getShow(showId);
        return res.send({ data: show });
      } else if (keyword) {
        // 키워드 검색
        const searchedShow = await this.showService.searchShows(keyword);
        return res.send({ data: searchedShow });
      } else {
        const shows = await this.showService.getAllShows();
        return res.send({ data: shows });
      }
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(err.status).send({ message: `${err.message}` });
      }
    }
  };

  postShow = async (req: Request, res: Response) => {
    try {
      const showInfo: Required<Show> = req.body;
      await this.showService.createShow(showInfo);
      return res.send({ message: '공연 생성 완료' });
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(err.status).send({ message: `${err.message}` });
      }
    }
  };
}

export default ShowController;
