import { Client } from '../db';

class ClientService {
  // id와 email 기준 조회에 대한 처리
  getUser = async (searchKeyword: number | string) => {
    const userById = await Client.findByPk(searchKeyword);
    const userByEmail = await Client.findOne({ where: { email: searchKeyword } });
    return userById ?? userByEmail;
  };
}

export default ClientService;
