const { STRING, DATE, NOW } = require('sequelize').DataTypes;
const { db } = require('../config/database');

const { Movie } = require('./Movie');
const { User } = require('./User');

const UserWatchlist = db.define(
  'UserWatchlist',
  {
    UserId: {
      type: STRING,
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
    addedAt: {
      type: DATE,
      defaultValue: NOW,
    },
  },
  {
    timestamps: false,
  }
);

Movie.belongsToMany(User, { through: UserWatchlist });
User.belongsToMany(Movie, { through: UserWatchlist });
User.hasMany(UserWatchlist);

module.exports = { UserWatchlist };
