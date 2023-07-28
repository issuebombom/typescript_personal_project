'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './';
import Book from './book';

interface UserAttributes {
  userId?: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  introduction: string;
  point?: number;
}

class User extends Model<UserAttributes> {
  readonly userId!: number;
  email!: string;
  password!: string;
  name!: string;
  phone!: string;
  introduction!: string;
  point!: number;
}
User.init(
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
    modelName: 'User',
  }
);

export default User;
