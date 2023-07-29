'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './';

interface ClientAttributes {
  userId?: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  introduction: string;
  point?: number;
}

class Client extends Model<ClientAttributes> {
  readonly userId!: number;
  email!: string;
  password!: string;
  name!: string;
  phone!: string;
  introduction!: string;
  point!: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}
Client.init(
  {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING(20),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    introduction: {
      type: DataTypes.STRING,
    },
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 1000000,
    },
  },
  {
    sequelize,
    modelName: 'Client',
  }
);

export default Client;
