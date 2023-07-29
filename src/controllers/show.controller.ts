import { Request, Response, NextFunction } from 'express';
import { Client, Show } from '../db';

import ShowService from '../services/show.service';

class ShowController {
  showService = new ShowService();

  findShow = async (req: Request, res: Response) => {
    const { showId }: Partial<Show> = req.params;
    const keyword = req.query.keyword as string

    try {
      if (showId) {
        // 특정 공연 찾기
        const show = await this.showService.getShow(showId);

        if (!show) {
          return res.send({ message: '공연 정보가 없습니다.' });
        }

        return res.send({ data: show });
      } else if (keyword) {
        // 키워드 검색
        const searchedShow = await this.showService.searchShows(keyword);

        if (searchedShow.length === 0) {
          return res.send({ message: '검색 결과가 없음' });
        }

        return res.send({ data: searchedShow });
      } else {
        const shows = await this.showService.getAllShows();

        if (shows.length === 0) {
          return res.send({ message: '등록된 공연이 하나도 없습니다.' });
        }
        return res.send({ data: shows });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.name, ':', err.message);
        console.error(err.stack);
        return res.status(500).send({ message: `${err.message}` });
      }
    }
  };

  postShow = async (req: Request, res: Response) => {
    try {
      const showInfo: Required<Show> = req.body;
      await this.showService.createShow(showInfo);
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

export default ShowController;