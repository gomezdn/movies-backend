const { STRING, BOOLEAN, INTEGER } = require('sequelize').DataTypes;
const { db } = require('../config/database');

const User = db.define(
  'User',
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
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
