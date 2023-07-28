import Client from '../models/client';
import Book from '../models/book';

export default () => {
  Client.hasMany(Book, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
