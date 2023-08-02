import sequelize from './models';
import User from './models/user';
import Show from './models/show';
import Place from './models/place';
import SeatPrice from './models/seatprice';
import Book from './models/book';

import relations from './relations';

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export { sequelize, User, Show, Place, SeatPrice, Book };
