'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './';

interface ShowAttributes {
  showId?: string;
  name: string;
  description: string;
  posterImg: string;
  startDate: string;
  startHour: string;
  timeTaken: string;
  grade: string;
}

class Show extends Model<ShowAttributes> {
  readonly showId!: string;
  name!: string;
  description!: string;
  posterImg!: string;
  startDate!: string;
  startHour!: string;
  timeTaken!: string;
  grade!: string;
}
Show.init(
  {
    showId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(255),
    },
    posterImg: {
      type: DataTypes.STRING(255),
    },
    startDate: {
      type: DataTypes.STRING(50),
    },
    startHour: {
      type: DataTypes.STRING(50),
    },
    timeTaken: {
      type: DataTypes.STRING(10),
    },
    grade: {
      type: DataTypes.STRING(10),
    },
  },
  {
    sequelize,
    modelName: 'Show',
    timestamps: false,
  }
);

export default Show;
