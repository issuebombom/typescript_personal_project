import { Request, Response, NextFunction } from 'express';
import { Show, User } from '../db';
import CustomError from '../error';
import ShowService from '../services/show.service';
import UploadBucket from '../middlewares/bucket.middleware';
import { MulterError } from 'multer';

class ShowController {
  showService = new ShowService();
  upload = new UploadBucket();

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

  postShow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // let showInfo: Required<Show>;
      const { isAdmin } = req.user as User;
      this.showService.isPermitted(isAdmin);

      // s3 이미지 주소 추가
      // @type/multer에서 Express.Multer.File에 location: string 추가

      // 이미지 업로드
      const showInfo: Required<Show> = await new Promise((resolve) => {
        this.upload.postImage('posterImg')(req, res, (err) => {
          if (err instanceof MulterError) {
            console.error(err.stack);
            return res.send({ message: `${err.message}` });
          } else {
            // 공연 정보 받기
            let showInfo = req.body;
            // 이미지 주소 추가
            showInfo['posterImg'] = req.file?.location as string;
            resolve(showInfo);
          }
        });
      });
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
