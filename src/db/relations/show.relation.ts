import Show from '../models/show';
import SeatPrice from '../models/seatprice';

export default () => {
  Show.hasMany(SeatPrice, {
    sourceKey: 'showId',
    foreignKey: 'showId',
  });
};
