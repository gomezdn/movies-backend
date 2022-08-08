const { STRING } = require('sequelize').DataTypes;
const { db } = require('../database/database');

const { Movie } = require('./Movie');
const { User } = require('./User');

const UserWatchlist = db.define(
  'UserWatchlist',
  {
    UserEmail: {
      type: STRING,
      references: {
        model: User,
        key: 'email',
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
