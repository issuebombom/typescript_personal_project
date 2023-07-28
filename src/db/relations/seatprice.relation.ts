import SeatPrice from '../models/seatprice';
import Book from '../models/book';
import Place from '../models/place';
import Show from '../models/show';

export default () => {
  SeatPrice.hasMany(Book, {
    sourceKey: 'seatPriceId',
    foreignKey: 'seatPriceId',
  });

  SeatPrice.belongsTo(Place, {
    targetKey: 'placeId',
    foreignKey: 'placeId',
    onDelete: 'CASCADE',
  });

  SeatPrice.belongsTo(Show, {
    targetKey: 'showId',
    foreignKey: 'showId',
    onDelete: 'CASCADE',
  });
};
