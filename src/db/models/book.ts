'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './';

interface BookAttributes {
  bookId?: number;
  userId?: number;
  seatId?: string;
  status: string;
}

class Book extends Model<BookAttributes> {
  readonly bookId!: number;
  readonly userId!: number;
  readonly seatId!: string;
  status!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}
Book.init(
  {
    bookId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'completed',
    },
  },
  {
    sequelize,
    modelName: 'Book',
  }
);

export default Book;
