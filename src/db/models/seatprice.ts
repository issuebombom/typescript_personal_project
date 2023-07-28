'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './';
import Book from './book';
import Place from './place';
import Show from './show';

interface SeatPriceAttributes {
  seatPriceId?: string;
  showId?: string;
  placeId?: string;
  price: number;
  status?: string;
}

class SeatPrice extends Model<SeatPriceAttributes> {
  readonly seatPriceId!: string;
  readonly showId!: string;
  readonly placeId!: string;
  price!: number;
  status!: string;
}
SeatPrice.init(
  {
    seatPriceId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    showId: {
      type: DataTypes.UUID,
    },
    placeId: {
      type: DataTypes.UUID,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'available',
    },
  },
  {
    sequelize,
    modelName: 'SeatPrice',
    timestamps: false,
  }
);

export default SeatPrice;
