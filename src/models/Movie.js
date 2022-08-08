const { STRING } = require('sequelize').DataTypes;
const { db } = require('../database/database');

const Movie = db.define(
  'Movie',
  {
    id: {
      type: STRING,
      primaryKey: true,
    },
    type: {
      type: STRING,
      allowNull: false,
    },
    imgUrl: {
      type: STRING,
      allowNull: false,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    titleForUrl: {
      type: STRING,
      allowNull: false,
    },
    year: {
      type: STRING,
      allowNull: false,
    },
    overview: {
      type: STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = { Movie };
