import { User } from '../db';

class UserService {
  // id와 email 기준 조회에 대한 처리
  getUser = async (searchKeyword: number | string) => {
    const userById = await User.findByPk(searchKeyword);
    const userByEmail = await User.findOne({ where: { email: searchKeyword } });
    return userById ?? userByEmail;
  };
}

export default UserService;
