'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './';

interface SeatPriceAttributes {
  seatPriceId?: string;
  showId: string;
  placeId: string;
  seatClass: string;
  seatNumber: string;
  price: number;
  status?: string;
}

class SeatPrice extends Model<SeatPriceAttributes> {
  readonly seatPriceId!: string;
  readonly showId!: string;
  readonly placeId!: string;
  seatClass!: string;
  seatNumber!: string;
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
    seatClass: {
      type: DataTypes.STRING(10),
    },
    seatNumber: {
      type: DataTypes.STRING(10),
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
