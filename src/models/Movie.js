const { STRING, TEXT } = require('sequelize').DataTypes;
const { db } = require('../config/database');

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
      type: TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = { Movie };
