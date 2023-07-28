import Place from '../models/place';
import SeatPrice from '../models/seatprice';

export default () => {
  Place.hasMany(SeatPrice, {
    sourceKey: 'placeId',
    foreignKey: 'placeId',
  });
};
