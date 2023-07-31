import { Client } from '../db';
import CustomError from '../error';

class ClientService {
  // id와 email 기준 조회에 대한 처리
  existsCheck = async (searchKeyword: number | string) => {
    const userById = await Client.findByPk(searchKeyword);
    const userByEmail = await Client.findOne({ where: { email: searchKeyword } });

    if (userById || userByEmail) {
      throw new CustomError(400, '이미 가입한 회원입니다.');
    }
  };

  getUser = async (searchKeyword: number | string) => {
    const userById = await Client.findByPk(searchKeyword);
    const userByEmail = await Client.findOne({ where: { email: searchKeyword } });

    if (!userById && !userByEmail) {
      throw new CustomError(404, '회원 정보가 없습니다.');
    }

    return userById ?? userByEmail;
  };

  isPermitted = async (userId: number, targetUserId: number) => {
    if (userId !== targetUserId) {
      throw new CustomError(403, '타 유저 프로필 접근 권한 없음');
    }
    return true;
  };

  createUser = async (
    email: string,
    password: string,
    name: string,
    phone: string,
    introduction: string
  ) => {
    /*
    validation 적용 필요
    */

    const createdUser = await Client.create({
      email,
      password,
      name,
      phone,
      introduction,
    });
    return createdUser;
  };
}

export default ClientService;
