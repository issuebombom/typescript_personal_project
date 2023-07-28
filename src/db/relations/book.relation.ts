import Book from '../models/book';
import User from '../models/user';
import SeatPrice from '../models/seatprice';

export default () => {
  Book.belongsTo(User, {
    targetKey: 'userId',
    foreignKey: 'UserId',
    onDelete: 'CASCADE',
  });

  Book.belongsTo(SeatPrice, {
    targetKey: 'seatPriceId',
    foreignKey: 'seatPriceId',
    onDelete: 'CASCADE',
  });
};
