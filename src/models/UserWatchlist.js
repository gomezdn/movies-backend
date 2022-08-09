const { STRING, INTEGER } = require('sequelize').DataTypes;
const { db } = require('../config/database');

const { Movie } = require('./Movie');
const { User } = require('./User');

const UserWatchlist = db.define(
  'UserWatchlist',
  {
    UserId: {
      type: INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      primaryKey: true,
    },
    MovieId: {
      type: STRING,
      references: {
        model: Movie,
        key: 'id',
      },
      primaryKey: true,
    },
  },
  { timestamps: false }
);

Movie.belongsToMany(User, { through: UserWatchlist });
User.belongsToMany(Movie, { through: UserWatchlist });

module.exports = { UserWatchlist };
