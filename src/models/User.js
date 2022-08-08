const { STRING, BOOLEAN } = require('sequelize').DataTypes;
const { db } = require('../database/database');

const User = db.define(
  'User',
  {
    email: {
      type: STRING,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    activated: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = { User };
