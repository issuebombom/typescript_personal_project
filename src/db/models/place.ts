'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './';

interface PlaceAttributes {
  placeId?: string;
  name: string;
  address: string;
  seatClassList: string;
  seatNumberList: string;
}

class Place extends Model<PlaceAttributes> {
  readonly placeId!: string;
  name!: string;
  address!: string;
  seatClassList!: string;
  seatNumberList!: string;
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
      type: DataTypes.STRING(100),
    },
    seatClassList: {
      type: DataTypes.STRING(50),
    },
    seatNumberList: {
      type: DataTypes.STRING(50),
    },
  },
  {
    sequelize,
    modelName: 'Place',
    timestamps: false,
  }
);

export default Place;
