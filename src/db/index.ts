import sequelize from './models';
import Client from './models/client';
import Show from './models/show';
import Place from './models/place';
import SeatPrice from './models/seatprice';
import Book from './models/book';

import relations from './relations';

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export { sequelize, Client, Show, Place, SeatPrice, Book };
