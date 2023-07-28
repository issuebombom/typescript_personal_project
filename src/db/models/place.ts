'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './';
import SeatPrice from './seatprice';

interface PlaceAttributes {
  placeId?: string;
  name: string;
  address: string;
  class: string;
  number: string;
}

class Place extends Model<PlaceAttributes> {
  readonly placeId!: string;
  name!: string;
  address!: string;
  class!: string;
  number!: string;
}
Place.init(
  {
    placeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    address: {
      type: DataTypes.STRING(50),
    },
    class: {
      type: DataTypes.STRING(10),
    },
    number: {
      type: DataTypes.STRING(10),
    },
  },
  {
    sequelize,
    modelName: 'Place',
    timestamps: false,
  }
);

export default Place;
