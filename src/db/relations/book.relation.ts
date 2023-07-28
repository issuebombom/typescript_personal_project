import Book from '../models/book';
import Client from '../models/client';
import SeatPrice from '../models/seatprice';

export default () => {
  Book.belongsTo(Client, {
    targetKey: 'userId',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });

  Book.belongsTo(SeatPrice, {
    targetKey: 'seatPriceId',
    foreignKey: 'seatPriceId',
    onDelete: 'CASCADE',
  });
};
