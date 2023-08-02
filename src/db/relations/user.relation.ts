import User from '../models/user';
import Book from '../models/book';

export default () => {
  User.hasMany(Book, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
