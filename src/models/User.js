const { STRING, BOOLEAN } = require('sequelize').DataTypes;
const { db } = require('../config/database');

const User = db.define(
  'User',
  {
    id: {
      type: STRING,
      primaryKey: true,
    },
    email: {
      type: STRING,
      unique: true,
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
